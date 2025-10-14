import { BuildOptions } from 'vite'

/** Mapping of module paths to chunk names for code splitting */
const chunkNameMapping = {
  'src/modules/project/loader': 'project',
  'src/modules/discovery/loader': 'discovery',
  'src/modules/grants/loader': 'grants',
  'src/modules/guardians/loader': 'guardians',
  'src/modules/profile/loader': 'profile',
  'src/modules/widget/loader': 'widget',
  'src/modules/project/pages/projectCreation': 'projectCreationPages',
  'src/modules/project/pages/projectDashboard': 'projectDashboardPages',
  'src/modules/project/pages/projectFunding/loader': 'projectFundingPages',
  'src/modules/project/pages/projectView': 'projectViewPages',
  'src/modules/discovery/pages/landing/loader': 'landingPages',
  'src/modules/discovery/pages/landing/views/mainView': 'landingMainViewPages',
  'src/modules/discovery/pages/heroes': 'heroesPages',
  'src/modules/profile/pages/profileSettings': 'profileSettings',
  'src/modules/project/pages/projectFunding/views/refund': 'refundPages',
}

export const rollupOptions: BuildOptions['rollupOptions'] = {
  output: {
    manualChunks(id) {
      // Check module chunks based on mapping
      for (const [path, chunkName] of Object.entries(chunkNameMapping)) {
        if (id.includes(path)) {
          return chunkName
        }
      }

      // Vendor chunk splitting (without "vendor-" prefix)
      if (id.includes('node_modules')) {
        // React ecosystem
        if (id.includes('react') || id.includes('react-dom')) {
          return 'react'
        }

        if (id.includes('react-router')) {
          return 'router'
        }

        // UI Libraries
        if (id.includes('@chakra-ui')) {
          return 'chakra'
        }

        if (id.includes('framer-motion')) {
          return 'framer'
        }

        // Editor (Remirror)
        if (id.includes('remirror') || id.includes('@remirror')) {
          return 'remirror'
        }

        // GraphQL/Apollo
        if (id.includes('@apollo/client') || id.includes('graphql')) {
          return 'apollo'
        }

        // Bitcoin/Crypto libraries
        if (
          id.includes('bitcoinjs-lib') ||
          id.includes('nostr-tools') ||
          id.includes('@scure/bip39') ||
          id.includes('bech32') ||
          id.includes('secp256k1')
        ) {
          return 'bitcoin'
        }

        // Utilities
        if (id.includes('luxon') || id.includes('i18next')) {
          return 'utils'
        }

        // Everything else
        return 'vendor'
      }
    },
    chunkFileNames: 'assets/[name]-[hash].js',
    entryFileNames: 'assets/[name]-[hash].js',
    assetFileNames: 'assets/[name]-[hash].[ext]',
  },
}
