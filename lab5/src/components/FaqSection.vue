<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    value: "0",
    question: "Подходит ли TaskFlow для маленьких команд?",
    answer:
      "Да. Сервис подходит как для небольших команд, которым нужен простой контроль задач, так и для более крупных процессов с несколькими проектами.",
  },
  {
    value: "1",
    question: "Можно ли отслеживать дедлайны и статус задач?",
    answer:
      "Да. Каждая задача имеет ответственного, приоритет, срок выполнения и текущий статус, что позволяет быстро контролировать прогресс.",
  },
  {
    value: "2",
    question: "Есть ли аналитика по выполнению задач?",
    answer:
      "Да. В расширенных тарифах доступны отчёты и аналитика, которые помогают оценивать скорость работы команды и выявлять узкие места.",
  },
  {
    value: "3",
    question: "Сколько времени занимает внедрение сервиса?",
    answer:
      "Базовый запуск занимает минимальное время: создаётся рабочее пространство, добавляются участники, после чего команда может сразу приступать к работе.",
  },
  {
    value: "4",
    question:
      "Можно ли использовать TaskFlow для нескольких проектов одновременно?",
    answer:
      "Да. Платформа поддерживает параллельную работу с несколькими проектами и удобное распределение задач между командами.",
  },
];
</script>

<template>
  <section id="faq" class="faq">
    <div class="container">
      <div class="faq__head">
        <span class="section-label">FAQ</span>
        <h2 class="section-title">Часто задаваемые вопросы</h2>
        <p class="section-text">
          Здесь собраны короткие ответы на основные вопросы о платформе,
          сценариях использования и запуске команды.
        </p>
      </div>

      <Accordion value="0" class="faq__accordion">
        <AccordionPanel
          v-for="item in faqItems"
          :key="item.value"
          :value="item.value"
        >
          <AccordionHeader>{{ item.question }}</AccordionHeader>
          <AccordionContent>
            <p class="faq__answer">{{ item.answer }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: #ffffff;
}

.faq__head {
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
  background: #fef3c7;
  color: #b45309;
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

.faq__accordion {
  display: grid;
  gap: 14px;
}

.faq__accordion :deep(.p-accordionpanel) {
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  overflow: hidden;
  background: #f8fafc;
}

.faq__accordion :deep(.p-accordionheader) {
  font-size: 18px;
  font-weight: 600;
}

.faq__accordion :deep(.p-accordionheader-toggle-icon) {
  color: #2563eb;
}

.faq__answer {
  margin: 0;
  color: #475569;
  line-height: 1.75;
  font-size: 16px;
}

@media (max-width: 720px) {
  .section-title {
    font-size: 32px;
  }
}
</style>
