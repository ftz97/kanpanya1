import fs from 'fs'

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3001'

async function main() {
  const email = process.env.E2E_TEST_EMAIL || 'test@example.com'
  const password = process.env.E2E_TEST_PASSWORD || 'motdepassefort'

  const res = await fetch(BASE_URL + '/api/test-tokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    console.error('❌ Impossible de récupérer les tokens:', await res.text())
    process.exit(1)
  }

  const json = await res.json()
  if (!json.ok) {
    console.error('❌ Auth échouée:', json.error)
    process.exit(1)
  }

  const env = `
E2E_BASE_URL=${BASE_URL}
E2E_SB_ACCESS_TOKEN=${json.access_token}
E2E_SB_REFRESH_TOKEN=${json.refresh_token}
`
  fs.writeFileSync('.env.e2e', env.trim() + '\n')
  console.log('✅ .env.e2e généré avec succès')
}

main()
