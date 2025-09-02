-- Table pour stocker les configurations des cartes à gratter
CREATE TABLE IF NOT EXISTS scratch_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  badge TEXT NOT NULL,
  logos JSONB DEFAULT '[]'::jsonb,
  rewards JSONB DEFAULT '[]'::jsonb,
  probabilities JSONB DEFAULT '{"win": 0.4, "lucky": 0.2, "lose": 0.4}'::jsonb,
  sponsor_name TEXT NOT NULL DEFAULT '',
  skin TEXT DEFAULT 'default' CHECK (skin IN ('default', 'noel', 'halloween', 'ete', 'rentree')),
  quasi_lose TEXT NOT NULL DEFAULT '',
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  target JSONB DEFAULT '{}'::jsonb,
  gold_prizes INTEGER DEFAULT 0,
  gold_reward TEXT,
  gold_chance DECIMAL(10,6) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_scratch_configs_sponsor ON scratch_configs(sponsor_name);
CREATE INDEX IF NOT EXISTS idx_scratch_configs_skin ON scratch_configs(skin);
CREATE INDEX IF NOT EXISTS idx_scratch_configs_valid_dates ON scratch_configs(valid_from, valid_to);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_scratch_configs_updated_at 
    BEFORE UPDATE ON scratch_configs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - optionnel selon vos besoins
-- ALTER TABLE scratch_configs ENABLE ROW LEVEL SECURITY;

-- Exemple de politique RLS pour permettre la lecture à tous
-- CREATE POLICY "Allow public read access" ON scratch_configs FOR SELECT USING (true);

-- Exemple de politique RLS pour permettre l'écriture aux utilisateurs authentifiés
-- CREATE POLICY "Allow authenticated users to insert" ON scratch_configs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Allow authenticated users to update" ON scratch_configs FOR UPDATE USING (auth.role() = 'authenticated');
-- CREATE POLICY "Allow authenticated users to delete" ON scratch_configs FOR DELETE USING (auth.role() = 'authenticated');

-- Insérer quelques exemples de configurations
INSERT INTO scratch_configs (badge, sponsor_name, skin, rewards, probabilities, quasi_lose, valid_from, valid_to, gold_prizes, gold_reward, gold_chance) VALUES
('Carte Chance Carrefour', 'Carrefour', 'default', '["🎁 -5% de réduction", "🎁 -10% de réduction", "⭐ +20 points bonus"]', '{"win": 0.5, "lucky": 0.2, "lose": 0.3}', '⭐ +5 points (presque !)', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 1, '🎁 Vélo électrique d''une valeur de 500€', 0.001),
('Carte Noël Décathlon', 'Décathlon', 'noel', '["🎄 -15% de réduction", "🎁 Cadeau surprise", "⭐ +30 points bonus"]', '{"win": 0.6, "lucky": 0.1, "lose": 0.3}', '🎄 -5% (presque !)', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 0, NULL, 0),
('Carte Halloween Fnac', 'Fnac', 'halloween', '["🎃 -20% de réduction", "👻 Livre gratuit", "⭐ +25 points bonus"]', '{"win": 0.4, "lucky": 0.3, "lose": 0.3}', '🎃 -10% (presque !)', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 2, '🎁 iPad Pro 11" d''une valeur de 800€', 0.0005),
('Carte Été Intersport', 'Intersport', 'ete', '["☀️ -12% de réduction", "🏖️ Accessoire gratuit", "⭐ +15 points bonus"]', '{"win": 0.45, "lucky": 0.25, "lose": 0.3}', '☀️ +5 points (presque !)', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 0, NULL, 0),
('Carte Rentrée Cultura', 'Cultura', 'rentree', '["📚 -8% de réduction", "✏️ Fournitures gratuites", "⭐ +20 points bonus"]', '{"win": 0.5, "lucky": 0.2, "lose": 0.3}', '📚 -3% (presque !)', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 1, '🎁 MacBook Air M2 d''une valeur de 1200€', 0.0002);
