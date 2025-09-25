export default function HomePage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#F2F2F2", 
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: "800px", 
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
          fontSize: "2.5rem"
        }}>
          🎯 Kanpanya - Test de Navigation
        </h1>
        
        <div style={{ 
          backgroundColor: "#e8f5e8", 
          padding: "20px", 
          borderRadius: "8px", 
          marginBottom: "30px" 
        }}>
          <h3 style={{ color: "#2e7d32", marginTop: 0 }}>✅ Serveur Fonctionnel</h3>
          <p>Si vous voyez cette page, votre serveur Next.js fonctionne correctement sur le port 3001.</p>
        </div>
        
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#212E40", marginBottom: "20px" }}>🧪 Pages de Test</h2>
          
          <div style={{ display: "grid", gap: "15px" }}>
            <a 
              href="/ultra-simple" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#4CAF50", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🧪 Test Ultra Simple (Recommandé)
            </a>
            
            <a 
              href="/no-js-test" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#2E7D32", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🧪 Test Sans JavaScript
            </a>
            
            <a 
              href="/dashboard-simple" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#2196F3", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🏠 Dashboard Simplifié
            </a>
            
            <a 
              href="/simple-test" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#FF9800", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🔧 Test Simple avec JavaScript
            </a>
            
            <a 
              href="/debug" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#9C27B0", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🔍 Page de Debug
            </a>
            
            <a 
              href="/demo-simple" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#FF5722", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🎯 Nouveaux Composants Simples
            </a>
            
            <a 
              href="/test-clicks" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#E91E63", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🖱️ Test de Clics (Debug)
            </a>
          </div>
        </div>
        
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#212E40", marginBottom: "20px" }}>📱 Pages Principales</h2>
          
          <div style={{ display: "grid", gap: "15px" }}>
            <a 
              href="/dashboard" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#17BFA0", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🏠 Dashboard Principal
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
                fontWeight: "500"
              }}
            >
              🎁 Récompenses
            </a>
            
            <a 
              href="/merchant" 
              style={{ 
                display: "block", 
                padding: "20px", 
                backgroundColor: "#607D8B", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              🏪 Espace Commerçant
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
            <li><strong>Commencez par</strong> : <code>/ultra-simple</code> (test ultra simple)</li>
            <li><strong>Si ça fonctionne</strong> : Testez les autres pages</li>
            <li><strong>Si ça ne fonctionne pas</strong> : Problème de navigation de base</li>
            <li><strong>Signalez</strong> : Quelles pages fonctionnent ou ne fonctionnent pas</li>
          </ol>
        </div>
      </div>
    </div>
  );
}