<template>
  <UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields"
      :loading="isLoading"
      :schema="schema"
      align="top"
      :ui="{
        base: 'text-center',
        footer: 'text-center',
        default: { submitButton: { label: 'Ingresar' } },
      }"
      @submit="login"
    >
      <template #title
        ><img src="/img/vclogolight.png" alt="" />
        <div>
          Bienvenido al sistema Aptsys del Centro Clinico Vista Centro
        </div></template
      >
      <template #description>
        Nuevo usuario?
        <NuxtLink to="/signup" class="text-primary font-medium"
          >Registrate aqui</NuxtLink
        >
        .
      </template>
      <template #validation>
        <UAlert
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          title="Error signing in"
        />
      </template>
      <template #footer>
        Al registrarse usted esta aceptando nuestros
        <NuxtLink to="/" class="text-primary font-medium"
          >Terminos y Condiciones</NuxtLink
        >
        .
      </template>
    </UAuthForm>
  </UCard>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import useSignInTS from "~/composables/useSignInTS";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const fields = [
  {
    name: "username",
    type: "text",
    label: "Nombre de Usuario",
    placeholder: "Introduzca su nombre de usuario",
  },
  {
    name: "password",
    label: "contraseña",
    type: "password",
    placeholder: "Introduzca su contraseña",
  },
];
const isLoading = ref(false);
const authStore = useAuthStore();
type Schema = z.output<typeof schema>;
const schema = z
  .object({
    username: z.string({
      required_error: "Por favor introduzca su nombre de usuario",
    }),
    password: z.string({ required_error: "Por favor introduzca su clave" }),
  })
  .required();

const state = ref({
  username: undefined,
  password: undefined,
});

const errorMessage = ref("");

async function login(loginData: any) {
  try {
    isLoading.value = true;
    const { error, pending, data } = useFetch(
      "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/auth/signin",
      {
        method: "POST",
        watch: false,
        body: {
          ...loginData,
          username: loginData.username?.toLowerCase(),
        },
        onResponseError({ error: any, response }) {
          //@ts-ignore
          errorMessage.value = response._data.error;
        },
        onResponse({ response }) {
          console.log(response._data);
          authStore.addUser(response._data);
          isLoading.value = false;
          navigateTo("/");
        },
      },
    );
    if (!data) throw new Error("Ha ocurrido un error, intentelo mas tarde.");
  } catch (e: any) {
    errorMessage.value = e.message;
  }
}
</script>

<style></style>
