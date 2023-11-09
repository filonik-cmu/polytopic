import path from "node:path"
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

const publicPath = "monacoeditorwork"

// https://vitejs.dev/config/
export default defineConfig({
  //base: '/polytopic/',
  plugins: [
    vue(),
    monacoEditorPlugin({
      publicPath,
      customDistPath(root, buildOutDir) {
        return path.join(root, buildOutDir, publicPath)
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
