import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex } from '@noble/hashes/utils'
import { Buffer } from 'buffer'

import { __development__, __production__, __staging__ } from '@/shared/constants/index.ts'

import { createEIP712MessageForPaymentRefund } from '../../utils/createEIP712Message.ts'
import { addressToBuffer32, numberToBuffer32 } from '../../utils/helperFunctions.ts'
import { signEIP712Message } from '../../utils/signEIP712Message.ts'

const CONTRACT_NAME = 'Aon'
const CONTRACT_VERSION = '1'
const CHAIN_ID = __production__ ? 30 : 33

/** EIP-712 message types */
export enum EIP712MessageType {
  Claim = 'Claim',
  Refund = 'Refund',
}

export const GEYSER_AON_DOMAIN_SEPARATOR =
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'

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

export const createAndSignRefundEIP712Message = (props: {
  preimageHash: string
  amount: number
  claimAddress: string
  timelock: number
  rskPrivateKey: string
}) => {
  const { preimageHash, amount, claimAddress, timelock, rskPrivateKey } = props
  const digest = createEIP712MessageForPaymentRefund(preimageHash, amount, claimAddress, timelock)
  return signEIP712Message(digest, rskPrivateKey)
}
