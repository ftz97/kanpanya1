-- Vues pour les statistiques d'administration des cartes à gratter

-- Vue globale des statistiques
CREATE OR REPLACE VIEW admin_scratch_stats AS
SELECT 
  sc.id,
  sc.badge,
  sc.sponsor_name,
  sc.skin,
  sc.gold_prizes,
  sc.gold_reward,
  sc.gold_chance,
  sc.created_at,
  sc.updated_at,
  
  -- Statistiques d'utilisation
  COALESCE(stats.total_plays, 0) as total_plays,
  COALESCE(stats.total_wins, 0) as total_wins,
  COALESCE(stats.total_lucky, 0) as total_lucky,
  COALESCE(stats.total_loses, 0) as total_loses,
  COALESCE(stats.total_jackpots, 0) as total_jackpots,
  
  -- Taux de réussite
  CASE 
    WHEN COALESCE(stats.total_plays, 0) > 0 
    THEN ROUND((COALESCE(stats.total_wins, 0) + COALESCE(stats.total_lucky, 0))::DECIMAL / stats.total_plays * 100, 2)
    ELSE 0 
  END as win_rate_percent,
  
  -- Taux de jackpot
  CASE 
    WHEN COALESCE(stats.total_plays, 0) > 0 
    THEN ROUND(COALESCE(stats.total_jackpots, 0)::DECIMAL / stats.total_plays * 100, 4)
    ELSE 0 
  END as jackpot_rate_percent,
  
  -- Jackpots restants
  COALESCE(sc.gold_prizes, 0) as remaining_jackpots,
  
  -- Statut de validité
  CASE 
    WHEN sc.valid_from > CURRENT_DATE THEN 'Pas encore actif'
    WHEN sc.valid_to < CURRENT_DATE THEN 'Expiré'
    ELSE 'Actif'
  END as status

FROM scratch_configs sc
LEFT JOIN (
  SELECT 
    config_id,
    COUNT(*) as total_plays,
    COUNT(*) FILTER (WHERE result->>'status' = 'win') as total_wins,
    COUNT(*) FILTER (WHERE result->>'status' = 'lucky') as total_lucky,
    COUNT(*) FILTER (WHERE result->>'status' = 'lose') as total_loses,
    COUNT(*) FILTER (WHERE result->>'status' = 'jackpot') as total_jackpots
  FROM scratch_ticket_logs
  GROUP BY config_id
) stats ON sc.id = stats.config_id
ORDER BY sc.created_at DESC;

-- Vue des statistiques du jour
CREATE OR REPLACE VIEW admin_scratch_stats_today AS
SELECT 
  sc.id,
  sc.badge,
  sc.sponsor_name,
  
  -- Statistiques du jour
  COALESCE(today_stats.plays_today, 0) as plays_today,
  COALESCE(today_stats.wins_today, 0) as wins_today,
  COALESCE(today_stats.lucky_today, 0) as lucky_today,
  COALESCE(today_stats.loses_today, 0) as loses_today,
  COALESCE(today_stats.jackpots_today, 0) as jackpots_today,
  
  -- Taux de réussite du jour
  CASE 
    WHEN COALESCE(today_stats.plays_today, 0) > 0 
    THEN ROUND((COALESCE(today_stats.wins_today, 0) + COALESCE(today_stats.lucky_today, 0))::DECIMAL / today_stats.plays_today * 100, 2)
    ELSE 0 
  END as win_rate_today_percent

FROM scratch_configs sc
LEFT JOIN (
  SELECT 
    config_id,
    COUNT(*) as plays_today,
    COUNT(*) FILTER (WHERE result->>'status' = 'win') as wins_today,
    COUNT(*) FILTER (WHERE result->>'status' = 'lucky') as lucky_today,
    COUNT(*) FILTER (WHERE result->>'status' = 'lose') as loses_today,
    COUNT(*) FILTER (WHERE result->>'status' = 'jackpot') as jackpots_today
  FROM scratch_ticket_logs
  WHERE DATE(created_at) = CURRENT_DATE
  GROUP BY config_id
) today_stats ON sc.id = today_stats.config_id
WHERE sc.valid_from <= CURRENT_DATE AND sc.valid_to >= CURRENT_DATE
ORDER BY plays_today DESC;

-- Vue des statistiques des 7 derniers jours
CREATE OR REPLACE VIEW admin_scratch_stats_week AS
SELECT 
  sc.id,
  sc.badge,
  sc.sponsor_name,
  
  -- Statistiques de la semaine
  COALESCE(week_stats.plays_week, 0) as plays_week,
  COALESCE(week_stats.wins_week, 0) as wins_week,
  COALESCE(week_stats.lucky_week, 0) as lucky_week,
  COALESCE(week_stats.loses_week, 0) as loses_week,
  COALESCE(week_stats.jackpots_week, 0) as jackpots_week,
  
  -- Taux de réussite de la semaine
  CASE 
    WHEN COALESCE(week_stats.plays_week, 0) > 0 
    THEN ROUND((COALESCE(week_stats.wins_week, 0) + COALESCE(week_stats.lucky_week, 0))::DECIMAL / week_stats.plays_week * 100, 2)
    ELSE 0 
  END as win_rate_week_percent,
  
  -- Moyenne par jour
  CASE 
    WHEN COALESCE(week_stats.plays_week, 0) > 0 
    THEN ROUND(week_stats.plays_week::DECIMAL / 7, 1)
    ELSE 0 
  END as avg_plays_per_day

FROM scratch_configs sc
LEFT JOIN (
  SELECT 
    config_id,
    COUNT(*) as plays_week,
    COUNT(*) FILTER (WHERE result->>'status' = 'win') as wins_week,
    COUNT(*) FILTER (WHERE result->>'status' = 'lucky') as lucky_week,
    COUNT(*) FILTER (WHERE result->>'status' = 'lose') as loses_week,
    COUNT(*) FILTER (WHERE result->>'status' = 'jackpot') as jackpots_week
  FROM scratch_ticket_logs
  WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  GROUP BY config_id
) week_stats ON sc.id = week_stats.config_id
WHERE sc.valid_from <= CURRENT_DATE AND sc.valid_to >= CURRENT_DATE
ORDER BY plays_week DESC;

-- Vue des statistiques globales du système
CREATE OR REPLACE VIEW admin_system_stats AS
SELECT 
  -- Statistiques globales
  (SELECT COUNT(*) FROM scratch_configs) as total_configs,
  (SELECT COUNT(*) FROM scratch_configs WHERE valid_from <= CURRENT_DATE AND valid_to >= CURRENT_DATE) as active_configs,
  (SELECT COUNT(*) FROM scratch_ticket_logs) as total_plays,
  (SELECT COUNT(*) FROM scratch_ticket_logs WHERE DATE(created_at) = CURRENT_DATE) as plays_today,
  (SELECT COUNT(*) FROM scratch_ticket_logs WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as plays_week,
  
  -- Statistiques de résultats
  (SELECT COUNT(*) FROM scratch_ticket_logs WHERE result->>'status' = 'win') as total_wins,
  (SELECT COUNT(*) FROM scratch_ticket_logs WHERE result->>'status' = 'lucky') as total_lucky,
  (SELECT COUNT(*) FROM scratch_ticket_logs WHERE result->>'status' = 'lose') as total_loses,
  (SELECT COUNT(*) FROM scratch_ticket_logs WHERE result->>'status' = 'jackpot') as total_jackpots,
  
  -- Taux globaux
  CASE 
    WHEN (SELECT COUNT(*) FROM scratch_ticket_logs) > 0 
    THEN ROUND(
      ((SELECT COUNT(*) FROM scratch_ticket_logs WHERE result->>'status' = 'win') + 
       (SELECT COUNT(*) FROM scratch_ticket_logs WHERE result->>'status' = 'lucky'))::DECIMAL / 
      (SELECT COUNT(*) FROM scratch_ticket_logs) * 100, 2)
    ELSE 0 
  END as global_win_rate_percent,
  
  -- Jackpots restants
  (SELECT COALESCE(SUM(gold_prizes), 0) FROM scratch_configs) as total_remaining_jackpots;

-- RLS pour les vues (lecture seule pour les admins)
-- Ces vues sont en lecture seule, donc pas besoin de RLS complexe
-- Mais on peut ajouter des politiques si nécessaire

-- Exemple d'utilisation des vues
-- SELECT * FROM admin_scratch_stats;
-- SELECT * FROM admin_scratch_stats_today;
-- SELECT * FROM admin_scratch_stats_week;
-- SELECT * FROM admin_system_stats;
