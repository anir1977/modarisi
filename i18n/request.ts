import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export type Locale = "fr" | "ar";

export const locales: Locale[] = ["fr", "ar"];
export const defaultLocale: Locale = "fr";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const raw = cookieStore.get("locale")?.value ?? defaultLocale;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
