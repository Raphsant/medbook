<script setup lang="ts">
import seguros from "~/helper/seguros.js";
</script>

<template>
  <UModal>
    <UCard class="">
      <template #header>
        <div class="text-2xl font-bold text-center">Seguros Aceptados</div>
      </template>
      <div class="h-[30rem] overflow-y-auto">
        <ul v-for="(value, index) in seguros">
          <li
            class="my-4 text-lg"
            :class="{
              'text-gray-400': index % 2 == 0,
              'text-emerald-400': index % 2 != 0,
            }"
            :key="index"
          >
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
    </UCard>
  </UModal>
</template>

<style scoped></style>
