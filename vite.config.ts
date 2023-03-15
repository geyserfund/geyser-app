import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const server = {
    port: Number(env.PORT),
    https: false,
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

  return {
    plugins: mode === 'development' ? [react(), mkcert()] : [react()],
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
