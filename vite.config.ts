import {defineConfig} from 'vite'
import {resolve} from 'path'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': `(${JSON.stringify({
      NODE_ENV: 'production'
    })})`
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'extension-entry-point.js'),
      formats: [
        'iife'
      ],
      name: 'studioUiEnhancerExtension',
      fileName: 'studio-ui-enhancer-extension'
    }
  }
})
