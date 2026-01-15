/** Shared constants for Playwright tests */

import { config } from '../../config/environments'

/** Apollo GraphQL error types */
export enum ApolloErrors {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  INVALID_FUNDING_AMOUNT = 'INVALID_FUNDING_AMOUNT',
  WALLET_UNREACHABLE = 'WALLET_UNREACHABLE',
  NON_ACTIVE_PROJECT = 'NON_ACTIVE_PROJECT',
  REWARD_OUT_OF_STOCK = 'REWARD_OUT_OF_STOCK',
}

/** Test project names */
export const TEST_PROJECTS = {
  LND_TEST_PROJECT: config.projects.lndTestProject,
  LIGHTNING_TEST_PROJECT: config.projects.lightningTestProject,
} as const

/** Environment configuration shortcuts */
export const ENV = {
  APP_URL: config.appUrl,
  LND_ENDPOINT: config.lnd.endpoint,
  LND_MACAROON_HEX: config.lnd.macaroonHex,
  BITCOIND_ENDPOINT: config.bitcoin.endpoint,
  BITCOIND_AUTH: config.bitcoin.auth,
  MINE_BLOCK_ADDRESS: config.bitcoin.mineBlockAddress,
} as const

/** Test user credentials for Nostr authentication */
export const TEST_NOSTR_USER = {
  pubkey: '217ac0828c448c1e68c2e781df89884bcae16a1e79fe6df267863155ab789c02',
  npub: 'npub1y9avpq5vgjxpu6xzu7qalzvgf09wz6s708lxmun8scc4t2mcnspqrmt40y',
  nsec: 'nsec1smf92mawwjfluyj8neww9xllwyeq88dhu70zuvdyc54mq9hg286ql40vtq',
  signature: '5d097183ae4b599a83f6f78249bc35be58c6d58ce35d0c4ca165a41f980902378437711c288d9f3410741009b8459e65e824f927ca8f8072247de93144fa51fd',
  eventId: 'd0d5289d90e8ffd7ebff068ffd93e1a84b69f1b890a3055d5039b353e73ca46f',
} as const

/** Default Geyser tip percentage (from funding form atom) */
export const DEFAULT_GEYSER_TIP_PERCENT = 1
