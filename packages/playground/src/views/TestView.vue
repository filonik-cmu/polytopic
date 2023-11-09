<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { useEventListener } from '@vueuse/core';

import * as Babel from '@babel/standalone'

import { PlayIcon } from '@heroicons/vue/24/solid'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import CodeEditor from "@/components/CodeEditor.vue"

type Section = {id: string, size?: string}
type Layout = {sections: Section[], maximizedId?: string}

const state = reactive({
  input: {
    text: 'return 1+1\n',
  },
  output: {
    compiled: '',
    evaluated: '',
  }
})

const layout = reactive<Layout>({
  sections: [
    {id: "ihead", size: "20px"},
    {id: "ibody"},
    {id: "ohead", size: "20px"},
    {id: "obody"},
  ],
  maximizedId: undefined,
})

const sectionSize: (maximizedId: string|undefined) => (section: Section) => string = (maximizedId) => (section) => {
  if (section.size) {
    return section.size
  }
  if (maximizedId === undefined) {
    return "1fr"
  } 
  return section.id == maximizedId? "1fr": "0fr"
}

const toggleSection = (targetId: string) => {
  layout.maximizedId = layout.maximizedId == targetId? undefined: targetId
}

const mainStyle = computed(() => {
  const _sectionSize = sectionSize(layout.maximizedId)
  const gridTemplate = layout.sections.map(
    (section) => `"${section.id}" ${_sectionSize(section)}`
  ).join("\n")
  return { gridTemplate }
})

const compile = (text: string) => {
  const code = `(() => {\n${text}\n})()`
  const result = Babel.transform(code, {
    //plugins: [["@jetblack/operator-overloading", { "enabled": true }]],
    //plugins: ['jsdsp'],
    presets: ['env'],
  }).code
  return result ?? ""
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
    console.log("compile")
    const code = compile(state.input.text)
    state.output.compiled = code
    console.log("evaluate")
    const value = evaluate(code)
    state.output.evaluated = JSON.stringify(value)
    console.log("result", value)
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
</script>

<template>
  <header>Header</header>
  <main class="flex-grow main_content bg-gray-600" :style="mainStyle">
    <div class="flex bg-gray-300 text-sm items-center" @click="toggleSection('ibody')">
      <span>Input</span>
      <button @click.stop="run()" class="rounded-sm p-0.5" type="button">
        <PlayIcon class="w-4 h-4"/>
      </button>
    </div>
    <CodeEditor v-model="state.input.text" class="overflow-hidden"/>
    <div class="flex bg-gray-300 text-sm items-center" @click="toggleSection('obody')">
      <span>Output</span>
    </div>
    <div class="overflow-auto bg-gray-400">
      <TabGroup>
        <TabList class="text-sm border-b border-gray-500 dark:border-gray-700">
          <Tab class="tab px-2">Evaluated</Tab>
          <Tab class="tab px-2">Compiled</Tab>
          <!--<Tab class="tab mr-2">Other</Tab>-->
        </TabList>
        <TabPanels class="h-full">
          <TabPanel as="pre" class="h-full">
            {{ state.output.evaluated }}
          </TabPanel>
          <TabPanel as="pre" class="h-full">
            {{ state.output.compiled }}
          </TabPanel>
          <!--<TabPanel>Content 3</TabPanel>-->
        </TabPanels>
      </TabGroup>
    </div>
  </main>
  <footer>Footer</footer>
</template>

<style lang="postcss" scoped>
.main_content {
  display: grid;
  grid-template:
    "ihead" 20px
    "ibody" 1fr
    "ohead" 20px
    "obody" 1fr;
  overflow: hidden;
}
.tab {
  @apply ui-selected:text-blue-700 ui-selected:border-b-2 ui-selected:border-blue-600 ui-not-selected:text-black;
}
</style>