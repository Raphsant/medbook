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

async function signup(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  try {
    isLoading.value = true;
    const res = await $fetch(
      "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/auth/signup",
      {
        method: "POST",
        body: {
          ...signupForm.value,
          username: signupForm.value.username.toLowerCase(),
          phone: formatPhoneNumber(signupForm.value.phone),
        },
      },
    );
    if (res) {
      isLoading.value = false;
      navigateTo("/");
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
  <div v-if="!isMobile">
    <UCard>
      <template #header>
        <div>
          Bienvenido al Sistema De Citas Del Centro Clinico Vista Centro
        </div>
        <div class="text-red-600 text-center" v-if="errorMessage">
          Un error ha ocurrido, por favor intentelo de nuevo.
        </div>
      </template>
      <UForm
        :schema="schema"
        :state="signupForm"
        class="space-y-4"
        @submit="signup"
      >
        <div class="text-gray-500 text-sm">
          *Todos los campos son requeridos
        </div>
        <UFormGroup label="Nombre de Usuario" name="username">
          <UInput v-model="signupForm.username" />
        </UFormGroup>
        <UFormGroup label="Cedula de identidad" name="id">
          <UInput v-model="signupForm.id" />
        </UFormGroup>
        <UFormGroup label="Nombre" name="firstName">
          <UInput v-model="signupForm.firstName" />
        </UFormGroup>
        <UFormGroup label="Apeliido" name="lastName">
          <UInput v-model="signupForm.lastName" />
        </UFormGroup>
        <UFormGroup label="Correo Electronico" name="email">
          <UInput v-model="signupForm.email" />
        </UFormGroup>
        <UFormGroup label="Numero Telefonico / Whatsapp " name="phone">
          <UInput v-model="signupForm.phone">
            <template #trailing><span>🇻🇪</span></template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Contraseña" name="password">
          <UInput v-model="signupForm.password" type="password" />
        </UFormGroup>
        <div class="flex gap-4 justify-start items-center">
          <UButton :loading="isLoading" type="submit"> Entrar</UButton>
          <div class="flex justify-center items-center gap-2">
            <span
              class="cursor-pointer underline underline-white"
              @click="isOpen = true"
              color="primary"
              >Click aqui para leer nuestros Terminos y condiciones</span
            >
          </div>
        </div>
      </UForm>
      <USlideover class="h-full items-center" v-model="isOpen">
        <UDashboardCard>
          <template #header> Terminos y Condiciones</template>
          <div class="p-4 flex-1">
            Al usar este servicio usted acepta que el Centro Clinico Vista
            Centro use su numero de telefono para contactarlo mediante Whatsapp
            con informacion relevante a sus citas medicas. El Centro Clinico
            Vista Centro y el sistema Medbook no vendera ni distribuira su
            informacion con ningun tercero bajo ninguna circumstancia
          </div>
          <template #footer>
            <UButton block @click="isOpen = false">Cerrar</UButton>
          </template>
        </UDashboardCard>
      </USlideover>
    </UCard>
  </div>
  <div v-if="isMobile">
    <UCard>
      <template #header>
        <div class="w-full flex flex-col gap-1 justify-center items-center">
          <div class="text-lg text-gray-500 text-center">
            Bienvenido al sistema Medbook de
          </div>
          <div class="text-primary text-center">
            Centro Clinico Vista Centro
          </div>
        </div>
      </template>
      <UForm class="space-y-4" @submit="signup">
        <UFormGroup label="Nombre de Usuario">
          <UInput
            size="xl"
            v-model="signupForm.username"
            icon="i-heroicons-at-symbol"
          />
        </UFormGroup>
        <UFormGroup label="Primer Nombre">
          <UInput
            size="xl"
            v-model="signupForm.firstName"
            icon="i-heroicons-user"
          />
        </UFormGroup>
        <UFormGroup label="Apellido">
          <UInput
            size="xl"
            v-model="signupForm.lastName"
            icon="i-heroicons-user"
          />
        </UFormGroup>
        <UFormGroup label="Cedula de Identidad">
          <UInput
            size="xl"
            v-model="signupForm.id"
            icon="i-heroicons-identification"
          />
        </UFormGroup>
        <UFormGroup label="Correo Electronico">
          <UInput
            size="xl"
            v-model="signupForm.email"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>
        <UFormGroup label="Contraseña">
          <UInput
            type="password"
            size="xl"
            v-model="signupForm.password"
            icon="i-heroicons-key"
          />
        </UFormGroup>
        <UButton type="submit" block>Registrarse</UButton>
      </UForm>
      <template #footer>
        <div class="flex flex-col justify-center items-center gap-4">
          <div class="text-sm text-center">
            Al ingresar estas aceptando nuestros
            <span class="text-primary">terminos y condidiciones</span>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped></style>
