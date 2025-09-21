"use client";

import { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";

const heatLayer = {
  id: "data",
  type: "fill" as const,
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "density"],
      0, "#FEE2E2",
      50, "#FDBA74",
      100, "#EF4444",
    ],
    "fill-opacity": 0.6,
  },
};

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { density: 80 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-61.55, 16.25],
            [-61.55, 16.30],
            [-61.50, 16.30],
            [-61.50, 16.25],
            [-61.55, 16.25],
          ],
        ],
      },
    },
  ],
};

export default function UniqueMap() {
  const [viewState, setViewState] = useState({
    longitude: -61.55,
    latitude: 16.25,
    zoom: 11,
  });

  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <Map
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <Source type="geojson" data={geojson}>
          <Layer {...heatLayer} />
        </Source>
      </Map>
    </div>
  );
}
