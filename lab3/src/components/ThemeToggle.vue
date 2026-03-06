<template>
  <button class="theme-toggle" type="button" @click="toggleTheme">
    {{ theme === "light" ? "Dark mode" : "Light mode" }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "../composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  border: 1px solid #d1d5db;
  background: transparent;
  color: var(--color-text);
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.theme-toggle:hover {
  background: var(--color-surface-soft);
}
</style>
