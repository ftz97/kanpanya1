import { z } from "zod";
import type { Locale } from "@/i18n";
import { makeZodMessages } from "@/i18n/zodMessages";

export async function offerSchema(locale: Locale) {
  const M = await makeZodMessages(locale);

  return z.object({
    title: z.string().min(1, M.required()).min(3, M.minChars(3)).max(120, M.maxChars(120)),
    description: z.string().optional(),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date()
  }).refine((data) => data.ends_at > data.starts_at, {
    message: M.dateOrder(),
    path: ["ends_at"]
  });
}


