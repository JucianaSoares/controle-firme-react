import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  legacy: {
    // Evita o motor novo que quebra no Termux
    skipWebSocketTokenCheck: true
  },
  build: {
    target: 'es2020' // Força o JavaScript em uma versão ultra compatível com celulares
  }
})
