<script setup>
//defining admin layout
import formatDateTime from "~/helper/formatDateTime.js";

definePageMeta({
  middleware: "admin",
});

definePageMeta({
  layout: "admin",
});
//Import user from Pinia for fetching related uses
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));

//Get appointment list from the Database
const { pending, data, error } = await useFetch(
  "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/getAllApts",
  {
    method: "GET",
    onRequest({ request, options }) {
      options.headers = {
        "x-access-token": user.token,
      };
    },
    onRequestError(context) {
      console.error(context.error.message);
    },
    onResponse(context) {
      console.log(context.response._data);
    },
    onResponseError(context) {},
  },
);
//state Variables
const apts = ref("");
watch(apts, async (newApts, oldApts) => {
  apts.value = newApts;
});

//iterating through the data array, so we can join the user & doctor names to get the full name.
const modifyArray = () => {
  if (data) {
    let dataArray = Object.values(data.value);
    apts.value = dataArray.map((appointment) => {
      // Extract the first element from the users and doctors arrays
      const user = appointment.users[0];
      const doctor = appointment.doctors[0];

      // Create modified names
      const modifiedUserName = `${user.firstName} ${user.lastName}`;
      const modifiedDoctorName = `${doctor.firstName} ${doctor.lastName}`;
      const status =
        appointment.status.charAt(0).toUpperCase() +
        appointment.status.slice(1).toLowerCase();

      // Return a new object with the desired structure and modified names
      return {
        ...appointment,
        user: { ...user, name: modifiedUserName },
        doctor: { ...doctor, name: modifiedDoctorName },
        dateTime: formatDateTime(appointment.dateTime),
        status: status,
        users: undefined, // Remove the original users array
        doctors: undefined, // Remove the original doctors array
      };
    });
  }
};
modifyArray();
const selected = ref([apts.value[0]]);
//Array of columns that will populate the Appointment Table
const defaultColumns = [
  {
    key: "id",
    label: "Numero de cita",
  },
  {
    key: "dateTime",
    label: "Fecha y Hora",
  },
  {
    key: "doctor.specialty",
    label: "Especialidad",
  },
  {
    key: "doctor.name",
    label: "Doctor",
  },
  {
    key: "user.name",
    label: "Paciente",
  },
  {
    key: "status",
    label: "Estado",
  },
];

/**
 * Modifies the status of an appointment.
 *
 * @param {object} appointment - The appointment object to modify.
 * @param {string} status - The new status for the appointment.
 * @returns {Promise<void>} - A Promise that resolves once the modification is complete.
 */
async function modifyAppointment(appointment, status) {
  const url = "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/confirm";
  try {
    const res = await $fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
      body: {
        id: appointment.id,
        status: status,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Handles the confirmation of an appointment.
 *
 * @param {string} status - The confirmation status.
 * @returns {Promise<void>} A promise that resolves when the confirmation is handled.
 */

async function handleConfirmation(status) {
  Object.entries(selected.value).forEach(([key, value]) => {
    if (value) modifyAppointment(value, status);
  });
  await refreshNuxtData();
  await modifyArray();
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Citas">
        <template #left>
          <div class="flex gap-4">
            <div>Citas</div>
            <div>|</div>
            <div class="text-md text-gray-500">
              {{ data.length }} {{ data.length == 1 ? "Cita" : "Citas" }}
            </div>
          </div>
        </template>
        <template #right>
          <UInput
            ref="input"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter users..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
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
            @click="handleConfirmation('confirmada')"
            label="Confirmar Cita"
            icon="i-heroicons-check-badge"
          />
          <UButton
            @click="handleConfirmation('cancelada')"
            label="Cancelar Cita"
            icon="i-heroicons-trash"
            color="red"
          /><UButton
            @click="handleConfirmation('en espera')"
            label="Cita en espera"
            icon="i-heroicons-clock"
            color="orange"
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
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :columns="defaultColumns"
        :rows="apts"
        :loading="pending"
      >
        <template #status-data="{ row }">
          <UBadge
            size="lg"
            :label="row.status"
            :color="
              row.status === 'Confirmada'
                ? 'green'
                : row.status === 'En espera'
                  ? 'orange'
                  : row.status === 'Cancelada'
                    ? 'red'
                    : 'gray'
            "
            variant="subtle"
          />
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped></style>
