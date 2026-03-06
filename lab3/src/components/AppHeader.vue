<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">Vue News</RouterLink>

      <div class="header-actions">
        <nav class="nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </nav>

        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from "./ThemeToggle.vue";
</script>

<style scoped>
.header {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.header-inner {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
}

.nav-link.is-active {
  color: var(--color-text);
}

@media (max-width: 640px) {
  .header-inner {
    min-height: auto;
    padding: 12px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
