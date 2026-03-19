<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["toggle", "remove"]);
</script>

<template>
  <li>
    <span :class="{ done: todo.done }" @click="emit('toggle', todo.id)">
      {{ todo.title }}
    </span>
    <button @click="emit('remove', todo.id)">Delete</button>
  </li>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
