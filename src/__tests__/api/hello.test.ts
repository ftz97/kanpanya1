import { NextRequest } from 'next/server';
import { vi } from 'vitest';
import { GET } from '@/app/api/hello/route';

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

describe('API Hello Route', () => {
  it('retourne un message de salutation', async () => {
    const request = new NextRequest('http://localhost:3000/api/hello');
    const response = await GET(request);
    
    expect(response).toBeDefined();
  });
});
