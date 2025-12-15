import { type Address, type Hex, domainSeparator } from 'viem'

import {
  VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS,
  VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS,
} from '@/shared/constants/config/env.ts'
import { __production__ } from '@/shared/constants/index.ts'

const CHAIN_ID = __production__ ? 30 : 33
export const BOLTZ_DOMAIN_SEPARATOR =
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'

/**
 * Creates an EIP712 domain separator using viem
 * Domain type: "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
 */
export const CreateBoltzSwapDomainSeparator = (contractAddress: Address, name: string, version: string): Hex => {
  return domainSeparator({
    domain: {
      name,
      version,
      chainId: CHAIN_ID,
      verifyingContract: contractAddress,
    },
  })
}

export const CreateBoltzRouterDomainSeparator = (): string => {
  return CreateBoltzSwapDomainSeparator(VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS, 'Router', '1')
}

export const CreateBoltzEtherSwapDomainSeparator = (): string => {
  return CreateBoltzSwapDomainSeparator(VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS, 'EtherSwap', '5')
}
