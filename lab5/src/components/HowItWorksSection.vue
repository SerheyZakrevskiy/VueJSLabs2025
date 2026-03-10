<script setup lang="ts">
import Card from "primevue/card";

type Step = {
  number: string;
  title: string;
  text: string;
  icon: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Создайте рабочее пространство",
    text: "Настройте проект, добавьте команду и определите основные этапы работы.",
    icon: "pi pi-briefcase",
  },
  {
    number: "02",
    title: "Разбейте работу на задачи",
    text: "Создайте задачи, назначьте ответственных, установите приоритеты и дедлайны.",
    icon: "pi pi-list-check",
  },
  {
    number: "03",
    title: "Отслеживайте прогресс",
    text: "Команда обновляет статусы, а руководитель видит реальное состояние проекта.",
    icon: "pi pi-chart-bar",
  },
  {
    number: "04",
    title: "Анализируйте результаты",
    text: "Используйте данные по срокам и выполнению задач для оптимизации процессов.",
    icon: "pi pi-chart-line",
  },
];
</script>

<template>
  <section id="how-it-works" class="how-it-works">
    <div class="container">
      <div class="how-it-works__head">
        <span class="section-label">Как это работает</span>
        <h2 class="section-title">Простой цикл работы без лишней сложности</h2>
        <p class="section-text">
          TaskFlow помогает быстро организовать процесс: от постановки задач до
          контроля выполнения и анализа результата.
        </p>
      </div>

      <div class="steps-grid">
        <Card v-for="step in steps" :key="step.number" class="step-card">
          <template #content>
            <div class="step-card__content">
              <div class="step-card__top">
                <span class="step-card__number">{{ step.number }}</span>
                <div class="step-card__icon">
                  <i :class="step.icon"></i>
                </div>
              </div>

              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  background: #ffffff;
}

.how-it-works__head {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 32px;
}

.section-label {
  display: inline-flex;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  background: #ede9fe;
  color: #6d28d9;
  font-size: 14px;
  font-weight: 700;
}

.section-title {
  margin: 0;
  font-size: 40px;
  line-height: 1.15;
  color: #0f172a;
}

.section-text {
  margin: 0;
  font-size: 17px;
  line-height: 1.7;
  color: #475569;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.step-card {
  border-radius: 22px;
  height: 100%;
}

.step-card :deep(.p-card-body) {
  padding: 24px;
  height: 100%;
}

.step-card__content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
}

.step-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.step-card__number {
  font-size: 28px;
  font-weight: 800;
  color: #cbd5e1;
}

.step-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ede9fe;
  color: #7c3aed;
  font-size: 22px;
}

.step-card__content h3 {
  margin: 0;
  font-size: 22px;
  color: #0f172a;
  line-height: 1.3;
}

.step-card__content p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
  font-size: 15px;
}

@media (max-width: 1100px) {
  .steps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .section-title {
    font-size: 32px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
