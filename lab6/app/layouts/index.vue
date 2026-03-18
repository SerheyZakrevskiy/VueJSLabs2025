<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Головна сторінка</h1>
    <p>Лабораторна робота на Nuxt 4.</p>

    <div class="flex gap-3">
      <UButton to="/blog">До блогу</UButton>
      <UButton to="/about" variant="soft">Про сайт</UButton>
    </div>
  </div>
</template>
