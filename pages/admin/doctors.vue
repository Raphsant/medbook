<script setup>
import Admin from "~/layouts/admin.vue";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "admin",
});

definePageMeta({
  layout: "admin",
});

const doctors = ref(await useDoctors());
const isNewDoctorModalOpen = ref(false);
const isDelecteDoctorModalOpen = ref(false);
const selected = ref([doctors[1]]);
const toast = useToast();
const defaultColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "firstName",
    label: "Nombre",
    sortable: true,
  },
  {
    key: "lastName",
    label: "Apellido",
    sortable: true,
  },
  {
    key: "specialty",
    label: "Especialidad",
    sortable: true,
  },
];

const handleClose = async () => {
  doctors.value = await useDoctors();
  isNewDoctorModalOpen.value = false;
  toast.add({ title: "Medico agregado correctamente." });
};

async function DeleteDoctor(id) {
  const authStore = useAuthStore();
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  const url =
    "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/doctor/delete";
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
    doctors.value = await useDoctors();
  } catch (e) {
    console.error(e);
  }
}

function handleDelection() {
  Object.entries(selected.value).forEach(([key, value]) => {
    if (value) DeleteDoctor(value.id);
  });

  isDelecteDoctorModalOpen.value = false;
  console.log(selected.value);
}

const filter = ref("");

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
    label: "Especialidad",
    key: "specialty",
  },
  {
    label: "Cedula",
    key: "id",
  },
];

const selectedFilter = ref(filterAttribute[0]);

const doctorsArray = computed(() => {
  return doctors.value.filter((item) => {
    if (selectedFilter.value.key !== "id")
      return item[selectedFilter.value.key]
        .toLowerCase()
        .includes(filter.value.toLowerCase());
    return item[selectedFilter.value.key].toString().includes(filter.value);
  });
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Medicos">
        <template #left>
          <div>
            Medicos |
            <span class="text-md text-gray-500"
              >{{ doctors.length }} Medicos</span
            >
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
          <UButton
            @click="isNewDoctorModalOpen = !isNewDoctorModalOpen"
            label="Nuevo Medico"
            icon="i-heroicons-plus"
            color="primary"
          />
          <UButton
            label="Eliminar Medico"
            @click="isDelecteDoctorModalOpen = true"
            icon="i-heroicons-trash"
            color="red"
          />
        </template>

        <template #right>
          <USelectMenu
            icon="i-heroicons-adjustments-horizontal-solid"
            multiple
            class="hidden lg:block"
          >
            <template #label> Display</template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>
      <UTable
        v-model="selected"
        :columns="defaultColumns"
        :rows="doctorsArray"
      ></UTable>
      <UDashboardModal
        v-model="isNewDoctorModalOpen"
        title="Nuevo Doctor"
        description="Agrega un nuevo doctor al sistema de citas"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <AdminDoctorForm @close-modal="handleClose" />
      </UDashboardModal>
    </UDashboardPanel>
    <UDashboardModal
      v-model="isDelecteDoctorModalOpen"
      title="Delete account"
      description="Are you sure you want to delete your account?"
      icon="i-heroicons-exclamation-circle"
      :ui="{
        icon: { base: 'text-red-500 dark:text-red-400' },
        footer: { base: 'ml-16' },
      }"
    >
      <template #footer>
        <UButton
          color="red"
          label="Delete"
          :loading="loading"
          @click="handleDelection"
        />
        <UButton color="white" label="Cancel" @click="open = false" />
      </template>
    </UDashboardModal>
  </UDashboardPage>
</template>

<style scoped></style>
