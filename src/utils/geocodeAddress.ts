// utils/geocodeAddress.ts
export async function geocodeAddress(address: string) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  if (!token) {
    console.error("NEXT_PUBLIC_MAPBOX_TOKEN manquant");
    return null;
  }

  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`
    );
    
    if (!res.ok) {
      console.error("Erreur API Mapbox:", res.status);
      return null;
    }

    const data = await res.json();
    
    if (!data.features?.length) {
      console.warn("Aucune adresse trouvée pour:", address);
      return null;
    }

    const [lon, lat] = data.features[0].geometry.coordinates;
    return { lat, lon };
  } catch (error) {
    console.error("Erreur geocodeAddress:", error);
    return null;
  }
}

