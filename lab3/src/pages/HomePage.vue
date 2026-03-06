<template>
  <section class="home">
    <div class="hero">
      <h1>Latest news</h1>
      <p>
        Read the latest articles about Vue, frontend development, and modern web
        technologies.
      </p>
    </div>

    <AdSlot
      title="Frontend Mastery Course"
      description="Improve your Vue and TypeScript skills with a practical frontend course."
      link="https://vuejs.org/"
    />

    <div class="news-list">
      <NewsCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import NewsCard from "../components/NewsCard.vue";
import AdSlot from "../components/AdSlot.vue";
import { articles } from "../data/articles";
</script>

<style scoped>
.home {
  display: grid;
  gap: 24px;
}

.hero {
  padding: 24px;
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.hero h1 {
  margin: 0 0 12px;
  font-size: 40px;
}

.hero p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 900px) {
  .news-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .news-list {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 32px;
  }
}
</style>
