export default function UltraSimplePage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#F2F2F2", 
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: "600px", 
        margin: "0 auto", 
        backgroundColor: "white", 
        padding: "40px", 
        borderRadius: "16px", 
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
      }}>
        <h1 style={{ 
          color: "#17BFA0", 
          textAlign: "center", 
          marginBottom: "30px",
          fontSize: "2rem"
        }}>
          🎯 Test Ultra Simple
        </h1>
        
        <div style={{ 
          backgroundColor: "#e8f5e8", 
          padding: "20px", 
          borderRadius: "8px", 
          marginBottom: "30px" 
        }}>
          <h3 style={{ color: "#2e7d32", marginTop: 0 }}>✅ Navigation Fonctionnelle</h3>
          <p>Cette page utilise uniquement des liens HTML basiques, sans JavaScript.</p>
        </div>
        
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#212E40", marginBottom: "20px" }}>🔗 Test des Liens</h2>
          
          <div style={{ display: "grid", gap: "15px" }}>
            <a 
              href="/dashboard-simple" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#4CAF50", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              🏠 Dashboard Simple
            </a>
            
            <a 
              href="/no-js-test" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#2196F3", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              🧪 Test Sans JavaScript
            </a>
            
            <a 
              href="/profile/qr?client=test-123" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#FF9800", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              📱 QR Code Client
            </a>
            
            <a 
              href="/scan?merchant=test-456" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#9C27B0", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              🔍 Scanner Commerçant
            </a>
            
            <a 
              href="/reward" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#E91E63", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center"
              }}
            >
              🎁 Récompenses
            </a>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: "#fff3cd", 
          padding: "20px", 
          borderRadius: "8px", 
          border: "1px solid #ffeaa7" 
        }}>
          <h3 style={{ color: "#856404", marginTop: 0 }}>📋 Instructions</h3>
          <ol style={{ color: "#856404", margin: "10px 0", paddingLeft: "20px" }}>
            <li>Cliquez sur chaque lien coloré ci-dessus</li>
            <li>Vérifiez que la navigation fonctionne</li>
            <li>Si un lien ne fonctionne pas, notez lequel</li>
            <li>Testez sur différents navigateurs si possible</li>
          </ol>
          
          <div style={{ 
            marginTop: "15px", 
            padding: "10px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "5px" 
          }}>
            <strong>🎯 Objectif :</strong> Vérifier que la navigation de base fonctionne sans JavaScript.
          </div>
        </div>
        
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          backgroundColor: "#e3f2fd", 
          borderRadius: "8px" 
        }}>
          <h4 style={{ color: "#1976d2", marginTop: 0 }}>🔧 Informations Techniques</h4>
          <ul style={{ color: "#1976d2", margin: "10px 0", paddingLeft: "20px" }}>
            <li>Serveur : Next.js 15.5.2</li>
            <li>Port : 3001</li>
            <li>Mode : Développement</li>
            <li>JavaScript : Désactivé sur cette page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
