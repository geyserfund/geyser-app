/** Build script to bundle nostr-tools for browser injection in Playwright tests */

const esbuild = require('esbuild')
const path = require('path')

esbuild
  .build({
    entryPoints: [path.join(__dirname, 'nostr-bundle-entry.js')],
    bundle: true,
    format: 'iife',
    globalName: 'NostrToolsBundle',
    outfile: path.join(__dirname, 'nostr-tools.bundle.js'),
    platform: 'browser',
    target: 'es2020',
    minify: true,
  })
  .then(() => {
    console.log('✅ Nostr bundle created successfully at:', path.join(__dirname, 'nostr-tools.bundle.js'))
  })
  .catch((error) => {
    console.error('❌ Failed to create nostr bundle:', error)
    process.exit(1)
  })
