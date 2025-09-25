import { NextRequest } from 'next/server';
import { vi } from 'vitest';
import { GET } from '@/app/api/health/route';

// Mock Next.js
vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn((data) => ({
      json: () => Promise.resolve(data),
      status: 200,
    })),
  },
}));

describe('API Health Route', () => {
  it('retourne un statut de santé', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    const response = await GET(request);
    
    expect(response).toBeDefined();
  });
});
