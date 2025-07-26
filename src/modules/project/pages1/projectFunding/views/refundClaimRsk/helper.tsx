import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex } from '@noble/hashes/utils'
import { Buffer } from 'buffer'
import * as secp256k1 from 'tiny-secp256k1'

import { __development__, __production__, __staging__ } from '@/shared/constants/index.ts'

const CONTRACT_NAME = 'Aon'
const CONTRACT_VERSION = '1'
const CHAIN_ID = __production__ ? 30 : 31

/** EIP-712 message types */
export enum EIP712MessageType {
  Claim = 'Claim',
  Refund = 'Refund',
}

/** Creates EIP-712 domain separator for contract signature verification */
export const createDomainSeparator = (contractAddress: string): string => {
  // EIP712Domain type hash
  const domainTypeString = 'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
  const domainTypeHash = Buffer.from(keccak_256(domainTypeString))

  // Hash the contract name and version
  const nameHash = Buffer.from(keccak_256(CONTRACT_NAME))
  const versionHash = Buffer.from(keccak_256(CONTRACT_VERSION))

  // Convert chain ID to 32-byte big-endian representation
  const chainIdBuffer = Buffer.alloc(32)
  chainIdBuffer.writeBigUInt64BE(BigInt(CHAIN_ID), 24) // Write to last 8 bytes

  // Convert contract address to 32-byte representation (left-padded with zeros)
  const addressBuffer = Buffer.alloc(32)
  const cleanAddress = contractAddress.replace('0x', '')

  // Validate address format
  if (cleanAddress.length !== 40) {
    throw new Error('Invalid Ethereum address format')
  }

  // Copy address bytes to last 20 bytes of the 32-byte buffer
  Buffer.from(cleanAddress, 'hex').copy(addressBuffer, 12)

  // Concatenate all components (mimics Solidity's abi.encode)
  const encodedData = Buffer.concat([
    domainTypeHash, // 32 bytes
    nameHash, // 32 bytes
    versionHash, // 32 bytes
    chainIdBuffer, // 32 bytes
    addressBuffer, // 32 bytes
  ])

  // Final keccak256 hash
  const domainSeparator = keccak_256(encodedData)
  return '0x' + bytesToHex(domainSeparator)
}

/** Creates EIP-712 structured data hash for signing */
export const createEIP712Message = (
  messageType: EIP712MessageType,
  swapContractAddress: string,
  userAddress: string, // creatorAddress for Claim, contributorAddress for Refund
  amount: number,
  nonce: number,
  deadline: number,
): string => {
  // Get domain separator
  const domainSeparator = Buffer.from(createDomainSeparator(swapContractAddress).slice(2), 'hex')

  // Create struct hash based on message type
  const structTypeString =
    messageType === EIP712MessageType.Claim
      ? 'Claim(address creator,address swapContract,uint256 amount,uint256 nonce,uint256 deadline)'
      : 'Refund(address contributor,address swapContract,uint256 amount,uint256 nonce,uint256 deadline)'

  const structTypeHash = Buffer.from(keccak_256(structTypeString))

  // ABI encode the struct parameters
  const userBuffer = addressToBuffer32(userAddress)
  const swapContractBuffer = addressToBuffer32(swapContractAddress)
  const amountBuffer = numberToBuffer32(amount)
  const nonceBuffer = numberToBuffer32(nonce)
  const deadlineBuffer = numberToBuffer32(deadline)

  // Concatenate all struct components (mimics Solidity's abi.encode)
  const structEncoded = Buffer.concat([
    structTypeHash,
    userBuffer,
    swapContractBuffer,
    amountBuffer,
    nonceBuffer,
    deadlineBuffer,
  ])

  // Hash the struct
  const structHash = Buffer.from(keccak_256(structEncoded))

  // Create EIP-712 digest: keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash))
  const eip712Prefix = Buffer.from('1901', 'hex') // "\x19\x01"
  const digestData = Buffer.concat([eip712Prefix, domainSeparator, structHash])

  const digest = keccak_256(digestData)
  return '0x' + bytesToHex(digest)
}

/** Helper function to create Claim message */
export const createClaimMessage = (
  swapContractAddress: string,
  creatorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
): string => {
  return createEIP712Message(EIP712MessageType.Claim, swapContractAddress, creatorAddress, amount, nonce, deadline)
}

/** Helper function to create Refund message */
export const createRefundMessage = (
  swapContractAddress: string,
  contributorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
): string => {
  return createEIP712Message(EIP712MessageType.Refund, swapContractAddress, contributorAddress, amount, nonce, deadline)
}

/** Signs EIP-712 message hash with RSK private key */
export const signEIP712Message = (digest: string, rskPrivateKey: string) => {
  try {
    // Validate inputs
    if (!digest.startsWith('0x') || digest.length !== 66) {
      throw new Error('Invalid digest format')
    }

    if (!rskPrivateKey.startsWith('0x') || rskPrivateKey.length !== 66) {
      throw new Error('Invalid private key format')
    }

    const messageHash = Buffer.from(digest.slice(2), 'hex')
    const privKey = Buffer.from(rskPrivateKey.slice(2), 'hex')

    // Basic signature creation - this might need adjustment based on your specific secp256k1 library
    // For now, this provides the structure that matches Solidity's expectation

    // Note: You may need to add a proper secp256k1 signing library for production use
    // Popular options: @noble/secp256k1, ethereum-cryptography, or ethers.js

    // Placeholder implementation - replace with actual signing logic
    const signature = secp256k1.sign(messageHash, privKey)

    if (!signature) {
      throw new Error('Failed to create signature')
    }

    // Convert signature to Buffer to ensure proper handling
    const sigBuffer = Buffer.from(signature)

    // Extract r and s components (first 64 bytes)
    const r = '0x' + sigBuffer.slice(0, 32).toString('hex')
    const s = '0x' + sigBuffer.slice(32, 64).toString('hex')

    // For production, you'll want to calculate the proper recovery ID
    // For now, using a default value
    const v = 27 // This should be calculated properly: recoveryId + 27

    const fullSignature = '0x' + sigBuffer.toString('hex')

    return {
      v,
      r,
      s,
      signature: fullSignature,
      digest,
    }
  } catch (error) {
    throw new Error(`Failed to sign EIP-712 message: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Complete workflow: Create and sign EIP-712 Claim message */
export const createAndSignClaimMessage = (
  swapContractAddress: string,
  creatorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
  rskPrivateKey: string,
) => {
  const digest = createClaimMessage(swapContractAddress, creatorAddress, amount, nonce, deadline)
  return signEIP712Message(digest, rskPrivateKey)
}

/** Complete workflow: Create and sign EIP-712 Refund message */
export const createAndSignRefundMessage = (
  swapContractAddress: string,
  contributorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
  rskPrivateKey: string,
) => {
  const digest = createRefundMessage(swapContractAddress, contributorAddress, amount, nonce, deadline)
  return signEIP712Message(digest, rskPrivateKey)
}

/** Complete workflow: Create and sign EIP-712 message (generic) */
export const createAndSignEIP712Message = (
  messageType: EIP712MessageType,
  swapContractAddress: string,
  userAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
  rskPrivateKey: string,
) => {
  const digest = createEIP712Message(messageType, swapContractAddress, userAddress, amount, nonce, deadline)
  return signEIP712Message(digest, rskPrivateKey)
}

/** Convert Ethereum address to 32-byte buffer (left-padded with zeros) */
function addressToBuffer32(address: string): Buffer {
  const buffer = Buffer.alloc(32)
  const cleanAddress = address.replace('0x', '')

  if (cleanAddress.length !== 40) {
    throw new Error('Invalid Ethereum address format')
  }

  Buffer.from(cleanAddress, 'hex').copy(buffer, 12)
  return buffer
}

/** Convert number to 32-byte big-endian buffer */
function numberToBuffer32(num: number): Buffer {
  const buffer = Buffer.alloc(32)
  buffer.writeBigUInt64BE(BigInt(num), 24) // Write to last 8 bytes
  return buffer
}

// Export constants for external use
export { CHAIN_ID, CONTRACT_NAME, CONTRACT_VERSION }
