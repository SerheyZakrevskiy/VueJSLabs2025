<script setup lang="ts">
import { computed, reactive } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
  agree: boolean;
};

const toast = useToast();

const form = reactive<ContactForm>({
  name: "",
  email: "",
  phone: "",
  message: "",
  agree: false,
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errors = computed(() => {
  return {
    name: !form.name.trim() ? "Введите имя" : "",
    email: !form.email.trim()
      ? "Введите email"
      : !emailRegex.test(form.email)
        ? "Введите корректный email"
        : "",
    message: !form.message.trim() ? "Введите сообщение" : "",
    agree: !form.agree ? "Необходимо согласиться с условиями" : "",
  };
});

const isFormValid = computed(() => {
  return (
    !errors.value.name &&
    !errors.value.email &&
    !errors.value.message &&
    !errors.value.agree
  );
});

function resetForm() {
  form.name = "";
  form.email = "";
  form.phone = "";
  form.message = "";
  form.agree = false;
}

function handleSubmit() {
  if (!isFormValid.value) {
    toast.add({
      severity: "warn",
      summary: "Проверьте форму",
      detail: "Заполните обязательные поля и подтвердите согласие",
      life: 3000,
    });
    return;
  }

  toast.add({
    severity: "success",
    summary: "Заявка отправлена",
    detail: "Спасибо! Мы свяжемся с вами в ближайшее время",
    life: 3000,
  });

  resetForm();
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="container contact__grid">
      <div class="contact__info">
        <span class="section-label">Контакты</span>
        <h2 class="section-title">Оставьте заявку на demo или консультацию</h2>
        <p class="section-text">
          Заполните форму, чтобы получить демонстрацию платформы, уточнить
          стоимость или обсудить внедрение TaskFlow для вашей команды.
        </p>

        <div class="contact-points">
          <div class="contact-points__item">
            <i class="pi pi-envelope"></i>
            <span>hello@taskflow.app</span>
          </div>
          <div class="contact-points__item">
            <i class="pi pi-phone"></i>
            <span>+38 (067) 555-12-34</span>
          </div>
          <div class="contact-points__item">
            <i class="pi pi-building"></i>
            <span>Онлайн-подключение для команд любого размера</span>
          </div>
        </div>
      </div>

      <Card class="contact-card">
        <template #title>Форма обратной связи</template>
        <template #content>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="field">
              <label for="name">Имя *</label>
              <InputText
                id="name"
                v-model="form.name"
                placeholder="Введите ваше имя"
                fluid
                :invalid="!!errors.name"
              />
              <small v-if="errors.name" class="field-error">{{
                errors.name
              }}</small>
            </div>

            <div class="field">
              <label for="email">Email *</label>
              <InputText
                id="email"
                v-model="form.email"
                placeholder="example@email.com"
                fluid
                :invalid="!!errors.email"
              />
              <small v-if="errors.email" class="field-error">{{
                errors.email
              }}</small>
            </div>

            <div class="field">
              <label for="phone">Телефон</label>
              <InputMask
                id="phone"
                v-model="form.phone"
                mask="+38 (999) 999-99-99"
                placeholder="+38 (___) ___-__-__"
                fluid
              />
            </div>

            <div class="field">
              <label for="message">Сообщение *</label>
              <Textarea
                id="message"
                v-model="form.message"
                rows="5"
                autoResize
                placeholder="Расскажите, для какой команды вам нужен сервис"
                fluid
                :invalid="!!errors.message"
              />
              <small v-if="errors.message" class="field-error">
                {{ errors.message }}
              </small>
            </div>

            <div class="checkbox-field">
              <Checkbox
                id="agree"
                v-model="form.agree"
                binary
                :invalid="!!errors.agree"
              />
              <label for="agree">
                Я согласен(на) на обработку данных и получение обратной связи *
              </label>
            </div>
            <small v-if="errors.agree" class="field-error">{{
              errors.agree
            }}</small>

            <Button type="submit" label="Отправить заявку" size="large" />
          </form>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: #f8fafc;
}

.contact__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 28px;
  align-items: start;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-label {
  display: inline-flex;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
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

.contact-points {
  display: grid;
  gap: 14px;
  margin-top: 8px;
}

.contact-points__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;
  color: #334155;
}

.contact-points__item i {
  color: #2563eb;
  font-size: 18px;
}

.contact-card {
  border-radius: 24px;
}

.contact-card :deep(.p-card-body) {
  padding: 26px;
}

.contact-form {
  display: grid;
  gap: 18px;
}

.field {
  display: grid;
  gap: 8px;
}

.field label {
  font-weight: 600;
  color: #0f172a;
}

.field-error {
  color: #dc2626;
  font-size: 13px;
}

.checkbox-field {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #334155;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .section-title {
    font-size: 32px;
  }
}
</style>
