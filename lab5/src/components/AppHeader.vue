<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <a href="#hero" class="header__logo">TaskFlow</a>

      <nav class="header__nav">
        <a href="#benefits">Преимущества</a>
        <a href="#how-it-works">Как это работает</a>
        <a href="#pricing">Тарифы</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Контакты</a>
      </nav>

      <a href="#pricing" class="header__cta">
        <Button label="Начать" rounded />
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(247, 248, 250, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
}

.header__inner {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.header__logo {
  text-decoration: none;
  color: #0f172a;
  font-size: 32px;
  font-weight: 800;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__nav a {
  text-decoration: none;
  color: #334155;
  font-weight: 500;
  transition: color 0.2s ease;
}

.header__nav a:hover {
  color: #2563eb;
}

.header__cta {
  text-decoration: none;
}

@media (max-width: 900px) {
  .header__nav {
    display: none;
  }

  .header__inner {
    justify-content: space-between;
  }

  .header__logo {
    font-size: 28px;
  }
}
</style>
