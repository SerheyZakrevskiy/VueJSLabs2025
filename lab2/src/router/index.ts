import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { isAuthenticated } from "@/services/auth";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("@/pages/HomePage.vue") },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/RegisterPage.vue"),
  },

  {
    path: "/admin",
    name: "admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: { name: "admin-dashboard" } },
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("@/pages/admin/DashboardPage.vue"),
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("@/pages/admin/UsersPage.vue"),
      },
      {
        path: "users/:id",
        name: "admin-user",
        component: () => import("@/pages/admin/UserDetailsPage.vue"),
        props: true,
      },
      {
        path: "reports",
        name: "admin-reports",
        component: () => import("@/pages/admin/ReportsPage.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
  linkActiveClass: "is-active",
});

router.beforeEach((to) => {
  const authed = isAuthenticated();

  if (to.meta.requiresAuth && !authed) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (authed && (to.name === "login" || to.name === "register")) {
    return { name: "admin-dashboard" };
  }

  return true;
});
