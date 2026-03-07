<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const cartStore = useCartStore();
const { items, totalCount, totalPrice } = storeToRefs(cartStore);
</script>

<template>
  <div>
    <h1>{{ t("cart.title") }}</h1>

    <div v-if="!items.length">
      {{ t("cart.empty") }}
    </div>

    <div v-else>
      <div
        v-for="item in items"
        :key="item.id"
        style="margin-bottom: 16px; border: 1px solid #ccc; padding: 12px"
      >
        <h3>{{ item.title }}</h3>
        <p>Qty: {{ item.qty }}</p>
        <p>₴ {{ item.price * item.qty }}</p>
        <button @click="cartStore.remove(item.id)">
          {{ t("common.remove") }}
        </button>
      </div>

      <p>{{ t("cart.totalCount") }}: {{ totalCount }}</p>
      <p>{{ t("cart.totalPrice") }}: ₴ {{ totalPrice }}</p>

      <button @click="cartStore.clear()">
        {{ t("common.clear") }}
      </button>
    </div>
  </div>
</template>
