import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'

// Monaco
import * as monaco from 'monaco-editor'

import libTypeDefinitions from "@/assets/types/lib.d.ts?raw" 
import linalgTypeDefinitions from "@/assets/types/linalg/index.d.ts?raw"

// validation settings
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
	noSemanticValidation: true,
	noSyntaxValidation: false,
})

// compiler options
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  noLib: true,
	target: monaco.languages.typescript.ScriptTarget.ES2020,
})

// extra libraries
/*
const libSource = `
declare class Facts {
    static next():string
}
`
*/
const extralLibs = [
  {source: libTypeDefinitions, uri: "ts:lib.d.ts"},
  {source: linalgTypeDefinitions, uri: "ts:linalg/index.d.ts"},
]

extralLibs.forEach((lib) => {
  monaco.languages.typescript.javascriptDefaults.addExtraLib(lib.source, lib.uri)
  monaco.editor.createModel(lib.source, "typescript", monaco.Uri.parse(lib.uri))
})

const app = createApp(App)

app.use(router)

app.mount('#app')
