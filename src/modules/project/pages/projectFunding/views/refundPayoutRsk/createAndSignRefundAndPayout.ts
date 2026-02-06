import type { Address, Hex } from 'viem'
import { hashTypedData, keccak256 } from 'viem'

import { __production__ } from '@/shared/constants/index.ts'

import { signEIP712Message } from '../../utils/signEIP712Message.ts'

const CONTRACT_NAME = 'Aon'
const CONTRACT_VERSION = '1'
const CHAIN_ID = __production__ ? 30 : 33

/** EIP-712 message types */
export enum EIP712MessageType {
  Claim = 'Claim',
  Refund = 'Refund',
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
  processingFee: number,
  lockCallData: string,
): string => {
  const domain = {
    name: CONTRACT_NAME,
    version: CONTRACT_VERSION,
    chainId: CHAIN_ID,
    verifyingContract: aonContractAddress as Address,
  }

  const types =
    messageType === EIP712MessageType.Claim
      ? {
          Claim: [
            { name: 'creator', type: 'address' },
            { name: 'swapContract', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
            { name: 'processingFee', type: 'uint256' },
            { name: 'lockCallDataHash', type: 'bytes32' },
          ],
        }
      : {
          Refund: [
            { name: 'contributor', type: 'address' },
            { name: 'swapContract', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
            { name: 'processingFee', type: 'uint256' },
            { name: 'lockCallDataHash', type: 'bytes32' },
          ],
        }

  // Hash the lockCallData since the type is bytes32
  const lockCallDataHash = keccak256(lockCallData as Hex)

  const message =
    messageType === EIP712MessageType.Claim
      ? {
          creator: userAddress as Address,
          swapContract: swapContractAddress as Address,
          amount: BigInt(amount),
          nonce: BigInt(nonce),
          deadline: BigInt(deadline),
          processingFee: BigInt(processingFee),
          lockCallDataHash,
        }
      : {
          contributor: userAddress as Address,
          swapContract: swapContractAddress as Address,
          amount: BigInt(amount),
          nonce: BigInt(nonce),
          deadline: BigInt(deadline),
          processingFee: BigInt(processingFee),
          lockCallDataHash,
        }

  return hashTypedData({
    domain,
    types,
    primaryType: messageType,
    message,
  })
}

/** Helper function to create Claim message */
export const createClaimMessage = (
  aonContractAddress: string,
  swapContractAddress: string,
  creatorAddress: string,
  amount: number,
  nonce: number,
  deadline: number,
  processingFee: number,
  lockCallData: string,
) => {
  return createEIP712MessageForAon(
    EIP712MessageType.Claim,
    aonContractAddress,
    swapContractAddress,
    creatorAddress,
    amount,
    nonce,
    deadline,
    processingFee,
    lockCallData,
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
  processingFee: number,
  lockCallData: string,
) => {
  return createEIP712MessageForAon(
    EIP712MessageType.Refund,
    aonContractAddress,
    swapContractAddress,
    contributorAddress,
    amount,
    nonce,
    deadline,
    processingFee,
    lockCallData,
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
  processingFee: number
  lockCallData: string
  rskPrivateKey: string
}) => {
  const {
    aonContractAddress,
    swapContractAddress,
    creatorAddress,
    amount,
    nonce,
    deadline,
    processingFee,
    lockCallData,
    rskPrivateKey,
  } = props
  const digest = createClaimMessage(
    aonContractAddress,
    swapContractAddress,
    creatorAddress,
    amount,
    nonce,
    deadline,
    processingFee,
    lockCallData,
  )

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
  processingFee: number
  lockCallData: string
  rskPrivateKey: string
}) => {
  const {
    aonContractAddress,
    swapContractAddress,
    contributorAddress,
    amount,
    nonce,
    deadline,
    processingFee,
    lockCallData,
    rskPrivateKey,
  } = props
  const digest = createRefundMessage(
    aonContractAddress,
    swapContractAddress,
    contributorAddress,
    amount,
    nonce,
    deadline,
    processingFee,
    lockCallData,
  )
  // console.log('=== Production Refund Message Debug ===')
  // console.log('AON Contract Address:', aonContractAddress)
  // console.log('Swap Contract Address:', swapContractAddress)
  // console.log('Contributor Address:', contributorAddress)
  // console.log('Amount:', amount)
  // console.log('Nonce:', nonce)
  // console.log('Deadline:', deadline)
  // console.log('Processing Fee:', processingFee)
  // console.log('Lock Call Data:', lockCallData)
  // console.log('RSK Private Key:', rskPrivateKey)
  // console.log('===============================================')
  // console.log('Production digest:', digest)
  // console.log('=== End Production Debug ===')
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
  processingFee: number,
  lockCallData: string,
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
    processingFee,
    lockCallData,
  )
  return signEIP712Message(digest, rskPrivateKey)
}
