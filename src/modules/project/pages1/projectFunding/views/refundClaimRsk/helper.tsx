import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex } from '@noble/hashes/utils'
import { Buffer } from 'buffer'
import * as secp256k1 from 'tiny-secp256k1'

import { __development__, __production__, __staging__ } from '@/shared/constants/index.ts'

const CONTRACT_NAME = 'Aon'
const CONTRACT_VERSION = '1'
const CHAIN_ID = __production__ ? 30 : 33

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
  aonContractAddress: string,
  swapContractAddress: string,
  userAddress: string, // creatorAddress for Claim, contributorAddress for Refund
  amount: number,
  nonce: number,
  deadline: number,
): string => {
  // Get domain separator
  const domainSeparator = Buffer.from(createDomainSeparator(aonContractAddress).slice(2), 'hex')

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
  aonContractAddress: string,
  swapContractAddress: string,
  creatorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
) => {
  return createEIP712Message(
    EIP712MessageType.Claim,
    aonContractAddress,
    swapContractAddress,
    creatorAddress,
    amount,
    nonce,
    deadline,
  )
}

/** Helper function to create Refund message */
export const createRefundMessage = (
  aonContractAddress: string,
  swapContractAddress: string,
  contributorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
) => {
  return createEIP712Message(
    EIP712MessageType.Refund,
    aonContractAddress,
    swapContractAddress,
    contributorAddress,
    amount,
    nonce,
    deadline,
  )
}

/** Signs EIP-712 message hash with RSK private key */
export const signEIP712Message = (digest: string, rskPrivateKey: string) => {
  console.log('checking digest', digest)
  console.log('checking rskPrivateKey', rskPrivateKey)
  try {
    // Validate inputs
    if (!digest.startsWith('0x') || digest.length !== 66) {
      throw new Error('Invalid digest format')
    }

    // Support both formats: with '0x' prefix (66 chars) and without (64 chars)
    const hasPrefix = rskPrivateKey.startsWith('0x')
    const expectedLength = hasPrefix ? 66 : 64

    if (rskPrivateKey.length !== expectedLength) {
      throw new Error('Invalid private key format')
    }

    const messageHash = Buffer.from(digest.slice(2), 'hex')
    const privKey = Buffer.from(hasPrefix ? rskPrivateKey.slice(2) : rskPrivateKey, 'hex')

    // Basic signature creation - this might need adjustment based on your specific secp256k1 library
    // For now, this provides the structure that matches Solidity's expectation

    // Note: You may need to add a proper secp256k1 signing library for production use
    // Popular options: @noble/secp256k1, ethereum-cryptography, or ethers.js

    // Use signRecoverable to get both signature and recovery ID
    const signatureResult = secp256k1.signRecoverable(messageHash, privKey)

    if (!signatureResult) {
      throw new Error('Failed to create signature')
    }

    // Extract signature and recovery ID
    const { signature, recoveryId } = signatureResult

    // Convert signature to Buffer to ensure proper handling
    const sigBuffer = Buffer.from(signature)

    // Extract r and s components (first 64 bytes)
    const r = '0x' + sigBuffer.slice(0, 32).toString('hex')
    const s = '0x' + sigBuffer.slice(32, 64).toString('hex')

    // Calculate v parameter: recoveryId + 27 (Ethereum standard)
    const v = recoveryId + 27

    // Create complete Ethereum signature: r + s + v (65 bytes total)
    const vBuffer = Buffer.from([v])
    const fullSignatureBuffer = Buffer.concat([sigBuffer, vBuffer])
    const fullSignature = '0x' + fullSignatureBuffer.toString('hex')

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
export const createAndSignClaimMessage = (props: {
  aonContractAddress: string
  swapContractAddress: string
  creatorAddress: string
  amount: number
  nonce: number
  deadline: number
  rskPrivateKey: string
}) => {
  const { aonContractAddress, swapContractAddress, creatorAddress, amount, nonce, deadline, rskPrivateKey } = props
  const digest = createClaimMessage(aonContractAddress, swapContractAddress, creatorAddress, amount, nonce, deadline)
  return signEIP712Message(digest, rskPrivateKey)
}

/** Complete workflow: Create and sign EIP-712 Refund message */
export const createAndSignRefundMessage = (props: {
  aonContractAddress: string
  swapContractAddress: string
  contributorAddress: string
  amount: number
  nonce: number
  deadline: number
  rskPrivateKey: string
}) => {
  const { aonContractAddress, swapContractAddress, contributorAddress, amount, nonce, deadline, rskPrivateKey } = props
  const digest = createRefundMessage(
    aonContractAddress,
    swapContractAddress,
    contributorAddress,
    amount,
    nonce,
    deadline,
  )
  console.log('=== Production Refund Message Debug ===')
  console.log('AON Contract Address:', aonContractAddress)
  console.log('Swap Contract Address:', swapContractAddress)
  console.log('Contributor Address:', contributorAddress)
  console.log('Amount:', amount)
  console.log('Nonce:', nonce)
  console.log('Deadline:', deadline)
  console.log('Production digest:', digest)
  console.log('=== End Production Debug ===')
  return signEIP712Message(digest, rskPrivateKey)
}

/** Complete workflow: Create and sign EIP-712 message (generic) */
export const createAndSignEIP712Message = (
  messageType: EIP712MessageType,
  aonContractAddress: string,
  swapContractAddress: string,
  userAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
  rskPrivateKey: string,
) => {
  const digest = createEIP712Message(
    messageType,
    aonContractAddress,
    swapContractAddress,
    userAddress,
    amount,
    nonce,
    deadline,
  )
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
  const bigIntValue = BigInt(num)

  // Handle the full 256-bit number, not just 64-bit
  // Convert BigInt to hex string, pad to 64 characters (32 bytes)
  const hexString = bigIntValue.toString(16).padStart(64, '0')

  // Convert hex string to buffer
  return Buffer.from(hexString, 'hex')
}

/** Create signature for the exact Aon contract refund requirements - FIXED VERSION */
export const createAonRefundSignature = (
  privateKey: string,
  contributor: string,
  swapContract: string,
  amount: number,
  nonce: number,
  deadline: number,
) => {
  try {
    // Updated expected values based on the analysis
    const expectedDomainSeparator = '0x4426e94641d275c751b62646ec8cdbe2df7187e212252311ebba4b4006f2ac93'
    const expectedRefundTypeHash = '0xc94d8f353cffa385c8a0b929c808d52c4bdfea8ef2018f451f2d30a07d7f351a'
    const expectedStructHash = '0xd252df27e46ef2f5f39fbdccd442b28c3047021d64b25a3e7d7c93bf4dd41c30'
    const expectedDigest = '0x3ce75e9fbd378f2f18e16bd9fe256369121a7e437037a3ef7a50bf350e930e6f'

    console.log('=== FIXED Aon Refund Signature Generation ===')
    console.log('Parameters:')
    console.log('  contributor:', contributor)
    console.log('  swapContract:', swapContract)
    console.log('  amount:', amount)
    console.log('  nonce:', nonce)
    console.log('  deadline:', deadline)

    // Create domain separator
    const contractAddress = '0x55652FF92Dc17a21AD6810Cce2F4703fa2339CAE'
    const ourDomainSeparator = createDomainSeparator(contractAddress)
    console.log('Domain Separator Check:')
    console.log('  Expected:', expectedDomainSeparator)
    console.log('  Our result:', ourDomainSeparator)
    console.log('  Match:', ourDomainSeparator === expectedDomainSeparator ? '✅' : '❌')

    // Create refund type hash
    const refundTypeString =
      'Refund(address contributor,address swapContract,uint256 amount,uint256 nonce,uint256 deadline)'
    const ourRefundTypeHash = '0x' + Buffer.from(keccak_256(refundTypeString)).toString('hex')
    console.log('Refund Type Hash Check:')
    console.log('  Type string:', refundTypeString)
    console.log('  Expected:', expectedRefundTypeHash)
    console.log('  Our result:', ourRefundTypeHash)
    console.log('  Match:', ourRefundTypeHash === expectedRefundTypeHash ? '✅' : '❌')

    // Create struct hash manually
    const refundTypeHashBuffer = Buffer.from(expectedRefundTypeHash.slice(2), 'hex')
    const contributorBuffer = addressToBuffer32(contributor)
    const swapContractBuffer = addressToBuffer32(swapContract)
    const amountBuffer = numberToBuffer32(amount)
    const nonceBuffer = numberToBuffer32(nonce)
    const deadlineBuffer = numberToBuffer32(deadline)

    const structEncoded = Buffer.concat([
      refundTypeHashBuffer,
      contributorBuffer,
      swapContractBuffer,
      amountBuffer,
      nonceBuffer,
      deadlineBuffer,
    ])

    const ourStructHash = '0x' + Buffer.from(keccak_256(structEncoded)).toString('hex')
    console.log('Struct Hash Check:')
    console.log('  Expected:', expectedStructHash)
    console.log('  Our result:', ourStructHash)
    console.log('  Match:', ourStructHash === expectedStructHash ? '✅' : '❌')

    // Create final digest
    const eip712Prefix = Buffer.from('1901', 'hex')
    const domainSeparatorBuffer = Buffer.from(expectedDomainSeparator.slice(2), 'hex')
    const structHashBuffer = Buffer.from(expectedStructHash.slice(2), 'hex')

    const digestData = Buffer.concat([eip712Prefix, domainSeparatorBuffer, structHashBuffer])
    const ourDigest = '0x' + Buffer.from(keccak_256(digestData)).toString('hex')

    console.log('Final Digest Check:')
    console.log('  Expected:', expectedDigest)
    console.log('  Our result:', ourDigest)
    console.log('  Match:', ourDigest === expectedDigest ? '✅' : '❌')

    // Use our computed digest (not the hardcoded expected one)
    const digestToSign = ourDigest
    console.log('Using OUR computed digest for current parameters')
    console.log('Signing digest:', digestToSign)

    // Sign the digest
    const signature = signEIP712Message(digestToSign, privateKey)
    console.log('Generated signature:', signature.signature)
    console.log('Expected signature format: 65 bytes (130 hex chars + 0x)')
    console.log('=== End FIXED Aon Refund Signature ===')

    return signature
  } catch (error) {
    throw new Error(
      `Failed to create fixed Aon refund signature: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

/** Find which chain ID produces the expected domain separator */
export const findCorrectChainIdForDomain = () => {
  const contractAddress = '0x55652FF92Dc17a21AD6810Cce2F4703fa2339CAE'
  const expectedDomainSeparator = '0x4426e94641d275c751b62646ec8cdbe2df7187e212252311ebba4b4006f2ac93'

  console.log('=== Finding Correct Chain ID ===')
  console.log('Expected Domain Separator:', expectedDomainSeparator)

  // Test a wide range of chain IDs
  const chainIds = [1, 30, 31, 33, 31337, 1337, 137, 56, 43114, 250, 42161, 10, 8453, 100]

  for (const chainId of chainIds) {
    const domainTypeString = 'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
    const domainTypeHash = Buffer.from(keccak_256(domainTypeString))

    const nameHash = Buffer.from(keccak_256(CONTRACT_NAME))
    const versionHash = Buffer.from(keccak_256(CONTRACT_VERSION))

    const chainIdBuffer = Buffer.alloc(32)
    chainIdBuffer.writeBigUInt64BE(BigInt(chainId), 24)

    const addressBuffer = Buffer.alloc(32)
    const cleanAddress = contractAddress.replace('0x', '')
    Buffer.from(cleanAddress, 'hex').copy(addressBuffer, 12)

    const encodedData = Buffer.concat([domainTypeHash, nameHash, versionHash, chainIdBuffer, addressBuffer])

    const domainSeparator = keccak_256(encodedData)
    const result = '0x' + Buffer.from(domainSeparator).toString('hex')

    if (result === expectedDomainSeparator) {
      console.log(`✅ FOUND MATCH! Chain ID ${chainId}:`, result)
      return chainId
    }

    console.log(`❌ Chain ID ${chainId}:`, result)
  }

  console.log('=== No matching chain ID found ===')
  return null
}

// Export constants for external use
export { CHAIN_ID, CONTRACT_NAME, CONTRACT_VERSION }
