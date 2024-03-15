<template>
  <div class="px-10 flex flex-col justify-start items-center h-full space-y-4">
    <USelectMenu
      size="xl"
      searchable
      class="w-1/4 text-center"
      v-model="selectedSpecialty"
      :options="specialtyList"
    />
    <UDivider
      :label="selectedSpecialty"
      :ui="{
        label:
          'text-primary-500 text-3xl font-extralight dark:text-primary-400',
      }"
    />
    <div
      v-if="!isMobile"
      class="lg:grid lg:grid-cols-2 gap-4 flex flex-col justify-center items-center place-items-center py-6 rounded-lg"
    >
      <template v-for="doctor in doctors">
        <UCard v-if="doctor.specialty == selectedSpecialty" class="w-[33rem]">
          <template #header>
            <div></div>
            <div>
              <div class="text-3xl">
                {{ doctor.firstName }} {{ doctor.lastName }}
              </div>
              <div>
                {{ doctor.specialty }}
              </div>
            </div>
            <Placeholder class="h-8" />
          </template>
          <UContainer>
            <div class="flex flex-row gap-10 p-2">
              <div class="flex flex-col" v-if="doctor.schedule?.Monday?.active">
                <div>Lunes</div>
                <div>{{ doctor.schedule?.Monday?.times.startTime }}</div>
                <div>{{ doctor.schedule?.Monday?.times.endTime }}</div>
              </div>
              <div
                class="flex flex-col"
                v-if="doctor.schedule?.Tuesday?.active"
              >
                <div>Martes</div>
                <div>{{ doctor.schedule?.Tuesday?.times.startTime }}</div>
                <div>{{ doctor.schedule?.Tuesday?.times.endTime }}</div>
              </div>
              <div
                class="flex flex-col"
                v-if="doctor.schedule?.Wednesday?.active"
              >
                <div>Miercoles</div>
                <div>{{ doctor.schedule?.Wednesday?.times.startTime }}</div>
                <div>{{ doctor.schedule?.Wednesday?.times.endTime }}</div>
              </div>
              <div
                class="flex flex-col"
                v-if="doctor.schedule?.Thursday?.active"
              >
                <div>Jueves</div>
                <div>{{ doctor.schedule?.Thursday?.times.startTime }}</div>
                <div>{{ doctor.schedule?.Thursday?.times.endTime }}</div>
              </div>
              <div class="flex flex-col" v-if="doctor.schedule?.Friday?.active">
                <div>Viernes</div>
                <div>{{ doctor.schedule?.Friday?.times.startTime }}</div>
                <div>{{ doctor.schedule?.Friday?.times.endTime }}</div>
              </div>
            </div>
          </UContainer>

          <template #footer>
            <NuxtLink :to="`doctor/${doctor.id}`">
              <UButton>Agendar Cita</UButton>
            </NuxtLink>
          </template>
        </UCard>
      </template>
    </div>
  </div>
  <div
    v-if="isMobile"
    class="w-full h-full flex flex-col justify-start items-center pt-10"
  >
    <UContainer class="flex h-5/6 flex-col gap-8">
      <UCard class="w-[20rem]" v-for="doctor in doctors">
        <template #header>
          <div class="text-lg font-bold">
            {{ doctor.specialty }}
          </div>
          <div class="text-center text-gray-500">
            {{ doctor.firstName }} {{ doctor.lastName }}
          </div>
        </template>
        <UContainer>
          <div class="flex flex-col gap-2 p-2">
            <div
              class="flex flex-row gap-4"
              v-if="doctor.schedule?.Monday?.active"
            >
              <div>Lunes</div>
              <div>{{ doctor.schedule?.Monday?.times.startTime }}</div>
              <div>{{ doctor.schedule?.Monday?.times.endTime }}</div>
            </div>
            <div
              class="flex flex-row gap-4"
              v-if="doctor.schedule?.Tuesday?.active"
            >
              <div>Martes</div>
              <div>{{ doctor.schedule?.Tuesday?.times.startTime }}</div>
              <div>{{ doctor.schedule?.Tuesday?.times.endTime }}</div>
            </div>
            <div
              class="flex flex-row gap-4"
              v-if="doctor.schedule?.Wednesday?.active"
            >
              <div>Miercoles</div>
              <div>{{ doctor.schedule?.Wednesday?.times.startTime }}</div>
              <div>{{ doctor.schedule?.Wednesday?.times.endTime }}</div>
            </div>
            <div
              class="flex flex-row gap-4"
              v-if="doctor.schedule?.Thursday?.active"
            >
              <div>Jueves</div>
              <div>{{ doctor.schedule?.Thursday?.times.startTime }}</div>
              <div>{{ doctor.schedule?.Thursday?.times.endTime }}</div>
            </div>
            <div
              class="flex flex-row gap-4"
              v-if="doctor.schedule?.Friday?.active"
            >
              <div>Viernes</div>
              <div>{{ doctor.schedule?.Friday?.times.startTime }}</div>
              <div>{{ doctor.schedule?.Friday?.times.endTime }}</div>
            </div>
          </div>
        </UContainer>
        <template #footer>
          <NuxtLink :to="`doctor/${doctor.id}`">
            <UButton>Agendar Cita</UButton>
          </NuxtLink>
        </template>
      </UCard>
    </UContainer>
  </div>
</template>

<script>
export default {
  name: "appointment",
};
</script>
<script setup>
import { useAuthStore } from "../store/auth";

const { isMobile } = useDevice();
const doctors = await useDoctors();
const store = useAuthStore();
const specialtyList = [
  "Medicina Interna",
  "Tecnico Cardiopulmonar",
  "Neumonologia Pediatrica",
  "Neurologia",
  "Cirugia Vascular Periferica",
  "Cardiologia",
  "Cirugia General",
  "Gastroenterologia",
  "Otorrinolaringologia",
  "Radiologia",
  "Urologia",
  "Nefrologia",
  "Neumonologia",
  "Ginecologo / Obstetra",
  "Traumatologia",
  "Ginecologo / Mastologia",
  "Dermatologia",
  "Medicina General",
  "Cirugia Pediatrica",
  "Neurocirugia",
  "Pediatria",
];
const selectedSpecialty = ref(specialtyList[0]);
const parseJSONB = (jsonB) => {
  let obj = JSON.parse(jsonB);
};

const handleClick = (e) => {
  return navigateTo(`doctor/${e.id}`);
};
</script>

<style scoped>
#schedule {
  display: flex;
  flex-direction: column-reverse;
}
</style>
