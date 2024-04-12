<script setup lang="ts">
//@ts-ignore
import type { Period, Range } from "~/types";
import { sub } from "date-fns";
import { useDashboard } from "~/composables/useDashboard";
import useAllApts from "~/composables/useAllApts";

definePageMeta({
  middleware: "admin",
});

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
        <div class="grid lg:grid-cols-3 lg:items-start gap-8 mt-8">
          <NuxtLink to="/admin/appointments">
            <UDashboardCard
              class="w-full"
              title="Citas por confirmar"
              :description="`Hay ${unconfirmedAppointments.length} citas por confirmar`"
              icon="i-heroicons-bookmark"
            >
              <UProgress
                :value="aptsData.length - unconfirmedAppointments.length"
                :max="aptsData.length"
              />
            </UDashboardCard>
          </NuxtLink>
          <NuxtLink to="/admin/doctors">
            <UDashboardCard class="w-full">
              <template #title> Medicos</template>
              <template #icon>
                <UIcon class="text-6xl" name="i-heroicons-user-group" />
              </template>
            </UDashboardCard>
          </NuxtLink>
          <NuxtLink to="/admin/users">
            <UDashboardCard class="w-full">
              <template #title> Usuarios/Pacientes</template>
              <template #icon>
                <UIcon class="text-6xl" name="i-heroicons-user" />
              </template>
            </UDashboardCard>
          </NuxtLink>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped></style>
