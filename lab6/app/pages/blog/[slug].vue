<script setup lang="ts">
import type { Post } from "~~/types/post";

const route = useRoute();

const {
  data: post,
  pending,
  error,
} = await useFetch<Post>(() => `/api/posts/${route.params.slug}`);

useSeoMeta({
  title: () => post.value?.title ?? "Post",
  description: () => post.value?.excerpt ?? "Blog post",
  ogTitle: () => post.value?.title ?? "Post",
  ogDescription: () => post.value?.excerpt ?? "Blog post",
});
</script>

<template>
  <div class="space-y-4">
    <div v-if="pending">
      <UAlert title="Завантаження..." color="primary" variant="soft" />
    </div>

    <div v-else-if="error">
      <UAlert
        title="Помилка завантаження статті"
        color="error"
        variant="soft"
      />
    </div>

    <div v-else-if="post">
      <h1 class="text-3xl font-bold">{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <UButton to="/blog" variant="soft">Назад до блогу</UButton>
    </div>
  </div>
</template>
