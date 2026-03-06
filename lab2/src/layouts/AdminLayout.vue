<script setup lang="ts">
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";

type User = { email: string; name: string };
const injectedUser = inject<User | null>("auth_user", null);
const userLabel = computed(
  () => injectedUser?.name ?? injectedUser?.email ?? "Unknown",
);

const router = useRouter();
function onLogout() {
  logout();
  router.replace("/login");
}
</script>

<template>
  <div style="display: flex; min-height: 100vh">
    <aside style="width: 260px; padding: 16px; border-right: 1px solid #ddd">
      <h3>Admin</h3>
      <div style="margin-top: 10px; font-size: 14px; opacity: 0.8">
        User: <b>{{ userLabel }}</b>
      </div>

      <div style="margin-top: 16px">
        <slot name="sidebar">
          <nav style="display: flex; flex-direction: column; gap: 10px">
            <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
            <RouterLink to="/admin/users">Users</RouterLink>
            <RouterLink to="/admin/reports">Reports</RouterLink>
            <RouterLink to="/">Home</RouterLink>
          </nav>
        </slot>
      </div>

      <button style="margin-top: 16px" @click="onLogout">Logout</button>
    </aside>

    <main style="flex: 1; padding: 16px">
      <RouterView />
    </main>
  </div>
</template>
