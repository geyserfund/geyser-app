import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('../../../', import.meta.url))

export default defineConfig({
  root,
  resolve: { alias: { '@': `${root}src` } },
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/testing/vitest/modules/navigation/state/**/*.test.ts'],
  },
})
