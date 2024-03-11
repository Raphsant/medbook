<script setup lang="ts">
import {useDashboard} from "~/composables/useDashboard";

definePageMeta({
  layout: "admin"
})

const {isNotificationsSlideoverOpen} = useDashboard()
</script>

<template>
  <UDashboardPage class="text-white">
    <UDashboardPanel grow>
      <UDashboardNavbar title="Panel Principal">
        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton color="gray" variant="ghost" square @click="isNotificationsSlideoverOpen = true">
              <UChip color="red" inset>
                <UIcon name="i-heroicons-bell" class="w-5 h-5"/>
              </UChip>
            </UButton>
          </UTooltip>
          <UDropdown>
            <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full"/>
          </UDropdown>
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent>
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <UDashboardCard class="w-fit"
                          title="Citas por confirmar"
                          description="Existen 35 citas por la espera de confirmacion"
                          icon="i-heroicons-bookmark"
          >

          </UDashboardCard>
        </div>
        <UDivider label="Atajos"/>
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <UDashboardCard class="w-fit"
                          title="Agregar Medico"
                          icon="i-heroicons-user"
          >
          </UDashboardCard>
        </div>
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <UDashboardCard class="w-fit"
                          title="Generar Reporte Diario"
                          icon="i-heroicons-chart-pie"
          >
          </UDashboardCard>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>