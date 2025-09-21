// scripts/create-test-user.ts
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Charger les variables d'environnement depuis .env.local
function loadEnvFile() {
  try {
    const envPath = join(process.cwd(), '.env.local');
    const envContent = readFileSync(envPath, 'utf8');
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && !key.startsWith('#')) {
        const value = valueParts.join('=').trim();
        if (value) {
          process.env[key.trim()] = value;
        }
      }
    });
  } catch (error) {
    console.warn('⚠️  .env.local non trouvé, utilisation des variables système');
  }
}

loadEnvFile();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const email = process.env.E2E_TEST_EMAIL || 'test@example.com';
const password = process.env.E2E_TEST_PASSWORD || 'motdepassefort';

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  // idempotent: si l'utilisateur existe déjà, on ne plante pas
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listErr) throw listErr;
  const exists = list?.users?.some(u => u.email?.toLowerCase() === email.toLowerCase());
  if (exists) {
    console.log(`✅ User already exists: ${email}`);
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // évite le magic link
    user_metadata: { role: 'tester', created_by: 'script' },
  });
  if (error) throw error;

  console.log(`✅ Created test user: ${data.user?.email} (${data.user?.id})`);
}

main().catch(e => {
  console.error('❌ Error creating user:', e);
  process.exit(1);
});
