<template>
  <article :class="$style.card">
    <img :src="article.image" :alt="article.title" :class="$style.image" />

    <div :class="$style.body">
      <div :class="$style.meta">
        <span>{{ article.category }}</span>
        <span>{{ article.date }}</span>
      </div>

      <h2 :class="$style.title">{{ article.title }}</h2>
      <p :class="$style.excerpt">{{ article.excerpt }}</p>

      <RouterLink :to="`/article/${article.id}`" :class="$style.link">
        Read more
      </RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Article } from "../data/articles";

defineProps<{
  article: Article;
}>();
</script>

<style module src="../styles/NewsCard.module.css"></style>
