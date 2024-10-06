// astro.config.mjs
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import cloudflare from '@astrojs/cloudflare';
import viteCompression from 'vite-plugin-compression';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory', // Fuerza la salida en formato de directorios para evitar pérdida de archivos.

    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    tailwind({
      config: {
        content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
        theme: {
          extend: {},
        },
      },
    }),
  ],
  vite: {
    plugins: [
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false, // Eliminar archivos originales después de la compresión
        compressionOptions: {
          level: 11,
        },
        filter: /\.(js|mjs|json|css|html|svg|jsx|tsx|astro|txt|xml)$/,
        verbose: false,
      }),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false,
        compressionOptions: {
          level: 9,
        },
        filter: /\.(js|mjs|json|css|html|svg|png|jpg|jsx|tsx|astro|pdf|webp|avif|txt|xml)$/,
        verbose: false,
      }),
    ],
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
        treeshake: {
          moduleSideEffects: false,
        },
      },
      sourcemap: false,
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
    },
    cacheDir: '.vite-cache',
    image: {
      service: null,
    },
  },
});
