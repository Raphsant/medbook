<template>
  <div v-if="!isMobile" class="flex items-center justify-center h-screen">
    <div class="">
      <loginform/>
    </div>
  </div>
  <div v-if="isMobile">
    <loginform/>
  </div>
</template>

<script setup>
definePageMeta
({
  layout: 'authform'
})
const {isMobile} = useDevice();

</script>

<style scoped>

</style>