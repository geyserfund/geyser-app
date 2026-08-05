import { type Address, type Hex, encodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { satsToWei } from '@/modules/project/funding/hooks/useFundingAPI.ts'

import { rootstockPublicClient, RSK_CHAIN_ID } from './viemClient.ts'

/** Default gas limit for AON claim(processingFee) */
const DEFAULT_AON_CLAIM_GAS_LIMIT = 250000n

/** Minimal ABI for encoding claim(uint256) when prepare does not return calldata */
const AON_CLAIM_ABI = [
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'processingFee', type: 'uint256' }],
    outputs: [],
  },
] as const

export type AonClaimSignResult = {
  signedTxHex: Hex
  gasCostWei: bigint
}

/**
 * Encodes claim(processingFee) calldata.
 * Prefer server-provided claimCalldata from aonClaimPrepare when available.
 */
export const encodeAonClaimCalldata = (params: {
  claimCalldata?: string | null
  processingFeeSats?: number
}): Hex => {
  if (params.claimCalldata) {
    return (params.claimCalldata.startsWith('0x')
      ? params.claimCalldata
      : `0x${params.claimCalldata}`) as Hex
  }

  const processingFeeWei = satsToWei(params.processingFeeSats ?? 0)
  return encodeFunctionData({
    abi: AON_CLAIM_ABI,
    functionName: 'claim',
    args: [processingFeeWei],
  })
}

/**
 * Creates and signs an AON `claim(processingFee)` transaction from the creator personal RSK key.
 * Throws a clear error when the creator EOA cannot cover gas.
 */
export const createAndSignAonClaimTransaction = async (params: {
  contractAddress: Address
  /** Hex private key, with or without 0x (account keys are stored without the prefix). */
  privateKey: string
  claimCalldata?: string | null
  processingFeeSats?: number
  gasLimit?: bigint
  gasPrice?: bigint
}): Promise<AonClaimSignResult> => {
  const { contractAddress } = params

  try {
    const normalizedPrivateKey = (
      params.privateKey.startsWith('0x') ? params.privateKey : `0x${params.privateKey}`
    ) as Hex
    const account = privateKeyToAccount(normalizedPrivateKey)
    const data = encodeAonClaimCalldata({
      claimCalldata: params.claimCalldata,
      processingFeeSats: params.processingFeeSats,
    })

    const gasPrice = params.gasPrice ?? (await rootstockPublicClient.getGasPrice())
    const gasLimit = params.gasLimit ?? DEFAULT_AON_CLAIM_GAS_LIMIT
    const gasCostWei = gasPrice * gasLimit

    const balance = await rootstockPublicClient.getBalance({
      address: account.address,
      blockTag: 'pending',
    })

    if (balance < gasCostWei) {
      throw new Error(
        'Insufficient RBTC in your Geyser Rootstock wallet to cover network fees for claiming. Add a small amount of RBTC for gas, then try again.',
      )
    }

    const nonce = await rootstockPublicClient.getTransactionCount({
      address: account.address,
      blockTag: 'pending',
    })

    const signedTxHex = await account.signTransaction({
      to: contractAddress,
      value: 0n,
      data,
      nonce,
      gas: gasLimit,
      gasPrice,
      chainId: RSK_CHAIN_ID,
      type: 'legacy',
    })

    return { signedTxHex, gasCostWei }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Insufficient RBTC')) {
      throw error
    }

    throw new Error(
      `Failed to create and sign AON claim transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
