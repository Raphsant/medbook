<script setup lang="ts">
import {
  sub,
  format,
  isSameDay,
  type Duration,
  setDefaultOptions,
} from "date-fns";
import { es } from "date-fns/locale";
import { useAuthStore } from "~/store/auth";
import formatDateTime from "~/helper/formatDateTime";
import html2pdf from "html2pdf.js/src";

const config = useRuntimeConfig();
const pdfSection = ref<HTMLElement | null>(null);
const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
setDefaultOptions({ locale: es });
definePageMeta({
  layout: "admin",
});

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() });

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() };
  console.log(selected.value);
}

async function fetchData() {
  try {
    const res = await $fetch(`${config.public.serverUri}/api/apts/report`, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        start: selected.value.start.toISOString(),
        end: selected.value.end.toISOString(),
      },
    });

    if (res) {
      let dataArray = Object.values(res);
      //@ts-ignore
      reportData.value = dataArray.map((appointment) => {
        // Extract the first element from the users and doctors arrays
        const user = appointment.users[0];
        const doctor = appointment.doctors[0];

        // Create modified names
        const modifiedUserName = `${user.firstName} ${user.lastName}`;
        const modifiedDoctorName = `${doctor.firstName} ${doctor.lastName}`;
        const status = appointment.isConfirmed ? "Confirmada" : "En Espera";

        // Return a new object with the desired structure and modified names
        return {
          ...appointment,
          user: { ...user, name: modifiedUserName },
          doctor: { ...doctor, name: modifiedDoctorName },
          dateTime: formatDateTime(appointment.dateTime),
          isConfirmed: status,
          createdAt: format(appointment.createdAt, "PPpp"),
          updatedAt: format(appointment.updatedAt, "PPpp"),
          users: undefined, // Remove the original users array
          doctors: undefined, // Remove the original doctors array
        };
      });
      //@ts-ignore
    }
    console.log(reportData.value);
  } catch (e) {
    console.log(e);
  }
}

const reportData = ref("");

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
    key: "createdAt",
    label: "Fecha Creada",
  },
  {
    key: "updatedAt",
    label: "Fecha Modificada",
  },
];

const openInWindow = async (HTMLElement: HTMLElement) => {
  //@ts-ignore
  const pdf = await htmlToPDF(pdfSection.value, undefined, {
    html2canvas: {
      scale: 0.5,
      useCORS: true,
    },
  });
  const totalPages = pdf.getNumberOfPages();
  const pdfHeight = pdf.getPageHeight();
  await pdf.html("<b>CENTRO CLINICO VISTA CENTRO</b>", {
    x: 20,
    y: (pdfHeight - 50) * totalPages, // place in the bottom
  });
  const blob = pdf.output("blob");
  window.open(URL.createObjectURL(blob), "_blank");
};
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #left>
          <div class="flex gap-4">
            <div>Generar Reporte</div>
          </div>
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <template #left>
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid">
              {{ format(selected.start, "d MMM, yyy") }} -
              {{ format(selected.end, "d MMM, yyy") }}
            </UButton>

            <template #panel="{ close }">
              <div
                class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
              >
                <div class="hidden sm:flex flex-col py-4">
                  <UButton
                    v-for="(range, index) in ranges"
                    :key="index"
                    :label="range.label"
                    color="gray"
                    variant="ghost"
                    class="rounded-none px-6"
                    :class="[
                      isRangeSelected(range.duration)
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                    ]"
                    truncate
                    @click="selectRange(range.duration)"
                  />
                </div>

                <DatePicker v-model="selected" @close="close" locale="es" />
              </div>
            </template>
          </UPopover>
          <UButton @click="fetchData">
            <template #default>Generar</template>
          </UButton>
          <span
            >Selecciona un rango de fechas y preciona el boton "Generar"</span
          >
        </template>
        <template #right>
          <UButton v-if="reportData" label="Imprimir" @click="openInWindow" />
        </template>
      </UDashboardToolbar>
      <div ref="pdfSection">
        <UDashboardPanelContent>
          <div class="bg-white pdfCss">
            <UDashboardSection v-if="reportData">
              <template #title>
                <div class="text-4xl text-black">
                  Reporte de citas del dia
                  {{ format(selected.start, "d MMM, yyy") }} al
                  {{ format(selected.end, "d MMM, yyy") }}
                </div>
                <div class="text-black">
                  Numero de citas agendadas: {{ reportData.length }}
                </div>
                <div class="font-light text-black text-md">
                  Reporte generado por usuario: {{ user.username }}
                </div>
              </template>
              <template #default>
                <UTable
                  class="w-fit text-black"
                  :columns="defaultColumns"
                  :rows="reportData"
                  :ui="{
                    th: { color: 'text-black' },
                    td: { color: 'text-black' },
                  }"
                />
              </template>
            </UDashboardSection>
          </div>
        </UDashboardPanelContent>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>
.pdfCss {
  color: black !important;
}
</style>
