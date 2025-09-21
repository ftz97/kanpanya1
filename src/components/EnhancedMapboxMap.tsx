"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function EnhancedMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const draw = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<unknown[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  
const stableIncludes = useCallback(() => {
  includes();
}, [includes]);

const stableSetError = useCallback(() => {
  setError();
}, [setError]);

const stableAll = useCallback(() => {
  all();
}, [all]);

const stableImport = useCallback(() => {
  // import function call
}, []);

const stableThen = useCallback(() => {
  then();
}, [then]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

const stableAddControl = useCallback(() => {
  addControl();
}, [addControl]);

const stableNavigationControl = useCallback(() => {
  NavigationControl();
}, [NavigationControl]);

const stableDefault = useCallback(() => {
  // default function call
}, []);

                    }
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
