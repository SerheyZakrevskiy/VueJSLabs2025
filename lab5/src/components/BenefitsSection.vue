<script setup lang="ts">
import Card from "primevue/card";

type Benefit = {
  title: string;
  text: string;
  icon: string;
};

const benefits: Benefit[] = [
  {
    title: "Единая рабочая среда",
    text: "Все задачи, статусы и комментарии находятся в одном интерфейсе без разрозненных инструментов.",
    icon: "pi pi-box",
  },
  {
    title: "Контроль сроков",
    text: "Команда видит дедлайны, а руководитель быстро выявляет просрочки и узкие места.",
    icon: "pi pi-clock",
  },
  {
    title: "Прозрачность для команды",
    text: "Каждый участник понимает свой объём работы, приоритеты и текущую фазу проекта.",
    icon: "pi pi-users",
  },
  {
    title: "Быстрый запуск",
    text: "Интерфейс не перегружен, поэтому сотрудники быстрее адаптируются и начинают работать.",
    icon: "pi pi-bolt",
  },
  {
    title: "Гибкость процессов",
    text: "TaskFlow подходит как для небольших команд, так и для нескольких параллельных проектов.",
    icon: "pi pi-sitemap",
  },
  {
    title: "Меньше ручной рутины",
    text: "Меньше таблиц, меньше повторяющихся действий и меньше ручного сбора статусов.",
    icon: "pi pi-chart-line",
  },
];
</script>

<template>
  <section id="benefits" class="benefits">
    <div class="container">
      <div class="benefits__head">
        <span class="section-label">Преимущества</span>
        <h2 class="section-title">Почему команды выбирают TaskFlow</h2>
        <p class="section-text">
          Платформа закрывает базовые операционные проблемы управления проектами
          и делает процессы более предсказуемыми.
        </p>
      </div>

      <div class="benefits__grid">
        <Card
          v-for="benefit in benefits"
          :key="benefit.title"
          class="benefit-card"
        >
          <template #content>
            <div class="benefit-card__content">
              <div class="benefit-card__icon">
                <i :class="benefit.icon"></i>
              </div>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.text }}</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits {
  background: #f8fafc;
}

.benefits__head {
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
  background: #dcfce7;
  color: #166534;
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

.benefits__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.benefit-card {
  border-radius: 22px;
  height: 100%;
}

.benefit-card :deep(.p-card-body) {
  padding: 24px;
  height: 100%;
}

.benefit-card__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.benefit-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: #2563eb;
  font-size: 22px;
}

.benefit-card__content h3 {
  margin: 0;
  font-size: 22px;
  color: #0f172a;
}

.benefit-card__content p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
  font-size: 15px;
}

@media (max-width: 1100px) {
  .benefits__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .section-title {
    font-size: 32px;
  }

  .benefits__grid {
    grid-template-columns: 1fr;
  }
}
</style>
