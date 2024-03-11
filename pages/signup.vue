<script setup lang="ts">
const {isMobile} = useDevice();
definePageMeta
({
  layout: 'authform'
})
</script>

<template>
  <div v-if="!isMobile" class="flex items-center justify-center h-screen">
    <div>
      <signupform/>
    </div>
  </div>
  <div v-if="isMobile">
    <signupform/>
  </div>
</template>

<style scoped>

</style>