"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type AreaOption = {
  value: string;
  label: string;
  type: "adresse" | "quartier";
  coordinates: [number, number];
};

export default function CarteQuartierV2() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [zones, setZones] = useState<AreaOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Vérifier le token Mapbox
  
const stableSetMapError = useCallback(() => {
  setMapError();
}, [setMapError]);

const stableStartsWith = useCallback(() => {
  startsWith();
}, [startsWith]);
