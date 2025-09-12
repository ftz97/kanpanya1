-- Extension pour les UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table pour stocker les segments de rues
CREATE TABLE IF NOT EXISTS street_segments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  coordinates JSONB NOT NULL, -- Array de coordonnées [lng, lat]
  type TEXT NOT NULL CHECK (type IN ('commercial', 'residential', 'mixed', 'industrial')),
  population INTEGER DEFAULT 0,
  businesses INTEGER DEFAULT 0,
  foot_traffic INTEGER DEFAULT 0,
  color TEXT DEFAULT '#6b7280',
  metadata JSONB DEFAULT '{}'::jsonb, -- Données supplémentaires
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_street_segments_type ON street_segments(type);
CREATE INDEX IF NOT EXISTS idx_street_segments_name ON street_segments(name);
CREATE INDEX IF NOT EXISTS idx_street_segments_created_at ON street_segments(created_at);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_street_segments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_street_segments_updated_at 
    BEFORE UPDATE ON street_segments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_street_segments_updated_at();

-- Table pour les statistiques de segmentation
CREATE TABLE IF NOT EXISTS street_segment_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  segment_id UUID REFERENCES street_segments(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  population_count INTEGER DEFAULT 0,
  business_count INTEGER DEFAULT 0,
  foot_traffic_count INTEGER DEFAULT 0,
  vehicle_traffic_count INTEGER DEFAULT 0,
  noise_level DECIMAL(3,1) DEFAULT 0.0,
  air_quality_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les statistiques
CREATE INDEX IF NOT EXISTS idx_street_segment_stats_segment_id ON street_segment_stats(segment_id);
CREATE INDEX IF NOT EXISTS idx_street_segment_stats_date ON street_segment_stats(date);

-- Table pour les zones de collectivités
CREATE TABLE IF NOT EXISTS municipality_zones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  municipality_name TEXT NOT NULL,
  zone_type TEXT NOT NULL CHECK (zone_type IN ('urban', 'suburban', 'rural', 'commercial', 'industrial')),
  boundaries JSONB NOT NULL, -- Géométrie de la zone
  population INTEGER DEFAULT 0,
  area_km2 DECIMAL(10,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les zones
CREATE INDEX IF NOT EXISTS idx_municipality_zones_municipality ON municipality_zones(municipality_name);
CREATE INDEX IF NOT EXISTS idx_municipality_zones_type ON municipality_zones(zone_type);

-- Trigger pour les zones
CREATE TRIGGER update_municipality_zones_updated_at 
    BEFORE UPDATE ON municipality_zones 
    FOR EACH ROW 
    EXECUTE FUNCTION update_street_segments_updated_at();

-- Vue pour les statistiques agrégées par type de rue
CREATE OR REPLACE VIEW street_segment_summary AS
SELECT 
  type,
  COUNT(*) as segment_count,
  SUM(population) as total_population,
  SUM(businesses) as total_businesses,
  SUM(foot_traffic) as total_foot_traffic,
  AVG(population) as avg_population,
  AVG(businesses) as avg_businesses,
  AVG(foot_traffic) as avg_foot_traffic
FROM street_segments
GROUP BY type;

-- Vue pour les statistiques par zone municipale
CREATE OR REPLACE VIEW municipality_zone_summary AS
SELECT 
  municipality_name,
  zone_type,
  COUNT(*) as zone_count,
  SUM(population) as total_population,
  SUM(area_km2) as total_area,
  AVG(population) as avg_population_per_zone
FROM municipality_zones
GROUP BY municipality_name, zone_type;

-- Fonction pour calculer la densité de population par segment
CREATE OR REPLACE FUNCTION calculate_population_density(segment_id UUID)
RETURNS DECIMAL AS $$
DECLARE
  segment_length DECIMAL;
  segment_population INTEGER;
BEGIN
  SELECT 
    population,
    ST_Length(ST_GeomFromGeoJSON(coordinates::text)) / 1000 -- Convertir en km
  INTO segment_population, segment_length
  FROM street_segments
  WHERE id = segment_id;
  
  IF segment_length > 0 THEN
    RETURN segment_population / segment_length;
  ELSE
    RETURN 0;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir les segments dans un rayon donné
CREATE OR REPLACE FUNCTION get_segments_in_radius(
  center_lng DECIMAL,
  center_lat DECIMAL,
  radius_km DECIMAL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  type TEXT,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ss.id,
    ss.name,
    ss.type,
    ST_Distance(
      ST_GeomFromText('POINT(' || center_lng || ' ' || center_lat || ')', 4326),
      ST_GeomFromGeoJSON(ss.coordinates::text)
    ) / 1000 as distance_km
  FROM street_segments ss
  WHERE ST_DWithin(
    ST_GeomFromText('POINT(' || center_lng || ' ' || center_lat || ')', 4326),
    ST_GeomFromGeoJSON(ss.coordinates::text),
    radius_km * 1000
  )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) - Optionnel selon vos besoins
-- ALTER TABLE street_segments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE street_segment_stats ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE municipality_zones ENABLE ROW LEVEL SECURITY;

-- Exemples de politiques RLS pour permettre la lecture à tous
-- CREATE POLICY "Allow public read access on street_segments" ON street_segments FOR SELECT USING (true);
-- CREATE POLICY "Allow public read access on street_segment_stats" ON street_segment_stats FOR SELECT USING (true);
-- CREATE POLICY "Allow public read access on municipality_zones" ON municipality_zones FOR SELECT USING (true);

-- Exemples de politiques RLS pour permettre l'écriture aux utilisateurs authentifiés
-- CREATE POLICY "Allow authenticated users to insert street_segments" ON street_segments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Allow authenticated users to update street_segments" ON street_segments FOR UPDATE USING (auth.role() = 'authenticated');

-- Données de démonstration
INSERT INTO street_segments (name, coordinates, type, population, businesses, foot_traffic, color) VALUES
('Rue de Rivoli', '[[2.3522, 48.8566], [2.3622, 48.8576], [2.3722, 48.8586]]', 'commercial', 2500, 45, 8500, '#3b82f6'),
('Rue de la Paix', '[[2.3322, 48.8666], [2.3422, 48.8676], [2.3522, 48.8686]]', 'residential', 1800, 12, 3200, '#22c55e'),
('Boulevard Saint-Germain', '[[2.3422, 48.8466], [2.3522, 48.8476], [2.3622, 48.8486]]', 'mixed', 3200, 28, 6200, '#f59e0b'),
('Rue du Faubourg Saint-Antoine', '[[2.3722, 48.8566], [2.3822, 48.8576], [2.3922, 48.8586]]', 'commercial', 2100, 38, 7200, '#3b82f6'),
('Rue de Charonne', '[[2.3822, 48.8666], [2.3922, 48.8676], [2.4022, 48.8686]]', 'residential', 2200, 15, 2800, '#22c55e');

-- Données de démonstration pour les zones municipales
INSERT INTO municipality_zones (name, municipality_name, zone_type, boundaries, population, area_km2) VALUES
('Centre-ville', 'Paris', 'urban', '{"type": "Polygon", "coordinates": [[[2.35, 48.85], [2.36, 48.85], [2.36, 48.86], [2.35, 48.86], [2.35, 48.85]]]}', 15000, 2.5),
('Quartier résidentiel Nord', 'Paris', 'suburban', '{"type": "Polygon", "coordinates": [[[2.38, 48.86], [2.40, 48.86], [2.40, 48.88], [2.38, 48.88], [2.38, 48.86]]]}', 8500, 1.8),
('Zone commerciale Est', 'Paris', 'commercial', '{"type": "Polygon", "coordinates": [[[2.37, 48.85], [2.39, 48.85], [2.39, 48.87], [2.37, 48.87], [2.37, 48.85]]]}', 3200, 1.2);
