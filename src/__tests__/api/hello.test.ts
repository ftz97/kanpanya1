import { NextRequest } from 'next/server';
import { GET } from '@/app/api/hello/route';

// Mock Next.js
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data) => ({
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
