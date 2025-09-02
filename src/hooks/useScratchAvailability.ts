'use client';
import { useCallback, useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export type ScratchReward =
  | { type: 'points'; amount: number; label?: string }
  | { type: 'coupon'; label: string; code?: string };

export type ScratchState = {
  available: boolean;
  used: boolean;
  reward?: ScratchReward;
  ticketId?: string;
};

function mapReward(row: any): ScratchReward | undefined {
  if (!row) return undefined;
  if (row.reward_type === 'points') return { type: 'points', amount: row.reward_amount ?? 0, label: row.reward_label ?? undefined };
  if (row.reward_type === 'coupon') return { type: 'coupon', label: row.reward_label ?? 'Coupon' };
}

export function useScratchAvailability(){
  const [state, setState] = useState<ScratchState>({ available: false, used: true });
  const [supabase] = useState(() => createBrowserSupabase());

  const refresh = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('get_pending_scratch');
      if (error) { 
        console.error('[get_pending_scratch]', error); 
        setState({ available: false, used: true }); 
        return; 
      }
      if (data) {
        setState({ available: true, used: false, reward: mapReward(data), ticketId: data.id });
      } else {
        setState({ available: false, used: true });
      }
    } catch (err) {
      console.error('[refresh]', err);
      setState({ available: false, used: true });
    }
  }, [supabase]);

  useEffect(() => { 
    refresh(); 
  }, [refresh]);

  const activate = useCallback(async (opts: { quizId: string; points?: number; label?: string }) => {
    try {
      const { data, error } = await supabase.rpc('grant_scratch_after_quiz', {
        p_quiz_id: opts.quizId,
        p_points: opts.points ?? 50,
        p_label: opts.label ?? `+${opts.points ?? 50} points`
      });
      if (error) { 
        console.error('[grant_scratch_after_quiz]', error); 
        return; 
      }
      if (data) {
        setState({ available: true, used: false, reward: mapReward(data), ticketId: data.id });
      }
    } catch (err) {
      console.error('[activate]', err);
    }
  }, [supabase]);

  const markUsed = useCallback(async () => {
    if (!state.ticketId) return;
    try {
      const { data, error } = await supabase.rpc('reveal_scratch', { p_ticket_id: state.ticketId });
      if (error) { 
        console.error('[reveal_scratch]', error); 
        return; 
      }
      setState({ available: false, used: true, reward: mapReward(data), ticketId: data?.id });
    } catch (err) {
      console.error('[markUsed]', err);
    }
  }, [state.ticketId, supabase]);

  const clear = useCallback(() => setState({ available: false, used: true }), []);

  return { state, activate, markUsed, clear, refresh };
}
