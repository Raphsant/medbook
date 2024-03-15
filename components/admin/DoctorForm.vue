<script setup>

import {useAuthStore} from "~/store/auth";


const timeHH = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]
const timeMM = ["00","30"]
const selectedStartHH = ref({
  "lunes": undefined,
  "martes": undefined,
  "miercoles": undefined,
  "jueves": undefined,
  "viernes": undefined
})
const selectedStartMM = ref({
  "lunes": undefined,
  "martes": undefined,
  "miercoles": undefined,
  "jueves": undefined,
  "viernes": undefined
})
const selectedEndHH = ref({
  "lunes": undefined,
  "martes": undefined,
  "miercoles": undefined,
  "jueves": undefined,
  "viernes": undefined
})
const selectedEndMM = ref({
  "lunes": undefined,
  "martes": undefined,
  "miercoles": undefined,
  "jueves": undefined,
  "viernes": undefined
})
const isActive = ref({
  "lunes": false,
  "martes": false,
  "miercoles": false,
  "jueves": false,
  "viernes": false
})
const docData = ref({
  id: "",
  firstName: "",
  lastName: "",
  specialty: "",
  schedule: undefined,
  phone: "",
})
const isLoading = ref(false)
const emit = defineEmits(['closeModal'])


async function uploadDoctor() {
  isLoading.value = true;
  const authStore = useAuthStore();
  const schedule = {
    "Monday": {
      active: isActive.value.lunes,
      times: {
        endTime: `${selectedEndHH.value.lunes}:${selectedEndMM.value.lunes}`,
        startTime: `${selectedStartHH.value.lunes}:${selectedStartMM.value.lunes}`,
      },

    },
    "Tuesday": {
      active: isActive.value.martes,
      times: {
        endTime: `${selectedEndHH.value.martes}:${selectedEndMM.value.martes}`,
        startTime: `${selectedStartHH.value.martes}:${selectedStartMM.value.martes}`,
      }
    },
    "Wednesday": {
      active: isActive.value.miercoles,
      times: {
        endTime: `${selectedEndHH.value.miercoles}:${selectedEndMM.value.miercoles}`,
        startTime: `${selectedStartHH.value.miercoles}:${selectedStartMM.value.miercoles}`,
      }

    },
    "Thursday": {
      active: isActive.value.jueves,
      times: {
        endTime: `${selectedEndHH.value.jueves}:${selectedEndMM.value.jueves}`,
        startTime: `${selectedStartHH.value.jueves}:${selectedStartMM.value.jueves}`,
      }
    },
    "Friday": {
      active: isActive.value.viernes,
      times: {
        endTime: `${selectedEndHH.value.viernes}:${selectedEndMM.value.viernes}`,
        startTime: `${selectedStartHH.value.viernes}:${selectedStartMM.value.viernes}`,
      }
    },
  }
  docData.value.schedule = schedule;
  const user = JSON.parse(JSON.stringify(authStore.getUser));
  const url = "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/doctor/create";
  try {
    const res = await $fetch(url, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
      body: docData.value


    });
    isLoading.value = false;
    emit('closeModal')
    return JSON.parse(JSON.stringify(res));
  } catch (e) {
    console.error(e);


  }



}




</script>

<template>
  <UForm @submit="uploadDoctor" class="space-y-3">
    <UDivider label="Datos"/>
    <UFormGroup label="Cedula de Identidad" name="id">
      <UInput v-model="docData.id"/>
    </UFormGroup>
    <UFormGroup label="Primer Nombre" name="firstName">
      <UInput v-model="docData.firstName"/>
    </UFormGroup>
    <UFormGroup label="Apellido" name="lastName">
      <UInput v-model="docData.lastName"/>
    </UFormGroup>
    <UFormGroup label="Numero de telefono/Whatsapp" name="phone">
      <UInput v-model="docData.phone"/>
    </UFormGroup>
    <UFormGroup label="Especialidad" name="specialty">
      <UInput v-model="docData.specialty"/>
    </UFormGroup>
    <UFormGroup>
      <div class="flex flex-col space-y-4">
        <div class="space-x-2.5 flex justify-between items-center">
          <UCheckbox v-model="isActive.lunes" class="w-[7rem]" label="Lunes"/>
          <USelectMenu v-model="selectedStartHH.lunes" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedStartMM.lunes" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>
          <UDivider orientation="vertical"/>
          <USelectMenu v-model="selectedEndHH.lunes" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedEndMM.lunes" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>
        </div>
        <div class="space-x-2.5 flex justify-start items-center">
          <UCheckbox v-model="isActive.martes" class="w-[7rem]" label="Martes"/>
          <USelectMenu v-model="selectedStartHH.martes" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedStartMM.martes" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>
          <UDivider orientation="vertical"/>
          <USelectMenu v-model="selectedEndHH.martes" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedEndMM.martes" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>
        </div>
        <div class="space-x-2.5 flex justify-start items-center">
          <UCheckbox v-model="isActive.miercoles" class="w-[7rem]" label="Miercoles"/>
          <USelectMenu v-model="selectedStartHH.miercoles" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedStartMM.miercoles" :options="timeMM" placeholder="10" class="w-[4.5rem]"/>
          <UDivider orientation="vertical"/>
          <USelectMenu v-model="selectedEndHH.miercoles" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedEndMM.miercoles" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>

        </div>
        <div class="space-x-2.5 flex justify-start items-center">
          <UCheckbox v-model="isActive.jueves" class="w-[7rem]" label="Jueves"/>
          <USelectMenu v-model="selectedStartHH.jueves" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedStartMM.jueves" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>
          <UDivider orientation="vertical"/>
          <USelectMenu v-model="selectedEndHH.jueves" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedEndMM.jueves" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>

        </div>
        <div class="space-x-2.5 flex justify-start items-center">
          <UCheckbox v-model="isActive.viernes" class="w-[7rem]" label="Viernes"/>
          <USelectMenu v-model="selectedStartHH.viernes" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedStartMM.viernes" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>
          <UDivider orientation="vertical"/>
          <USelectMenu v-model="selectedEndHH.viernes" :options="timeHH" placeholder="10" class="w-[4.5rem]"/>
          <USelectMenu v-model="selectedEndMM.viernes" :options="timeMM" placeholder="00" class="w-[4.5rem]"/>

        </div>
      </div>
    </UFormGroup>
    <UDivider/>
    <UButton v-if="!isLoading" type="submit" class="text-center" label="Guardar"/>
    <UButton loading v-if="isLoading" type="submit" class="text-center" label="Guardar"/>
  </UForm>
</template>

<style scoped>

</style>