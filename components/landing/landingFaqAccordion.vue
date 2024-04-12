<script setup>
import seguros from "~/helper/seguros.js";

const landingFAQ = [
  {
    label: "¿Cuándo visitar a un médico general o internista?",
    slot: "when",
  },
  {
    label: "¿Cuales especialidades medicas tenemos?",
    slot: "specialty",
  },
  {
    label: "¿Con cuales seguros trabajamos?",
    slot: "insurance",
  },
];

const medicalSpecialties = [
  "Medicina interna",
  "Medicina General",
  "Hematología",
  "Otorrinolaringología",
  "Pediatría",
  "Traumatología",
  "Gastroenterología",
  "Ginecología",
  "Radiología",
  "Urología",
  "Cirugía Pediátrica",
  "Neurología",
  "Neumonología",
  "Espirometría",
  "Dermatología",
  "Cardiología",
  "Nefrología",
  "Endocrinología",
  "Neurocirugía",
  "Cirugía cardiovascular",
];
</script>

<template>
  <UAccordion variant="outline" size="xl" :items="landingFAQ" multiple>
    <template #specialty="{ description }">
      <div class="space-y-4 text-lg">
        <div>Contamos con las siguientes especialidades medicas:</div>
        <div
          class="grid-cols-3 space-y-2.5 grid justify-center items-center place-items-center"
        >
          <div v-for="specialty in medicalSpecialties">{{ specialty }}</div>
        </div>
      </div>
    </template>
    <template #when="{ description }">
      <p class="text-lg">
        Cuando no tengas claridad sobre el origen de tu dolor, presentes
        síntomas desconocidos o que generen malestar en tu cuerpo. Un médico
        general te evaluará y referirá al especialista que corresponda si es
        necesario. También puedes acudir a un médico general para realizarte
        chequeos preventivos, que incluyan evaluaciones médicas y emisión de
        órdenes para exámenes.
      </p>
    </template>
    <template #insurance="{ description }">
      <div class="space-y-4 mt-2">
        <div class="text-center text-lg">
          Contamos con las siguientes aseguradoras:
        </div>
        <div
          class="flex flex-col lg:grid-cols-3 space-y-1.5 lg:grid justify-center items-center place-items-center"
        >
          <ul v-for="(value, index) in seguros">
            <li
              class="my-4 text-lg"
              :class="{
                'text-gray-400': index % 2 == 0,
                'text-emerald-400': index % 2 != 0,
              }"
              :key="index"
            >
              <span class="text-center text-xl">•</span>
              {{
                value
                  .split(" ")
                  .map(
                    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
                  )
                  .join(" ")
              }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </UAccordion>
</template>

<style scoped></style>
