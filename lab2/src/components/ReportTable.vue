<script setup lang="ts">
type Report = {
  id: number;
  title: string;
  severity: "low" | "medium" | "high";
};
defineProps<{ items: Report[] }>();
</script>

<template>
  <table border="1" cellspacing="0" cellpadding="8">
    <thead>
      <tr>
        <th>ID</th>
        <th>Row (scoped slot)</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="r in items" :key="r.id">
        <td>{{ r.id }}</td>
        <td>
          <slot name="row" :item="r"> {{ r.title }} ({{ r.severity }}) </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
