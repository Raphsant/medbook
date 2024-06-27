<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { date } from "yup";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { format, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";

definePageMeta({
  middleware: "auth",
});
setDefaultOptions({ locale: es });
const authStore = useAuthStore();
const config = useRuntimeConfig();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const apts = ref([]); // Define a reactive variable to store appointments
console.log(config);
const { pending, error, data } = useFetch(
  `${config.public.serverUri}/api/apts/getUserApts`,
  {
    method: "GET",
    onRequest({ request, options }) {
      options.headers = {
        "x-access-token": user.token,
      };
    },
    async onResponse({ response, options }) {
      apts.value = await Promise.all(
        response._data.map(async (apt) => {
          const doc = await populateAptCard(apt.doctorId);
          const modifiedName = `${doc.firstName} ${doc.lastName}`; // modify the doctor's name by joining first and last name
          return {
            ...apt,
            doctor: { ...doc, firstName: modifiedName },
            dateTime: format(
              apt.dateTime,
              "iiii, d 'de' MMMM 'de' yyyy 'a las' hh:mm:ss a",
            ),
            status:
              apt.status.charAt(0).toUpperCase() +
              apt.status.slice(1).toLowerCase(),
          };
        }),
      );
      console.log(apts.value);
    },
    query: { userId: user.id },
  },
);

async function populateAptCard(id) {
  const doc = await useDoctors(id);
  return doc || {};
}

function formatAptTime(dateString) {
  const date = new Date(dateString);
  // Convert the date to Caracas time zone
  const timeZone = "America/Caracas";
  const caracasDate = toZonedTime(date, timeZone);
  const formattedDate = format(caracasDate, "PPPPppa", {
    locale: es,
    timeZone,
  });
  return formattedDate;
}

function formatDateTime(dateTimeString) {
  // Create a Date object from the dateTimeString
  toZonedTime(dateTimeString, "Americas/Caracas");
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
  {
    key: "status",
    label: "Estado",
  },
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return apts.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});
</script>

<template>
  <UContainer class="my-10">
    <UPage>
      <div class="w-full flex flex-col justify-center space-y-2.5">
        <div class="">
          <div>
            <UTable
              :loading="pending"
              :loading-state="{
                icon: 'i-heroicons-arrow-path-20-solid',
                label: 'Cargando...',
              }"
              :rows="rows"
              :columns="columns"
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
        </div>
        <div
          class="flex flex-col lg:flex-row justify-center items-center space-y-2.5 lg:space-x-3"
        >
          <UCard :ui="{ background: 'bg-emerald-50' }">
            <template #header>
              <div class="h-fit lg:h-10 flex justify-start items-center">
                Que significa que mi cita esta "en espera" ?
              </div>
            </template>
            <p class="text-gray-400 h-fit lg:h-28">
              La cita "en espera" significa que aún no ha sido confirmada por el
              equipo medico. Debes esperar a que el equipo confirme la cita para
              que sea oficial.
            </p>
          </UCard>
          <UCard :ui="{ background: 'bg-emerald-50' }">
            <template #header>
              <div class="h-fit lg:h-10 flex justify-start items-center">
                El dia de mi cita se acerca y mi cita no ha sido confirmada, que
                hago?
              </div>
            </template>
            <p class="text-gray-400 h-fit lg:h-20">
              Si su cita no ha sido confirmada despues de un tiempo, por favor
              comuniquese con el call center para obtener mas informacion con
              respecto a su cita
            </p>
            <p class="h-fit lg:h-8">
              <span class="text-primary">Callcenter:</span> 02122000000
            </p>
          </UCard>
        </div>
      </div>
    </UPage>
  </UContainer>
</template>
