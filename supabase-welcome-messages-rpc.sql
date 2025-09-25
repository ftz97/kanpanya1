-- =====================================================
-- 🎯 Fonction RPC Supabase pour les messages de bienvenue
-- =====================================================

-- 1. Créer la table des messages de bienvenue
CREATE TABLE IF NOT EXISTS welcome_messages (
  id SERIAL PRIMARY KEY,
  period VARCHAR(20) NOT NULL CHECK (period IN ('morning', 'afternoon', 'evening')),
  message_template TEXT NOT NULL,
  emoji VARCHAR(10),
  lang VARCHAR(5) DEFAULT 'fr' CHECK (lang IN ('fr', 'en', 'es', 'gcf')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Insérer des messages d'exemple multilingues
INSERT INTO welcome_messages (period, message_template, emoji, lang) VALUES
-- Messages du matin (français)
('morning', 'Bonjour {username} ☀️', '☀️', 'fr'),
('morning', 'Salut {username} 👋', '👋', 'fr'),
('morning', 'Bon matin {username} 🌸', '🌸', 'fr'),
('morning', 'Hello {username} 🌞', '🌞', 'fr'),
('morning', 'Coucou {username} 🌱', '🌱', 'fr'),

-- Messages du matin (créole haïtien)
('morning', '{username}, bonjou ! ☀️', '☀️', 'gcf'),
('morning', 'Salut {username} 👋', '👋', 'gcf'),
('morning', 'Bon maten {username} 🌸', '🌸', 'gcf'),

-- Messages du matin (anglais)
('morning', 'Good morning {username} ☀️', '☀️', 'en'),
('morning', 'Hello {username} 👋', '👋', 'en'),
('morning', 'Morning {username} 🌸', '🌸', 'en'),

-- Messages du matin (espagnol)
('morning', 'Buenos días {username} ☀️', '☀️', 'es'),
('morning', 'Hola {username} 👋', '👋', 'es'),
('morning', 'Buen día {username} 🌸', '🌸', 'es'),

-- Messages de l'après-midi (français)
('afternoon', 'Bon après-midi {username} 🌱', '🌱', 'fr'),
('afternoon', 'Salut {username} 🔥', '🔥', 'fr'),
('afternoon', 'Hey {username} 👋', '👋', 'fr'),
('afternoon', 'Yo {username} 😎', '😎', 'fr'),
('afternoon', 'Coucou {username} 🛍️', '🛍️', 'fr'),

-- Messages de l'après-midi (créole haïtien)
('afternoon', 'Bon apremidi {username} 🌱', '🌱', 'gcf'),
('afternoon', 'Salut {username} 🔥', '🔥', 'gcf'),
('afternoon', 'Hey {username} 👋', '👋', 'gcf'),

-- Messages de l'après-midi (anglais)
('afternoon', 'Good afternoon {username} 🌱', '🌱', 'en'),
('afternoon', 'Hey {username} 🔥', '🔥', 'en'),
('afternoon', 'Hi {username} 👋', '👋', 'en'),

-- Messages de l'après-midi (espagnol)
('afternoon', 'Buenas tardes {username} 🌱', '🌱', 'es'),
('afternoon', 'Hola {username} 🔥', '🔥', 'es'),
('afternoon', 'Hey {username} 👋', '👋', 'es'),

-- Messages du soir (français)
('evening', 'Bonsoir {username} 🌙', '🌙', 'fr'),
('evening', 'Bonne soirée {username} 🌟', '🌟', 'fr'),
('evening', 'Salut {username} ✨', '✨', 'fr'),
('evening', 'Hey {username} 🛋️', '🛋️', 'fr'),
('evening', 'Coucou {username} 🎉', '🎉', 'fr'),

-- Messages du soir (créole haïtien)
('evening', 'Bonswa {username} 🌙', '🌙', 'gcf'),
('evening', 'Bon aswè {username} 🌟', '🌟', 'gcf'),
('evening', 'Salut {username} ✨', '✨', 'gcf'),

-- Messages du soir (anglais)
('evening', 'Good evening {username} 🌙', '🌙', 'en'),
('evening', 'Good night {username} 🌟', '🌟', 'en'),
('evening', 'Hey {username} ✨', '✨', 'en'),

-- Messages du soir (espagnol)
('evening', 'Buenas noches {username} 🌙', '🌙', 'es'),
('evening', 'Buenas tardes {username} 🌟', '🌟', 'es'),
('evening', 'Hola {username} ✨', '✨', 'es');

-- 3. Créer la fonction RPC multilingue avec support des langues
CREATE OR REPLACE FUNCTION get_random_welcome_message(
  username TEXT,
  lang_input TEXT DEFAULT 'fr'
)
RETURNS TABLE(message TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
  random_message TEXT;
  day_of_week INTEGER;
  special_suffix TEXT := '';
  current_hour INTEGER;
  period TEXT;
  msg_id UUID;
  fallback_message TEXT;
BEGIN
  -- Déterminer la période automatiquement selon l'heure actuelle
  current_hour := EXTRACT(HOUR FROM NOW());

  IF current_hour >= 7 AND current_hour < 12 THEN
    period := 'morning';
  ELSIF current_hour >= 12 AND current_hour < 19 THEN
    period := 'afternoon';
  ELSE
    period := 'evening';
  END IF;

  -- Sélectionner un message aléatoire pour la période et la langue déterminées
  SELECT message_template INTO random_message
  FROM welcome_messages
  WHERE period = period AND lang = lang_input
  ORDER BY RANDOM()
  LIMIT 1;

  -- Si aucun message trouvé pour la langue demandée, essayer le français
  IF random_message IS NULL AND lang_input != 'fr' THEN
    SELECT message_template INTO random_message
    FROM welcome_messages
    WHERE period = period AND lang = 'fr'
    ORDER BY RANDOM()
    LIMIT 1;
  END IF;

  -- Si toujours aucun message trouvé, créer un message de fallback selon la langue
  IF random_message IS NULL THEN
    CASE lang_input
      WHEN 'en' THEN
        fallback_message := 'Hello ' || username || '! Welcome to Kanpanya 🌱';
      WHEN 'es' THEN
        fallback_message := '¡Hola ' || username || '! Bienvenido a Kanpanya 🌱';
      WHEN 'gcf' THEN
        fallback_message := username || ', byenveni anlè Kanpanya 🌱';
      ELSE
        fallback_message := 'Bonjour ' || username || '! Bienvenue sur Kanpanya 🌱';
    END CASE;
    random_message := fallback_message;
  END IF;

  -- Remplacer {username} par le vrai nom (si le template contient {username})
  random_message := REPLACE(random_message, '{username}', username);

  -- Ajouter des suffixes spéciaux selon le jour de la semaine et la langue
  day_of_week := EXTRACT(DOW FROM NOW()); -- 0 = Dimanche, 1 = Lundi, etc.

  CASE day_of_week
    WHEN 1 THEN -- Lundi
      CASE lang_input
        WHEN 'en' THEN special_suffix := ' 💪 Start your week with energy!';
        WHEN 'es' THEN special_suffix := ' 💪 ¡Comienza tu semana con energía!';
        WHEN 'gcf' THEN special_suffix := ' 💪 Kòmanse semèn ou ak enèji !';
        ELSE special_suffix := ' 💪 Commence ta semaine avec énergie !';
      END CASE;
    WHEN 5 THEN -- Vendredi
      CASE lang_input
        WHEN 'en' THEN special_suffix := ' 🎉 The weekend is approaching, enjoy it!';
        WHEN 'es' THEN special_suffix := ' 🎉 ¡El fin de semana se acerca, disfrútalo!';
        WHEN 'gcf' THEN special_suffix := ' 🎉 Fennsemèn ap pwoche, jwi li !';
        ELSE special_suffix := ' 🎉 Le week-end approche, profites-en !';
      END CASE;
    WHEN 0, 6 THEN -- Samedi et Dimanche
      CASE lang_input
        WHEN 'en' THEN special_suffix := ' 🛋️ Take time for yourself and support local businesses in weekend mode 😎';
        WHEN 'es' THEN special_suffix := ' 🛋️ Tómate tiempo para ti y apoya los negocios locales en modo fin de semana 😎';
        WHEN 'gcf' THEN special_suffix := ' 🛋️ Pran tan pou ou epi sipòte biznis lokal yo nan mòd fennsemèn 😎';
        ELSE special_suffix := ' 🛋️ Prends du temps pour toi et soutiens tes commerces en mode week-end 😎';
      END CASE;
    ELSE
      special_suffix := '';
  END CASE;

  -- Retourner le message final
  RETURN QUERY SELECT (random_message || special_suffix)::TEXT;
END;
$$;

-- 4. Donner les permissions nécessaires
GRANT EXECUTE ON FUNCTION get_random_welcome_message(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_random_welcome_message(TEXT, TEXT) TO anon;

-- 5. Exemples d'utilisation multilingues
-- Français (par défaut)
-- SELECT * FROM get_random_welcome_message('Sarah');
-- SELECT * FROM get_random_welcome_message('Sarah', 'fr');

-- Anglais
-- SELECT * FROM get_random_welcome_message('Sarah', 'en');

-- Espagnol
-- SELECT * FROM get_random_welcome_message('Sarah', 'es');

-- Créole haïtien
-- SELECT * FROM get_random_welcome_message('Sarah', 'gcf');
