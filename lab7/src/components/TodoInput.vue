<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const onSubmit = () => {
  emit("submit");
};
</script>

<template>
  <div>
    <input
      :value="modelValue"
      type="text"
      placeholder="New todo"
      @input="onInput"
      @keyup.enter="onSubmit"
    />
    <button @click="onSubmit">Add</button>
  </div>
</template>
