<script setup lang="ts">
const users = [
  { id: 1, name: "Alice", email: "alice@mail.local" },
  { id: 2, name: "Bob", email: "bob@mail.local" },
  { id: 3, name: "Charlie", email: "charlie@mail.local" },
];
</script>

<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="u in users" :key="u.id">
        <RouterLink :to="`/admin/users/${u.id}`"
          >{{ u.name }} ({{ u.email }})</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
