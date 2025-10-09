import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex } from '@noble/hashes/utils'
import { Buffer } from 'buffer'

import {
  VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS,
  VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS,
} from '@/shared/constants/config/env.ts'
import { __production__ } from '@/shared/constants/index.ts'

const CHAIN_ID = __production__ ? 30 : 33
export const BOLTZ_DOMAIN_SEPARATOR =
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'

export const CreateBoltzSwapDomainSeparator = (contractAddress: string, name: string, version: string): string => {
  const domainTypeString = BOLTZ_DOMAIN_SEPARATOR
  const domainTypeHash = Buffer.from(keccak_256(domainTypeString))

  const nameHash = Buffer.from(keccak_256(name))
  const versionHash = Buffer.from(keccak_256(version))

  const chainIdBuffer = Buffer.alloc(32)
  chainIdBuffer.writeBigUInt64BE(BigInt(CHAIN_ID), 24)

  const addressBuffer = Buffer.alloc(32)
  const cleanAddress = contractAddress.replace('0x', '')

  // Validate address format
  if (cleanAddress.length !== 40) {
    throw new Error('Invalid Ethereum address format')
  }

  Buffer.from(cleanAddress, 'hex').copy(addressBuffer, 12)

  const encodedData = Buffer.concat([domainTypeHash, nameHash, versionHash, chainIdBuffer, addressBuffer])
  const domainSeparator = keccak_256(encodedData)

  return '0x' + bytesToHex(domainSeparator)
}

export const CreateBoltzRouterDomainSeparator = (): string => {
  return CreateBoltzSwapDomainSeparator(VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS, 'Router', '1')
}

export const CreateBoltzEtherSwapDomainSeparator = (): string => {
  return CreateBoltzSwapDomainSeparator(VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS, 'EtherSwap', '5')
}
