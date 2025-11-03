import { createPublicClient, http } from 'viem'

import { VITE_APP_ROOTSTOCK_RPC_URL } from '@/shared/constants/config/env.ts'
import { __production__ } from '@/shared/constants/index.ts'

/** RSK Mainnet Chain ID (30) or Testnet (31) */
export const RSK_CHAIN_ID = __production__ ? (30 as const) : (33 as const)
export const RSK_RPC_URL = VITE_APP_ROOTSTOCK_RPC_URL

export const rootstockPublicClient = createPublicClient({
  transport: http(RSK_RPC_URL),
  chain: {
    id: RSK_CHAIN_ID,
    name: 'Rootstock Mainnet',
    network: 'rootstock',
    nativeCurrency: {
      decimals: 18,
      name: 'Rootstock Bitcoin',
      symbol: 'RBTC',
    },
    rpcUrls: {
      default: { http: ['https://public-node.rsk.co'] },
    },
    blockExplorers: {
      default: {
        name: 'RSK Explorer',
        url: 'https://explorer.rsk.co',
      },
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 4249540,
      },
    },
  },
})
