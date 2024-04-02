<template>
  <div>
    <UHeader>
      <template #logo>
        <img
          class="w-[12rem] lg:w-[16rem] lg:mt-5"
          src="/img/vclogolight.png"
          alt=""
      /></template>
      <template #center>
        <LazyUHorizontalNavigation
          :links="links"
          class="hidden lg:flex w-fit justify-center items-center border-b border-gray-200 dark:border-gray-800"
        />
      </template>
      <template #right>
        <div class="hidden lg:flex justify-center items-center gap-4">
          <UButton @click="handleSignOut">Cerrar Sesion</UButton>
          <UColorModeToggle />
        </div>
      </template>
      <template #panel>
        <UNavigationTree :links="links" />
      </template>
    </UHeader>
    <!--    <Navbar />-->
    <UMain>
      <slot />
    </UMain>
    <UFooter :links="footerLinks">
      <template #left>
        <div class="flex flex-col">
          <div>
            Copyright © Centro Clinico Vista Centro
            {{ new Date().getFullYear() }}
          </div>
          <div class="text-md text-gray-500">
            Made with 💚 by <span class="text-primary">Raphsant</span>
          </div>
          <div class="text-sm text-gray-500">
            Aptsys v<span class="text-primary">1.0.0</span>
          </div>
        </div>
      </template>

      <template #right>
        <UButton
          icon="i-simple-icons-instagram"
          color="gray"
          variant="ghost"
          to="https://x.com/nuxt_js"
          target="_blank"
        />
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const mapping = ["/", "/appointment", "/myapts", "/profile"];

const { isMobile } = useDevice();

function onChange(index) {
  navigateTo(mapping[index]);
}

const footerLinks = [
  {
    label: "Panel de administrador",
    to: "/admin/dashboard",
    icon: "i-heroicons-home",
  },
];
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
console.log(user);

const { token } = user;

function handleSignOut() {
  authStore.$reset();
  return navigateTo("/login");
}

const links = [
  {
    label: "Inicio",
    to: "/",
    icon: "i-heroicons-home",
  },
  {
    label: "Agendar Cita",
    to: "/appointment",
    icon: "i-heroicons-pencil",
  },
  {
    label: "Mis Citas",
    to: "/myapts",
    icon: "i-heroicons-bookmark-square",
  },
  {
    label: "Perfil",
    to: "/profile",
    icon: "i-heroicons-user-circle\n",
  },
];
</script>

<style scoped></style>
