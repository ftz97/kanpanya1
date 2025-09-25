"use client";

export default function SignupBasicPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f9ff', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#0f172a'
        }}>
          Créer un compte
        </h1>
        
        <form action="/api/signup" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              required
              style={{
                width: '100%',
                height: '3rem',
                padding: '0 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="Ton prénom"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Nom
            </label>
            <input
              type="text"
              name="nom"
              required
              style={{
                width: '100%',
                height: '3rem',
                padding: '0 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="Ton nom"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              style={{
                width: '100%',
                height: '3rem',
                padding: '0 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="ton@email.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              style={{
                width: '100%',
                height: '3rem',
                padding: '0 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="Minimum 6 caractères"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="acceptCGU"
              required
              style={{ width: '1rem', height: '1rem' }}
            />
            <label style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              J'accepte les conditions d'utilisation
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              height: '3.5rem',
              backgroundColor: '#14b8a6',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0d9488'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#14b8a6'}
          >
            Créer mon compte
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Tu as déjà un compte ?{' '}
            <a href="/login" style={{ color: '#14b8a6', fontWeight: '600' }}>
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
