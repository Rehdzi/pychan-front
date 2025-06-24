import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      port: 4173,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:4173",
     },
  };
  
});
