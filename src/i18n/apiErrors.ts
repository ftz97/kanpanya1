import { createAsyncT, type Locale } from "@/i18n";

export async function apiErrorToMessage(locale: Locale, code?: string) {
  if (!code) return "";
  const { t } = await createAsyncT(locale, ["common"]);
  const key = `common.api.errors.${code}`;
  const msg = t(key);
  return msg.startsWith("[missing]") ? code : msg;
}


