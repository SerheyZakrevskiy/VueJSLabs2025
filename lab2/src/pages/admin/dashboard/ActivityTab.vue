<script setup lang="ts">
import { ref } from "vue";
const text = ref("");
</script>

<template>
  <div>
    <h2>Activity</h2>
    <input v-model="text" placeholder="type something" />
    <p>Typed: {{ text }}</p>
  </div>
</template>
