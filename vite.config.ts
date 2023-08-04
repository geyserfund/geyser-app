/* eslint-disable camelcase */
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

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

  const plugins: PluginOption[] = [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['logo-brand.svg'],
      manifest: {
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        name: 'Geyser Fund - Crowdfunding with Bitcoin',
        short_name: 'Geyser',
        description:
          'Geyser is a bitcoin crowdfunding platform that enables campaign creators to launch their projects with rewards and engage their communities with posts and content.',
        theme_color: '#20ECC7',
        icons: [
          {
            src: 'logo-brand.svg',
            sizes:
              '36x36 48x48 57x57 60x60 72x72 76x76 96x96 114x114 120x120 128x128 144x144 152x152 180x180 192x192 256x256 384x384 512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
    react(),
  ]
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
