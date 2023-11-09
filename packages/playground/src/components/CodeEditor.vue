<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useDark, useResizeObserver, useVModel } from "@vueuse/core"

//import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as monaco from 'monaco-editor'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)

const domElement = ref<HTMLElement>()

const isDark = useDark()
const theme = computed(() => isDark.value? 'vs-dark': 'vs')

const options: monaco.editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: false,
  language: "javascript",
  theme: theme.value,
  minimap: { enabled: false },
  autoIndent: "full"
}

let editor: monaco.editor.IStandaloneCodeEditor
onMounted(() => {
  if(domElement.value) {
    editor = monaco.editor.create(domElement.value, {
      ...options,
      value: value.value,  
    })
    editor.onDidChangeModelContent(() => {
      value.value = editor.getValue()
    })
  }
})

useResizeObserver(domElement, (entries) => {
  const { width, height } = entries[0].contentRect
  //console.log("resize", width, height)
  editor.layout({ width, height })
})

watch(theme, (value) => {
  monaco.editor.setTheme(value)
})
</script>

<template>
  <div ref="domElement"></div>
</template>

<style scoped>
</style>