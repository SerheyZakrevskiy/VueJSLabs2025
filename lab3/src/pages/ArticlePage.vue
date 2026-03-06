<template>
  <section v-if="article" class="article-page">
    <article class="article-card">
      <img :src="article.image" :alt="article.title" class="article-image" />

      <div class="article-content">
        <div class="article-meta">
          <span>{{ article.category }}</span>
          <span>{{ article.date }}</span>
        </div>

        <h1>{{ article.title }}</h1>
        <p class="article-text">{{ article.content }}</p>

        <AdSlot
          title="Build better Vue apps"
          description="Learn how to structure Vue applications with reusable components and clean routing."
          link="https://router.vuejs.org/"
        />

        <RouterLink to="/" class="back-link">← Back to news</RouterLink>
      </div>
    </article>
  </section>

  <section v-else class="not-found">
    <h1>Article not found</h1>
    <p>The requested article does not exist.</p>
    <RouterLink to="/" class="back-link">← Back to home</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AdSlot from "../components/AdSlot.vue";
import { articles } from "../data/articles";

const route = useRoute();

const article = computed(() => {
  const id = Number(route.params.id);
  return articles.find((item) => item.id === id);
});
</script>

<style scoped>
.article-page {
  display: block;
}

.article-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
}

.article-image {
  display: block;
  width: 100%;
  height: 420px;
  object-fit: cover;
}

.article-content {
  padding: 24px;
}

.article-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.article-content h1 {
  margin: 0 0 16px;
  font-size: 36px;
  line-height: 1.2;
}

.article-text {
  margin: 0 0 20px;
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-primary);
}

.not-found {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.not-found h1 {
  margin: 0 0 12px;
}

.not-found p {
  margin: 0 0 16px;
  color: var(--color-text-muted);
}
</style>
