<template>
  <div v-if="!isMobile">
    <UContainer>
      <ULandingHero title="
Cuando necesites respuestas sobre tu salud, sabes a donde ir
" description="Somos especialistas en atención de prevención y diagnósticos"
                    orientation="horizontal"
                    :links="[{ label: 'Pide tu cita', color: 'primary', size: 'lg', trailingIcon: 'i-heroicons-arrow-right-20-solid' }]">
        <img
            src="https://investorplace.com/wp-content/uploads/2019/08/healthcare1600d.jpg"
            class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        />
      </ULandingHero>
      <ULandingCard
          title="Seguros Aceptados"
          description="Aprende aqui sobre los seguros que aceptamos."
          icon="i-heroicons-swatch"
          color="primary"
      />
    </UContainer>
  </div>
  <div v-if="isMobile">
    <UContainer>
      <ULandingHero title="
Cuando necesites respuestas sobre tu salud, sabes a donde ir
" description="Somos especialistas en atención de prevención y diagnósticos"
                    orientation="horizontal"
                    :links="[{ label: 'Pide tu cita', color: 'primary', size: 'lg', trailingIcon: 'i-heroicons-arrow-right-20-solid' }]">
        <img
            src="https://investorplace.com/wp-content/uploads/2019/08/healthcare1600d.jpg"
            class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        />
      </ULandingHero>
    </UContainer>
  </div>
</template>

<script setup>

const {isMobile} = useDevice();

definePageMeta({
  middleware: 'auth'
})
</script>
<style scoped>

</style>