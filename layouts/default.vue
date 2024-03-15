<template>
  <div v-if="!isMobile">
    <Navbar />
    <slot class="grow" />
    <UFooter :links="footerLinks">
      <template #left>
        <div class="flex flex-col">
          <div>
            Copyright © Centro Clinico Vista Centro
            {{ new Date().getFullYear() }}
          </div>
          <div class="text-md text-gray-500">Made by Raphsant</div>
        </div>
      </template>

      <template #right>
        <UButton
          icon="i-simple-icons-x"
          color="gray"
          variant="ghost"
          to="https://x.com/nuxt_js"
          target="_blank"
        />
        <UButton
          icon="i-simple-icons-discord"
          color="gray"
          variant="ghost"
          to="https://discord.com/invite/ps2h6QT"
          target="_blank"
        />
        <UButton
          icon="i-simple-icons-github"
          color="gray"
          variant="ghost"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
        />
      </template>
    </UFooter>
  </div>
  <div
    class="min-h-screen flex w-screen h-screen flex-col justify-around items-center px-1 mx-1 gap-20"
    v-if="isMobile"
  >
    <slot class="pb-[50rem] h-screen overflow-y-auto" />
    <div v-if="isMobile" class="fixed bottom-6 right-6 w-fit">
      <UButton
        @click="isOpen = !isOpen"
        :ui="{ rounded: 'rounded-full' }"
        size="xl"
        ><UIcon name="i-heroicons-bars-3" /> Menu
      </UButton>
    </div>
  </div>
  <UModal v-model="isOpen">
    <div class="p-4 h-fit flex justify-center items-center">
      <UNavigationLinks @click="isOpen = !isOpen" :links="links" />
    </div>
  </UModal>
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
