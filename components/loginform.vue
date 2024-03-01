<template>

<UCard>
  <template #header>
    <div>
    Bienvenido al Sistema De Citas Del Centro Clinico Vista Centro
    </div>
  </template>
  <UForm  class="space-y-4" @submit="login" >
    <UFormGroup label="Nombre de Usuario" name="username">
      <UInput v-model="state.username"  />
    </UFormGroup>

    <UFormGroup label="Contraseña" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <div class="flex gap-4">
      <UButton type="submit">
        Entrar
      </UButton>
      <NuxtLink to="/signup"><UButton class="text-md" variant="link"> Nuevo Usuario? Click aqui.</UButton></NuxtLink>
    </div>
  </UForm>


</UCard>



</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'

import {useAuthStore} from "~/store/auth";
import {storeToRefs} from 'pinia'
import useSignInTS from "~/composables/useSignInTS";

const authStore = useAuthStore();
type Schema = InferType<typeof schema>
const schema = object({
  email: string().required('Requerido.'),
  password: string()
      .min(2, 'Debe tener por lo menos 8 caracteres.')
      .required('Requerido.')
})

const state = ref({
  username: undefined,
  password: undefined
})

async function login(data: any) {
  try {
    console.log('triggered')
    await useSignInTS(state.value)
    await new Promise((r) => setTimeout(r, 1000))
    return navigateTo("/")
  } catch (e) {
    console.error(e)
  } finally {
    console.log(JSON.parse((JSON.stringify(authStore.getUser))));
  }
}
</script>

<style>

</style>