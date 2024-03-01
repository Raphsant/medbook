<template>
<div class="flex flex-col justify-between h-screen">
  <Navbar/>
  <slot/>
  <UFooter :links="links">
    <template  #left>
      <div class="flex flex-col">
        <div>
          Copyright © Centro Clinico Vista Centro {{ new Date().getFullYear() }}
        </div>
        <div class="text-md text-gray-500">
          Made by Raphsant
        </div>
      </div>
    </template>

    <template #right>
      <UButton icon="i-simple-icons-x" color="gray" variant="ghost" to="https://x.com/nuxt_js" target="_blank" />
      <UButton icon="i-simple-icons-discord" color="gray" variant="ghost" to="https://discord.com/invite/ps2h6QT" target="_blank" />
      <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/nuxt/nuxt" target="_blank" />
    </template>
  </UFooter>
</div>
</template>

<script setup lang="ts">
const links = [{
  label: 'Direccion',
  to: 'https://ui.nuxt.com/'
}, {
  label: 'Panel Admin',
  to: 'https://nuxt.com'
}, {
  label: 'Webmaster',
  to: 'https://nuxt.studio'
}]
</script>


<style scoped>

</style>