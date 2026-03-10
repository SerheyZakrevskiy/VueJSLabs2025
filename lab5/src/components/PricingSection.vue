<script setup lang="ts">
import { computed, inject, ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";
import { useToast } from "primevue/usetoast";
import type { CopyToClipboardFn } from "../plugins/copyToClipboard";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

const toast = useToast();
const copyToClipboard = inject<CopyToClipboardFn>("copyToClipboard");

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$9",
    period: "/user",
    description: "Для небольших команд, которым нужен быстрый старт.",
    features: [
      "До 10 участников",
      "Базовые статусы задач",
      "Общий dashboard",
      "Email-уведомления",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/user",
    description: "Оптимальный вариант для растущих команд и активных проектов.",
    features: [
      "До 50 участников",
      "Аналитика и отчёты",
      "Гибкие роли доступа",
      "Приоритетная поддержка",
    ],
    highlighted: true,
    badge: "Популярный",
  },
  {
    name: "Enterprise",
    price: "$39",
    period: "/user",
    description: "Для крупных компаний с несколькими командами и процессами.",
    features: [
      "Без ограничений по командам",
      "Расширенная аналитика",
      "SLA и onboarding",
      "Индивидуальные настройки",
    ],
  },
];

const usersCount = ref<number | null>(15);
const pricePerUser = 19;
const discountPercent = 10;

const subtotal = computed(() => (usersCount.value ?? 0) * pricePerUser);
const discountAmount = computed(() =>
  Math.round(subtotal.value * (discountPercent / 100)),
);
const total = computed(() => subtotal.value - discountAmount.value);

async function handleCopyPromo() {
  if (!copyToClipboard) return;

  const ok = await copyToClipboard("TASKFLOW10");

  if (ok) {
    toast.add({
      severity: "success",
      summary: "Скопировано",
      detail: "Промокод TASKFLOW10 скопирован в буфер обмена",
      life: 2500,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Не удалось скопировать промокод",
      life: 2500,
    });
  }
}
</script>

<template>
  <section id="pricing" class="pricing">
    <div class="container">
      <div class="pricing__head">
        <span class="section-label">Тарифы</span>
        <h2 class="section-title">Выберите план под размер вашей команды</h2>
        <p class="section-text">
          Доступны базовый, профессиональный и корпоративный варианты. Для
          демонстрации ниже есть мини-калькулятор стоимости команды.
        </p>
      </div>

      <div class="pricing__grid">
        <Card
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
          :class="{ 'pricing-card--highlighted': plan.highlighted }"
        >
          <template #content>
            <div class="pricing-card__content">
              <div class="pricing-card__header">
                <div class="pricing-card__title-wrap">
                  <h3>{{ plan.name }}</h3>
                  <Tag
                    v-if="plan.badge"
                    :value="plan.badge"
                    severity="success"
                    rounded
                  />
                </div>

                <p class="pricing-card__description">
                  {{ plan.description }}
                </p>
              </div>

              <div class="pricing-card__price">
                <span class="pricing-card__price-value">{{ plan.price }}</span>
                <span class="pricing-card__price-period">{{
                  plan.period
                }}</span>
              </div>

              <Divider />

              <ul class="pricing-card__features">
                <li v-for="feature in plan.features" :key="feature">
                  <i class="pi pi-check-circle"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <Button
                :label="plan.highlighted ? 'Выбрать Pro' : 'Выбрать план'"
                :severity="plan.highlighted ? 'success' : 'secondary'"
                :outlined="!plan.highlighted"
              />
            </div>
          </template>
        </Card>
      </div>

      <div class="pricing-tools">
        <Card class="calculator-card">
          <template #title>Мини-калькулятор команды</template>
          <template #content>
            <div class="calculator-card__content">
              <p class="calculator-card__text">
                Рассчитайте ориентировочную стоимость тарифа
                <strong>Pro</strong>
                для вашей команды с применением промокода.
              </p>

              <div class="calculator-card__controls">
                <label for="usersCount">Количество пользователей</label>
                <InputNumber
                  input-id="usersCount"
                  v-model="usersCount"
                  :min="1"
                  :max="1000"
                  showButtons
                  fluid
                />
              </div>

              <div class="calculator-card__summary">
                <div class="summary-row">
                  <span>Цена за пользователя</span>
                  <strong>${{ pricePerUser }}</strong>
                </div>
                <div class="summary-row">
                  <span>Пользователей</span>
                  <strong>{{ usersCount ?? 0 }}</strong>
                </div>
                <div class="summary-row">
                  <span>Промокод TASKFLOW10</span>
                  <strong>-{{ discountPercent }}%</strong>
                </div>
                <div class="summary-row">
                  <span>Промежуточная сумма</span>
                  <strong>${{ subtotal }}</strong>
                </div>
                <div class="summary-row">
                  <span>Скидка</span>
                  <strong>${{ discountAmount }}</strong>
                </div>
                <div class="summary-row summary-row--total">
                  <span>Итого / месяц</span>
                  <strong>${{ total }}</strong>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card class="promo-card">
          <template #title>Промокод для demo</template>
          <template #content>
            <div class="promo-card__content">
              <p>
                Используйте промокод <strong>TASKFLOW10</strong>, чтобы показать
                дополнительный сценарий работы `CopyToClipboardPlugin`.
              </p>

              <div class="promo-code-box">
                <span>TASKFLOW10</span>
              </div>

              <Button
                label="Скопировать промокод"
                icon="pi pi-copy"
                severity="secondary"
                outlined
                @click="handleCopyPromo"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  background: #f8fafc;
}

.pricing__head {
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
  background: #fee2e2;
  color: #b91c1c;
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

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

.pricing-card {
  border-radius: 24px;
  height: 100%;
}

.pricing-card--highlighted {
  border: 1px solid #86efac;
  box-shadow: 0 16px 40px rgba(22, 163, 74, 0.08);
}

.pricing-card :deep(.p-card-body) {
  padding: 24px;
  height: 100%;
}

.pricing-card__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pricing-card__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pricing-card__title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pricing-card__title-wrap h3 {
  margin: 0;
  font-size: 24px;
  color: #c8ccd1;
}

.pricing-card__description {
  margin: 0;
  color: #475569;
  line-height: 1.6;
  min-height: 52px;
}

.pricing-card__price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 20px;
}

.pricing-card__price-value {
  font-size: 42px;
  font-weight: 800;
  color: #64748b;
}

.pricing-card__price-period {
  color: #64748b;
  font-size: 16px;
}

.pricing-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  display: grid;
  gap: 14px;
  flex: 1;
}

.pricing-card__features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.pricing-card__features i {
  color: #16a34a;
  margin-top: 2px;
}

.pricing-card__features span {
  color: #334155;
  line-height: 1.6;
}

.pricing-tools {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}

.calculator-card,
.promo-card {
  border-radius: 24px;
}

.calculator-card :deep(.p-card-body),
.promo-card :deep(.p-card-body) {
  padding: 24px;
}

.calculator-card__content,
.promo-card__content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.calculator-card__text,
.promo-card__content p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.calculator-card__controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calculator-card__controls label {
  font-weight: 600;
  color: #0f172a;
}

.calculator-card__summary {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: #334155;
}

.summary-row strong {
  color: #0f172a;
}

.summary-row--total {
  padding-top: 12px;
  border-top: 1px solid #cbd5e1;
  font-size: 18px;
}

.promo-code-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  border-radius: 18px;
  background: #0f172a;
  color: #f8fafc;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 2px;
}

@media (max-width: 1100px) {
  .pricing__grid,
  .pricing-tools {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .section-title {
    font-size: 32px;
  }

  .pricing__grid {
    grid-template-columns: 1fr;
  }

  .pricing-card__title-wrap {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
