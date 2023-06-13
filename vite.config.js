import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },proxy: {
    '/api': {
         target: 'http://localhost:3000/',
         changeOrigin: true,
         secure: false,      
         ws: true,  
         rewrite: (path) => path.replace(/^\/api/, ''),
         configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        },
     },
     // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
     '/socket.io': {
       target: 'ws://localhost:3000',
       ws: true,
     },
}

})
