export async function fetchJSON<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

// Types pour les offres flash
export type FlashOffer = {
  id: string;
  title: string;
  description?: string | null;
  price: number | null;
  starts_at: string; // ISO
  ends_at: string | null;   // ISO
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type CreateOfferInput = {
  title: string;
  description?: string | null;
  price: number | null;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
};

export type UpdateOfferInput = Partial<CreateOfferInput>;

// Types pour les réponses API
export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export type OffersListResponse = ApiResponse<{
  items: FlashOffer[];
  page: number;
  pageSize: number;
  total: number;
}>;

export type OfferResponse = ApiResponse<FlashOffer>;


