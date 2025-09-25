-- =====================================================
-- 🎯 Fonction RPC Supabase pour les messages de bienvenue
-- =====================================================

-- 1. Créer la table des messages de bienvenue
CREATE TABLE IF NOT EXISTS welcome_messages (
  id SERIAL PRIMARY KEY,
  period VARCHAR(20) NOT NULL CHECK (period IN ('morning', 'afternoon', 'evening')),
  message_template TEXT NOT NULL,
  emoji VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Insérer des messages d'exemple (français + créole haïtien)
INSERT INTO welcome_messages (period, message_template, emoji) VALUES
-- Messages du matin (français)
('morning', 'Bonjour {username} ☀️', '☀️'),
('morning', 'Salut {username} 👋', '👋'),
('morning', 'Bon matin {username} 🌸', '🌸'),
('morning', 'Hello {username} 🌞', '🌞'),
('morning', 'Coucou {username} 🌱', '🌱'),

-- Messages du matin (créole haïtien)
('morning', '{username}, bonjou ! ☀️', '☀️'),
('morning', 'Salut {username} 👋', '👋'),
('morning', 'Bon maten {username} 🌸', '🌸'),

-- Messages de l'après-midi (français)
('afternoon', 'Bon après-midi {username} 🌱', '🌱'),
('afternoon', 'Salut {username} 🔥', '🔥'),
('afternoon', 'Hey {username} 👋', '👋'),
('afternoon', 'Yo {username} 😎', '😎'),
('afternoon', 'Coucou {username} 🛍️', '🛍️'),

-- Messages de l'après-midi (créole haïtien)
('afternoon', 'Bon apremidi {username} 🌱', '🌱'),
('afternoon', 'Salut {username} 🔥', '🔥'),
('afternoon', 'Hey {username} 👋', '👋'),

-- Messages du soir (français)
('evening', 'Bonsoir {username} 🌙', '🌙'),
('evening', 'Bonne soirée {username} 🌟', '🌟'),
('evening', 'Salut {username} ✨', '✨'),
('evening', 'Hey {username} 🛋️', '🛋️'),
('evening', 'Coucou {username} 🎉', '🎉'),

-- Messages du soir (créole haïtien)
('evening', 'Bonswa {username} 🌙', '🌙'),
('evening', 'Bon aswè {username} 🌟', '🌟'),
('evening', 'Salut {username} ✨', '✨');

-- 3. Créer la fonction RPC (version simplifiée avec fallback créole)
CREATE OR REPLACE FUNCTION get_random_welcome_message(
  username TEXT
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
  
  -- Sélectionner un message aléatoire pour la période déterminée
  SELECT message_template INTO random_message
  FROM welcome_messages
  WHERE period = period
  ORDER BY RANDOM()
  LIMIT 1;
  
  -- Si aucun message trouvé, créer un message par défaut en créole
  IF random_message IS NULL THEN
    random_message := username || ', byenveni anlè Kanpanya 🌱';
    msg_id := gen_random_uuid();
    period := period;
  END IF;
  
  -- Remplacer {username} par le vrai nom (si le template contient {username})
  random_message := REPLACE(random_message, '{username}', username);
  
  -- Ajouter des suffixes spéciaux selon le jour de la semaine
  day_of_week := EXTRACT(DOW FROM NOW()); -- 0 = Dimanche, 1 = Lundi, etc.
  
  CASE day_of_week
    WHEN 1 THEN -- Lundi
      special_suffix := ' 💪 Commence ta semaine avec énergie !';
    WHEN 5 THEN -- Vendredi
      special_suffix := ' 🎉 Le week-end approche, profites-en !';
    WHEN 0, 6 THEN -- Samedi et Dimanche
      special_suffix := ' 🛋️ Prends du temps pour toi et soutiens tes commerces en mode week-end 😎';
    ELSE
      special_suffix := '';
  END CASE;
  
  -- Retourner le message final
  RETURN QUERY SELECT (random_message || special_suffix)::TEXT;
END;
$$;

-- 4. Donner les permissions nécessaires
GRANT EXECUTE ON FUNCTION get_random_welcome_message(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_random_welcome_message(TEXT) TO anon;

-- 5. Exemple d'utilisation (version simplifiée)
-- SELECT * FROM get_random_welcome_message('Sarah');
-- SELECT * FROM get_random_welcome_message('Kevin');
-- SELECT * FROM get_random_welcome_message('Amélie');
