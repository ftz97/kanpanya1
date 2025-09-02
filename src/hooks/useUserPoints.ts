'use client';
import { useCallback, useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export function useUserPoints() {
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase] = useState(() => createBrowserSupabase());

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.rpc('get_my_points');
      if (error) {
        console.error('[get_my_points]', error);
        setPoints(0);
      } else {
        setPoints(data || 0);
      }
    } catch (err) {
      console.error('[refresh points]', err);
      setPoints(0);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { points, isLoading, refresh };
}
