"use client";
import { useState, useEffect, useCallback } from "react";

export default function LangToggle() {
  const [lang, setLang] = useState("fr");

useEffect(() => {
  stableGetItem();
  stableSetLang();
}, [stableGetItem, stableSetLang]);;

  const changeLang = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="flex gap-2">
      {["fr", "en", "gcf", "es"].map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-2 py-1 text-xs rounded ${
            lang === l ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
