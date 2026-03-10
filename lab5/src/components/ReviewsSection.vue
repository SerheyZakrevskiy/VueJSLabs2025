<script setup lang="ts">
import Card from "primevue/card";
import Rating from "primevue/rating";
import Tag from "primevue/tag";

type Review = {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  result: string;
};

const reviews: Review[] = [
  {
    name: "Анна Коваленко",
    role: "Project Manager",
    company: "Nova Team",
    rating: 5,
    text: "TaskFlow помог навести порядок в задачах и коммуникации. Команда перестала терять контекст между чатами, таблицами и созвонами.",
    result: "-28% времени на ручную координацию",
  },
  {
    name: "Дмитрий Мельник",
    role: "Team Lead",
    company: "CodeBridge",
    rating: 5,
    text: "Больше всего понравилась прозрачность статусов и дедлайнов. Теперь видно, где проект реально тормозит, а где всё идёт по плану.",
    result: "+35% к предсказуемости спринтов",
  },
  {
    name: "Ирина Шевчук",
    role: "Operations Manager",
    company: "FlowOps",
    rating: 4,
    text: "Сервис оказался простым для внедрения. Базовый запуск занял минимум времени, а команда быстро адаптировалась к новому процессу.",
    result: "Запуск команды за 1 день",
  },
];
</script>

<template>
  <section id="reviews" class="reviews">
    <div class="container">
      <div class="reviews__head">
        <span class="section-label">Отзывы</span>
        <h2 class="section-title">
          Что говорят команды, которые уже используют TaskFlow
        </h2>
        <p class="section-text">
          Несколько коротких примеров того, как платформа помогает улучшить
          прозрачность процессов, контроль сроков и общую организацию работы.
        </p>
      </div>

      <div class="reviews__grid">
        <Card
          v-for="review in reviews"
          :key="`${review.name}-${review.company}`"
          class="review-card"
        >
          <template #content>
            <div class="review-card__content">
              <div class="review-card__top">
                <div class="review-card__avatar">
                  {{ review.name.charAt(0) }}
                </div>

                <div class="review-card__person">
                  <h3>{{ review.name }}</h3>
                  <p>{{ review.role }} · {{ review.company }}</p>
                </div>
              </div>

              <Rating :model-value="review.rating" readonly :cancel="false" />

              <p class="review-card__text">
                {{ review.text }}
              </p>

              <Tag :value="review.result" severity="info" rounded />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: #ffffff;
}

.reviews__head {
  max-width: 780px;
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
  background: #e0e7ff;
  color: #4338ca;
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

.reviews__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.review-card {
  border-radius: 24px;
  height: 100%;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.review-card :deep(.p-card-body) {
  padding: 24px;
  height: 100%;
}

.review-card__content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
}

.review-card__top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.review-card__avatar {
  width: 52px;
  height: 52px;
  min-width: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 22px;
  font-weight: 800;
}

.review-card__person {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.review-card__person h3 {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.review-card__person p {
  margin: 0;
  color: #64748b;
  line-height: 1.5;
  font-size: 14px;
}

.review-card__text {
  margin: 0;
  color: #334155;
  line-height: 1.75;
  font-size: 15px;
  flex: 1;
}

@media (max-width: 1100px) {
  .reviews__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .section-title {
    font-size: 32px;
  }
}
</style>
