<script setup lang="ts">
import formatPhoneNumber from "~/helper/formatPhoneNumber.js";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { isMobile } = useDevice();
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
    errorMessage.value = e.message;
  }
}

const selected = ref(false);
const isOpen = ref(false);
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
  <!--  <div>-->
  <!--    <UCard>-->
  <!--      <template #header>-->
  <!--        <div>-->
  <!--          <div class="flex flex-col justify-center items-center">-->
  <!--            <img class="w-[20rem]" src="/img/vclogo.png" alt="" />-->
  <!--          </div>-->
  <!--          <div>-->
  <!--            Bienvenido al Sistema De Citas Del Centro Clinico Vista Centro-->
  <!--          </div>-->
  <!--          <div class="text-red-600 text-center" v-if="errorMessage">-->
  <!--            Un error ha ocurrido, por favor intentelo de nuevo.-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </template>-->
  <!--      <UForm-->
  <!--        :schema="schema"-->
  <!--        :state="signupForm"-->
  <!--        class="space-y-4"-->
  <!--        @submit="signup"-->
  <!--      >-->
  <!--        <div class="text-gray-500 text-sm">-->
  <!--          *Todos los campos son requeridos-->
  <!--        </div>-->
  <!--        <UFormGroup label="Nombre de Usuario" name="username">-->
  <!--          <UInput v-model="signupForm.username" />-->
  <!--        </UFormGroup>-->
  <!--        <UFormGroup label="Cedula de identidad" name="id">-->
  <!--          <UInput v-model="signupForm.id" />-->
  <!--        </UFormGroup>-->
  <!--        <UFormGroup label="Nombre" name="firstName">-->
  <!--          <UInput v-model="signupForm.firstName" />-->
  <!--        </UFormGroup>-->
  <!--        <UFormGroup label="Apeliido" name="lastName">-->
  <!--          <UInput v-model="signupForm.lastName" />-->
  <!--        </UFormGroup>-->
  <!--        <UFormGroup label="Correo Electronico" name="email">-->
  <!--          <UInput v-model="signupForm.email" />-->
  <!--        </UFormGroup>-->
  <!--        <UFormGroup label="Numero Telefonico / Whatsapp " name="phone">-->
  <!--          <UInput v-model="signupForm.phone">-->
  <!--            <template #trailing><span>🇻🇪</span></template>-->
  <!--          </UInput>-->
  <!--        </UFormGroup>-->
  <!--        <UFormGroup label="Contraseña" name="password">-->
  <!--          <UInput v-model="signupForm.password" type="password" />-->
  <!--        </UFormGroup>-->
  <!--        <div class="flex gap-4 justify-start items-center">-->
  <!--          <UButton :loading="isLoading" type="submit"> Entrar</UButton>-->
  <!--          <NuxtLink to="/"-->
  <!--            ><UButton color="gray" variant="solid">Regresar</UButton></NuxtLink-->
  <!--          >-->
  <!--          <div class="flex justify-center items-center gap-2">-->
  <!--            <span-->
  <!--              class="cursor-pointer underline underline-white"-->
  <!--              @click="isOpen = true"-->
  <!--              color="primary"-->
  <!--              >Click aqui para leer nuestros Terminos y condiciones</span-->
  <!--            >-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </UForm>-->
  <!--      <USlideover class="h-full items-center" v-model="isOpen">-->
  <!--        <UDashboardCard>-->
  <!--          <template #header> Terminos y Condiciones</template>-->
  <!--          <div class="p-4 flex-1">-->
  <!--            Al usar este servicio usted acepta que el Centro Clinico Vista-->
  <!--            Centro use su numero de telefono para contactarlo mediante Whatsapp-->
  <!--            con informacion relevante a sus citas medicas. El Centro Clinico-->
  <!--            Vista Centro y el sistema Medbook no vendera ni distribuira su-->
  <!--            informacion con ningun tercero bajo ninguna circumstancia-->
  <!--          </div>-->
  <!--          <template #footer>-->
  <!--            <UButton block @click="isOpen = false">Cerrar</UButton>-->
  <!--          </template>-->
  <!--        </UDashboardCard>-->
  <!--      </USlideover>-->
  <!--    </UCard>-->
  <!--  </div>-->
</template>

<style scoped></style>
