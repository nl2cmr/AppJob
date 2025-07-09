import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ionic/react/css': '/node_modules/@ionic/react/css',
    },
  },
  base: process.env.VITE_BASE_PATH || '/AppJob',
})
