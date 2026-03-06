<script setup lang="ts">
const props = defineProps<{ id: string }>();
</script>

<template>
  <div>
    <h1>User details</h1>
    <p>
      User ID from route: <b>{{ props.id }}</b>
    </p>
    <RouterLink to="/admin/users">Back to users</RouterLink>
  </div>
</template>
