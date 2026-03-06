<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <div style="padding: 16px; max-width: 420px">
    <h1 v-if="title">{{ title }}</h1>
    <slot name="title" />

    <div
      style="display: flex; flex-direction: column; gap: 10px; margin: 12px 0"
    >
      <slot />
    </div>

    <div style="display: flex; gap: 10px; align-items: center">
      <slot name="actions" />
    </div>
  </div>
</template>
