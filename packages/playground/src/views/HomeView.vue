<script setup lang="ts">
import { reactive, ref } from "vue"
import { useDark, useEventListener, useToggle } from '@vueuse/core';

import { SunIcon, MoonIcon, PlayIcon } from '@heroicons/vue/24/solid'
import IconLogo from "@/components/icons/IconLogo.vue"
import CodeEditor from "@/components/CodeEditor.vue"
//import { vec } from "@filonik-cmu/linalg"

const isDark = useDark()
const toggleDark = useToggle(isDark)

const state = reactive({
  input: {
    text: 'alert("Hello world!")\n',
  },
  output: {
    text: '',
    value: '',
  }
})

const prepare = (text: string) => {
  const result = `(() => {\n${text}\n})()`
  /*
  const result = Babel.transform(code, {
    plugins: ['jsdsp'],
    presets: ['env'],
  }).code
  */
  return result
}

const evaluate = (code: string) => {
  //const {vec, vec1, vec2, vec3, vec4} = L
  //const {mat, mat1, mat2, mat3, mat4} = L
  return eval(code)
}

const shouldRun = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    if (e.key == "Enter") {
      return true
    }
  }
  if (e.ctrlKey || e.metaKey) {
    if (e.key == "s") {
      return true
    }
  }
}

const run = () => {
  try {
    const code = prepare(state.input.text)
    state.output.text = code
    const value = evaluate(code)
    state.output.value = JSON.stringify(value)
    //state.output.hasse = renderHasse(value)
    //state.output.scene = renderScene(value)
  } catch (e: any) {
    console.error(e.message)
  }
}

useEventListener(document, 'keydown', (e) => {
  if (shouldRun(e)) {
    e.preventDefault()
    run()
  }
})

const year = ref(new Date().getFullYear())
</script>

<template>
  <header class="flex flex-row items-center gap-1 p-1">  
    <!--<img class="w-8 h-8" src="@/assets/polytopic-dark.svg"/>-->
    <IconLogo class="w-8 h-8 text-black dark:text-white" />
    <span class="logo">Polytopic</span>
    <span class="flex-grow"></span>
    <button @click="toggleDark()" class="text-sm p-2.5" type="button">
      <MoonIcon class="w-5 h-5" :class="[isDark? 'hidden': 'visible']"/>
      <SunIcon class="w-5 h-5" :class="[isDark? 'visible': 'hidden']"/>
    </button>
  </header>
  <main>
    <div class="flex flex-col h-full bg-stone-100 dark:bg-stone-900">
      <div class="flex flex-row items-center text-stone-400 dark:text-stone-500 border-y border-stone-400 dark:border-stone-800 px-2 py-1">
        <span class="text-xs">
          Input
        </span>
        <span class="flex-grow"></span>
        <button @click="run()" class="text-sm p-0.5" type="button">
          <PlayIcon class="w-4 h-4"/>
        </button>
      </div>
      <CodeEditor v-model="state.input.text" class="flex-grow"/>
    </div>
  </main>
  <footer class="flex flex-row items-center text-stone-400 dark:text-stone-500 justify-center text-sm">&#169; {{ year }}</footer>
</template>

<style scoped>
.logo {
  font-family: 'Text Me One';
  font-weight: 400;
  font-size: 1.5rem;
}
</style>
