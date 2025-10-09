import react from '@vitejs/plugin-react'
import tailwindCss from '@tailwindcss/vite'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [react(), tailwindCss()],
  build: {outDir: 'docs'},
  base: '/effect-tree-demo/',
})
