/* eslint-disable camelcase */
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  includeAssets: ['logo-brand.svg'],
  manifest: {
    start_url: '.',
    display: 'standalone',
    background_color: '#141A19',
    name: 'Geyser',
    short_name: 'Geyser',
    description:
      'Geyser is a bitcoin crowdfunding platform that enables campaign creators to launch their projects with rewards and engage their communities with posts and content.',
    theme_color: '#20ECC7',
    icons: [
      {
        src: 'logo-brand.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        src: '/icons/128-padded.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icons/180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icons/192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/512-padded.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    maximumFileSizeToCacheInBytes: 5242880,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const server = {
    port: Number(env.PORT),
    https: Boolean(env.HTTPS),
    proxy: undefined,
    // open: env.DOCKER ? false : `http://dev.geyser.fund:${PORT}/`,
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  }

  if (mode === 'development') {
    console.log(`
      ==================================================================================================
      "Geyser - App" will available at http://dev.geyser.fund:${env.PORT}/
      ==================================================================================================
      `)
  }

  pwaOptions.mode = env.APP_ENV === 'development' ? 'development' : 'production'
  const plugins: PluginOption[] = [VitePWA(pwaOptions), react()]
  if (mode === 'development') {
    plugins.push(mkcert())
  }

  return {
    plugins,
    server,
    define: {
      'process.env': env,
      __APP_ENV__: env.APP_ENV,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
    },
  }
})
