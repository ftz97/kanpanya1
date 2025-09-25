"use client";

export default function SimpleTestPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Test Simple - Pas de JavaScript</h1>
      
      <div style={{ margin: "20px 0" }}>
        <a 
          href="/dashboard" 
          style={{ 
            display: "inline-block", 
            padding: "10px 20px", 
            backgroundColor: "#17BFA0", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "5px",
            margin: "5px"
          }}
        >
          Aller au Dashboard
        </a>
        
        <a 
          href="/reward" 
          style={{ 
            display: "inline-block", 
            padding: "10px 20px", 
            backgroundColor: "#17BFA0", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "5px",
            margin: "5px"
          }}
        >
          Aller aux Récompenses
        </a>
        
        <a 
          href="/merchant" 
          style={{ 
            display: "inline-block", 
            padding: "10px 20px", 
            backgroundColor: "#17BFA0", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "5px",
            margin: "5px"
          }}
        >
          Aller aux Commerçants
        </a>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <button 
          onClick={() => alert("Bouton fonctionne!")}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#ff6b6b", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            margin: "5px",
            cursor: "pointer"
          }}
        >
          Test Bouton JavaScript
        </button>
      </div>
      
      <div style={{ backgroundColor: "#f0f0f0", padding: "15px", borderRadius: "5px", marginTop: "20px" }}>
        <h3>Instructions :</h3>
        <p>1. Cliquez sur les liens colorés - ils doivent naviguer</p>
        <p>2. Cliquez sur le bouton rouge - il doit afficher une alerte</p>
        <p>3. Si rien ne fonctionne, le problème est plus profond</p>
      </div>
    </div>
  );
}
