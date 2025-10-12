"use client";

import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Commercant {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  adresse?: string;
  categorie?: string;
}

interface MapCommercantsProps {
  commercants: Commercant[];
  userPosition?: { lat: number; lon: number } | null;
}

export default function MapCommercants({ commercants, userPosition }: MapCommercantsProps) {
  const [popupInfo, setPopupInfo] = React.useState<Commercant | null>(null);

  // Position par défaut : Martinique
  const defaultLongitude = -61.55;
  const defaultLatitude = 16.25;

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: userPosition?.lon || defaultLongitude,
          latitude: userPosition?.lat || defaultLatitude,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {/* Marker utilisateur */}
        {userPosition && (
          <Marker 
            longitude={userPosition.lon} 
            latitude={userPosition.lat}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-blue-500 text-white rounded-full p-2 shadow-lg">
                <span className="text-sm font-bold">📍</span>
              </div>
            </div>
          </Marker>
        )}

        {/* Markers commerçants */}
        {commercants.map((c) => (
          <Marker 
            key={c.id} 
            longitude={c.longitude} 
            latitude={c.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(c);
            }}
          >
            <div className="cursor-pointer transform transition-transform hover:scale-110">
              <div className="bg-[#17BFA0] text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg border-2 border-white">
                {c.nom}
              </div>
            </div>
          </Marker>
        ))}

        {/* Popup au clic */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            className="custom-popup"
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-sm text-[#123456] mb-1">{popupInfo.nom}</h3>
              {popupInfo.adresse && (
                <p className="text-xs text-gray-600 mb-1">📍 {popupInfo.adresse}</p>
              )}
              {popupInfo.categorie && (
                <span className="inline-block bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-medium">
                  {popupInfo.categorie}
                </span>
              )}
              <button className="w-full mt-2 bg-[#17BFA0] text-white rounded-lg py-1.5 text-xs font-semibold hover:bg-[#14a58e] transition">
                Voir le profil
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

