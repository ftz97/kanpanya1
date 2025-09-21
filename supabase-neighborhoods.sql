-- Table pour stocker les quartiers créés par les utilisateurs
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  geometry JSONB NOT NULL,
  color VARCHAR(7) NOT NULL DEFAULT '#3B82F6',
  municipality VARCHAR(255) DEFAULT 'Martinique',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_neighborhoods_geometry ON neighborhoods USING GIST (geometry);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_municipality ON neighborhoods (municipality);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_created_at ON neighborhoods (created_at);

-- RLS (Row Level Security)
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous les utilisateurs authentifiés
CREATE POLICY "Allow read access to authenticated users" ON neighborhoods
  FOR SELECT USING (auth.role() = 'authenticated');

-- Politique pour permettre l'insertion aux utilisateurs authentifiés
CREATE POLICY "Allow insert to authenticated users" ON neighborhoods
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "Allow update to authenticated users" ON neighborhoods
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression aux utilisateurs authentifiés
CREATE POLICY "Allow delete to authenticated users" ON neighborhoods
  FOR DELETE USING (auth.role() = 'authenticated');

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour updated_at
CREATE TRIGGER update_neighborhoods_updated_at
  BEFORE UPDATE ON neighborhoods
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Commentaires
COMMENT ON TABLE neighborhoods IS 'Table pour stocker les quartiers créés par les utilisateurs';
COMMENT ON COLUMN neighborhoods.id IS 'Identifiant unique du quartier';
COMMENT ON COLUMN neighborhoods.name IS 'Nom du quartier';
COMMENT ON COLUMN neighborhoods.geometry IS 'Géométrie GeoJSON du quartier';
COMMENT ON COLUMN neighborhoods.color IS 'Couleur d''affichage du quartier (hex)';
COMMENT ON COLUMN neighborhoods.municipality IS 'Municipalité du quartier';
COMMENT ON COLUMN neighborhoods.created_at IS 'Date de création';
COMMENT ON COLUMN neighborhoods.updated_at IS 'Date de dernière modification';



