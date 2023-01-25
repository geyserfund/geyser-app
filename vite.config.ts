import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'

const PORT = 3000

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const server = {
    port: Number(env.VITE_PORT),
    https: false,
    proxy: undefined,
    open: `http://dev.geyser.fund:${PORT}/`,
  }

  if (mode === 'development') {
    console.log(`
      ==================================================================================================
      "Geyser - App" will available at http://dev.geyser.fund:${PORT}/
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
