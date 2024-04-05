<script setup lang="ts">
const { isMobile } = useDevice();
</script>

<template>
  <div>
    <UContainer class="my-10">
      <UPage>
        <template #left></template>
        <div class="flex justify-center items-center"><signupform /></div>
        <template #right></template>
      </UPage>
    </UContainer>
  </div>
</template>

<style scoped></style>
