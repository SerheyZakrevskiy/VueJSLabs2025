<template>
  <section class="ad-slot">
    <div class="ad-content">
      <p class="ad-label">Advertisement</p>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <button class="ad-button" type="button" @click="isModalOpen = true">
        Open offer
      </button>
    </div>

    <AdModal
      :is-open="isModalOpen"
      :title="title"
      :description="description"
      :link="link"
      @close="isModalOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdModal from "./AdModal.vue";

defineProps<{
  title: string;
  description: string;
  link: string;
}>();

const isModalOpen = ref(false);
</script>

<style scoped>
.ad-slot {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background: linear-gradient(
    135deg,
    var(--color-surface),
    var(--color-surface-soft)
  );
}

.ad-content h3 {
  margin: 0 0 10px;
}

.ad-content p {
  margin: 0 0 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.ad-label {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.ad-button {
  border: 0;
  border-radius: 10px;
  padding: 10px 16px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-weight: 600;
}
</style>
