<script setup lang="ts">
const model = defineModel<string>({ default: "" });

const props = defineProps<{
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}>();
</script>

<template>
  <label style="display: flex; flex-direction: column; gap: 6px">
    <span style="font-size: 14px; opacity: 0.85">{{ props.label }}</span>
    <input
      v-model="model"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      style="padding: 8px"
    />
    <span v-if="props.error" style="font-size: 12px">
      {{ props.error }}
    </span>
  </label>
</template>
