
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Konfigurasi wajib untuk Hostinger (Root Domain)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Matikan sourcemap di produksi agar file lebih kecil dan aman
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Pisahkan library React ke chunk terpisah untuk caching yang lebih baik
        },
      },
    },
  },
  server: {
    host: true // Membuka akses network lokal saat development
  }
})
