<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useForm, useFieldArray, configure } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";

interface ProfileForm {
  name: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phones: { value: string }[];
}

const { t, locale } = useI18n();
const submittedData = ref<ProfileForm | null>(null);

const buildSchema = () =>
  yup.object({
    name: yup
      .string()
      .required(t("errors.required", { field: t("errors.fields.name") }))
      .min(2, t("errors.tooShort", { field: t("errors.fields.name"), min: 2 })),
    email: yup
      .string()
      .required(t("errors.required", { field: t("errors.fields.email") }))
      .email(t("errors.invalidEmail")),
    dateOfBirth: yup
      .string()
      .required(t("errors.required", { field: t("errors.fields.dateOfBirth") }))
      .test("valid-date", t("errors.invalidDate"), (value) => {
        if (!value) return false;
        return !Number.isNaN(new Date(value).getTime());
      })
      .test("adult-only", t("errors.adultOnly"), (value) => {
        if (!value) return false;
        const birthDate = new Date(value);
        const today = new Date();
        const minDate = new Date(
          today.getFullYear() - 16,
          today.getMonth(),
          today.getDate(),
        );
        return birthDate <= minDate;
      }),
    address: yup
      .string()
      .required(t("errors.required", { field: t("errors.fields.address") }))
      .min(
        5,
        t("errors.tooShort", { field: t("errors.fields.address"), min: 5 }),
      ),
    phones: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .required(t("errors.required", { field: t("errors.fields.phone") }))
            .matches(/^\+?[0-9()\-\s]{7,20}$/, t("errors.invalidPhone")),
        }),
      )
      .min(1, t("errors.minPhones"))
      .required(t("errors.minPhones")),
  });

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const validationSchema = computed(() => buildSchema());

const { defineField, handleSubmit, resetForm, errors, setFieldError, values } =
  useForm<ProfileForm>({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      address: "",
      phones: [{ value: "" }],
    },
  });

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [dateOfBirth, dateOfBirthAttrs] = defineField("dateOfBirth");
const [address, addressAttrs] = defineField("address");

const { fields, push, remove } =
  useFieldArray<ProfileForm["phones"][number]>("phones");

const submitForm = handleSubmit((formValues) => {
  submittedData.value = JSON.parse(JSON.stringify(formValues));
});

function addPhone() {
  push({ value: "" });
}

function removePhone(index: number) {
  if (fields.value.length === 1) {
    return;
  }
  remove(index);
}

function resetProfileForm() {
  resetForm({
    values: {
      name: "",
      email: "",
      dateOfBirth: "",
      address: "",
      phones: [{ value: "" }],
    },
  });
  submittedData.value = null;
}

function simulateServerError() {
  setFieldError("email", t("errors.serverEmailTaken"));
}

watch(locale, () => {
  resetForm({
    values: {
      name: values.name,
      email: values.email,
      dateOfBirth: values.dateOfBirth,
      address: values.address,
      phones: values.phones?.length ? values.phones : [{ value: "" }],
    },
  });
});
</script>

<template>
  <div>
    <h1>{{ t("profile.title") }}</h1>

    <form
      @submit.prevent="submitForm"
      style="display: flex; flex-direction: column; gap: 16px; max-width: 720px"
    >
      <div>
        <label for="name">{{ t("profile.name") }}</label>
        <input
          id="name"
          v-model="name"
          v-bind="nameAttrs"
          :placeholder="t('profile.placeholders.name')"
          type="text"
          style="display: block; width: 100%; padding: 10px; margin-top: 6px"
        />
        <p v-if="errors.name" style="color: red; margin-top: 6px">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="email">{{ t("profile.email") }}</label>
        <input
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          :placeholder="t('profile.placeholders.email')"
          type="email"
          style="display: block; width: 100%; padding: 10px; margin-top: 6px"
        />
        <p v-if="errors.email" style="color: red; margin-top: 6px">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <label for="dateOfBirth">{{ t("profile.dateOfBirth") }}</label>
        <input
          id="dateOfBirth"
          v-model="dateOfBirth"
          v-bind="dateOfBirthAttrs"
          type="date"
          style="display: block; width: 100%; padding: 10px; margin-top: 6px"
        />
        <p v-if="errors.dateOfBirth" style="color: red; margin-top: 6px">
          {{ errors.dateOfBirth }}
        </p>
      </div>

      <div>
        <label for="address">{{ t("profile.address") }}</label>
        <textarea
          id="address"
          v-model="address"
          v-bind="addressAttrs"
          :placeholder="t('profile.placeholders.address')"
          rows="3"
          style="display: block; width: 100%; padding: 10px; margin-top: 6px"
        />
        <p v-if="errors.address" style="color: red; margin-top: 6px">
          {{ errors.address }}
        </p>
      </div>

      <div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          "
        >
          <label>{{ t("profile.phones") }}</label>
          <button type="button" @click="addPhone">
            {{ t("common.addPhone") }}
          </button>
        </div>

        <div
          v-for="(field, index) in fields"
          :key="field.key"
          style="margin-bottom: 12px"
        >
          <div style="display: flex; gap: 8px">
            <input
              :value="values.phones?.[index]?.value ?? ''"
              @input="
                (event) => {
                  const target = event.target as HTMLInputElement;
                  if (values.phones?.[index]) {
                    values.phones[index].value = target.value;
                  }
                }
              "
              :placeholder="t('profile.placeholders.phone')"
              type="text"
              style="display: block; width: 100%; padding: 10px"
            />
            <button type="button" @click="removePhone(index)">
              {{ t("common.remove") }}
            </button>
          </div>

          <p
            v-if="errors[`phones[${index}].value` as keyof typeof errors]"
            style="color: red; margin-top: 6px"
          >
            {{ errors[`phones[${index}].value` as keyof typeof errors] }}
          </p>
        </div>

        <p v-if="errors.phones" style="color: red; margin-top: 6px">
          {{ errors.phones }}
        </p>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap">
        <button type="submit">{{ t("common.submit") }}</button>
        <button type="button" @click="resetProfileForm">
          {{ t("common.reset") }}
        </button>
        <button type="button" @click="simulateServerError">
          {{ t("common.simulateServerError") }}
        </button>
      </div>
    </form>

    <div
      v-if="submittedData"
      style="margin-top: 24px; border: 1px solid #ccc; padding: 16px"
    >
      <h2>{{ t("profile.submittedTitle") }}</h2>
      <pre style="white-space: pre-wrap">{{ submittedData }}</pre>
    </div>
  </div>
</template>
