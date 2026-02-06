import type { Address, Hex } from 'viem'
import { encodeAbiParameters, encodePacked, hashTypedData, keccak256, toHex } from 'viem'

import { __production__ } from '@/shared/constants/index.ts'

import { signEIP712Message } from '../../utils/signEIP712Message.ts'

const CONTRACT_NAME = 'Prism'
const CONTRACT_VERSION = '1'
const CHAIN_ID = __production__ ? 30 : 33

export const createPrismWithdrawMessage = (params: {
  prismContractAddress: string
  prismDomainSeparator?: string
  swapContractAddress: string
  receiverAddress: string
  amount: number
  projectKey: string
  nonce: number
  deadline: number
  lockCallData: string
}): string => {
  const {
    prismContractAddress,
    prismDomainSeparator,
    swapContractAddress,
    receiverAddress,
    amount,
    projectKey,
    nonce,
    deadline,
    lockCallData,
  } = params

  const lockCallDataHash = keccak256(lockCallData as Hex)

  if (prismDomainSeparator) {
    const typeHash = keccak256(
      toHex(
        'Withdraw(address receiver,address swapContract,uint256 amount,bytes32 projectKey,uint256 nonce,uint256 deadline,bytes32 lockCallDataHash)',
      ),
    )

    const structHash = keccak256(
      encodeAbiParameters(
        [
          { type: 'bytes32' },
          { type: 'address' },
          { type: 'address' },
          { type: 'uint256' },
          { type: 'bytes32' },
          { type: 'uint256' },
          { type: 'uint256' },
          { type: 'bytes32' },
        ],
        [
          typeHash,
          receiverAddress as Address,
          swapContractAddress as Address,
          BigInt(amount),
          projectKey as Hex,
          BigInt(nonce),
          BigInt(deadline),
          lockCallDataHash,
        ],
      ),
    )

    return keccak256(
      encodePacked(['bytes2', 'bytes32', 'bytes32'], ['0x1901', prismDomainSeparator as Hex, structHash]),
    )
  }

  return hashTypedData({
    domain: {
      name: CONTRACT_NAME,
      version: CONTRACT_VERSION,
      chainId: CHAIN_ID,
      verifyingContract: prismContractAddress as Address,
    },
    types: {
      Withdraw: [
        { name: 'receiver', type: 'address' },
        { name: 'swapContract', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'projectKey', type: 'bytes32' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
        { name: 'lockCallDataHash', type: 'bytes32' },
      ],
    },
    primaryType: 'Withdraw',
    message: {
      receiver: receiverAddress as Address,
      swapContract: swapContractAddress as Address,
      amount: BigInt(amount),
      projectKey: projectKey as Hex,
      nonce: BigInt(nonce),
      deadline: BigInt(deadline),
      lockCallDataHash,
    },
  })
}

export const createAndSignPrismWithdrawMessage = (params: {
  prismContractAddress: string
  prismDomainSeparator?: string
  swapContractAddress: string
  receiverAddress: string
  amount: number
  projectKey: string
  nonce: number
  deadline: number
  lockCallData: string
  rskPrivateKey: string
}) => {
  const { rskPrivateKey, ...messageParams } = params
  const digest = createPrismWithdrawMessage(messageParams)
  return signEIP712Message(digest, rskPrivateKey)
}
