<script setup lang="ts">
import ReportTable from "@/components/ReportTable.vue";

const reports = [
  { id: 101, title: "Login spike", severity: "low" as const },
  { id: 102, title: "Suspicious traffic", severity: "high" as const },
  { id: 103, title: "Rate limit triggered", severity: "medium" as const },
];
</script>

<template>
  <div>
    <h1>Reports</h1>

    <ReportTable :items="reports">
      <template #row="{ item }">
        <b>{{ item.title }}</b>
        <span> — severity: </span>
        <code>{{ item.severity }}</code>
      </template>
    </ReportTable>
  </div>
</template>
