import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import loadVersion from 'vite-plugin-package-version'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import tsconfigPaths from 'vite-tsconfig-paths'

import { pwaOptions } from './config/pwaOptions'

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

  // Base define config (allow extra string keys)
  const define: { [key: string]: any } = {
    global: 'globalThis',
  }

  // Apply production/development defines only when not running tests (heuristically)
  // Vitest integration might set command differently, but often not 'serve' or 'build'
  if (command === 'serve' || command === 'build') {
    define['process.env'] = env
    define.__APP_ENV__ = env.APP_ENV
    console.log(`
      ==================================================================================================
      "Geyser - App" command: ${command}, mode: ${mode}. Applying define config.
      ==================================================================================================
      `)
  } else {
    console.log(`
      ==================================================================================================
      "Geyser - App" command: ${command}, mode: ${mode}. Skipping define config for process.env/__APP_ENV__.
      ==================================================================================================
      `)
    // You could potentially define test-specific values here if needed
    // define['process.env.NODE_ENV'] = '\"test\"'; // Example
  }

  const pwaOptionsMode = env.APP_ENV === 'development' ? 'development' : 'production'
  const plugins: PluginOption[] = [
    VitePWA({ ...pwaOptions, mode: pwaOptionsMode }),
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
        '@': path.resolve(__dirname, './src'),
      },
    },
    server,
    // Use the conditionally populated define object
    define,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest/setupTests.ts',
      include: ['./vitest/**/state/**/*.test.ts'],
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
