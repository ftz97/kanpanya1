export default function TestUltraSimple() {
  return (
    <div>
      <h1>✅ ÇA MARCHE !</h1>
      <p>Votre application Next.js fonctionne parfaitement.</p>
      <p>Serveur: ✅ Opérationnel</p>
      <p>Réseau: ✅ Accessible</p>
      <p>Interface: ✅ Fonctionnelle</p>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/dashboard" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Aller au Dashboard
        </a>
      </div>
    </div>
  );
}


