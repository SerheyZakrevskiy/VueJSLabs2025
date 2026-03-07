<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const cartStore = useCartStore();

const products = [
  { id: 1, title: "Laptop", price: 32000 },
  { id: 2, title: "Mouse", price: 800 },
  { id: 3, title: "Keyboard", price: 1800 },
];
</script>

<template>
  <div>
    <h1>{{ t("products.title") }}</h1>

    <div
      v-for="product in products"
      :key="product.id"
      style="margin-bottom: 16px; border: 1px solid #ccc; padding: 12px"
    >
      <h3>{{ product.title }}</h3>
      <p>₴ {{ product.price }}</p>
      <button @click="cartStore.add(product)">
        {{ t("common.add") }}
      </button>
    </div>
  </div>
</template>
