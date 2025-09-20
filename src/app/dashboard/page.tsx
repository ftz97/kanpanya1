export default function Dashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb', fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>
        🎯 Dashboard Padavwa
      </h1>
      
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        padding: '30px', 
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: '15px', fontSize: '1.5rem' }}>✅ Application Fonctionnelle</h2>
        <p style={{ color: '#1e3a8a', fontSize: '1.1rem' }}>
          Votre tableau de bord d'analyse des données commerciales est opérationnel
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '25px', 
          borderRadius: '12px',
          border: '2px solid #16a34a'
        }}>
          <h3 style={{ color: '#166534', marginBottom: '15px', fontSize: '1.3rem' }}>📊 Statistiques</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>1,247</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Scans</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>89</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Réductions</div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#fef3c7', 
          padding: '25px', 
          borderRadius: '12px',
          border: '2px solid #f59e0b'
        }}>
          <h3 style={{ color: '#92400e', marginBottom: '15px', fontSize: '1.3rem' }}>🎲 Activités</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9333ea' }}>12</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Jeux actifs</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea580c' }}>47</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Commerces</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '25px', 
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#374151', marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>
          🔗 Pages Disponibles
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '15px' 
        }}>
          <a 
            href="/admin/recommandations" 
            style={{ 
              padding: '20px', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              display: 'block',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            📊 Admin/Recommandations
            <div style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '5px' }}>
              Tableau de bord principal
            </div>
          </a>
          
          <a 
            href="/test-dashboard" 
            style={{ 
              padding: '20px', 
              backgroundColor: '#10b981', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              display: 'block',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            🎯 Test Dashboard
            <div style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '5px' }}>
              Page de test avec graphiques
            </div>
          </a>
          
          <a 
            href="/test-simple-working" 
            style={{ 
              padding: '20px', 
              backgroundColor: '#8b5cf6', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              display: 'block',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            ✅ Test Simple
            <div style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '5px' }}>
              Page de test basique
            </div>
          </a>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#ecfdf5', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #10b981'
      }}>
        <h3 style={{ color: '#065f46', marginBottom: '10px' }}>🚀 Status de l'Application</h3>
        <div style={{ color: '#047857' }}>
          <p>✅ Serveur Next.js opérationnel</p>
          <p>✅ Interface utilisateur fonctionnelle</p>
          <p>✅ Graphiques et visualisations disponibles</p>
          <p>✅ Accès réseau configuré</p>
        </div>
      </div>
    </div>
  );
}