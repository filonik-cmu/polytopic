import path from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
  publicDir: 'public',
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: 'core',
      fileName: (format) => `core.${format}.js`
    },
    outDir: "dist"
  },
  plugins: [
    //dts(),
    //dts({copyDtsFiles: true}),
    dts({rollupTypes: true}),
  ],
});
