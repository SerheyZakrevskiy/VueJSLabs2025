import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    locale: "ua" as "ua" | "en",
  }),
  actions: {
    setLocale(lang: "ua" | "en") {
      this.locale = lang;
    },
  },
  persist: {
    key: "lab4-settings",
    pick: ["locale"],
  },
});
