import { type Address, type Hex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { rootstockPublicClient, RSK_CHAIN_ID } from './viemClient.ts'

/** Default gas limit for a simple native RBTC value transfer */
const DEFAULT_NATIVE_TRANSFER_GAS_LIMIT = 21000n
const WEI_PER_SAT = 10_000_000_000n

export type NativeTransferSignResult = {
  signedTxHex: Hex
  /** Final transfer value after any gas dust reservation */
  amountWei: bigint
  gasCostWei: bigint
  /** True when transfer value was reduced to leave balance for gas */
  gasDeducted: boolean
}

/**
 * Creates and signs a native RBTC value transfer.
 *
 * When `exactAmount` is true (server-prepared payouts), signs exactly `amount`
 * and fails if the account cannot also cover gas. Otherwise, if balance cannot
 * cover amount+gas, the transfer value is reduced (sat-aligned) so dust remains
 * for gas.
 */
export const createAndSignNativeTransferTransaction = async (params: {
  destinationAddress: Address
  amount: bigint | number
  privateKey: Hex
  gasLimit?: bigint
  gasPrice?: bigint
  /** When true, never reduce value to pay gas — must match server payment amount */
  exactAmount?: boolean
}): Promise<NativeTransferSignResult> => {
  const { destinationAddress, privateKey, exactAmount = false } = params

  try {
    const account = privateKeyToAccount(privateKey)
    const gasPrice = params.gasPrice ?? (await rootstockPublicClient.getGasPrice())
    const gasLimit = params.gasLimit ?? DEFAULT_NATIVE_TRANSFER_GAS_LIMIT
    const gasCostWei = gasPrice * gasLimit

    const balance = await rootstockPublicClient.getBalance({
      address: account.address,
      blockTag: 'pending',
    })

    let amountWei = BigInt(params.amount)
    let gasDeducted = false

    if (balance < amountWei + gasCostWei) {
      if (exactAmount) {
        throw new Error(
          'Insufficient RBTC balance to cover the payout amount plus network fees. Add a small amount of RBTC for gas and try again.',
        )
      }

      if (balance <= gasCostWei) {
        throw new Error('Insufficient RBTC balance to cover network fees')
      }

      // Keep value sat-aligned so it can match server accountingAmountDue (sats).
      const maxSendableWei = ((balance - gasCostWei) / WEI_PER_SAT) * WEI_PER_SAT
      amountWei = maxSendableWei
      gasDeducted = true
    }

    if (amountWei <= 0n) {
      throw new Error('Transfer amount must be greater than zero after reserving gas')
    }

    const nonce = await rootstockPublicClient.getTransactionCount({
      address: account.address,
      blockTag: 'pending',
    })

    const signedTxHex = await account.signTransaction({
      to: destinationAddress,
      value: amountWei,
      data: '0x',
      nonce,
      gas: gasLimit,
      gasPrice,
      chainId: RSK_CHAIN_ID,
      type: 'legacy',
    })

    return {
      signedTxHex,
      amountWei,
      gasCostWei,
      gasDeducted,
    }
  } catch (error) {
    throw new Error(
      `Failed to create and sign native transfer: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
