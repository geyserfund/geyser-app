import { VitePWAOptions } from 'vite-plugin-pwa'

export const pwaOptions: Partial<VitePWAOptions> = {
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
