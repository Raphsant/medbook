<template>
  <div class="flex w-full justify-evenly items-center pb-6">
    <UHorizontalNavigation :links="links"
                           class="flex w-fit justify-center items-center border-b border-gray-200 dark:border-gray-800"/>
    <div class="flex justify-center items-center gap-4">
      <UButton @click="handleSignOut">Cerrar Sesion</UButton>
      <UColorModeSelect class="w-28" />
    </div>
  </div>

  <!--  <div class="flex h-full">-->
  <!--    <div-->
  <!--        class="bg-gradient-to-br from-white to-gray-100 m-6 h-120 rounded-xl flex flex-col justify-center items-center w-fit p-5 shadow-md grow">-->
  <!--      <ul class="flex flex-row gap-5 grow">-->
  <!--        <li>-->
  <!--          <div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black">-->
  <!--            <NuxtLink to="/">Inicio</NuxtLink>-->
  <!--          </div>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black">-->
  <!--            <NuxtLink to="/appointment">-->
  <!--              Crear Cita-->
  <!--            </NuxtLink>-->
  <!--          </div>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black"><NuxtLink to="/myapts">-->
  <!--            Mis Citas-->
  <!--          </NuxtLink>-->
  <!--          </div>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <NuxtLink to="/profile"><div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black">-->
  <!--            Mi Perfil-->
  <!--          </div></NuxtLink>-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--    </div>-->
  <!--    <div class="bg-neutral-100 m-6 h-120 rounded-xl flex flex-col justify-center items-center w-fit p-5 shadow-md">-->
  <!--      <ul class="flex flex-row gap-5">-->
  <!--        <li>-->
  <!--          <div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black"-->
  <!--               v-if="!token">-->
  <!--            <NuxtLink to="/login">Iniciar Sesion</NuxtLink>-->
  <!--          </div>-->
  <!--          <div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black"-->
  <!--               v-if="token" @click="handleSignOut">-->
  <!--            Cerrar Sesion-->
  <!--          </div>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--          <NuxtLink to="signup"><div class="px-1 py-2 bg-indigo-600 text-white rounded-md shadow-2xl shadow-gray-600 text-center hover:bg-indigo-800 cursor-pointer hover:shadow-inner hover:shadow-black">Registro-->
  <!--          </div></NuxtLink>-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--    </div>-->
  <!--  </div>-->
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