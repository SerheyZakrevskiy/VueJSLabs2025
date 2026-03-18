<script setup lang="ts">
import type { Post } from "~~/types/post";

const {
  data: posts,
  pending,
  error,
} = await useFetch<Post[]>("/api/posts", {
  default: () => [],
});

useSeoMeta({
  title: "Blog",
  description: "Список статей курсу Nuxt Course Blog",
  ogTitle: "Blog",
  ogDescription: "Список статей курсу Nuxt Course Blog",
});
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Blog</h1>

    <UAlert
      v-if="pending"
      title="Завантаження статей..."
      color="primary"
      variant="soft"
    />

    <UAlert
      v-else-if="error"
      title="Помилка завантаження статей"
      color="error"
      variant="soft"
    />

    <div v-else-if="posts.length" class="grid gap-4">
      <UCard v-for="post in posts" :key="post.id">
        <template #header>
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        </template>

        <p>{{ post.excerpt }}</p>

        <template #footer>
          <UButton :to="`/blog/${post.slug}`" variant="soft"
            >Читати далі</UButton
          >
        </template>
      </UCard>
    </div>

    <p v-else>Постів поки немає.</p>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Home",
  description: "Головна сторінка Nuxt Course Blog",
  ogTitle: "Home",
  ogDescription: "Головна сторінка Nuxt Course Blog",
});
</script>
