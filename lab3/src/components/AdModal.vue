<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="emit('close')">
        <div class="modal-content" @click.stop>
          <button class="close-button" type="button" @click="emit('close')">
            ×
          </button>

          <p class="modal-label">Advertisement</p>
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
          <a
            :href="link"
            target="_blank"
            rel="noopener noreferrer"
            class="modal-link"
          >
            Learn more
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
  description: string;
  link: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: min(520px, 100%);
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease;
}

.modal-label {
  margin: 0 0 8px;
  color: var(--color-text-muted);
  font-size: 14px;
}

.modal-content h2 {
  margin: 0 0 12px;
}

.modal-content p {
  margin: 0 0 18px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.modal-link {
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-primary);
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: var(--color-surface-soft);
  color: var(--color-text);
  cursor: pointer;
  font-size: 20px;
}
</style>
