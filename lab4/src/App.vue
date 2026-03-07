<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useSettingsStore } from "./stores/settings";
import { useI18n } from "vue-i18n";

const settingsStore = useSettingsStore();
const { t, locale } = useI18n();

const currentLocale = computed({
  get: () => settingsStore.locale,
  set: (value: "ua" | "en") => {
    settingsStore.setLocale(value);
    locale.value = value;
  },
});
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 24px">
    <header
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      "
    >
      <nav style="display: flex; gap: 16px">
        <RouterLink to="/products">{{ t("nav.products") }}</RouterLink>
        <RouterLink to="/cart">{{ t("nav.cart") }}</RouterLink>
        <RouterLink to="/profile">{{ t("nav.profile") }}</RouterLink>
      </nav>

      <div>
        <label for="locale-select">{{ t("common.language") }}: </label>
        <select id="locale-select" v-model="currentLocale">
          <option value="ua">UA</option>
          <option value="en">EN</option>
        </select>
      </div>
    </header>

    <RouterView />
  </div>
</template>
