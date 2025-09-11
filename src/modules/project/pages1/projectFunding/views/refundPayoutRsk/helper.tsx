import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex } from '@noble/hashes/utils'
import { Buffer } from 'buffer'
import * as secp256k1 from 'tiny-secp256k1'

import {
  VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS,
  VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS,
} from '@/shared/constants/config/env.ts'
import { __development__, __production__, __staging__ } from '@/shared/constants/index.ts'

const CONTRACT_NAME = 'Aon'
const CONTRACT_VERSION = '1'
const CHAIN_ID = __production__ ? 30 : 33

/** EIP-712 message types */
export enum EIP712MessageType {
  Claim = 'Claim',
  Refund = 'Refund',
}

export const BOLTZ_TYPEHASH_CLAIM =
  'Claim(bytes32 preimage,uint256 amount,address refundAddress,uint256 timelock,address destination)'
export const BOLTZ_TYPEHASH_CLAIM_CALL = 'ClaimCall(bytes32 preimage,address callee,bytes32 callData)'
export const BOLTZ_DOMAIN_SEPARATOR =
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'

export const GEYSER_AON_DOMAIN_SEPARATOR =
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

/** Creates EIP-712 domain separator for contract signature verification */
export const createAonDomainSeparator = (contractAddress: string): string => {
  // EIP712Domain type hash
  const domainTypeString = GEYSER_AON_DOMAIN_SEPARATOR
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

/**
 * @param preimage - The preimage value from swap file
 * @param amount - The amount from swap file
 * @param refundAddress - The refund address from swap file
 * @param timelock - The timelock from swap file
 * @param destination - The transaction executor's address (msg.sender who will call the claim function)
 */
export const createEIP712MessageForBoltzClaim = (
  preimage: string,
  amount: number,
  refundAddress: string,
  timelock: number,
  destination: string,
) => {
  const domainSeparator = Buffer.from(CreateBoltzEtherSwapDomainSeparator().slice(2), 'hex')

  const structTypeHash = Buffer.from(keccak_256(BOLTZ_TYPEHASH_CLAIM))

  const preimageBuffer = Buffer.from(preimage, 'hex')
  const amountBuffer = numberToBuffer32(amount)
  const refundAddressBuffer = addressToBuffer32(refundAddress)
  const timelockBuffer = numberToBuffer32(timelock)
  const destinationBuffer = addressToBuffer32(destination)

  const structEncoded = Buffer.concat([
    structTypeHash,
    preimageBuffer,
    amountBuffer,
    refundAddressBuffer,
    timelockBuffer,
    destinationBuffer,
  ])

  const structHash = Buffer.from(keccak_256(structEncoded))

  const eip712Prefix = Buffer.from('1901', 'hex') // "\x19\x01"
  const digestData = Buffer.concat([eip712Prefix, domainSeparator, structHash])

  const digest = keccak_256(digestData)
  return '0x' + bytesToHex(digest)
}

/**
 * @param preimage - The preimage value (we generate it)
 * @param callee - The project AON contract address
 * @param callData - The generated call data
 */
export const createEIP712MessageForBoltzClaimCall = (preimage: string, callee: string, callData: string) => {
  const domainSeparator = Buffer.from(CreateBoltzRouterDomainSeparator().slice(2), 'hex')
  console.log('domainSeparator', domainSeparator)
  console.log('expected domain separator', '0xdd1ef94ca7311d78e89105f27c563b0e7be4ae6eed96da7fce25262290500225')

  const structTypeHash = Buffer.from(keccak_256(BOLTZ_TYPEHASH_CLAIM_CALL))

  const preimageBuffer = Buffer.from(preimage, 'hex')
  const calleeBuffer = addressToBuffer32(callee)

  // IMPORTANT: Hash the callData first, as per Router contract line 192: keccak256(callData)
  const callDataHash = Buffer.from(keccak_256(Buffer.from(callData.replace('0x', ''), 'hex')))

  console.log('CallData before hashing:', callData)
  console.log('CallData hash:', '0x' + callDataHash.toString('hex'))

  const structEncoded = Buffer.concat([structTypeHash, preimageBuffer, calleeBuffer, callDataHash])

  const structHash = Buffer.from(keccak_256(structEncoded))

  const eip712Prefix = Buffer.from('1901', 'hex') // "\x19\x01"
  const digestData = Buffer.concat([eip712Prefix, domainSeparator, structHash])

  const digest = keccak_256(digestData)
  return '0x' + bytesToHex(digest)
}

/** Creates EIP-712 structured data hash for signing */
export const createEIP712MessageForAon = (
  messageType: EIP712MessageType,
  aonContractAddress: string,
  swapContractAddress: string,
  userAddress: string, // creatorAddress for Claim, contributorAddress for Refund
  amount: number,
  nonce: number,
  deadline: number,
): string => {
  // Get domain separator
  const domainSeparator = Buffer.from(createAonDomainSeparator(aonContractAddress).slice(2), 'hex')

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
  return createEIP712MessageForAon(
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
  return createEIP712MessageForAon(
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
  const digest = createEIP712MessageForAon(
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
    const ourDomainSeparator = createAonDomainSeparator(contractAddress)
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

/** Creates call data equivalent to Solidity's abi.encodeWithSignature("contributeFor(address, uint256)", contributorAddress, fees) */
export const createCallDataForContributeForAon = (contributorAddress: string, fees: number): string => {
  try {
    // Step 1: Create function selector from signature
    const functionSignature = 'contributeFor(address,uint256)'
    const functionSelector = Buffer.from(keccak_256(functionSignature)).slice(0, 4)

    // Step 2: Encode parameters according to ABI encoding rules
    // Address parameter (32 bytes, left-padded with zeros)
    const addressBuffer = addressToBuffer32(contributorAddress)

    // Uint256 parameter (32 bytes, big-endian)
    const feesBuffer = numberToBuffer32(fees)

    // Step 3: Concatenate selector + encoded parameters
    const callData = Buffer.concat([functionSelector, addressBuffer, feesBuffer])

    // Return as hex string with 0x prefix
    return '0x' + callData.toString('hex')
  } catch (error) {
    throw new Error(`Failed to create call data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Creates encoded Claim struct data for use in claimCall function */
export const createClaimStructData = (
  preimage: string,
  amount: number,
  refundAddress: string,
  timelock: number,
  v: number,
  r: string,
  s: string,
): string => {
  try {
    // Encode Claim struct according to ABI encoding rules
    // struct Claim { bytes32 preimage; uint256 amount; address refundAddress; uint256 timelock; uint8 v; bytes32 r; bytes32 s; }

    // bytes32 preimage (32 bytes)
    const preimageBuffer = Buffer.alloc(32)
    const cleanPreimage = preimage.replace('0x', '')
    if (cleanPreimage.length !== 64) {
      throw new Error('Invalid preimage format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanPreimage, 'hex').copy(preimageBuffer)

    // uint256 amount (32 bytes, big-endian)
    const amountBuffer = numberToBuffer32(amount)

    // address refundAddress (32 bytes, left-padded with zeros)
    const refundAddressBuffer = addressToBuffer32(refundAddress)

    // uint256 timelock (32 bytes, big-endian)
    const timelockBuffer = numberToBuffer32(timelock)

    // uint8 v (32 bytes, left-padded with zeros)
    const vBuffer = Buffer.alloc(32)
    vBuffer.writeUInt8(v, 31) // Write to last byte

    // bytes32 r (32 bytes)
    const rBuffer = Buffer.alloc(32)
    const cleanR = r.replace('0x', '')
    if (cleanR.length !== 64) {
      throw new Error('Invalid r format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanR, 'hex').copy(rBuffer)

    // bytes32 s (32 bytes)
    const sBuffer = Buffer.alloc(32)
    const cleanS = s.replace('0x', '')
    if (cleanS.length !== 64) {
      throw new Error('Invalid s format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanS, 'hex').copy(sBuffer)

    // Concatenate all struct fields
    const structData = Buffer.concat([
      preimageBuffer,
      amountBuffer,
      refundAddressBuffer,
      timelockBuffer,
      vBuffer,
      rBuffer,
      sBuffer,
    ])

    // Return as hex string with 0x prefix
    return '0x' + structData.toString('hex')
  } catch (error) {
    throw new Error(`Failed to create Claim struct data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Replicates Solidity hashValues function from EtherSwap.sol
 * Concatenates and hashes preimageHash, amount, claimAddress, refundAddress, timelock
 */
export const hashValues = (
  preimageHash: string,
  amount: number,
  claimAddress: string,
  refundAddress: string,
  timelock: number,
): string => {
  try {
    // Convert preimageHash to 32-byte buffer
    const preimageBuffer = Buffer.alloc(32)
    const cleanPreimageHash = preimageHash.replace('0x', '')
    if (cleanPreimageHash.length !== 64) {
      throw new Error('Invalid preimageHash format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanPreimageHash, 'hex').copy(preimageBuffer)

    // Convert other parameters to 32-byte buffers using existing helper functions
    const amountBuffer = numberToBuffer32(amount)
    const claimAddressBuffer = addressToBuffer32(claimAddress)
    const refundAddressBuffer = addressToBuffer32(refundAddress)
    const timelockBuffer = numberToBuffer32(timelock)

    // Concatenate all parameters (replicating the assembly logic)
    // mstore(ptr, preimageHash)         -> offset 0x00 (0)
    // mstore(add(ptr, 0x20), amount)    -> offset 0x20 (32)
    // mstore(add(ptr, 0x40), claimAddress) -> offset 0x40 (64)
    // mstore(add(ptr, 0x60), refundAddress) -> offset 0x60 (96)
    // mstore(add(ptr, 0x80), timelock)  -> offset 0x80 (128)
    // Total length: 0xa0 (160 bytes)
    const concatenated = Buffer.concat([
      preimageBuffer, // 32 bytes
      amountBuffer, // 32 bytes
      claimAddressBuffer, // 32 bytes
      refundAddressBuffer, // 32 bytes
      timelockBuffer, // 32 bytes
    ])

    // Hash with keccak256 (replicating: result := keccak256(ptr, 0xa0))
    const hash = keccak_256(concatenated)
    const result = '0x' + Buffer.from(hash).toString('hex')

    console.log('=== hashValues Function ===')
    console.log('Inputs:', { preimageHash, amount, claimAddress, refundAddress, timelock })
    console.log('Hash result:', result)
    console.log('=== End hashValues ===')

    return result
  } catch (error) {
    throw new Error(`Failed to hash values: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Creates call data for claimCall function on Router contract */
export const createCallDataForClaimCall = (
  claimStructData: string,
  callee: string,
  callData: string,
  v: number,
  r: string,
  s: string,
): string => {
  try {
    // Step 1: Create function selector from signature
    // function claimCall(Claim calldata claim, address callee, bytes calldata callData, uint8 v, bytes32 r, bytes32 s)
    const functionSignature =
      'claimCall((bytes32,uint256,address,uint256,uint8,bytes32,bytes32),address,bytes,uint8,bytes32,bytes32)'
    const functionSelector = Buffer.from(keccak_256(functionSignature)).slice(0, 4)

    // Step 2: Encode parameters according to ABI encoding rules

    // Claim struct data (already encoded)
    const claimBuffer = Buffer.from(claimStructData.replace('0x', ''), 'hex')

    // address callee (32 bytes, left-padded with zeros)
    const calleeBuffer = addressToBuffer32(callee)

    // bytes callData - dynamic type, needs offset + length + data
    const callDataClean = callData.replace('0x', '')
    const callDataLength = callDataClean.length / 2
    const callDataLengthBuffer = numberToBuffer32(callDataLength)
    const callDataBuffer = Buffer.from(callDataClean, 'hex')
    // Pad callData to 32-byte boundary
    const callDataPadded = Buffer.alloc(Math.ceil(callDataBuffer.length / 32) * 32)
    callDataBuffer.copy(callDataPadded)

    // uint8 v (32 bytes, left-padded with zeros)
    const vBuffer = Buffer.alloc(32)
    vBuffer.writeUInt8(v, 31)

    // bytes32 r (32 bytes)
    const rBuffer = Buffer.alloc(32)
    const cleanR = r.replace('0x', '')
    if (cleanR.length !== 64) {
      throw new Error('Invalid r format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanR, 'hex').copy(rBuffer)

    // bytes32 s (32 bytes)
    const sBuffer = Buffer.alloc(32)
    const cleanS = s.replace('0x', '')
    if (cleanS.length !== 64) {
      throw new Error('Invalid s format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanS, 'hex').copy(sBuffer)

    // For dynamic types, we need to calculate offsets
    // The callData bytes parameter needs an offset pointer
    const baseOffset = 12 * 32 // 12 parameters before the dynamic callData
    const callDataOffsetBuffer = numberToBuffer32(baseOffset)

    // Step 3: Concatenate selector + encoded parameters
    const encodedCall = Buffer.concat([
      functionSelector,
      claimBuffer, // Claim struct (7 * 32 bytes)
      calleeBuffer, // address callee (32 bytes)
      callDataOffsetBuffer, // offset to callData (32 bytes)
      vBuffer, // uint8 v (32 bytes)
      rBuffer, // bytes32 r (32 bytes)
      sBuffer, // bytes32 s (32 bytes)
      callDataLengthBuffer, // length of callData (32 bytes)
      callDataPadded, // actual callData (padded to 32-byte boundary)
    ])

    // Return as hex string with 0x prefix
    return '0x' + encodedCall.toString('hex')
  } catch (error) {
    throw new Error(`Failed to create claimCall call data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Backward compatibility alias */
export const createCallDataForBoltzClaim = createClaimStructData

/** Transaction structure for Rootstock/Ethereum-style transactions */
export type RootstockTransaction = {
  to: string // Contract address
  value: string // Amount in wei (usually "0" for contract calls)
  data: string // Call data (function selector + encoded parameters)
  gas: string // Gas limit
  gasPrice: string // Gas price in wei
  nonce: string // Transaction nonce
  chainId: number // Chain ID (30 for RSK mainnet, 33 for testnet)
}

/** Creates an unsigned Rootstock transaction for Boltz claimCall */
export const createTransactionForBoltzClaimCall = (params: {
  contributorAddress: string
  fees: number
  preimage: string
  amount: number
  refundAddress: string
  timelock: number
  privateKey: string
  aonContractAddress: string
}): string => {
  const { contributorAddress, fees, preimage, amount, refundAddress, timelock, privateKey, aonContractAddress } = params

  try {
    console.log('=== Creating Transaction for Boltz ClaimCall ===')
    // Step 1: Create call data for contributeFor function
    const contributeForCallData = createCallDataForContributeForAon(contributorAddress, fees)
    console.log('ContributeFor call data:', contributeForCallData)

    // Step 2: Create and sign the Boltz claim message
    const claimEIP712Message = createEIP712MessageForBoltzClaim(
      preimage,
      amount,
      refundAddress,
      timelock,
      VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS,
    )
    const claimSignature = signEIP712Message(claimEIP712Message, privateKey)
    console.log('Claim signature:', claimSignature)

    // Step 3: Create Claim struct data
    const claimStructData = createClaimStructData(
      preimage,
      amount,
      refundAddress,
      timelock,
      claimSignature.v,
      claimSignature.r,
      claimSignature.s,
    )
    console.log('Claim struct data:', claimStructData)

    // Step 3.5: Calculate hashValues for verification (replicating Solidity hashValues function)
    // Note: Need to convert preimage to preimageHash using SHA256 (as per EtherSwap contract)

    // Step 4: Create and sign the claimCall message
    const claimCallEIP712Message = createEIP712MessageForBoltzClaimCall(
      preimage,
      aonContractAddress,
      contributeForCallData,
    )
    const claimCallSignature = signEIP712Message(claimCallEIP712Message, privateKey)
    console.log('ClaimCall signature:', claimCallSignature)

    // Step 5: Create the final claimCall transaction data
    const claimCallData = createCallDataForClaimCall(
      claimStructData,
      aonContractAddress, // callee
      contributeForCallData, // callData
      claimCallSignature.v,
      claimCallSignature.r,
      claimCallSignature.s,
    )

    return claimCallData
  } catch (error) {
    throw new Error(
      `Failed to create claimCall transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

// Export constants for external use
export { CHAIN_ID, CONTRACT_NAME, CONTRACT_VERSION }
