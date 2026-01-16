import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
  },
  optimizeDeps: {
    include: ['@a2ui/react', '@a2ui/lit'],
  },
});
