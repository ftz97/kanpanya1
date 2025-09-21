-- Fonction RPC pour gérer le grattage de ticket
CREATE OR REPLACE FUNCTION use_scratch_ticket(
  p_config_id UUID,
  p_user_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_config RECORD;
  v_random DECIMAL;
  v_result JSONB;
  v_reward TEXT;
  v_status TEXT;
  v_remaining_jackpots INTEGER;
BEGIN
  -- Récupérer la configuration
  SELECT * INTO v_config 
  FROM scratch_configs 
  WHERE id = p_config_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'error', 'Configuration non trouvée',
      'status', 'error'
    );
  END IF;
  
  -- Vérifier si la carte est encore valide
  IF v_config.valid_from > CURRENT_DATE OR v_config.valid_to < CURRENT_DATE THEN
    RETURN jsonb_build_object(
      'error', 'Cette carte n''est plus valide',
      'status', 'error'
    );
  END IF;
  
  -- Générer un nombre aléatoire
  v_random := random();
  
  -- Logique de tirage
  -- 1. Vérifier le jackpot en premier (si disponible)
  IF v_config.gold_prizes > 0 AND v_random < v_config.gold_chance THEN
    v_status := 'jackpot';
    v_reward := v_config.gold_reward;
    
    -- Décrémenter le nombre de jackpots
    UPDATE scratch_configs 
    SET gold_prizes = gold_prizes - 1,
        updated_at = NOW()
    WHERE id = p_config_id;
    
    SELECT gold_prizes INTO v_remaining_jackpots 
    FROM scratch_configs 
    WHERE id = p_config_id;
    
  -- 2. Sinon, utiliser les probabilités normales
  ELSE
    v_random := random(); -- Nouveau tirage pour les probabilités normales
    
    IF v_random < v_config.probabilities->>'win' THEN
      v_status := 'win';
      -- Sélectionner une récompense aléatoire
      SELECT jsonb_array_elements_text(v_config.rewards)[floor(random() * jsonb_array_length(v_config.rewards))::int]
      INTO v_reward;
      
    ELSIF v_random < (v_config.probabilities->>'win')::DECIMAL + (v_config.probabilities->>'lucky')::DECIMAL THEN
      v_status := 'lucky';
      v_reward := '✨ Récompense surprise : -5% ou +20 pts';
      
    ELSE
      v_status := 'lose';
      v_reward := '❌ Pas de gain cette fois-ci';
    END IF;
    
    v_remaining_jackpots := v_config.gold_prizes;
  END IF;
  
  -- Construire le résultat
  v_result := jsonb_build_object(
    'status', v_status,
    'reward', v_reward,
    'remaining_jackpots', v_remaining_jackpots,
    'config_id', p_config_id,
    'user_id', p_user_id,
    'timestamp', NOW()
  );
  
  -- Optionnel : Enregistrer l'utilisation dans une table de logs
  INSERT INTO scratch_ticket_logs (config_id, user_id, result, created_at)
  VALUES (p_config_id, p_user_id, v_result, NOW());
  
  RETURN v_result;
END;
$$;

-- Table pour logger les utilisations (optionnel)
CREATE TABLE IF NOT EXISTS scratch_ticket_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES scratch_configs(id),
  user_id UUID,
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_scratch_ticket_logs_config_id ON scratch_ticket_logs(config_id);
CREATE INDEX IF NOT EXISTS idx_scratch_ticket_logs_user_id ON scratch_ticket_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_scratch_ticket_logs_created_at ON scratch_ticket_logs(created_at);

-- RLS pour la table de logs
ALTER TABLE scratch_ticket_logs ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion des logs
CREATE POLICY "Allow ticket log insertion" ON scratch_ticket_logs
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture des logs (optionnel, selon vos besoins)
-- CREATE POLICY "Allow users to read their own logs" ON scratch_ticket_logs
--   FOR SELECT USING (auth.uid() = user_id);

-- Exemple d'utilisation de la fonction
-- SELECT use_scratch_ticket('your-config-id-here'::UUID, 'your-user-id-here'::UUID);
