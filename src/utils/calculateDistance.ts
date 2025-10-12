/**
 * Calcule la distance entre deux points GPS en mètres
 * Utilise la formule de Haversine
 * 
 * @param pos1 - Premier point { lat, lon }
 * @param pos2 - Second point { lat, lon }
 * @returns Distance en mètres
 */
export function calculateDistance(
  pos1: { lat: number; lon: number },
  pos2: { lat: number; lon: number }
): number {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lon - pos1.lon) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en mètres
}

/**
 * Formate une distance en mètres en texte lisible
 * @param meters - Distance en mètres
 * @returns Texte formaté (ex: "350m" ou "1.2km")
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

