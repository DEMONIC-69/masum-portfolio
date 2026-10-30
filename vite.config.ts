import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'PAGES_');

  return {
    base: env.PAGES_BASE || '/',
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: { motion: ['framer-motion'], react: ['react', 'react-dom'] },
        },
      },
    },
  };
});
