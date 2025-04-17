import { vi } from 'vitest'

console.log('Setup file running!')

// Mock the env module directly
vi.mock('@/shared/constants/config/env.ts', () => ({
  // Define the expected exports based on VITE_APP_ENV = 'test'
  __production__: false,
  __development__: false,
  __staging__: false,
  __test__: true,
  // Provide mock values for other exported constants from env.ts
  API_SERVICE_ENDPOINT: 'mock_api_endpoint_test',
  AUTH_SERVICE_ENDPOINT: 'mock_auth_endpoint_test',
  BOLTZ_DOMAIN: 'mock_boltz_domain_test',
  VITE_APP_FLODESK_API_KEY: 'mock_flodesk_key_test',
  VITE_APP_GIPHY_API_KEY: 'mock_giphy_key_test',
  VITE_APP_GEYSER_NOSTR_PUBKEY: 'mock_nostr_pubkey_test',
  VITE_APP_AIR_TABLE_KEY: 'mock_airtable_key_test',
  VITE_APP_LNG_PORT: 'mock_lng_port_test',
  VITE_APP_STRIPE_API_KEY: 'mock_stripe_key_test',
}))

// Keep the stubGlobal as well, in case other modules read import.meta.env directly
vi.stubGlobal('import.meta', {
  env: {
    VITE_APP_ENV: 'test',
    // Add other VITE_ variables needed by env.ts or other code here
    // Make sure to provide values for variables checked in env.ts
    // to avoid runtime warnings/errors, e.g.:
    VITE_APP_API_ENDPOINT: 'mock_api_endpoint',
    VITE_APP_AUTH_SERVICE_ENDPOINT: 'mock_auth_endpoint',
    VITE_APP_BOLTZ_SWAP_DOMAIN: 'mock_boltz_domain',
    VITE_APP_GIPHY_API_KEY: 'mock_giphy_key',
    VITE_APP_FLODESK_API_KEY: 'mock_flodesk_key',
    VITE_APP_GEYSER_NOSTR_PUBKEY: 'mock_nostr_pubkey',
    VITE_APP_AIR_TABLE_KEY: 'mock_airtable_key',
    VITE_APP_LNG_PORT: 'mock_lng_port',
    VITE_APP_STRIPE_API_KEY: 'mock_stripe_key',
  },
})

console.log('Setup file running with vi.mock for env.ts!')
