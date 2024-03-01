<template>
  <div class="flex w-full justify-evenly items-center pb-6">
    <UHorizontalNavigation :links="links"
                           class="flex w-fit justify-center items-center border-b border-gray-200 dark:border-gray-800"/>
    <div class="flex justify-center items-center gap-4">
      <UButton @click="handleSignOut">Cerrar Sesion</UButton>
      <UColorModeSelect class="w-28" />
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "../store/auth";

export default {
  name: "navbar"
}

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
console.log(user)

</script>
<script setup>

const links = [{
  label: 'Inicio',
  to: '/'
}, {
  label: 'Agendar Cita',
  to: '/appointment'
}, {
  label: 'Mis Citas',
  to: '/myapts'
},
  {
    label: user.username,
    to: '/profile'
  },

]


const {token} = user;

function handleSignOut() {
  authStore.$reset()
  return navigateTo("/login")
}
</script>

<style scoped>

</style>