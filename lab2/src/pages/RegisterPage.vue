<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import FormWrapper from "@/components/FormWrapper.vue";
import BaseInput from "@/components/BaseInput.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailError = computed(() =>
  !email.value.trim() ? "Email is required" : "",
);
const passwordError = computed(() =>
  password.value.length < 6 ? "Min 6 chars" : "",
);
const confirmError = computed(() =>
  confirmPassword.value !== password.value ? "Passwords do not match" : "",
);

const canSubmit = computed(
  () => !emailError.value && !passwordError.value && !confirmError.value,
);

function onRegister() {
  if (!canSubmit.value) return;
  router.replace("/login");
}
</script>

<template>
  <FormWrapper title="Register">
    <BaseInput
      v-model="email"
      label="Email"
      placeholder="a@a.com"
      :error="emailError"
    />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      :error="passwordError"
    />
    <BaseInput
      v-model="confirmPassword"
      label="Confirm password"
      type="password"
      :error="confirmError"
    />

    <template #actions>
      <button :disabled="!canSubmit" @click="onRegister">Create account</button>
      <RouterLink to="/login">Go to login</RouterLink>
    </template>
  </FormWrapper>
</template>
