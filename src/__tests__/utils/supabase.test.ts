import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Mock Supabase
const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(() => Promise.resolve({ data: null, error: null }))
      }))
    })),
    insert: jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() => Promise.resolve({ data: null, error: null }))
      }))
    }))
  }))
};

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => mockSupabase
}));

describe('Utilitaires Supabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('crée un client Supabase fonctionnel', () => {
    const client = createClientComponentClient();
    expect(client).toBeDefined();
    expect(typeof client.from).toBe('function');
  });

  it('peut exécuter des requêtes de base', async () => {
    const client = createClientComponentClient();
    
    // Test select
    const selectResult = await client.from('users').select('*').eq('id', 1).single();
    expect(selectResult).toBeDefined();
    
    // Test insert
    const insertResult = await client.from('users').insert({ name: 'test' }).select().single();
    expect(insertResult).toBeDefined();
  });

  it('gère les erreurs de requête', async () => {
    const error = new Error('Erreur de connexion');
    mockSupabase.from().select().eq().single.mockRejectedValueOnce(error);
    
    const client = createClientComponentClient();
    
    try {
      await client.from('users').select('*').eq('id', 1).single();
    } catch (err) {
      expect(err).toBe(error);
    }
  });
});
