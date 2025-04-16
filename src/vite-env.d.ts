/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

type ImportMetaEnv = {
  readonly VITE_APP_API_ENDPOINT: string
  readonly VITE_APP_FLODESK_API_KEY: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_GIPHY_API_KEY: string
  readonly APOLLO_KEY: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}

declare const twttr: any
