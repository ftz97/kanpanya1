import { createAsyncT, type Locale } from "@/i18n";

export async function makeZodMessages(locale: Locale) {
  const { t, tn } = await createAsyncT(locale, ["common"]);
  return {
    required: () => t("common.forms.errors.required"),
    minChars: (n: number) => tn("common.forms.errors.minChars", n),
    maxChars: (n: number) => tn("common.forms.errors.maxChars", n),
    invalidEmail: () => t("common.forms.errors.invalidEmail"),
    dateOrder: () => t("common.forms.errors.dateOrder")
  };
}


