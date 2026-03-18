<template>
  <div class="min-h-screen bg-slate-950 text-white flex flex-col">
    <header class="border-b border-white/10 bg-slate-900/80">
      <UContainer class="flex items-center justify-between py-4">
        <NuxtLink to="/" class="text-xl font-bold">Nuxt Course Blog</NuxtLink>

        <nav class="flex gap-4">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </nav>
      </UContainer>
    </header>

    <main class="flex-1">
      <UContainer class="py-8">
        <slot />
      </UContainer>
    </main>

    <footer class="border-t border-white/10 bg-slate-900/80">
      <UContainer class="py-4 text-sm text-white/70">
        Nuxt Course Blog - Lab 6
      </UContainer>
    </footer>
  </div>
</template>
