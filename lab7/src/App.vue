<script setup>
import { computed, ref } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import { filterTodos, getActiveCount } from "./utils/todo";

const todos = ref([]);
const newTodo = ref("");
const filter = ref("all");

const addTodo = () => {
  if (!newTodo.value.trim()) return;

  todos.value.push({
    id: Date.now(),
    title: newTodo.value.trim(),
    done: false,
  });

  newTodo.value = "";
};

const toggleTodo = (id) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};

const filteredTodos = computed(() => filterTodos(todos.value, filter.value));
const activeCount = computed(() => getActiveCount(todos.value));
</script>

<template>
  <main>
    <h1>Todo</h1>

    <TodoInput v-model="newTodo" @submit="addTodo" />

    <div>
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'active'">Active</button>
      <button @click="filter = 'done'">Done</button>
    </div>

    <p>Active: {{ activeCount }}</p>

    <TodoList
      :todos="filteredTodos"
      @toggle="toggleTodo"
      @remove="removeTodo"
    />
  </main>
</template>
