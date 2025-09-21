// fetch est natif dans Node.js 18+

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3002'
const email = process.env.E2E_TEST_EMAIL || 'test@example.com'
const password = process.env.E2E_TEST_PASSWORD || 'motdepassefort'

async function generateTokens() {
  console.log('🔐 Génération des tokens d\'authentification...')
  console.log(`📧 Email: ${email}`)
  console.log(`🌐 URL: ${BASE_URL}`)
  
  try {
    const res = await fetch(BASE_URL + '/api/test-tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ Impossible de récupérer les tokens:', errorText)
      console.error(`📊 Status: ${res.status}`)
      process.exit(1)
    }

    const json = await res.json()
    
    if (!json.ok) {
      console.error('❌ Authentification échouée:', json.error)
      console.error(`📊 Code: ${json.code}`)
      process.exit(1)
    }

    console.log('✅ Authentification réussie!')
    console.log('👤 Utilisateur:', json.user.email)
    console.log('🆔 ID:', json.user.id)
    console.log('🔑 Access Token:', json.access_token ? `${json.access_token.substring(0, 20)}...` : 'N/A')
    console.log('🔄 Refresh Token:', json.refresh_token ? `${json.refresh_token.substring(0, 20)}...` : 'N/A')
    console.log('⏰ Expire à:', json.expires_at ? new Date(json.expires_at * 1000).toISOString() : 'N/A')
    
    if (json.rls_test && json.rls_test.length > 0) {
      console.log('✅ Test RLS réussi:', json.rls_test.length, 'profil(s) trouvé(s)')
    } else {
      console.log('ℹ️  Test RLS: Aucun profil trouvé (normal si la table est vide)')
    }

    // Générer le fichier .env.e2e
    const env = `
E2E_BASE_URL=${BASE_URL}
E2E_SB_ACCESS_TOKEN=${json.access_token}
E2E_SB_REFRESH_TOKEN=${json.refresh_token}
`
    
    const fs = await import('fs')
    fs.writeFileSync('.env.e2e', env.trim() + '\n')
    console.log('📁 Fichier .env.e2e généré avec succès')

  } catch (error) {
    console.error('❌ Erreur inattendue:', error.message)
    process.exit(1)
  }
}

generateTokens()
