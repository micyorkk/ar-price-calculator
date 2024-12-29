import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Mengatur base URL menjadi relatif
  build: {
    outDir: 'dist', // Output folder tetap dist
    rollupOptions: {
      external: ['chart.js'], // Modul eksternal
    },
  },
});