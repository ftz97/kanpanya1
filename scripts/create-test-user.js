import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yichatlcuqmquazlmxrv.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY est requise')
  console.log('💡 Ajoutez SUPABASE_SERVICE_ROLE_KEY dans votre .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  const email = 'moncompte.test@padavwa.com'
  const password = 'SuperMot2Passe!'

  try {
    console.log('🔐 Création de l\'utilisateur de test...')
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: 'Compte de Test E2E',
        role: 'test'
      }
    })

    if (error) {
      console.error('❌ Erreur lors de la création:', error.message)
      
      if (error.message.includes('already registered')) {
        console.log('ℹ️  L\'utilisateur existe déjà, tentative de connexion...')
        
        // Essayer de se connecter pour vérifier
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (signInError) {
          console.error('❌ Connexion échouée:', signInError.message)
          console.log('💡 Vérifiez que le mot de passe est correct')
        } else {
          console.log('✅ Connexion réussie avec l\'utilisateur existant')
          console.log('👤 ID:', signInData.user.id)
          console.log('📧 Email:', signInData.user.email)
        }
      }
      return
    }

    console.log('✅ Utilisateur créé avec succès!')
    console.log('👤 ID:', data.user.id)
    console.log('📧 Email:', data.user.email)
    console.log('🔑 Mot de passe:', password)
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error.message)
  }
}

createTestUser()
