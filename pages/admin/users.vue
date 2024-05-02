<script setup>
definePageMeta({
  middleware: "admin",
});
definePageMeta({
  layout: "admin",
});

import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const toast = useToast();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const { pending, data, error } = await useFetch(
  "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/user/getAll",
  {
    method: "GET",
    onRequest({ request, options }) {
      options.headers = {
        "x-access-token": user.token,
      };
    },
    onRequestError({ request, options, error }) {
      console.error(error);
    },
    onResponse({ request, response, options }) {
      // Process the response data
      console.log(response._data);
    },
    onResponseError({ request, response, options }) {
      console.error(error);
    },
  },
);

const defaultColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "firstName",
    label: "Nombre",
    icon: "i-heroicon-user",
    sortable: true,
  },
  {
    key: "lastName",
    label: "Apellido",
    sortable: true,
  },
  {
    key: "email",
    label: "Correo Electronico",
    sortable: true,
  },
];
const selected = ref([]);
const isDeleteUserModalOpen = ref(false);

async function DeleteUser(id) {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  const url = "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/user/delete";
  try {
    const res = await $fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
      body: {
        id: id,
      },
    });
    await refreshNuxtData();
    isDeleteUserModalOpen.value = false;
    toast.add({ title: "Usuario Eliminado correctamente." });
  } catch (e) {
    console.error(e);
  }
}

async function ElevateUser(id) {
  const { elevatePending, elevateData, elevateError } = await useFetch(
    "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/user/elevate",
    {
      method: "POST",
      query: {
        userId: id,
      },
      onRequest({ request, options }) {
        options.headers = {
          "x-access-token": user.token,
        };
      },
      onRequestError({ request, options, error }) {
        console.error(error);
      },
      onResponse({ request, response, options }) {
        // Process the response data
        console.log(response._data);
      },
      onResponseError({ request, response, options }) {
        console.error(error);
      },
    },
  );
}

function handleDeletion() {
  Object.entries(selected.value).forEach(([key, value]) => {
    console.log(value);
    console.log(key);
    if (value.username === "webmaster") {
      toast.add({ title: `No se puede eliminar al Webmaster` });
    }
    if (value && value.username !== "webmaster") DeleteUser(value.id);
  });
}

function HandleElevation() {
  Object.entries(selected.value).forEach(([key, value]) => {
    if (value) {
      ElevateUser(value.id);
      toast.add({ title: `Usuario: ${value.id} elevado correctamente` });
    }
  });
}

const filter = ref("");

const usersArray = computed(() => {
  return data.value.filter((item) => {
    if (selectedFilter.value.key !== "id")
      return item[selectedFilter.value.key]
        .toLowerCase()
        .includes(filter.value.toLowerCase());
    return item[selectedFilter.value.key].toString().includes(filter.value);
  });
});

const filterAttribute = [
  {
    label: "Apellido",
    key: "lastName",
  },
  {
    label: "Nombre",
    key: "firstName",
  },
  {
    label: "Cedula",
    key: "id",
  },
];

const selectedFilter = ref(filterAttribute[0]);
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Pacientes">
        <template #left>
          <div class="flex gap-4">
            <div>Pacientes</div>
            <div>|</div>
            <div class="text-md text-gray-500">{{ data.length }} pacientes</div>
          </div>
        </template>
        <template #right>
          <USelectMenu v-model="selectedFilter" :options="filterAttribute" />
          <UInput
            ref="input"
            icon="i-heroicons-funnel"
            autocomplete="off"
            :placeholder="`Filtar por ${selectedFilter.label}...`"
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
            v-model="filter"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <template #left>
          <!--          <UButton label="Agregar Paciente" icon="i-heroicons-plus" variant="outline" color="green" @click="isAddUserModalOpen = true"/>-->
          <UButton
            v-if="user.isAdmin"
            label="Elevar usuario"
            color="primary"
            icon="i-heroicons-chevron-double-up"
            @click="HandleElevation"
          />
          <UButton
            label="Eliminar Paciente"
            icon="i-heroicons-trash"
            color="red"
            @click="isDeleteUserModalOpen = true"
          />
        </template>

        <template #right></template>
      </UDashboardToolbar>
      <UTable
        v-model="selected"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :columns="defaultColumns"
        :rows="usersArray"
        :loading="pending"
      ></UTable>
    </UDashboardPanel>
  </UDashboardPage>
  <UDashboardModal
    v-model="isAddUserModalOpen"
    title="Agregar Usuario"
    description="Solo para ser usado en casos que el paciente necesite ayuda ingresando al sistema."
    icon="i-heroicons-user"
    :ui="{
      icon: { base: 'text-green-500 dark:text-green-400' },
      footer: { base: 'ml-16' },
    }"
  >
    <UForm class="space-y-2.5">
      <UFormGroup label="Cedula de Identidad">
        <UInput v-model="newUserData.id" placeholder="Cedula de Identidad" />
      </UFormGroup>
      <UFormGroup label="Nombre">
        <UInput v-model="newUserData.firstName" placeholder="Nombre" />
      </UFormGroup>
      <UFormGroup label="Apellido">
        <UInput v-model="newUserData.lastName" placeholder="Apellido" />
      </UFormGroup>
      <UFormGroup label="Usuario">
        <UInput v-model="newUserData.username" placeholder="Usuario" />
      </UFormGroup>
      <UFormGroup label="Correo Electronico">
        <UInput v-model="newUserData.email" placeholder="Correo Electronico" />
      </UFormGroup>
      <UFormGroup label="Contrasena">
        <UInput v-model="newUserData.password" placeholder="Contrasena" />
      </UFormGroup>
    </UForm>
    <template #footer>
      <UButton color="primary" label="Delete" />
      <UButton color="white" label="Cancel" />
    </template>
  </UDashboardModal>
  <UDashboardModal
    v-model="isDeleteUserModalOpen"
    title="Eliminar Cuenta de paciente"
    description="Estas seguro que quieres eliminar esta cuenta?"
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' },
      footer: { base: 'ml-16' },
    }"
  >
    <template #footer>
      <UButton color="red" label="Eliminar" @click="handleDeletion()" />
      <UButton
        color="white"
        label="Cancelar"
        @click="isDeleteUserModalOpen = false"
      />
    </template>
  </UDashboardModal>
</template>

<style scoped></style>
