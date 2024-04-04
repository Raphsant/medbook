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
          <div class="text-xl">
            <p>Somos especialistas en atención de prevención y diagnósticos</p>
            <p class="text-primary">
              Horarios de atención de lunes a viernes de 07:00 am a 04:00 pm
            </p>
          </div>
        </template>
        <img
          src="https://investorplace.com/wp-content/uploads/2019/08/healthcare1600d.jpg"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        />
      </ULandingHero>
      <ULandingCTA
        class="h-fit p-0"
        title="¿Por qué escogernos?"
        description="Tenemos 17 años prestando el mejor de los servicios."
      >
        <div class="flex justify-center items-center gap-4">
          <div class="h-[10rem] flex flex-col justify-center items-center">
            <UIcon
              class="w-20 h-20 flex-shrink-0"
              name="i-heroicons-computer-desktop"
            />
            <div>Equipamiento tecnológico de última generación</div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <UIcon
              class="w-20 h-20 flex-shrink-0"
              name="i-heroicons-user-group"
            />
            Más de 3.500 pacientes atendidos
          </div>
          <div class="flex flex-col justify-center items-center">
            <UIcon
              class="w-20 h-20 flex-shrink-0"
              name="i-heroicons-hand-thumb-up
"
            />
            <div>Trabajamos con aseguradoras y también con particulares</div>
          </div>
        </div>
      </ULandingCTA>
      <div class="w-full flex gap-5">
        <ULandingCard
          title="¿Donde encontrarnos?"
          description="Esquina el chorro a Dr Paul Centro Comercial gallo de oro piso 2 y 3."
          icon="i-heroicons-map"
          color="primary"
          orientation="horizontal"
          to="https://www.google.com/maps/place/Centro+Cl%C3%ADnico+Vista+Centro/@10.5040329,-66.9122475,15z/data=!4m6!3m5!1s0x8c2a5ed121d63e91:0xe82aa5cee4f05815!8m2!3d10.5040329!4d-66.9122475!16s%2Fg%2F11c45tmp65?entry=ttu"
        >
          <img
            src="https://media.discordapp.net/attachments/684442343168147529/1213197591722856568/Untitled.png?ex=66070e4d&is=65f4994d&hm=32762eabd97ff3b033b6378beec433141a9752b17b3b61b5a03b36d89c5d6886&=&format=webp&quality=lossless"
            class="w-full h-full object-cover rounded-md"
          />
        </ULandingCard>
      </div>
      <LandingFaqAccordion />
      <ULandingCTA title="Una atención médica centrada en ti y los tuyos">
        <div class="flex justify-center items-center w-full space-x-3.5">
          <img
            src="https://cdn.discordapp.com/attachments/684442343168147529/1222289572445290599/Conocenos-ccvc.jpg?ex=6615acdf&is=660337df&hm=862b9fabb853d902274756b96082514699105b51f77f9b58d287d08a9a00c3a0&"
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
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
<style scoped></style>
<script setup lang="ts"></script>
