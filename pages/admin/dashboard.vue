<script setup lang="ts">
//@ts-ignore
import type { Period, Range } from "~/types";
import { sub } from "date-fns";
import { useDashboard } from "~/composables/useDashboard";
import useAllApts from "~/composables/useAllApts";

definePageMeta({
  layout: "admin",
});

const {
  pending: aptsPending,
  data: aptsData,
  error: aptsError,
} = await useAllApts();

const unconfirmedAppointments = aptsData.value.filter(
  (apt) => !apt.isConfirmed,
);
const { isNotificationsSlideoverOpen } = useDashboard();

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");
</script>

<template>
  <UDashboardPage class="text-white">
    <UDashboardPanel grow>
      <UDashboardNavbar title="Panel Principal">
        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="red" inset>
                <UIcon name="i-heroicons-bell" class="w-5 h-5" />
              </UChip>
            </UButton>
          </UTooltip>
          <UDropdown>
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <AdminHomeDateRangePicker v-model="range" class="-ml-2.5" />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <AdminHomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
      <UDashboardPanelContent>
        <AdminHomeChart :period="period" :range="range" :apts="aptsData" />
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <UDashboardCard
            class="w-fit"
            title="Citas por confirmar"
            :description="`Hay ${unconfirmedAppointments.length} citas por confirmar`"
            icon="i-heroicons-bookmark"
          >
            <UProgress
              :value="aptsData.length - unconfirmedAppointments.length"
              :max="aptsData.length"
            />
          </UDashboardCard>
        </div>
        <UDivider label="Atajos" />
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <UDashboardCard
            class="w-fit"
            title="Agregar Medico"
            icon="i-heroicons-user"
          >
          </UDashboardCard>
        </div>
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <UDashboardCard
            class="w-fit"
            title="Generar Reporte Diario"
            icon="i-heroicons-chart-pie"
          >
          </UDashboardCard>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped></style>
