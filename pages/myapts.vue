<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { date } from "yup";

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const apts = ref([]); // Define a reactive variable to store appointments

async function getApts() {
  const url = `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/getUserApts`;
  try {
    const res = await $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        userId: user.id,
      },
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function populateAptCard(id) {
  const doc = await useDoctors(id);
  return doc || {};
}

onMounted(async () => {
  const fetchedApts = await getApts();
  apts.value = await Promise.all(
    fetchedApts.map(async (apt) => {
      const doc = await populateAptCard(apt.doctorId);
      const modifiedName = `${doc.firstName} ${doc.lastName}`; // modify the doctor's name by joining first and last name
      return {
        ...apt,
        doctor: { ...doc, firstName: modifiedName },
        dateTime: formatDateTime(apt.dateTime),
      };
    }),
  );
  await console.log(apts.value);
});

function formatDateTime(dateTimeString) {
  // Create a Date object from the dateTimeString
  let date = new Date(dateTimeString);

  // Options for toLocaleString to get day of the week, date, and time in 12-hour format
  let options = {
    weekday: "long", // day of the week
    day: "2-digit", // day in two digits
    month: "2-digit", // month in two digits
    year: "2-digit", // two-digit year
    hour: "numeric", // hour
    minute: "numeric", // minutes
    hour12: true, // 12-hour format
  };

  // Convert to Spanish locale
  return date.toLocaleString("es-ES", options);
}

const columns = [
  {
    key: "dateTime",
    label: "Fecha y Hora",
  },
  {
    key: "doctor.specialty",
    label: "Especialidad",
  },
  {
    key: "doctor.firstName",
    label: "Doctor",
  },
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return apts.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});
</script>

<template>
  <div class="w-screen flex justify-center items-center">
    <div class="w-1/2">
      <UCard>
        <template #header>
          <div class="text-2xl">Mis Citas</div>
        </template>
        <div>
          <UTable
            loading
            :loading-state="{
              icon: 'i-heroicons-arrow-path-20-solid',
              label: 'Cargando...',
            }"
            :rows="rows"
            :columns="columns"
          />
          <div
            class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
          >
            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="apts.length"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
