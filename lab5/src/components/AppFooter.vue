<script setup lang="ts">
import { inject } from "vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import type { CopyToClipboardFn } from "../plugins/copyToClipboard";

const toast = useToast();
const copyToClipboard = inject<CopyToClipboardFn>("copyToClipboard");

async function handleCopyEmail() {
  if (!copyToClipboard) return;

  const ok = await copyToClipboard("hello@taskflow.app");

  if (ok) {
    toast.add({
      severity: "success",
      summary: "Скопировано",
      detail: "Email поддержки скопирован в буфер обмена",
      life: 2500,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Не удалось скопировать email",
      life: 2500,
    });
  }
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <h3>TaskFlow</h3>
        <p>
          Платформа для управления задачами, командами и сроками в одном месте.
        </p>
      </div>

      <nav class="footer__nav">
        <a href="#hero">Главная</a>
        <a href="#benefits">Преимущества</a>
        <a href="#pricing">Тарифы</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Контакты</a>
      </nav>

      <div class="footer__actions">
        <Button
          label="Скопировать email"
          icon="pi pi-copy"
          severity="secondary"
          outlined
          @click="handleCopyEmail"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f172a;
  color: #f8fafc;
  padding: 36px 24px;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 24px;
  align-items: center;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__brand h3 {
  margin: 0;
  font-size: 28px;
}

.footer__brand p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.7;
  max-width: 420px;
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.footer__nav a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__nav a:hover {
  color: #ffffff;
}

.footer__actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 980px) {
  .footer__inner {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .footer__actions {
    justify-content: flex-start;
  }
}
</style>
