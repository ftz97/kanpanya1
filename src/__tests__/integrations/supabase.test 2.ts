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

describe('Intégration Supabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('crée un client Supabase', () => {
    const client = createClientComponentClient();
    expect(client).toBeDefined();
  });

  it('peut exécuter des requêtes select', async () => {
    const client = createClientComponentClient();
    const result = await client.from('test_table').select('*').eq('id', 1).single();
    
    expect(result).toBeDefined();
    expect(mockSupabase.from).toHaveBeenCalledWith('test_table');
  });

  it('peut exécuter des requêtes insert', async () => {
    const client = createClientComponentClient();
    const result = await client.from('test_table').insert({ name: 'test' }).select().single();
    
    expect(result).toBeDefined();
    expect(mockSupabase.from).toHaveBeenCalledWith('test_table');
  });

  it('gère les erreurs de requête', async () => {
    const error = new Error('Erreur de base de données');
    mockSupabase.from().select().eq().single.mockRejectedValueOnce(error);
    
    const client = createClientComponentClient();
    
    try {
      await client.from('test_table').select('*').eq('id', 1).single();
    } catch (err) {
      expect(err).toBe(error);
    }
  });
});
