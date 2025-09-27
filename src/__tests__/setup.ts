import { vi } from "vitest";

// -----------------------------
// 🌐 Mock global window / document
// -----------------------------
if (typeof window === "undefined") {
  // @ts-ignore
  global.window = {} as any;
}
// Ajout basique de matchMedia pour éviter les crashs (utile avec Tailwind/shadcn)
window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
}));

// -----------------------------
// 🗄️ Mock Supabase client
// -----------------------------
vi.mock("@supabase/supabase-js", () => {
  return {
    createClient: () => ({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: "123" } }, error: null }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ data: [], error: null }),
        insert: vi.fn().mockResolvedValue({ data: [], error: null }),
        update: vi.fn().mockResolvedValue({ data: [], error: null }),
        delete: vi.fn().mockResolvedValue({ data: [], error: null }),
      })),
      rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  };
});

// -----------------------------
// 🎨 Mock Canvas & 2D context
// -----------------------------
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
  getImageData: () => ({ data: [] }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  fill: () => {},
  measureText: () => ({ width: 0 }),
  transform: () => {},
  rect: () => {},
  clip: () => {},
});

// -----------------------------
// 🎉 Mock canvas-confetti
// -----------------------------
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

// -----------------------------
// 🌍 Mock environment variables
// -----------------------------
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// -----------------------------
// 🧹 Reset automatique des mocks
// -----------------------------
beforeEach(() => {
  vi.clearAllMocks();
});