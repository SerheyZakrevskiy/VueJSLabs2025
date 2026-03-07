import { createI18n } from "vue-i18n";
import type { Pinia } from "pinia";
import { useSettingsStore } from "./stores/settings";
import ua from "./locales/ua";
import en from "./locales/en";

export const i18n = createI18n({
  legacy: false,
  locale: "ua",
  fallbackLocale: "en",
  messages: {
    ua,
    en,
  },
  modifiers: {
    upper: (str) => String(str).toUpperCase(),
    lower: (str) => String(str).toLowerCase(),
    capitalize: (str) => {
      const value = String(str);
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    fancy: (str) => `✨ ${String(str)}`,
  },
});

export function syncLocaleWithSettings(pinia: Pinia) {
  const settingsStore = useSettingsStore(pinia);
  i18n.global.locale.value = settingsStore.locale;
}
