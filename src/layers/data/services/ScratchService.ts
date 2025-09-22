"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ScratchResult, ApiResponse } from '../types';

export class ScratchService {
  private supabase = createClientComponentClient();

  async saveScratchResult(result: Omit<ScratchResult, 'id' | 'playedAt'>): Promise<ApiResponse<ScratchResult>> {
    try {
      const { data, error } = await this.supabase
        .from('scratch_results')
        .insert({
          ...result,
          playedAt: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erreur inconnue', 
        loading: false 
      };
    }
  }

  async getScratchStats(userId: string): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await this.supabase
        .from('scratch_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erreur inconnue', 
        loading: false 
      };
    }
  }

  async getScratchHistory(userId: string, limit = 10): Promise<ApiResponse<ScratchResult[]>> {
    try {
      const { data, error } = await this.supabase
        .from('scratch_results')
        .select('*')
        .eq('user_id', userId)
        .order('played_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data: data || [], error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erreur inconnue', 
        loading: false 
      };
    }
  }

  async getGlobalStats(): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await this.supabase
        .from('admin_scratch_stats')
        .select('*');

      if (error) throw error;

      return { data: data || [], error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Erreur inconnue', 
        loading: false 
      };
    }
  }
}
