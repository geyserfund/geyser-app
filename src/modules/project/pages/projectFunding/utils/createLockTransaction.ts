import { type Address, type Hex, encodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS } from '@/shared/constants/config/env.ts'
import { __production__ } from '@/shared/constants/index.ts'

import { rootstockPublicClient, RSK_CHAIN_ID } from './viemClient.ts'

/**
 * CONFIGURATION CONSTANTS
 * Replace these with actual values from your config
 */

/** Default gas limit for lock transactions */
const DEFAULT_GAS_LIMIT = 200000n

/** Default gas price in gwei (adjust based on network conditions) */
// const DEFAULT_GAS_PRICE_GWEI = '0.06' as const
const CONTRACT_ADDRESS = VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS

/**
 * ABI definition for the lock function
 * Matches the Solidity function signature:
 * function lock(bytes32 preimageHash, address claimAddress, address refundAddress, uint256 timelock) external payable
 */
const LOCK_FUNCTION_ABI = [
  {
    name: 'lock',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'preimageHash', type: 'bytes32' },
      { name: 'claimAddress', type: 'address' },
      { name: 'refundAddress', type: 'address' },
      { name: 'timelock', type: 'uint256' },
    ],
    outputs: [],
  },
] as const

/**
 * Creates ABI-encoded call data for the lock function
 *
 * This function encodes the function call according to Ethereum's ABI specification:
 * - First 4 bytes: Function selector (keccak256 hash of function signature)
 * - Remaining bytes: Encoded parameters
 *
 * @param preimageHash - The hash of the preimage (32 bytes)
 * @param claimAddress - Address that can claim the locked funds
 * @param refundAddress - Address that can refund the locked funds after timelock
 * @param timelock - Block height after which refund becomes possible
 * @returns Hex-encoded call data ready to be included in a transaction
 */
export const createCallDataForLock = (
  preimageHash: Hex,
  claimAddress: Address,
  refundAddress: Address,
  timelock: bigint,
): Hex => {
  try {
    return encodeFunctionData({
      abi: LOCK_FUNCTION_ABI,
      functionName: 'lock',
      args: [preimageHash, claimAddress, refundAddress, timelock],
    })
  } catch (error) {
    throw new Error(`Failed to create lock call data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Creates an unsigned transaction object for locking funds
 *
 * This creates a transaction that can be signed by a wallet (MetaMask, etc.)
 * The transaction includes:
 * - Destination address (swap contract)
 * - Call data (encoded lock function call)
 * - Value (amount of RBTC to lock)
 *
 * @param params.preimageHash - The hash of the preimage (32 bytes)
 * @param params.claimAddress - Address that can claim the locked funds
 * @param params.refundAddress - Address that can refund the locked funds
 * @param params.timelock - Block height after which refund becomes possible
 * @param params.amount - Amount to lock in wei (1 RBTC = 10^18 wei)
 * @param params.contractAddress - The swap contract address (optional, uses default if not provided)
 * @returns Transaction object with to, data, and value fields
 */
export const createLockTransaction = (params: {
  preimageHash: Hex
  claimAddress: Address
  refundAddress: Address
  timelock: bigint
  amount: bigint
}): { to: Address; data: Hex; value: bigint } => {
  const { preimageHash, claimAddress, refundAddress, timelock, amount } = params

  try {
    const data = createCallDataForLock(preimageHash, claimAddress, refundAddress, timelock)

    return {
      to: CONTRACT_ADDRESS,
      data,
      value: amount,
    }
  } catch (error) {
    throw new Error(`Failed to create lock transaction: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Creates, signs, and serializes a lock transaction ready for broadcasting
 *
 * This is the main function for creating a fully signed transaction that can be broadcast to the network.
 *
 * PROCESS:
 * 1. Creates an account from the private key
 * 2. Fetches the current nonce from the network (ensures correct transaction ordering)
 * 3. Encodes the lock function call data
 * 4. Builds a complete transaction object with all required fields
 * 5. Signs the transaction using EIP-155 (includes chain ID for replay protection)
 * 6. Serializes the signed transaction to RLP-encoded hex format
 *
 * The signed transaction can then be:
 * - Sent directly to an RPC endpoint via eth_sendRawTransaction
 * - Passed to your backend for broadcasting
 * - Stored and broadcast later
 *
 * @param params.preimageHash - The hash of the preimage (32 bytes hex string with 0x prefix)
 * @param params.claimAddress - Address that can claim the locked funds
 * @param params.refundAddress - Address that can refund after timelock
 * @param params.timelock - Block height after which refund becomes possible
 * @param params.amount - Amount to lock in wei (use parseEther() for RBTC amounts)
 * @param params.privateKey - Private key for signing (32 bytes hex with 0x prefix)
 * @param params.contractAddress - Swap contract address (optional)
 * @param params.gasLimit - Gas limit (optional, defaults to 200000)
 * @param params.gasPrice - Gas price in wei (optional, defaults to 0.06 gwei)
 * @param params.chainId - Chain ID (optional, defaults to RSK Mainnet = 30)
 * @param params.rpcUrl - RPC endpoint (optional, defaults to RSK public node)
 * @returns Signed transaction as hex string, ready for broadcasting
 *
 * @example
 * const signedTx = await createAndSignLockTransaction({
 *   preimageHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
 *   claimAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
 *   refundAddress: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
 *   timelock: 1234567n,
 *   amount: parseEther('0.1'), // Lock 0.1 RBTC
 *   privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
 * })
 *
 * // Now broadcast it:
 * const txHash = await broadcastTransaction(signedTx)
 */
export const createAndSignLockTransaction = async (params: {
  preimageHash: Hex
  claimAddress: Address
  refundAddress: Address
  timelock: bigint
  amount: bigint | number
  privateKey: Hex
}): Promise<Hex> => {
  const { preimageHash, claimAddress, refundAddress, timelock, amount, privateKey } = params

  const gasPrice = await rootstockPublicClient.getGasPrice()
  const gasLimit = DEFAULT_GAS_LIMIT
  const contractAddress = VITE_APP_BOLTZ_SWAP_CONTRACT_ADDRESS

  try {
    // Step 1: Create account from private key
    // This converts the private key into an account object that can sign transactions
    const account = privateKeyToAccount(privateKey)

    // Step 2: Create public client for reading blockchain data
    // This client is used to fetch nonce and other read-only operations

    // Step 3: Encode the lock function call data
    const data = createCallDataForLock(preimageHash, claimAddress, refundAddress, timelock)

    // Step 4: Get current nonce from the network using viem's publicClient
    // The nonce ensures transactions are processed in order and prevents replay attacks
    // 'pending' block tag includes pending transactions to get the correct nonce
    const nonce = await rootstockPublicClient.getTransactionCount({
      address: account.address,
      blockTag: 'pending',
    })

    // Step 5: Build the transaction object
    // This includes all fields required for an Ethereum/RSK transaction
    const transaction = {
      to: contractAddress,
      value: BigInt(amount),
      data,
      nonce,
      gas: gasLimit,
      gasPrice,
      chainId: RSK_CHAIN_ID,
      type: 'legacy' as const,
    }

    // Step 6: Sign the transaction
    // This uses EIP-155 signing which includes the chain ID to prevent replay attacks
    const signedTransaction = await account.signTransaction(transaction)

    // Step 7: Return the serialized signed transaction
    // This is RLP-encoded and ready to be broadcast via eth_sendRawTransaction
    return signedTransaction
  } catch (error) {
    throw new Error(
      `Failed to create and sign lock transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
