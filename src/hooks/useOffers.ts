import { useCallback, useEffect, useState } from "react";
import { type FlashOffer } from "@/lib/fetcher";

type UseOffersState =
  | { data: FlashOffer[]; loading: false; error: null }
  | { data: null; loading: true; error: null }
  | { data: null; loading: false; error: Error };

export function useOffers(api = "/api/flash-offers") {
  const [state, setState] = useState<UseOffersState>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await fetch(api);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as FlashOffer[];
      setState({ data: json, loading: false, error: null });
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Unknown error");
      setState({ data: null, loading: false, error: err });
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    reload: load,
  };
}


