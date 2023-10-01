<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useDark, useVModel } from "@vueuse/core"

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

watch(theme, (value) => {
  monaco.editor.setTheme(value)
})
</script>

<template>
  <div ref="domElement"></div>
</template>

<style scoped>
</style>