import { NextRequest, NextResponse } from 'next/server';

// API pour rechercher des données réelles via OpenStreetMap Nominatim
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const limit = searchParams.get('limit') || '10';

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Requête trop courte (minimum 2 caractères)'
      }, { status: 400 });
    }

    // Construire la requête Nominatim pour la Martinique
    const nominatimUrl = new URL('https://nominatim.openstreetmap.org/search');
    nominatimUrl.searchParams.set('q', `${query}, Martinique, France`);
    nominatimUrl.searchParams.set('format', 'json');
    nominatimUrl.searchParams.set('limit', limit);
    nominatimUrl.searchParams.set('addressdetails', '1');
    nominatimUrl.searchParams.set('extratags', '1');
    nominatimUrl.searchParams.set('namedetails', '1');
    nominatimUrl.searchParams.set('bounded', '1');
    nominatimUrl.searchParams.set('viewbox', '-61.2,14.3,-60.8,14.9'); // Bounding box Martinique
    nominatimUrl.searchParams.set('countrycodes', 'mq');

    const response = await fetch(nominatimUrl.toString(), {
      headers: {
        'User-Agent': 'Padavwa-Urban-Analysis/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur Nominatim: ${response.status}`);
    }

    const data = await response.json();

    // Transformer les données Nominatim en format standardisé
    const results = data.map((item: any) => {
      // Déterminer le type basé sur les données Nominatim
      let itemType = 'lieu';
      if (item.type === 'administrative' && item.address?.city) {
        itemType = 'commune';
      } else if (item.type === 'residential' || item.address?.suburb) {
        itemType = 'quartier';
      } else if (item.type === 'highway' || item.address?.road) {
        itemType = 'rue';
      } else if (item.type === 'tourism' || item.type === 'amenity') {
        itemType = 'lieu';
      }

      return {
        id: item.place_id.toString(),
        name: item.display_name.split(',')[0], // Premier élément du nom
        type: itemType,
        coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
        address: item.display_name,
        osm_type: item.type,
        importance: item.importance,
        class: item.class,
        // Informations additionnelles
        population: item.extratags?.population ? parseInt(item.extratags.population) : undefined,
        area: item.extratags?.area ? parseFloat(item.extratags.area) : undefined,
        website: item.extratags?.website,
        phone: item.extratags?.phone,
        opening_hours: item.extratags?.['opening_hours'],
        // Adresse structurée
        address_details: {
          city: item.address?.city || item.address?.town || item.address?.village,
          state: item.address?.state,
          country: item.address?.country,
          postcode: item.address?.postcode
        }
      };
    });

    // Filtrer par type si spécifié
    const filteredResults = type === 'all' 
      ? results 
      : results.filter(item => item.type === type);

    return NextResponse.json({
      success: true,
      results: filteredResults,
      total: filteredResults.length,
      query: query,
      type: type
    });

  } catch (error) {
    console.error('Erreur recherche:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la recherche',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// API pour récupérer des suggestions de recherche
export async function POST(request: NextRequest) {
  try {
    const { query, type } = await request.json();

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Requête trop courte'
      }, { status: 400 });
    }

    // Recherche avec des suggestions plus larges
    const nominatimUrl = new URL('https://nominatim.openstreetmap.org/search');
    nominatimUrl.searchParams.set('q', `${query}, Martinique`);
    nominatimUrl.searchParams.set('format', 'json');
    nominatimUrl.searchParams.set('limit', '5');
    nominatimUrl.searchParams.set('addressdetails', '1');
    nominatimUrl.searchParams.set('extratags', '1');
    nominatimUrl.searchParams.set('bounded', '1');
    nominatimUrl.searchParams.set('viewbox', '-61.2,14.3,-60.8,14.9');
    nominatimUrl.searchParams.set('countrycodes', 'mq');

    const response = await fetch(nominatimUrl.toString(), {
      headers: {
        'User-Agent': 'Padavwa-Urban-Analysis/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur Nominatim: ${response.status}`);
    }

    const data = await response.json();

    const suggestions = data.map((item: any) => ({
      id: item.place_id.toString(),
      name: item.display_name.split(',')[0],
      type: item.type,
      coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
      address: item.display_name
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
