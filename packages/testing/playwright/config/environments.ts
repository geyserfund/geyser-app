/** Environment configuration for Playwright tests */

/** Get environment variable with fallback */
const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key]
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is required but not set`)
  }
  return value || fallback || ''
}

/** Get optional environment variable with fallback */
const getOptionalEnv = (key: string, fallback = ''): string => {
  const value = process.env[key]
  return value || fallback
}

const getApiOriginFromAppUrl = (appUrl: string): string => {
  const parsed = new URL(appUrl)
  const host = parsed.hostname.startsWith('api.') ? parsed.hostname : `api.${parsed.hostname}`
  return `${parsed.protocol}//${host}`
}

/** Test environment configuration */
export const config = {
  /** Application URL */
  appUrl: getEnv('APP_URL', 'https://dev.geyser.fund'),

  /** API URL used for direct GraphQL calls from tests */
  apiUrl: getOptionalEnv('API_URL', getApiOriginFromAppUrl(getEnv('APP_URL', 'https://dev.geyser.fund'))),
  
  /** Lightning Network Daemon (LND) configuration */
  lnd: {
    endpoint: getEnv('CONTRIBUTOR_LND_ENDPOINT', 'https://localhost:8081'),
    macaroonHex: getEnv('CONTRIBUTOR_LND_ADMIN_MACAROON_HEX'),
  },
  
  /** Bitcoin regtest configuration */
  bitcoin: {
    endpoint: getEnv('BITCOIND_ENDPOINT', 'http://regtest.geyser.fund:18443'),
    auth: getEnv('BITCOIND_AUTH', 'cmVndGVzdDpyZWd0ZXN0'),
    mineBlockAddress: getEnv('MINE_BLOCK_ADDRESS', 'bcrt1qkfxpvljhfmj93vjjdfzl24ww8yx8hrq4hllnfn'),
  },
  
  /** Test project names */
  projects: {
    lndTestProject: 'lndtestproject',
    lightningTestProject: 'lightningtestproject',
  },

  /** Project-creation test configuration */
  projectCreation: {
    reviewSubmitJwt: getOptionalEnv('PROJECT_REVIEW_SUBMIT_JWT'),
    accountPassword: getOptionalEnv('PROJECT_CREATION_ACCOUNT_PASSWORD'),
  },
} as const

export type Config = typeof config
