<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div>
    <h2>Overview</h2>
    <p>State test: {{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>
