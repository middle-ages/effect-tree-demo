import tailwindCss from '@tailwindcss/vite'
import {defineConfig} from 'vite'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  worker: {format: 'es'},
  plugins: [react(), tailwindCss(), babel({presets: [reactCompilerPreset()]})],
  build: {
    outDir: 'docs',
    cssTarget: 'esnext',
    cssMinify: 'esbuild',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1300,
  },
  base: '/effect-tree-demo/',
})
