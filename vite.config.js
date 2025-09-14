import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
    }
  },
  build: {
    rollupOptions: {
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
    }
  }
})
