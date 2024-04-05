<template>
  <UContainer class="my-10">
    <UPage>
      <div class="flex justify-center items-center w-full mb-5">
        <USelectMenu
          size="xl"
          searchable
          class="w-full lg:w-1/4 text-center"
          v-model="selectedSpecialty"
          :options="specialtyList"
        />
      </div>

      <UDivider
        :label="selectedSpecialty"
        :ui="{
          label:
            'text-primary-500 text-3xl font-extralight dark:text-primary-400',
        }"
      />
      <div
        class="lg:grid lg:grid-cols-2 gap-4 flex flex-col justify-center items-center place-items-center py-6 rounded-lg"
      >
        <template v-for="doctor in doctors">
          <UCard v-if="doctor.specialty == selectedSpecialty" class="w-3/4">
            <template #header>
              <div></div>
              <div>
                <div class="text-lg lg:text-3xl">
                  {{ doctor.firstName }} {{ doctor.lastName }}
                </div>
                <div class="text-md lg:text-lg text-primary">
                  {{ doctor.specialty }}
                </div>
              </div>
              <Placeholder class="h-8" />
            </template>
            <UContainer>
              <div
                class="grid-cols-2 grid justify-center place-items-start gap-2 lg:flex lg:flex-row lg:gap-10 p-2 text-sm"
              >
                <div
                  class="flex flex-col"
                  v-if="doctor.schedule?.Monday?.active"
                >
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
                <div
                  class="flex flex-col"
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
        </template>
      </div>
    </UPage>
  </UContainer>
</template>

<script>
export default {
  name: "appointment",
};
</script>
<script setup>
import { useAuthStore } from "../store/auth";

definePageMeta({
  middleware: "auth",
});

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
