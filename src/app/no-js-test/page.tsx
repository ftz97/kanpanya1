export default function NoJsTestPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🧪 Test Sans JavaScript</h1>
      
      <div style={{ backgroundColor: "#e8f5e8", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
        <h3>✅ Cette page fonctionne sans JavaScript</h3>
        <p>Si vous voyez cette page, le serveur Next.js fonctionne correctement.</p>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <h3>🔗 Test des Liens :</h3>
        
        <a 
          href="/dashboard" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#17BFA0", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🏠 Dashboard Principal
        </a>
        
        <a 
          href="/dashboard-simple" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🏠 Dashboard Simple
        </a>
        
        <a 
          href="/reward" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#FF9800", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🎁 Récompenses
        </a>
        
        <a 
          href="/merchant" 
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
          🏪 Commerçants
        </a>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <h3>📱 Test QR Codes :</h3>
        
        <a 
          href="/profile/qr?client=test-client-123" 
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
          📱 QR Code Client
        </a>
        
        <a 
          href="/profile/qr?merchant=test-merchant-456" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#E91E63", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🏪 QR Code Commerçant
        </a>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <h3>🔍 Test Scanner :</h3>
        
        <a 
          href="/scan?merchant=test-merchant-123" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#607D8B", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🔍 Scanner Commerçant
        </a>
        
        <a 
          href="/scan?client=test-client-456" 
          style={{ 
            display: "inline-block", 
            padding: "15px 30px", 
            backgroundColor: "#795548", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            margin: "10px",
            fontSize: "16px"
          }}
        >
          🔍 Scanner Client
        </a>
      </div>
      
      <div style={{ backgroundColor: "#fff3cd", padding: "15px", borderRadius: "5px", marginTop: "20px" }}>
        <h3>📋 Instructions de Test :</h3>
        <ol style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>Cliquez sur chaque lien coloré ci-dessus</li>
          <li>Vérifiez que la navigation fonctionne</li>
          <li>Si un lien ne fonctionne pas, notez lequel</li>
          <li>Testez sur différents navigateurs si possible</li>
        </ol>
        
        <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
          <strong>🎯 Objectif :</strong> Identifier si le problème vient du JavaScript ou de la navigation de base.
        </div>
      </div>
    </div>
  );
}
