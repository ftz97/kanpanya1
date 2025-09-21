"use client";

import { useEffect, useRef, useCallback } from "react";

export default function SankeyChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  
const stableForEach = useCallback(() => {
  forEach();
}, [forEach]);

const stableCreateElementNS = useCallback(() => {
  createElementNS();
}, [createElementNS]);

const stableSetAttribute = useCallback(() => {
  setAttribute();
}, [setAttribute]);

const stableToString = useCallback(() => {
  toString();
}, [toString]);
