/** Build script to bundle nostr-tools for browser injection in Playwright tests */

const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')
const outputFile = path.join(__dirname, 'nostr-tools.bundle.js')

const runBuild = async () => {
  try {
    await esbuild.build({
      entryPoints: [path.join(__dirname, 'nostr-bundle-entry.js')],
      bundle: true,
      format: 'iife',
      globalName: 'NostrToolsBundle',
      outfile: outputFile,
      platform: 'browser',
      target: 'es2020',
      minify: true,
    })

    console.log('✅ Nostr bundle created successfully at:', outputFile)
  } catch (error) {
    if (fs.existsSync(outputFile)) {
      console.warn('⚠️ Failed to rebuild nostr bundle, using existing bundle at:', outputFile)
      console.warn(error)
      process.exit(0)
    }

    console.error('❌ Failed to create nostr bundle:', error)
    process.exit(1)
  }
}

runBuild()
