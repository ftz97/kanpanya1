"use client";
import useSWR from "swr";
import { type Locale } from "@/i18n";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useLocaleSWR() {
  const { data } = useSWR<{ locale: Locale }>("/api/i18n", fetcher);
  return data?.locale ?? "fr";
}


