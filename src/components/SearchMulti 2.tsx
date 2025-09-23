"use client";

import { useState, useEffect } from "react";
import Select from "react-select";

type AreaOption = {
  value: string;
  label: string;
  type: "ville" | "quartier" | "rue";
  coordinates?: [number, number];
};

interface SearchMultiProps {
  onChange: (areas: AreaOption[]) => void;
}

// Données réelles de la Martinique et du monde
const options: AreaOption[] = [
  // Martinique
  { value: "fort-de-france", label: "Fort-de-France", type: "ville", coordinates: [-61.0742, 14.6036] },
  { value: "le-lamentin", label: "Le Lamentin", type: "ville", coordinates: [-61.0014, 14.6089] },
  { value: "schoelcher", label: "Schoelcher", type: "ville", coordinates: [-61.0889, 14.6167] },
  { value: "saint-pierre", label: "Saint-Pierre", type: "ville", coordinates: [-61.1750, 14.7417] },
  { value: "sainte-marie", label: "Sainte-Marie", type: "ville", coordinates: [-60.9917, 14.7917] },
  { value: "le-marin", label: "Le Marin", type: "ville", coordinates: [-60.8667, 14.4667] },
  { value: "rue-victor-hugo", label: "Rue Victor Hugo (Fort-de-France)", type: "rue", coordinates: [-61.0742, 14.6036] },
  { value: "rue-de-la-republique", label: "Rue de la République (Fort-de-France)", type: "rue", coordinates: [-61.0750, 14.6040] },
  { value: "centre-ville-fdf", label: "Centre-ville Fort-de-France", type: "quartier", coordinates: [-61.0742, 14.6036] },
  { value: "terres-sainville", label: "Terres-Sainville", type: "quartier", coordinates: [-61.0700, 14.6100] },
  
  // Guadeloupe
  { value: "pointe-a-pitre", label: "Pointe-à-Pitre", type: "ville", coordinates: [-61.5314, 16.2412] },
  { value: "basse-terre", label: "Basse-Terre", type: "ville", coordinates: [-61.7308, 15.9981] },
  { value: "les-abymes", label: "Les Abymes", type: "ville", coordinates: [-61.5056, 16.2725] },
  { value: "rue-frebault", label: "Rue Frébault (Pointe-à-Pitre)", type: "rue", coordinates: [-61.5314, 16.2412] },
  
  // France métropolitaine
  { value: "paris", label: "Paris", type: "ville", coordinates: [2.3522, 48.8566] },
  { value: "lyon", label: "Lyon", type: "ville", coordinates: [4.8357, 45.7640] },
  { value: "marseille", label: "Marseille", type: "ville", coordinates: [5.3698, 43.2965] },
  
  // International
  { value: "london", label: "London", type: "ville", coordinates: [-0.1276, 51.5074] },
  { value: "new-york", label: "New York", type: "ville", coordinates: [-74.0060, 40.7128] },
  { value: "tokyo", label: "Tokyo", type: "ville", coordinates: [139.6917, 35.6895] },
];

export default function SearchMulti({ onChange }: SearchMultiProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<AreaOption[]>(options);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      // Recherche locale d'abord
      const localFiltered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Recherche API Mapbox en arrière-plan
      const searchAPI = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/geocoding?q=${encodeURIComponent(searchTerm)}&limit=5`);
          const data = await response.json();
          
          if (data.success && data.results.length > 0) {
            const apiOptions = data.results.map((result: any) => ({
              value: result.id,
              label: result.name,
              type: result.type as "ville" | "quartier" | "rue",
              coordinates: result.coordinates
            }));
            
            // Combiner les résultats locaux et API
            const combinedResults = [...localFiltered, ...apiOptions];
            const uniqueResults = combinedResults.filter((item, index, self) => 
              index === self.findIndex(t => t.value === item.value)
            );
            
            setFilteredOptions(uniqueResults);
          } else {
            setFilteredOptions(localFiltered);
          }
        } catch (error) {
          console.error('Erreur recherche API:', error);
          setFilteredOptions(localFiltered);
        } finally {
          setIsLoading(false);
        }
      };

      const timeoutId = setTimeout(searchAPI, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '48px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#3b82f6',
      borderRadius: '6px',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'white',
      fontWeight: '500',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: '#1d4ed8',
        color: 'white',
      },
    }),
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🏙️ Sélectionnez des zones à comparer
        </label>
        <Select
          isMulti
          options={filteredOptions}
          placeholder="Rechercher une ville, un quartier, une rue..."
          className="text-black"
          styles={customStyles}
          onChange={(selected) => onChange(selected as AreaOption[])}
          onInputChange={setSearchTerm}
          isLoading={isLoading}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {option.type === 'ville' ? '🏛️' : option.type === 'quartier' ? '🏘️' : '🛣️'}
              </span>
              <span>{option.label}</span>
              <span className="text-xs text-gray-500">
                ({option.type})
              </span>
              {option.coordinates && (
                <span className="text-xs text-blue-500 ml-auto">
                  📍 {option.coordinates[1].toFixed(2)}, {option.coordinates[0].toFixed(2)}
                </span>
              )}
            </div>
          )}
          noOptionsMessage={() => "Aucun résultat trouvé"}
          loadingMessage={() => "Recherche en cours..."}
        />
      </div>
      
      <div className="text-sm text-gray-600">
        💡 Vous pouvez sélectionner jusqu'à 4 zones pour la comparaison
      </div>
    </div>
  );
}
