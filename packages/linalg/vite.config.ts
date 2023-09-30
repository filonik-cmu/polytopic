import path from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
  publicDir: 'public',
  build: {
    lib: {
      /*
      // Failed attempts at generating d.ts with global variables for monaco
      entry: [
        path.resolve(__dirname, "src/index.ts"),
        path.resolve(__dirname, "src/global/index.ts"),
      ],
      */
      entry: path.resolve(__dirname, "src/index.ts"),
      name: 'linalg',
      fileName: (format) => `linalg.${format}.js`
    },
    //minify: false,
    outDir: "dist"
  },
  plugins: [
    //dts(),
    //dts({copyDtsFiles: true}),
    dts({rollupTypes: true}),
  ],
});
