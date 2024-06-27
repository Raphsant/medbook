<template>
  <div>
    <UHeader :links="links">
      <template #logo>
        <img
          class="w-[12rem] lg:w-[16rem] lg:mt-5"
          src="/img/vclogolight.png"
          alt=""
      /></template>
      <!--      <template #center>-->
      <!--        <LazyUHorizontalNavigation-->
      <!--          :links="links"-->
      <!--          class="hidden lg:flex w-fit justify-center items-center border-b border-gray-200 dark:border-gray-800"-->
      <!--        />-->
      <!--      </template>-->
      <template #right>
        <div class="hidden lg:flex justify-center items-center gap-4">
          <UButton v-if="isLoggedIn" @click="handleSignOut"
            >Cerrar Sesion
          </UButton>
          <NuxtLink v-if="!isLoggedIn" to="/login">
            <UButton>Iniciar Sesion</UButton>
          </NuxtLink>
        </div>
        <UColorModeToggle />
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
        Siguenos en Instagram!
        <UButton
          icon="i-simple-icons-instagram"
          color="gray"
          variant="ghost"
          to="https://www.instagram.com/clinicavistacentro_oficial/"
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
const user = ref(JSON.parse(JSON.stringify(authStore.getUser)));
console.log(user);
const userRef = ref("");
const isLoggedIn = ref(false);

onMounted(() => {
  if (authStore.user.token) {
    isLoggedIn.value = true;
  }
});

watch(authStore, async (newUser, oldUser) => {
  if (newUser.user.token) {
    isLoggedIn.value = true;
  }
});

const { token } = user.value;

function handleSignOut() {
  authStore.$reset();
  isLoggedIn.value = false;
  return navigateTo("/login");
}

const links = [
  {
    label: "Inicio",
    to: "/",
    icon: "i-heroicons-home",
  },
  {
    label: "Citas",
    icon: "i-heroicons-pencil",
    children: [
      {
        label: "Agendar Cita",
        to: "/appointment",
        icon: "i-heroicons-ticket",
        description: "Agendar cita con uno de nuestros medicos",
      },
      {
        label: "Mis Citas",
        to: "/myapts",
        icon: "i-heroicons-bookmark-square",
        description: "Ver el estado actual de tus citas",
      },
    ],
  },
  {
    label: "Perfil",
    to: "/profile",
    icon: "i-heroicons-user-circle\n",
  },
];

watch(user, async (newUser, oldUser) => {
  console.log("user is.");
  //@ts-ignore
  userRef.value = newUser;
});
</script>

<style scoped></style>
