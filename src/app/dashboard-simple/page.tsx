export default function DashboardSimplePage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#F2F2F2", 
      fontFamily: "Arial, sans-serif" 
    }}>
      {/* Header simple */}
      <div style={{ 
        backgroundColor: "white", 
        padding: "20px", 
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <h1 style={{ color: "#17BFA0", margin: 0 }}>Kanpanya</h1>
          <div>
            <a 
              href="/reward" 
              style={{ 
                margin: "0 10px", 
                color: "#17BFA0", 
                textDecoration: "none" 
              }}
            >
              Récompenses
            </a>
            <a 
              href="/merchant" 
              style={{ 
                margin: "0 10px", 
                color: "#17BFA0", 
                textDecoration: "none" 
              }}
            >
              Commerçants
            </a>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "40px 20px" 
      }}>
        <h2 style={{ color: "#212E40", marginBottom: "20px" }}>
          🏠 Dashboard Simple
        </h2>
        
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Version simplifiée pour tester la navigation
        </p>

        {/* Cartes d'action */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "20px", 
          marginBottom: "40px" 
        }}>
          {/* Carte QR Code */}
          <div style={{ 
            backgroundColor: "white", 
            padding: "30px", 
            borderRadius: "16px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}>
            <h3 style={{ color: "#212E40", marginBottom: "10px" }}>
              📱 Mon QR Code
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Montrez ce code aux commerçants pour gagner des points
            </p>
            <a 
              href="/profile/qr?client=test-client-id" 
              style={{ 
                display: "inline-block", 
                padding: "12px 24px", 
                backgroundColor: "#17BFA0", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Voir mon QR Code
            </a>
          </div>

          {/* Carte Récompenses */}
          <div style={{ 
            backgroundColor: "white", 
            padding: "30px", 
            borderRadius: "16px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}>
            <h3 style={{ color: "#212E40", marginBottom: "10px" }}>
              🎁 Mes Récompenses
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Consultez vos points et tickets gagnés
            </p>
            <a 
              href="/reward" 
              style={{ 
                display: "inline-block", 
                padding: "12px 24px", 
                backgroundColor: "#17BFA0", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Voir mes récompenses
            </a>
          </div>

          {/* Carte Scanner */}
          <div style={{ 
            backgroundColor: "white", 
            padding: "30px", 
            borderRadius: "16px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}>
            <h3 style={{ color: "#212E40", marginBottom: "10px" }}>
              🔍 Scanner QR Code
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Scannez les QR codes des commerçants
            </p>
            <a 
              href="/scan" 
              style={{ 
                display: "inline-block", 
                padding: "12px 24px", 
                backgroundColor: "#17BFA0", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Ouvrir le scanner
            </a>
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ 
          backgroundColor: "white", 
          padding: "30px", 
          borderRadius: "16px", 
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
        }}>
          <h3 style={{ color: "#212E40", marginBottom: "20px" }}>
            🚀 Actions Rapides
          </h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <a 
              href="/debug" 
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#ff6b6b", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "6px",
                fontSize: "14px"
              }}
            >
              🔍 Page Debug
            </a>
            <a 
              href="/simple-test" 
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#4ecdc4", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "6px",
                fontSize: "14px"
              }}
            >
              🧪 Test Simple
            </a>
            <a 
              href="/test-clicks" 
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#45b7d1", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "6px",
                fontSize: "14px"
              }}
            >
              🖱️ Test Clics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}