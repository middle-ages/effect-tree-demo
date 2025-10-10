import react from '@vitejs/plugin-react'
import tailwindCss from '@tailwindcss/vite'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    react({
      exclude: new RegExp('/src/tree/worker.js'),
    }),
    tailwindCss(),
  ],
  worker: {format: 'es'},
  build: {outDir: 'docs'},
  base: '/effect-tree-demo/',
})
