<template>
  <div v-if="!isMobile">
    <UContainer class="w-full">
      <ULandingHero
        title="
Cuando necesites respuestas sobre tu salud, sabes a donde ir
"
        description="Somos especialistas en atención de prevención y diagnósticos"
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
        <img
          src="https://investorplace.com/wp-content/uploads/2019/08/healthcare1600d.jpg"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        />
      </ULandingHero>
      <div class="w-full flex gap-5">
        <ULandingCard
          title="Seguros Aceptados"
          description="Aprende aqui sobre los seguros que aceptamos."
          icon="i-heroicons-briefcase"
          color="primary"
          class="cursor-pointer"
          @click="isInsuranceModalOpen = true"
        />
        <ULandingCard
          title="Donde encontrarnos?"
          description="Veniam minim ipsum anim. Irure voluptate magna dolore id dolore ex quis sint sint et duis dolor enim fugiat."
          icon="i-heroicons-map"
          color="primary"
          orientation="horizontal"
        >
          <img
            src="https://media.discordapp.net/attachments/684442343168147529/1213197591722856568/Untitled.png?ex=66070e4d&is=65f4994d&hm=32762eabd97ff3b033b6378beec433141a9752b17b3b61b5a03b36d89c5d6886&=&format=webp&quality=lossless"
            class="w-full h-full object-cover rounded-md"
          />
        </ULandingCard>
      </div>
    </UContainer>
    <LandingInsuranceModal v-model="isInsuranceModalOpen" />
  </div>

  <div v-if="isMobile">
    <UContainer>
      <ULandingHero
        title="
Cuando necesites respuestas sobre tu salud, sabes a donde ir
"
        description="Somos especialistas en atención de prevención y diagnósticos"
        orientation="horizontal"
        :links="[
          {
            label: 'Pide tu cita',
            color: 'primary',
            size: 'lg',
            trailingIcon: 'i-heroicons-arrow-right-20-solid',
          },
        ]"
      >
        <img
          src="https://investorplace.com/wp-content/uploads/2019/08/healthcare1600d.jpg"
          class="w-1/2 rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        />
      </ULandingHero>
    </UContainer>
  </div>
</template>

<script setup>
const { isMobile } = useDevice();
const isInsuranceModalOpen = ref(false);
definePageMeta({
  middleware: "auth",
});
</script>
<style scoped></style>
