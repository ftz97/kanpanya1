"use client";

import { useState } from "react";
import SearchValidate, { AreaOption } from "@/components/SearchValidate";
import ComparisonChart from "@/components/ComparisonChart";

export default function ComparaisonPage() {
  const [validatedAreas, setValidatedAreas] = useState<AreaOption[]>([]);
  const [savedAreas, setSavedAreas] = useState<AreaOption[]>([]);

  const handleValidate = (areas: AreaOption[]) => {
    console.log('handleValidate appelé avec:', areas);
    // éviter doublons - ajouter seulement les nouvelles zones
    const newAreas = areas.filter(area => !validatedAreas.find((a) => a.value === area.value));
    if (newAreas.length > 0) {
      console.log('Ajout des nouvelles zones:', newAreas.map(a => a.label));
      setValidatedAreas([...validatedAreas, ...newAreas]);
      console.log('Zones validées:', [...validatedAreas, ...newAreas]);
    } else {
      console.log('Toutes les zones sont déjà présentes');
    }
  };

  const handleSave = (areas: AreaOption[]) => {
    console.log('handleSave appelé avec:', areas);
    // éviter doublons - ajouter seulement les nouvelles zones
    const newAreas = areas.filter(area => !savedAreas.find((a) => a.value === area.value));
    if (newAreas.length > 0) {
      console.log('Enregistrement des nouvelles zones:', newAreas.map(a => a.label));
      setSavedAreas([...savedAreas, ...newAreas]);
      console.log('Zones enregistrées:', [...savedAreas, ...newAreas]);
    } else {
      console.log('Toutes les zones sont déjà enregistrées');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Comparaison des zones</h1>

      {/* Barre recherche + boutons valider/enregistrer */}
      <SearchValidate onValidate={handleValidate} onSave={handleSave} />

      {/* Debug: Zones validées */}
      {validatedAreas.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Zones validées ({validatedAreas.length}):</h3>
          <ul className="space-y-1">
            {validatedAreas.map((area, index) => (
              <li key={area.value} className="text-sm text-green-700">
                {index + 1}. {area.label} ({area.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Debug: Zones enregistrées */}
      {savedAreas.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Zones enregistrées ({savedAreas.length}):</h3>
          <ul className="space-y-1">
            {savedAreas.map((area, index) => (
              <li key={area.value} className="text-sm text-blue-700">
                {index + 1}. {area.label} ({area.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Graphe + explication */}
      {validatedAreas.length > 0 ? (
        <ComparisonChart validatedAreas={validatedAreas} />
      ) : (
        <p className="text-gray-500">Validez une première adresse pour commencer</p>
      )}
    </div>
  );
}
