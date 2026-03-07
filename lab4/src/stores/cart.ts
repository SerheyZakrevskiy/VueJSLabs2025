import { defineStore } from "pinia";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  qty: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  },
  actions: {
    add(item: Omit<CartItem, "qty">) {
      const existing = this.items.find((i) => i.id === item.id);

      if (existing) {
        existing.qty += 1;
        return;
      }

      this.items.push({ ...item, qty: 1 });
    },
    remove(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    clear() {
      this.items = [];
    },
  },
});
