"use client";

import { useEffect } from "react";

export default function DebugPage() {
  useEffect(() => {
    console.log("🔍 Page Debug chargée");
    
    // Test des fonctions de base
    try {
      console.log("✅ JavaScript fonctionne");
      console.log("✅ React fonctionne");
      console.log("✅ useEffect fonctionne");
    } catch (error) {
      console.error("❌ Erreur JavaScript:", error);
    }
  }, []);

  const handleClick = () => {
    console.log("🖱️ Bouton cliqué!");
    alert("Bouton fonctionne!");
  };

  const handleLinkClick = (url: string) => {
    console.log("🔗 Lien cliqué:", url);
    window.location.href = url;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🔍 Page de Debug</h1>
      
      <div style={{ backgroundColor: "#e8f5e8", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
        <h3>Instructions :</h3>
        <p>1. Ouvrez la console du navigateur (F12)</p>
        <p>2. Regardez les messages de debug</p>
        <p>3. Testez les boutons ci-dessous</p>
        <p>4. Signalez toute erreur dans la console</p>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <button 
          onClick={handleClick}
          style={{ 
            padding: "15px 30px", 
            backgroundColor: "#17BFA0", 
            color: "white", 
            border: "none", 
            borderRadius: "8px",
            margin: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🖱️ Test Bouton JavaScript
        </button>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <button 
          onClick={() => handleLinkClick("/dashboard")}
          style={{ 
            padding: "15px 30px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "8px",
            margin: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🏠 Aller au Dashboard
        </button>
        
        <button 
          onClick={() => handleLinkClick("/reward")}
          style={{ 
            padding: "15px 30px", 
            backgroundColor: "#FF9800", 
            color: "white", 
            border: "none", 
            borderRadius: "8px",
            margin: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🎁 Aller aux Récompenses
        </button>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <a 
          href="/dashboard" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#2196F3", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🔗 Lien Dashboard (href)
        </a>
        
        <a 
          href="/reward" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#9C27B0", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🔗 Lien Récompenses (href)
        </a>
      </div>
      
      <div style={{ backgroundColor: "#fff3cd", padding: "15px", borderRadius: "5px", marginTop: "20px" }}>
        <h3>🔍 Informations de Debug :</h3>
        <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'Serveur'}</p>
        <p><strong>URL actuelle:</strong> {typeof window !== 'undefined' ? window.location.href : 'Serveur'}</p>
        <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
