<script setup lang="ts">
import { inject } from "vue";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import type { CopyToClipboardFn } from "../plugins/copyToClipboard";

const toast = useToast();
const copyToClipboard = inject<CopyToClipboardFn>("copyToClipboard");

async function handleCopyDemo() {
  if (!copyToClipboard) return;

  const ok = await copyToClipboard("demo@taskflow.app");

  if (ok) {
    toast.add({
      severity: "success",
      summary: "Скопировано",
      detail: "Demo email скопирован в буфер обмена",
      life: 2500,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Не удалось скопировать текст",
      life: 2500,
    });
  }
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="container hero__grid">
      <div class="hero__content">
        <Tag value="Smart workflow platform" severity="contrast" rounded />
        <h1 class="hero__title">
          Управляйте задачами, командой и сроками в одном месте
        </h1>
        <p class="hero__text">
          TaskFlow помогает компаниям планировать проекты, отслеживать прогресс
          и ускорять выполнение задач без хаоса в чатах и таблицах.
        </p>

        <div class="hero__actions">
          <a href="#pricing" class="hero__link">
            <Button label="Посмотреть тарифы" size="large" />
          </a>

          <Button
            label="Скопировать demo email"
            icon="pi pi-copy"
            severity="secondary"
            outlined
            size="large"
            @click="handleCopyDemo"
          />
        </div>

        <div class="hero__stats">
          <div class="hero__stat">
            <strong>10 000+</strong>
            <span>активных задач в системе</span>
          </div>
          <div class="hero__stat">
            <strong>250+</strong>
            <span>команд используют сервис</span>
          </div>
          <div class="hero__stat">
            <strong>99.9%</strong>
            <span>доступность платформы</span>
          </div>
        </div>
      </div>

      <Card class="hero__card">
        <template #title>Панель проекта</template>
        <template #content>
          <div class="hero-panel">
            <div class="hero-panel__item">
              <span>Backend API</span>
              <Tag value="In Progress" severity="warn" />
            </div>
            <div class="hero-panel__item">
              <span>UI Review</span>
              <Tag value="Done" severity="success" />
            </div>
            <div class="hero-panel__item">
              <span>Analytics</span>
              <Tag value="Planned" severity="info" />
            </div>

            <div class="hero-panel__footer">
              <div>
                <small>Спринт</small>
                <strong>Week 12</strong>
              </div>
              <div>
                <small>Команда</small>
                <strong>8 участников</strong>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  background:
    radial-gradient(
      circle at top left,
      rgba(59, 130, 246, 0.12),
      transparent 28%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(16, 185, 129, 0.12),
      transparent 30%
    );
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 40px;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero__title {
  margin: 0;
  font-size: 56px;
  line-height: 1.05;
  color: #0f172a;
  max-width: 760px;
}

.hero__text {
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: #475569;
  max-width: 640px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 8px;
}

.hero__link {
  text-decoration: none;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.hero__stat {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero__stat strong {
  font-size: 24px;
  color: #0f172a;
}

.hero__stat span {
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}

.hero__card {
  border-radius: 24px;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hero-panel__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
}

.hero-panel__footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding-top: 12px;
}

.hero-panel__footer div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-panel__footer small {
  color: #64748b;
}

.hero-panel__footer strong {
  color: #0f172a;
}

@media (max-width: 1000px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__title {
    font-size: 42px;
  }
}

@media (max-width: 700px) {
  .hero__title {
    font-size: 34px;
  }

  .hero__stats {
    grid-template-columns: 1fr;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
