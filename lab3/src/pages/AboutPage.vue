<template>
  <section class="about-page">
    <div class="about-card">
      <h1>About project</h1>
      <p>
        This project is a laboratory work built with Vue 3, Vue Router 4, and
        Vite. It demonstrates component styling, page transitions, CSS Modules,
        Teleport, and a theme switcher with localStorage.
      </p>
    </div>

    <AdSlot
      title="Vue Documentation"
      description="Explore official Vue documentation and best practices for component-based development."
      link="https://vuejs.org/guide/introduction.html"
    />
  </section>
</template>

<script setup lang="ts">
import AdSlot from "../components/AdSlot.vue";
</script>

<style scoped>
.about-page {
  display: grid;
  gap: 24px;
}

.about-card {
  padding: 24px;
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.about-card h1 {
  margin: 0 0 14px;
}

.about-card p {
  margin: 0;
  line-height: 1.7;
  color: var(--color-text-muted);
}
</style>
