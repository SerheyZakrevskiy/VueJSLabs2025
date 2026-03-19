<script setup>
import TodoItem from "./TodoItem.vue";

defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["toggle", "remove"]);
</script>

<template>
  <ul>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
</template>
