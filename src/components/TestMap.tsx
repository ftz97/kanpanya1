"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

