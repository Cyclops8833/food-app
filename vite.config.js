import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nourish',
        short_name: 'Nourish',
        description: 'A nutrition reference app for curious kids.',
        theme_color: '#4ade80',
        background_color: '#fefce8',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Precache all bundled assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],

        // SPA fallback — ensures /food/:id works offline
        navigateFallback: 'index.html',

        // Runtime caching strategies
        runtimeCaching: [
          {
            // Unsplash images — CacheFirst so they load offline after first visit
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
