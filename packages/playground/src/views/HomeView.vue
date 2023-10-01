<script setup lang="ts">
import { ref } from "vue"
import { vec } from "@filonik-cmu/linalg"

const year = ref(new Date().getFullYear())

const v = ref(vec(5).full(42))
</script>

<template>
  <header class="flex flex-row items-center gap-1 p-1">
    <img class="w-8 h-8" src="@/assets/polytopic-dark.svg"/>
    Polytopic
  </header>
  <main>
    <div class="h-[2000px] bg-stone-800">
      {{ v }}
    </div>
  </main>
  <footer class="flex flex-row items-center justify-center text-sm">&#169; {{ year }}</footer>
</template>

<style scoped>
header {
  font-family: 'Text Me One';
  font-weight: 400;
  font-size: 1.5rem;
}
</style>
