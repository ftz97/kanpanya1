-- =============================================
-- SYSTÈME QR CODES - SUPABASE
-- =============================================

-- 1. Ajouter colonnes QR codes aux tables existantes
-- =============================================

-- Table clients
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS qr_code_url TEXT;

-- Table commercants  
ALTER TABLE commercants
ADD COLUMN IF NOT EXISTS qr_code_url TEXT;

-- Commentaires pour documentation
COMMENT ON COLUMN clients.qr_code_url IS 'URL du QR code unique du client pour les scans commerçants';
COMMENT ON COLUMN commercants.qr_code_url IS 'URL du QR code unique du commerçant pour les scans clients';

-- =============================================
-- 2. Fonction de gestion des récompenses
-- =============================================

CREATE OR REPLACE FUNCTION handle_scan_rewards()
RETURNS TRIGGER AS $$
DECLARE
    client_record RECORD;
    commercant_record RECORD;
    scratch_config_record RECORD;
    carte_fidelite_record RECORD;
    new_points INTEGER;
    ticket_attribue BOOLEAN := FALSE;
BEGIN
    -- Récupérer les données du client
    SELECT * INTO client_record 
    FROM clients 
    WHERE id = NEW.client_id;
    
    -- Récupérer les données du commerçant
    SELECT * INTO commercant_record 
    FROM commercants 
    WHERE id = NEW.commercant_id;
    
    -- Vérifier que les enregistrements existent
    IF client_record IS NULL OR commercant_record IS NULL THEN
        RAISE EXCEPTION 'Client ou commerçant introuvable';
    END IF;
    
    -- Calculer les points (base + bonus éventuels)
    new_points := NEW.points;
    
    -- Ajouter les points au client
    UPDATE clients 
    SET client_points = COALESCE(client_points, 0) + new_points,
        updated_at = NOW()
    WHERE id = NEW.client_id;
    
    -- Vérifier si le commerçant a une carte de fidélité active
    SELECT * INTO carte_fidelite_record
    FROM cartes_fidelite 
    WHERE commercant_id = NEW.commercant_id 
    AND client_id = NEW.client_id
    AND active = true
    LIMIT 1;
    
    -- Incrémenter la fidélité si carte active
    IF carte_fidelite_record IS NOT NULL THEN
        UPDATE cartes_fidelite 
        SET points_fidelite = COALESCE(points_fidelite, 0) + new_points,
            updated_at = NOW()
        WHERE id = carte_fidelite_record.id;
    END IF;
    
    -- Vérifier si le commerçant a une configuration scratch active
    SELECT * INTO scratch_config_record
    FROM scratch_configs 
    WHERE commercant_id = NEW.commercant_id 
    AND active = true
    AND (min_points IS NULL OR client_record.client_points >= min_points)
    LIMIT 1;
    
    -- Attribuer un ticket scratch si conditions remplies
    IF scratch_config_record IS NOT NULL THEN
        INSERT INTO scratch_tickets (
            client_id,
            commercant_id,
            config_id,
            status,
            created_at
        ) VALUES (
            NEW.client_id,
            NEW.commercant_id,
            scratch_config_record.id,
            'available',
            NOW()
        );
        
        ticket_attribue := TRUE;
    END IF;
    
    -- Log de l'opération
    INSERT INTO scan_rewards_log (
        scan_log_id,
        client_id,
        commercant_id,
        points_attributed,
        fidelite_incremented,
        ticket_attribue,
        created_at
    ) VALUES (
        NEW.id,
        NEW.client_id,
        NEW.commercant_id,
        new_points,
        carte_fidelite_record IS NOT NULL,
        ticket_attribue,
        NOW()
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 3. Table de log des récompenses
-- =============================================

CREATE TABLE IF NOT EXISTS scan_rewards_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    scan_log_id UUID REFERENCES scan_logs(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    commercant_id UUID REFERENCES commercants(id) ON DELETE CASCADE,
    points_attributed INTEGER NOT NULL,
    fidelite_incremented BOOLEAN DEFAULT FALSE,
    ticket_attribue BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_scan_rewards_log_client_id ON scan_rewards_log(client_id);
CREATE INDEX IF NOT EXISTS idx_scan_rewards_log_commercant_id ON scan_rewards_log(commercant_id);
CREATE INDEX IF NOT EXISTS idx_scan_rewards_log_created_at ON scan_rewards_log(created_at);

-- =============================================
-- 4. Trigger pour exécuter la fonction
-- =============================================

-- Supprimer le trigger existant s'il existe
DROP TRIGGER IF EXISTS trg_scan_rewards ON scan_logs;

-- Créer le trigger
CREATE TRIGGER trg_scan_rewards
    AFTER INSERT ON scan_logs
    FOR EACH ROW
    EXECUTE FUNCTION handle_scan_rewards();

-- =============================================
-- 5. Fonction utilitaire pour générer QR codes
-- =============================================

CREATE OR REPLACE FUNCTION generate_qr_code_url(
    entity_type TEXT, -- 'client' ou 'commercant'
    entity_id UUID
)
RETURNS TEXT AS $$
DECLARE
    base_url TEXT;
    qr_url TEXT;
BEGIN
    -- URL de base de l'application
    base_url := 'https://votre-domaine.com/scan';
    
    -- Construire l'URL du QR code
    IF entity_type = 'client' THEN
        qr_url := base_url || '?client=' || entity_id::TEXT;
    ELSIF entity_type = 'commercant' THEN
        qr_url := base_url || '?merchant=' || entity_id::TEXT;
    ELSE
        RAISE EXCEPTION 'Type d''entité invalide: %', entity_type;
    END IF;
    
    RETURN qr_url;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 6. Fonction pour mettre à jour les QR codes
-- =============================================

CREATE OR REPLACE FUNCTION update_qr_codes()
RETURNS VOID AS $$
BEGIN
    -- Mettre à jour les QR codes des clients
    UPDATE clients 
    SET qr_code_url = generate_qr_code_url('client', id)
    WHERE qr_code_url IS NULL;
    
    -- Mettre à jour les QR codes des commerçants
    UPDATE commercants 
    SET qr_code_url = generate_qr_code_url('commercant', id)
    WHERE qr_code_url IS NULL;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 7. RLS Policies pour la sécurité
-- =============================================

-- Activer RLS sur la nouvelle table
ALTER TABLE scan_rewards_log ENABLE ROW LEVEL SECURITY;

-- Policy pour les clients (peuvent voir leurs propres logs)
CREATE POLICY "Clients can view own reward logs" ON scan_rewards_log
    FOR SELECT USING (
        client_id IN (
            SELECT id FROM clients WHERE user_id = auth.uid()
        )
    );

-- Policy pour les commerçants (peuvent voir les logs de leurs scans)
CREATE POLICY "Merchants can view their reward logs" ON scan_rewards_log
    FOR SELECT USING (
        commercant_id IN (
            SELECT id FROM commercants WHERE user_id = auth.uid()
        )
    );

-- =============================================
-- 8. Exécution initiale
-- =============================================

-- Générer les QR codes pour les entités existantes
SELECT update_qr_codes();

-- =============================================
-- 9. Vues utiles pour le frontend
-- =============================================

-- Vue pour les statistiques de scan par client
CREATE OR REPLACE VIEW client_scan_stats AS
SELECT 
    c.id as client_id,
    c.user_id,
    c.client_points,
    COUNT(sl.id) as total_scans,
    SUM(sl.points) as total_points_earned,
    COUNT(st.id) as total_tickets_received,
    MAX(sl.created_at) as last_scan_date
FROM clients c
LEFT JOIN scan_logs sl ON c.id = sl.client_id
LEFT JOIN scratch_tickets st ON c.id = st.client_id
GROUP BY c.id, c.user_id, c.client_points;

-- Vue pour les statistiques de scan par commerçant
CREATE OR REPLACE VIEW merchant_scan_stats AS
SELECT 
    m.id as commercant_id,
    m.user_id,
    COUNT(sl.id) as total_scans_given,
    COUNT(DISTINCT sl.client_id) as unique_clients_scanned,
    SUM(sl.points) as total_points_given,
    MAX(sl.created_at) as last_scan_date
FROM commercants m
LEFT JOIN scan_logs sl ON m.id = sl.commercant_id
GROUP BY m.id, m.user_id;

-- =============================================
-- COMMENTAIRES FINAUX
-- =============================================

COMMENT ON FUNCTION handle_scan_rewards() IS 'Fonction trigger qui gère les récompenses automatiques lors des scans QR';
COMMENT ON FUNCTION generate_qr_code_url(TEXT, UUID) IS 'Génère l''URL du QR code pour une entité donnée';
COMMENT ON FUNCTION update_qr_codes() IS 'Met à jour tous les QR codes manquants';
COMMENT ON TABLE scan_rewards_log IS 'Log des récompenses attribuées lors des scans QR';
COMMENT ON VIEW client_scan_stats IS 'Statistiques de scan pour les clients';
COMMENT ON VIEW merchant_scan_stats IS 'Statistiques de scan pour les commerçants';
