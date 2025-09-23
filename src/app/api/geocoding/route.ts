import { NextRequest, NextResponse } from 'next/server';

// API Mapbox Geocoding pour recherche intelligente
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = searchParams.get('limit') || '10';
    const country = searchParams.get('country') || 'MQ'; // Martinique
    const types = searchParams.get('types') || 'place,locality,neighborhood,address,poi';

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Requête trop courte (minimum 2 caractères)'
      }, { status: 400 });
    }

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      throw new Error('Token Mapbox manquant');
    }

    // Construire l'URL Mapbox Geocoding - Recherche mondiale
    const mapboxUrl = new URL('https://api.mapbox.com/geocoding/v5/mapbox.places');
    mapboxUrl.pathname += `/${encodeURIComponent(query)}.json`;
    mapboxUrl.searchParams.set('access_token', mapboxToken);
    mapboxUrl.searchParams.set('types', types);
    mapboxUrl.searchParams.set('limit', limit);
    mapboxUrl.searchParams.set('language', 'fr');
    mapboxUrl.searchParams.set('autocomplete', 'true');
    mapboxUrl.searchParams.set('fuzzyMatch', 'true');

    const response = await fetch(mapboxUrl.toString());

    if (!response.ok) {
      throw new Error(`Erreur Mapbox: ${response.status}`);
    }

    const data = await response.json();

    // Transformer les résultats Mapbox en format standardisé
    const results = data.features.map((feature: unknown) => {
      // Déterminer le type basé sur les propriétés Mapbox
      let itemType = 'lieu';
      const placeType = feature.place_type?.[0];
      
      if (placeType === 'place' && feature.properties?.category === 'place') {
        itemType = 'commune';
      } else if (placeType === 'locality') {
        itemType = 'quartier';
      } else if (placeType === 'address') {
        itemType = 'rue';
      } else if (placeType === 'poi') {
        itemType = 'lieu';
      } else if (placeType === 'neighborhood') {
        itemType = 'quartier';
      }

      // Extraire les informations d'adresse
      const context = feature.context || [];
      const city = context.find((c: unknown) => c.id.startsWith('place.'))?.text || 
                   context.find((c: unknown) => c.id.startsWith('locality.'))?.text;
      const region = context.find((c: unknown) => c.id.startsWith('region.'))?.text;
      const country = context.find((c: unknown) => c.id.startsWith('country.'))?.text;

      return {
        id: feature.id,
        name: feature.text,
        type: itemType,
        coordinates: feature.center,
        address: feature.place_name,
        // Informations structurées
        address_details: {
          city: city,
          region: region,
          country: country,
          postcode: feature.properties?.address
        },
      // Propriétés Mapbox
      relevance: feature.relevance,
      category: feature.properties?.category,
      maki: feature.properties?.maki, // Icône
      // Informations additionnelles
      bbox: feature.bbox,
      place_type: feature.place_type,
      // Score de pertinence
      score: feature.relevance * 100,
      // Indicateur de localisation
      is_martinique: feature.context?.some((c: unknown) => c.id.startsWith('country.') && c.text === 'Martinique') || false
      };
    });

    return NextResponse.json({
      success: true,
      results: results,
      total: results.length,
      query: query,
      attribution: '© Mapbox © OpenStreetMap',
      // Métadonnées
      metadata: {
        source: 'mapbox',
        search_scope: 'worldwide',
        types: types,
        language: 'fr'
      }
    });

  } catch (error) {
    console.error('Erreur geocoding:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la recherche géographique',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// API pour suggestions rapides (autocomplete)
export async function POST(request: NextRequest) {
  try {
    const { query, limit = 5 } = await request.json();

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Requête trop courte'
      }, { status: 400 });
    }

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      throw new Error('Token Mapbox manquant');
    }

    // Recherche rapide avec autocomplete
    const mapboxUrl = new URL('https://api.mapbox.com/geocoding/v5/mapbox.places');
    mapboxUrl.pathname += `/${encodeURIComponent(query)}.json`;
    mapboxUrl.searchParams.set('access_token', mapboxToken);
    mapboxUrl.searchParams.set('country', 'MQ');
    mapboxUrl.searchParams.set('types', 'place,locality,neighborhood,address');
    mapboxUrl.searchParams.set('limit', limit.toString());
    mapboxUrl.searchParams.set('language', 'fr');
    mapboxUrl.searchParams.set('autocomplete', 'true');
    mapboxUrl.searchParams.set('fuzzyMatch', 'true');

    const response = await fetch(mapboxUrl.toString());

    if (!response.ok) {
      throw new Error(`Erreur Mapbox: ${response.status}`);
    }

    const data = await response.json();

    const suggestions = data.features.map((feature: unknown) => ({
      id: feature.id,
      name: feature.text,
      type: feature.place_type?.[0] || 'lieu',
      coordinates: feature.center,
      address: feature.place_name,
      relevance: feature.relevance,
      score: feature.relevance * 100
    }));

    return NextResponse.json({
      success: true,
      suggestions: suggestions
    });

  } catch (error) {
    console.error('Erreur suggestions:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des suggestions'
    }, { status: 500 });
  }
}
