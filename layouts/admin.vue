<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const { data: userCount } = useFetch(
  "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/user/count",
  {
    method: "GET",
    onRequest({ request, options }) {
      options.headers = {
        "x-access-token": user.token,
      };
    },
  },
);
const { data: aptCount } = useFetch(
  "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/count",
  {
    method: "GET",
    onRequest({ request, options }) {
      options.headers = {
        "x-access-token": user.token,
      };
    },
  },
);
const { data: doctorCount } = useFetch(
  "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/doctor/count",
  {
    method: "GET",
    onRequest({ request, options }) {
      options.headers = {
        "x-access-token": user.token,
      };
    },
  },
);
console.log(userCount.value);

const links = [
  {
    label: "Inicio",
    icon: "i-heroicons-home",
    to: "/admin/dashboard",
  },
  {
    label: "Medicos",
    icon: "i-heroicons-user",
    badge: doctorCount.value,
    to: "/admin/doctors",
  },
  {
    label: "Pacientes",
    icon: "i-heroicons-user-group",
    badge: userCount.value,
    to: "/admin/users",
  },
  {
    label: "Citas",
    icon: "i-heroicons-bookmark",
    to: "/admin/appointments",
    badge: aptCount.value,
  },
  {
    label: "Reportes",
    icon: "i-heroicons-cog-8-tooth",
    children: [
      {
        label: "Citas",
      },
      {
        label: "Pacientes",
      },
    ],
  },
];
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar :ui="{ left: 'flex-1' }">
        <template #left>
          <NuxtLink to="/">
            <img src="/img/vclogolight.png" alt="" />
          </NuxtLink>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header> Bienvenido!</template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer></template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<style scoped></style>
