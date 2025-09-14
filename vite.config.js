import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
          crypto: true  // important for getRandomValues
        })
      ]
    }
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
          crypto: true
        })
      ]
    }
  },
  server: { port: 8080 }
})
