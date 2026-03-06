<script setup lang="ts">
import { computed, ref } from "vue";
import OverviewTab from "@/pages/admin/dashboard/OverviewTab.vue";
import ActivityTab from "@/pages/admin/dashboard/ActivityTab.vue";

type TabKey = "OverviewTab" | "ActivityTab";
const current = ref<TabKey>("OverviewTab");

const tabs = [
  { key: "OverviewTab" as const, title: "Overview", comp: OverviewTab },
  { key: "ActivityTab" as const, title: "Activity", comp: ActivityTab },
];

const include = computed(() => ["OverviewTab", "ActivityTab"]);
</script>

<template>
  <div>
    <h1>Dashboard</h1>

    <div style="display: flex; gap: 10px; margin: 12px 0">
      <button
        v-for="t in tabs"
        :key="t.key"
        @click="current = t.key"
        :style="{ fontWeight: current === t.key ? '700' : '400' }"
      >
        {{ t.title }}
      </button>
    </div>

    <KeepAlive :include="include" :max="2">
      <component
        :is="tabs.find((t) => t.key === current)?.comp"
        :key="current"
      />
    </KeepAlive>
  </div>
</template>
