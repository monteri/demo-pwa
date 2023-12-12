import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/index.html',
        additionalManifestEntries: [
          '/offline.html'
        ],
        runtimeCaching: [
          {
            urlPattern: /^(http|https):\/\/[a-z0-9:-_.]+\/api\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 60,
              },
            },
          },
        ],
        navigateFallbackDenylist: [/^\/api\/.*/],
      },
      manifest: {
        name: 'Demo PWA',
        short_name: 'PWA',
        description: 'PWA demo',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-48-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'pwa-144-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'pwa-192-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
