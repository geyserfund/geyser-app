/* eslint-disable camelcase */
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import loadVersion from 'vite-plugin-package-version'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import tsconfigPaths from 'vite-tsconfig-paths'

const pwaOptions: Partial<VitePWAOptions> = {
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  includeAssets: ['logo-brand.svg', 'sitemap.xml'],
  injectManifest: {
    maximumFileSizeToCacheInBytes: 5242880,
  },
  manifest: {
    start_url: '.',
    display: 'standalone',
    background_color: '#111110',
    name: 'Geyser',
    short_name: 'Geyser',
    description:
      'Geyser is a bitcoin crowdfunding platform that enables campaign creators to launch their projects with rewards and engage their communities with posts and content.',
    theme_color: '#111110',
    icons: [
      {
        src: 'logo-brand.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        src: '/icons/120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        src: '/icons/180-padded.png',
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
    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
  },
}

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const server = {
    port: Number(env.PORT),
    // https: Boolean(env.HTTPS),
    proxy: undefined,
    // open: env.DOCKER ? false : `http://dev.geyser.fund:${PORT}/`,
    watch: {
      usePolling: true,
      ignored: ['language/**', '**/language/**', './language/**'],
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
  const plugins: PluginOption[] = [
    VitePWA(pwaOptions),
    react(),
    tsconfigPaths(),
    loadVersion(),
    wasm(),
    topLevelAwait(),
  ]

  return {
    plugins,
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server,
    define: {
      global: 'globalThis',
      'process.env': env,
      __APP_ENV__: env.APP_ENV,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      // setupFiles: './setupTests.ts',
    },
    optimizeDeps: {
      include: ['ecpair', 'tiny-secp256k1'],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
  }
})
