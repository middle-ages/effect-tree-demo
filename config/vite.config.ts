import react from '@vitejs/plugin-react'
import tailwindCss from '@tailwindcss/vite'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    react({
      exclude: new RegExp('/src/worker/worker.js'),
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindCss(),
  ],
  worker: {format: 'es'},
  build: {
    outDir: 'docs',
    cssTarget: 'chrome141',
  },
  base: '/effect-tree-demo/',
})
