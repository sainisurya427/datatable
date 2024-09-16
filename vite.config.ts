 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This ensures the server binds to the correct host for Render
    port: 3000,      // Optional: Set a default port for local development
  }
})
