"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FiltresSegmentationProps {
  onFiltresChange: (filtres: unknown) => void;
}

export default function FiltresSegmentation({ onFiltresChange }: FiltresSegmentationProps) {
  const [filtres, setFiltres] = useState({
    professionnel: {
      structures: [] as string[],
      categories: [] as string[],
      quartiers: [] as string[]
    },
    collectivite: {
      quartiers: [] as string[],
      typesStructure: [] as string[],
      zones: [] as string[]
    }
  });

  // Données mock pour les options
  const optionsProfessionnel = {
    structures: [
      "Salon Élégance",
      "Salon Coiffure Moderne", 
      "Barbier du Centre",
      "Institut Beauté Plus",
      "Pizzeria Mario",
      "Restaurant Le Bistrot",
      "Café du Coin",
      "Boulangerie Artisanale",
      "Pharmacie Centrale",
      "Librairie Culture"
    ],
    categories: [
      "Coiffure & Beauté",
      "Restauration", 
      "Commerce de proximité",
      "Santé & Bien-être",
      "Culture & Loisirs"
    ],
    quartiers: [
      "Centre-ville",
      "Quartier Nord", 
      "Quartier Sud",
      "Zone Commerciale",
      "Résidentiel Est"
    ]
  };

  const optionsCollectivite = {
    quartiers: [
      "Centre-ville",
      "Quartier Nord",
      "Quartier Sud", 
      "Zone Industrielle",
      "Zone Résidentielle",
      "Périphérie"
    ],
    typesStructure: [
      "Mairie",
      "École primaire",
      "Collège",
      "Lycée",
      "Centre social",
      "Bibliothèque",
      "Salle des fêtes",
      "Complexe sportif"
    ],
    zones: [
      "Zone urbaine dense",
      "Zone résidentielle",
      "Zone commerciale",
      "Zone industrielle",
      "Zone rurale"
    ]
  };

  const handleCheckboxChange = (type: 'professionnel' | 'collectivite', field: string, value: string, checked: boolean) => {
    const newFiltres = { ...filtres };
    const currentValues = newFiltres[type][field as keyof typeof newFiltres[typeof type]] as string[];
    
    if (checked) {
      newFiltres[type][field as keyof typeof newFiltres[typeof type]] = [...currentValues, value] as unknown;
    } else {
      newFiltres[type][field as keyof typeof newFiltres[typeof type]] = currentValues.filter(v => v !== value) as unknown;
    }
    
    setFiltres(newFiltres);
    onFiltresChange(newFiltres);
  };

  const renderCheckboxGroup = (type: 'professionnel' | 'collectivite', field: string, options: string[], title: string) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${type}-${field}-${option}`}
              checked={filtres[type][field as keyof typeof filtres[typeof type]].includes(option)}
              onChange={(e) => 
                handleCheckboxChange(type, field, option, e.target.checked)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label 
              htmlFor={`${type}-${field}-${option}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🔍 Filtres de Segmentation</h3>
      
      <Tabs defaultValue="professionnel" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="professionnel">💼 Professionnel</TabsTrigger>
          <TabsTrigger value="collectivite">🏛️ Collectivité</TabsTrigger>
        </TabsList>

        <TabsContent value="professionnel">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderCheckboxGroup('professionnel', 'structures', optionsProfessionnel.structures, "🏪 Structures")}
            {renderCheckboxGroup('professionnel', 'categories', optionsProfessionnel.categories, "📂 Catégories")}
            {renderCheckboxGroup('professionnel', 'quartiers', optionsProfessionnel.quartiers, "📍 Quartiers")}
          </div>
        </TabsContent>

        <TabsContent value="collectivite">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderCheckboxGroup('collectivite', 'quartiers', optionsCollectivite.quartiers, "📍 Quartiers")}
            {renderCheckboxGroup('collectivite', 'typesStructure', optionsCollectivite.typesStructure, "🏢 Types de Structure")}
            {renderCheckboxGroup('collectivite', 'zones', optionsCollectivite.zones, "🗺️ Zones")}
          </div>
        </TabsContent>
      </Tabs>

      {/* Résumé des filtres actifs */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Filtres actifs :</h4>
        <div className="text-sm text-gray-600">
          {Object.entries(filtres).map(([type, values]) => 
            Object.entries(values).map(([field, selectedValues]) => 
              selectedValues.length > 0 && (
                <span key={`${type}-${field}`} className="inline-block mr-2 mb-1">
                  <span className="font-medium">{field}:</span> {selectedValues.join(', ')}
                </span>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
