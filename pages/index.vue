<template>
  <div>
    <UContainer class="w-full space-y-2.5">
      <ULandingHero
        title="
Cuando necesites respuestas sobre tu salud, sabes a donde ir
"
        orientation="horizontal"
        :links="[
          {
            label: 'Pide tu cita',
            color: 'primary',
            size: 'lg',
            to: '/appointment',
            trailingIcon: 'i-heroicons-arrow-right-20-solid',
          },
        ]"
      >
        <template #description>
          <div class="text-xl mb-2">
            <p>Somos especialistas en atención de prevención y diagnósticos</p>
            <p class="text-primary text-lg">
              Horarios de atención de lunes a viernes de 07:00 am a 04:00 pm
            </p>
          </div>
        </template>
        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="items"
          :ui="{ item: 'basis-full' }"
          class="rounded-lg overflow-hidden"
          indicators
          arrows
        >
          <img :src="item" class="w-full object-cover" draggable="false" />
        </UCarousel>
      </ULandingHero>
      <ULandingCTA
        class="h-fit p-0"
        description="Tenemos 17 años prestando el mejor de los servicios."
        :ui="{ wrapper: 'bg-emerald-50' }"
      >
        <template #title>
          <div class="text-emerald-600">¿Por qué escogernos?</div>
        </template>
        <div
          class="flex flex-col lg:flex-row w-full space-y-4.5 justify-center items-center text-center"
        >
          <div class="flex w-full flex-col justify-center items-center">
            <UIcon
              class="w-20 h-20 flex-shrink-0"
              name="i-heroicons-user-group text-primary"
            />
            <div class="w-2/3">Más de 3.500 pacientes atendidos</div>
          </div>
          <div class="flex w-full flex-col justify-center items-center">
            <UIcon
              class="w-20 h-20 flex-shrink-0 text-primary"
              name="i-heroicons-computer-desktop"
            />
            <div class="w-2/3">
              Equipamiento tecnológico de última generación
            </div>
          </div>
          <div class="flex w-full flex-col justify-center items-center">
            <UIcon
              class="w-20 h-20 flex-shrink-0 text-primary"
              name="i-heroicons-hand-thumb-up
"
            />
            <div class="w-2/3">
              Trabajamos con aseguradoras y también con particulares
            </div>
          </div>
        </div>
      </ULandingCTA>
      <LandingFaqAccordion />
      <div class="w-full flex gap-5">
        <NuxtLink
          target="_blank"
          to="https://www.google.com/maps/place/Centro+Cl%C3%ADnico+Vista+Centro/@10.5040329,-66.9122475,15z/data=!4m6!3m5!1s0x8c2a5ed121d63e91:0xe82aa5cee4f05815!8m2!3d10.5040329!4d-66.9122475!16s%2Fg%2F11c45tmp65?entry=ttu"
        >
          <ULandingCard
            color="primary"
            orientation="horizontal"
            :ui="{ background: 'bg-emerald-50' }"
          >
            <template #title>
              <div class="text-3xl">
                <UIcon name="i-heroicons-map" />
                <div class="text-emerald-600">¿Donde encontrarnos?</div>
              </div>
            </template>
            <template #description>
              <div class="text-xl">
                Nos puedes encontrar en la esquina El Chorro a Dr Paul, en el
                Centro Comercial Gallo de Oro piso 2 y 3.
              </div>
            </template>
            <div class="flex space-x-2">
              <img
                src="/img/image.webp"
                class="w-4/5 object-cover rounded-md"
                alt="google map location"
              />
              <!--            <img-->
              <!--              src="/img/gallo.webp"-->
              <!--              class="w-4/5 object-cover rounded-md"-->
              <!--              alt=""-->
              <!--            />-->
            </div>
          </ULandingCard>
        </NuxtLink>
      </div>
      <ULandingCTA :ui="{ wrapper: 'bg-emerald-50' }">
        <template #title>
          <div class="text-emerald-600">
            Una atención médica centrada en ti y los tuyos
          </div>
        </template>
        <div class="flex justify-center items-center w-full space-x-3.5">
          <img
            src="/img/conocenos.webp"
            class="w-fit lg:w-1/2 rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
          />
        </div>
        <template #description>
          <div class="space-y-6">
            <p>
              Nuestra prioridad son los pacientes, es por ellos que nos
              esforzamos día a día para que reciban una atención respetuosa,
              amable y de calidad, acortando los tiempos de espera para que de
              esta manera aumente la eficacia de nuestro servicio médico.
            </p>

            <p>
              En Centro Clínico Vista Centro, cuentas con 20 especialidades
              médicas y unidades de servicio para la atención temprana y
              prevención de enfermedades.
            </p>

            <p>
              La personalización de cada experto, la conexión por el paciente y
              los servicios accesibles son los que nos destacan día tras día.
            </p>
          </div>
        </template>
      </ULandingCTA>
      <ULandingCard :ui="{ background: 'bg-emerald-50' }">
        <template #title>
          <div class="flex justify-center items-center space-x-3.5">
            <UIcon class="text-3xl" name="i-heroicons-phone" />
            <div class="text-3xl text-emerald-600">Contactanos!</div>
          </div>
        </template>
        <template #description>
          <div class="text-xl">
            Si necesitas contactarte con nosotros para obtener ayuda acerca el
            sistema de citas o cualquier otra duda que tengas, puedes llamarnos
            al: <span class="text-primary">0212-5423002</span>
          </div>
        </template>
      </ULandingCard>
    </UContainer>
  </div>
</template>

<script setup>
const items = [
  "/img/foto1.webp",
  "/img/foto2.webp",
  "/img/foto3.webp",
  "/img/foto4.webp",
];
//Carousel logic to make it autoplay
const carouselRef = ref();
onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>
<style scoped></style>
<script setup lang="ts"></script>
