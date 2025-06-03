import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
// https://vitejs.dev/config/
export default defineConfig({
=======
export default defineConfig({
  base: './',
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
<<<<<<< HEAD
=======
  server: {
    proxy: {
      // Przekierowuj wszystkie zapytania z /api do backendu
      '/api': 'http://localhost:4000',
    },
  },
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
});
