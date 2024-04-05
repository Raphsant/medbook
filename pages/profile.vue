<script setup>
import { useAuthStore } from "~/store/auth";
definePageMeta({
  middleware: "auth",
});
const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const userInfo = ref(await getUserProfile());
const userForm = ref({
  firstName: userInfo?.value?.firstName,
  lastName: userInfo?.value?.lastName,
  email: userInfo?.value?.email,
});
const isEditFormActive = ref(false);
const isLoading = ref(false);
const toast = useToast();

async function getUserProfile() {
  const url = `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/user/profile`;
  try {
    const { pending, data: res } = await useLazyAsyncData(() =>
      $fetch(url, {
        method: "GET",
        headers: {
          "x-access-token": user.token,
        },
      }),
    );
    if (res) console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function updateUserProfile() {
  const url = `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/user/update`;
  try {
    isLoading.value = true;
    const res = await $fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        userId: user.id,
      },
      body: {
        newData: userForm.value,
        userId: user.id,
      },
    });

    await refreshNuxtData();
    isLoading.value = false;
    isEditFormActive.value = false;
    toast.add({ title: "Usuario actualizado correctamente" });
  } catch (e) {
    console.error(e);
    return [];
  }
}
</script>

<template>
  <UContainer class="my-10">
    <UPage>
      <template #left></template>

      <UPageBody>
        <UCard class="">
          <template #header class="flex justify-center items-center">
            <div class="flex justify-center items-center">
              <div class="w-full text-center text-2xl">Ficha del paciente</div>
              <UButton
                @click="isEditFormActive = true"
                icon="i-heroicons-pencil-square"
                size="sm"
                color="primary"
                variant="outline"
                label="Editar"
                :trailing="false"
              />
            </div>
          </template>
          <UContainer
            class="flex flex-col justify-center items-center gap-5 text-xl"
          >
            <UDivider label="Nombre Completo" />
            <lazydiv>
              {{
                userInfo
                  ? userInfo.firstName + " " + userInfo.lastName
                  : "Loading"
              }}
            </lazydiv>
            <UDivider label="Cedula de Identidad" />
            <div>{{ userInfo ? userInfo.id : "Loading" }}</div>
            <UDivider label="Correo Electronico" />
            <div>{{ userInfo ? userInfo.email : "Loading" }}</div>
          </UContainer>
        </UCard>
      </UPageBody>
      <template #right>
        <UPageCard class="w-full">
          <template #title
            ><span class="text-md">Nuestro Horario</span></template
          >
          <template #description
            ><p>Lunes a Viernes</p>
            <p>7am - 5pm</p></template
          >
        </UPageCard>
      </template>
    </UPage>
    <UModal v-model="isEditFormActive">
      <UCard>
        <template #header> Editar Usuario</template>
        <template #default>
          <UForm class="space-y-2.5">
            <UFormGroup label="Nombre">
              <UInput v-model="userForm.firstName" label="First Name" />
            </UFormGroup>
            <UFormGroup label="Apellido">
              <UInput v-model="userForm.lastName" label="Last Name" />
            </UFormGroup>
            <UFormGroup label="Correo Electronico">
              <UInput v-model="userForm.email" label="Email" />
            </UFormGroup>
            <UButton @click="updateUserProfile" label="Guardar" />
          </UForm>
        </template>
      </UCard>
    </UModal>
  </UContainer>

  <!--  <div class="w-screen p-10 flex justify-center items-center">-->
  <!--    <div-->
  <!--        class="bg-cream w-[30rem] h-[30rem] flex flex-col justify-around text-center items-center rounded-lg shadow-2xl gap-1">-->
  <!--      <div class="text-2xl">-->
  <!--        <span>Ficha de Paciente</span>-->
  <!--      </div>-->
  <!--      <div class="space-y-2">-->
  <!--        <div>Cedula de identidad:</div>-->
  <!--        <div>{{ userInfo.id }}</div>-->
  <!--      </div>-->
  <!--      <div class="space-y-2">-->
  <!--        <div>Nombre Completo:</div>-->
  <!--        <div v-if="!isEditFormActive">{{ userInfo.firstName }} {{ userInfo.lastName }}</div>-->
  <!--        <input class="p-1 rounded-md bg-gray-100 shadow-inner shadow-black/20 w-[10rem]" v-if="isEditFormActive"-->
  <!--               v-model="userForm.firstName"> <input-->
  <!--          class="p-1 rounded-md bg-gray-100 shadow-inner shadow-black/20 w-[10rem]" v-if="isEditFormActive"-->
  <!--          v-model="userForm.lastName">-->
  <!--      </div>-->
  <!--      <div class="space-y-2">-->
  <!--        <div>Correo Electronico:</div>-->
  <!--        <div v-if="!isEditFormActive">-->
  <!--          {{ userInfo.email }}-->
  <!--        </div>-->
  <!--        <input class="p-1 rounded-md bg-gray-100 shadow-inner shadow-black/20 w-[10rem]" v-if="isEditFormActive"-->
  <!--               v-model="userForm.email">-->

  <!--        <div class="pt-10 space-x-2" :class="[{'flex' : isEditFormActive}]">-->
  <!--          <button @click="isEditFormActive = !isEditFormActive" class="bg-green-300 px-2 py-1 rounded-lg shadow-md"-->
  <!--                  :class="[{'bg-orange-300' : isEditFormActive}]">-->
  <!--            {{ isEditFormActive ? "Cancelar" : "Editar" }}-->
  <!--          </button>-->
  <!--          <button v-if="isEditFormActive" @click="updateUserProfile"-->
  <!--                  class="flex justify-center items-center bg-green-300 px-2 py-1 rounded-lg shadow-md">-->
  <!--            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-900"-->
  <!--                 xmlns="http://www.w3.org/2000/svg" fill="none"-->
  <!--                 viewBox="0 0 24 24">-->
  <!--              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
  <!--              <path class="opacity-75" fill="currentColor"-->
  <!--                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>-->
  <!--            </svg>-->
  <!--            {{ isLoading ? "Guardando..." : "Guardar" }}-->
  <!--          </button>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped></style>
