<script setup lang="ts">
import Card from "primevue/card";

const problems = [
  "Задачи теряются между чатами, таблицами и почтой",
  "Команда не видит общий статус проекта в реальном времени",
  "Руководителю сложно контролировать дедлайны и загрузку",
  "Отчётность собирается вручную и отнимает время",
];
</script>

<template>
  <section class="problem-solution">
    <div class="container problem-solution__grid">
      <div class="problem-solution__left">
        <span class="section-label">Проблема и решение</span>
        <h2 class="section-title">
          Почему командам трудно держать процессы под контролем
        </h2>
        <p class="section-text">
          Когда задачи, коммуникация и статусы разбросаны по разным
          инструментам, команда начинает терять скорость, прозрачность и
          предсказуемость.
        </p>

        <div class="problem-list">
          <div
            v-for="problem in problems"
            :key="problem"
            class="problem-list__item"
          >
            <i class="pi pi-times-circle"></i>
            <span>{{ problem }}</span>
          </div>
        </div>
      </div>

      <Card class="solution-card">
        <template #title>
          <div class="solution-card__title">
            <i class="pi pi-bolt"></i>
            <span>Как помогает TaskFlow</span>
          </div>
        </template>

        <template #content>
          <div class="solution-card__content">
            <p>
              TaskFlow объединяет задачи, команды, статусы и дедлайны в одном
              интерфейсе. Каждый участник видит свой объём работы, а менеджер —
              реальную картину по проекту без ручного контроля.
            </p>

            <div class="solution-points">
              <div class="solution-points__item">
                <i class="pi pi-check-circle"></i>
                <span>Единое пространство для задач и коммуникации</span>
              </div>
              <div class="solution-points__item">
                <i class="pi pi-check-circle"></i>
                <span>Прозрачный контроль прогресса и сроков</span>
              </div>
              <div class="solution-points__item">
                <i class="pi pi-check-circle"></i>
                <span>Быстрый доступ к аналитике и статусам</span>
              </div>
              <div class="solution-points__item">
                <i class="pi pi-check-circle"></i>
                <span>Меньше ручной рутины и меньше потерь задач</span>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.problem-solution {
  background: #ffffff;
}

.problem-solution__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: start;
}

.problem-solution__left {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-label {
  display: inline-flex;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0369a1;
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
  max-width: 720px;
}

.problem-list {
  display: grid;
  gap: 14px;
  margin-top: 8px;
}

.problem-list__item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #f8fafc;
}

.problem-list__item i {
  color: #ef4444;
  font-size: 18px;
  margin-top: 2px;
}

.problem-list__item span {
  color: #334155;
  line-height: 1.6;
}

.solution-card {
  border-radius: 24px;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
  color: #ffffff;
}

.solution-card :deep(.p-card-body) {
  padding: 28px;
}

.solution-card :deep(.p-card-title) {
  margin-bottom: 18px;
}

.solution-card__title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
}

.solution-card__title i {
  color: #34d399;
}

.solution-card__content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.solution-card__content p {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 16px;
}

.solution-points {
  display: grid;
  gap: 14px;
}

.solution-points__item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.solution-points__item i {
  color: #4ade80;
  margin-top: 2px;
}

.solution-points__item span {
  color: #e2e8f0;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .problem-solution__grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 32px;
  }
}
</style>
