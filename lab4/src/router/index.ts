import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "../pages/ProductsPage.vue";
import CartPage from "../pages/CartPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/products" },
    { path: "/products", component: ProductsPage },
    { path: "/cart", component: CartPage },
    { path: "/profile", component: ProfilePage },
  ],
});

export default router;
