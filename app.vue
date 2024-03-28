<template>
  <div class="">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
<script setup>
import Login from "./pages/login";

import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
console.log(user);

useSeoMeta({
  title: "💊 Centro Clinico Vista Centro",
  ogTitle: "Centro Clinico Vista Centro",
  description: "Sistema de Citas, Centro Clinico Vista Centro",
  ogDescription: "Sistema de Citas, Centro Clinico Vista Centro",
  ogImage: "/img/vclogolight.png",
  twitterCard: "summary_large_image",
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");
html {
  background: transparent;
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
</style>
