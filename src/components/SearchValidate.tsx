"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronsUpDown, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export type AreaOption = {
  value: string;
  label: string;
  type: "ville" | "quartier" | "rue";
  parent?: string;
  coordinates?: [number, number];
};

const typeIcons: Record<AreaOption["type"], string> = {
  ville: "🏛️",
  quartier: "🏘️",
  rue: "🛣️",
};

// 📌 Options locales
const localOptions: AreaOption[] = [
  { value: "fort-de-france", label: "Fort-de-France", type: "ville" },
  { value: "schoelcher", label: "Schoelcher", type: "ville" },
  { value: "rue-victor-hugo", label: "Rue Victor Hugo", type: "rue", parent: "Fort-de-France" },
  { value: "centre-ville-fdf", label: "Centre-ville", type: "quartier", parent: "Fort-de-France" },
  { value: "pointe-a-pitre", label: "Pointe-à-Pitre", type: "ville" },
  { value: "rue-frebault", label: "Rue Frébault", type: "rue", parent: "Pointe-à-Pitre" },
  { value: "paris", label: "Paris", type: "ville" },
  { value: "lyon", label: "Lyon", type: "ville" },
  { value: "marseille", label: "Marseille", type: "ville" },
];

interface SearchValidateProps {
  onValidate: (areas: AreaOption[]) => void;
  onSave?: (areas: AreaOption[]) => void;
}

export default function SearchValidate({
  onValidate,
  onSave,
}: SearchValidateProps) {
  const [selected, setSelected] = useState<AreaOption[]>([]);
  const [saved, setSaved] = useState<AreaOption[]>([]);
  const [open, setOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AreaOption[]>(localOptions);
  const [loading, setLoading] = useState(false);

  // ✅ Cache mémoire + localStorage
  const cache = useRef<Record<string, AreaOption[]>>({});

  // Charger cache depuis localStorage au montage
  useEffect(() => {
    const storedCache = localStorage.getItem("searchCache");
    if (storedCache) {
      cache.current = JSON.parse(storedCache);
    }
  }, []);

  // Sauvegarder cache dès qu'il est modifié
  const updateCache = (key: string, value: AreaOption[]) => {
    cache.current[key] = value;
    localStorage.setItem("searchCache", JSON.stringify(cache.current));
  };

  // ✅ Persistance des zones enregistrées
  useEffect(() => {
    const stored = localStorage.getItem("savedAreas");
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedAreas", JSON.stringify(saved));
  }, [saved]);

  // ✅ Recherche hybride (locale + Mapbox avec cache persistant)
  useEffect(() => {
    if (!query) {
      setResults(localOptions);
      return;
    }

    const timer = setTimeout(async () => {
      // Vérifie si déjà en cache
      if (cache.current[query]) {
        setResults(cache.current[query]);
        return;
      }

      // 1️⃣ Recherche locale
      const localMatches = localOptions.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.type.toLowerCase().includes(query.toLowerCase()) ||
          (o.parent && o.parent.toLowerCase().includes(query.toLowerCase()))
      );

      if (localMatches.length > 0) {
        setResults(localMatches);
        updateCache(query, localMatches); // 🔥 enregistre en cache persistant
        return;
      }

      // 2️⃣ Sinon → fallback Mapbox
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=5&language=fr&country=FR,GP,MQ`
        );
        const data = await res.json();

        const mapboxResults: AreaOption[] = data.features.map((f: any) => {
          const placeType = f.place_type[0];
          let type: AreaOption["type"] = "ville";
          if (placeType === "neighborhood") type = "quartier";
          if (placeType === "address" || placeType === "street") type = "rue";

          return {
            value: f.id,
            label: f.text_fr || f.text,
            type,
            parent: f.context?.[0]?.text_fr || f.place_name?.split(",")[1],
            coordinates: f.center,
          };
        });

        setResults(mapboxResults);
        updateCache(query, mapboxResults); // 🔥 enregistre en cache persistant
      } catch (err) {
        console.error("Erreur Mapbox:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  const toggleSelection = (option: AreaOption) => {
    if (selected.find((s) => s.value === option.value)) {
      setSelected((prev) => prev.filter((s) => s.value !== option.value));
    } else {
      setSelected((prev) => [...prev, option]);
    }
  };

  const handleValidate = () => {
    if (selected.length > 0) onValidate(selected);
  };

  const handleSave = () => {
    if (selected.length > 0) {
      const newSaved = [...saved];
      selected.forEach((s) => {
        if (!newSaved.find((item) => item.value === s.value)) newSaved.push(s);
      });
      setSaved(newSaved);
      if (onSave) onSave(selected);
    }
  };

  const handleRemoveSaved = (value: string) => {
    setSaved((prev) => prev.filter((s) => s.value !== value));
  };

  const handleClearAll = () => {
    setSaved([]);
    setShowConfirmModal(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {/* Combobox ShadCN */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected.length > 0
              ? `${selected.length} zone(s) sélectionnée(s)`
              : "Rechercher une ville, un quartier ou une rue..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Tapez pour rechercher..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {loading && (
                <div className="flex items-center justify-center py-3 text-sm text-gray-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Recherche en cours...
                </div>
              )}
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup heading="Résultats">
                {results.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggleSelection(option)}
                  >
                    <span className="mr-2">{typeIcons[option.type]}</span>
                    {option.label}
                    {option.parent && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({option.parent})
                      </span>
                    )}
                    {selected.find((s) => s.value === option.value) && (
                      <Check className="ml-auto h-4 w-4 text-green-600" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleValidate}
          disabled={selected.length === 0}
          variant={selected.length > 0 ? "default" : "secondary"}
        >
          Valider ({selected.length})
        </Button>
        <Button
          onClick={handleSave}
          disabled={selected.length === 0}
          variant={selected.length > 0 ? "outline" : "secondary"}
        >
          Enregistrer
        </Button>
      </div>

      {/* Badges sélectionnés */}
      {selected.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {selected.map((s) => (
            <Badge key={s.value} variant="secondary" className="flex items-center gap-1">
              {typeIcons[s.type]} {s.label}
              {s.parent && <span className="ml-1 text-xs">({s.parent})</span>}
            </Badge>
          ))}
        </div>
      )}

      {/* Zones enregistrées */}
      {saved.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Zones enregistrées :
            </h3>
            {/* Dialog ShadCN */}
            <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={saved.length <= 1}
                >
                  ❌ Tout effacer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir{" "}
                    <span className="font-semibold text-red-600">
                      tout effacer
                    </span>{" "}
                    ? Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleClearAll}>
                    Oui, tout effacer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Badges enregistrés */}
          <div className="flex gap-2 flex-wrap">
            {saved.map((s) => (
              <Badge
                key={s.value}
                variant="outline"
                className="flex items-center gap-1 px-2 py-1"
              >
                {typeIcons[s.type]} {s.label}
                {s.parent && <span className="ml-1 text-xs">({s.parent})</span>}
                <button
                  onClick={() => handleRemoveSaved(s.value)}
                  className="ml-1 rounded-full hover:bg-red-100 p-1"
                  aria-label={`Supprimer ${s.label}`}
                  type="button"
                >
                  <X className="h-3 w-3 text-red-600" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}