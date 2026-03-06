<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { login } from "@/services/auth";
import FormWrapper from "@/components/FormWrapper.vue";
import BaseInput from "@/components/BaseInput.vue";

const router = useRouter();
const route = useRoute();

const email = ref("");
const name = ref("");
const emailError = computed(() =>
  !email.value.trim() ? "Email is required" : "",
);

function onLogin() {
  if (!email.value.trim()) return;
  login({ email: email.value.trim(), name: name.value.trim() || undefined });
  const redirect =
    typeof route.query.redirect === "string"
      ? route.query.redirect
      : "/admin/dashboard";
  router.replace(redirect);
}
</script>

<template>
  <FormWrapper title="Login">
    <BaseInput
      v-model="email"
      label="Email"
      placeholder="a@a.com"
      :error="emailError"
    />
    <BaseInput v-model="name" label="Name (optional)" placeholder="Admin" />

    <template #actions>
      <button @click="onLogin">Login</button>
      <RouterLink to="/">Back</RouterLink>
    </template>
  </FormWrapper>
</template>
