<script setup lang="ts">
import formatPhoneNumber from "~/helper/formatPhoneNumber.js";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const signupForm = ref({
  firstName: undefined,
  lastName: undefined,
  id: undefined,
  email: undefined,
  username: undefined,
  password: undefined,
  role: "user",
  phone: undefined,
});

const fields = [
  {
    name: "firstName",
    type: "text",
    label: "Primer Nombre",
    placeholder: "Introduzca su nombre",
  },
  {
    name: "lastName",
    type: "text",
    label: "Apellido",
    placeholder: "Introduzca su apellido",
  },
  {
    name: "id",
    type: "text",
    label: "Cedula de Identidad",
    placeholder: "Introduzca su cedula de identidad",
  },
  {
    name: "username",
    type: "text",
    label: "Nombre de Usuario",
    placeholder: "Introduzca su nombre de usuario",
  },
  {
    name: "email",
    type: "email",
    label: "Correo Electronico",
    placeholder: "Introduzca su correo electronico",
  },
  {
    name: "phone",
    type: "text",
    label: "Numero de telefono/Whatsapp",
    placeholder: "Debe de empezar por 0414/0416....etc",
  },
  {
    name: "password",
    label: "contraseña",
    type: "password",
    placeholder: "Introduzca su contraseña",
  },
];

const schema = z
  .object({
    username: z
      .string({ required_error: "Por favor introduzca un nombre de usuario" })
      .min(6, "Su usuario debe tener minimo 6 caracteres"),
    email: z
      .string({ required_error: "Por favor introduzca un correo electronico" })
      .email({ message: "Por favor introduzca un correo valido" }),
    password: z
      .string({ required_error: "Por favor introduzca una clave personal" })
      .min(6, "Su clave debe de tener por lo menos 6 caracteres"),
    phone: z
      .string({ required_error: "Por favor introduzca su numero de telefono" })
      .min(
        11,
        "Su numero de telefono debe tener 11 characteres y empezar por 0414/0416 etc.",
      )
      .regex(
        /^(0414|0424|0412|0416|0426)\d*$/,
        "Su numero de telefono debe tener 11 characteres y empezar por 0414/0416 etc.",
      ),
    firstName: z.string({ required_error: "Por favor introduzca su nombre" }),
    lastName: z.string({ required_error: "Por favor introduzca su apellido" }),
    id: z
      .string({ required_error: "Por favor introduzca su numero de cedula" })
      .max(8, "Su numero de cedula no puede tener mas de 8 digitos."),
  })
  .required();

const isLoading = ref(false);
const errorMessage = ref(undefined);
type Schema = z.output<typeof schema>;

async function signup(data: any) {
  console.log(data);
  try {
    isLoading.value = true;
    const res = await $fetch(
      "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/auth/signup",
      {
        method: "POST",
        body: {
          ...data,
          username: data.username?.toLowerCase(),
          phone: formatPhoneNumber(data.phone),
        },
      },
    );
    if (res) {
      isLoading.value = false;
      navigateTo("/login");
    }
  } catch (e) {
    console.error(e);
    isLoading.value = false;
    //@ts-ignore
    errorMessage.value = e.message;
  }
}
const selected = ref(false);
</script>
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
        default: { submitButton: { label: 'Registrarse' } },
      }"
      @submit="signup"
    >
      <template #title
        ><img src="/img/vclogolight.png" alt="" />
        <div>
          Bienvenido al sistema Aptsys del Centro Clinico Vista Centro
        </div></template
      >
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
<style scoped></style>
