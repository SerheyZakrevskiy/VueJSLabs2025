<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">Vue News</RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.header-inner {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
}

.nav-link.is-active {
  color: #111827;
}
</style>
