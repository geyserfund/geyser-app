import { type Address, type Hex, encodeFunctionData } from 'viem'

/**
 * ABI for the lock function on EtherSwap contract
 * @notice Locks Ether for a swap in the contract
 * @notice The amount locked is the Ether sent in the transaction
 * @notice Use bytes32(0) as preimageHash only for commitment-based swaps to avoid accidental misuse
 */
const lockAbi = [
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

export interface LockCallParams {
  /** Preimage hash of the swap (32 bytes hex string with 0x prefix) */
  preimageHash: Hex
  /** Address that can claim the locked Ether */
  claimAddress: Address
  /** Address that can refund the locked Ether */
  refundAddress: Address
  /** Block height after which the locked Ether can be refunded */
  timelock: bigint
}

/**
 * Creates call data hex for the lock function on EtherSwap contract
 * @param params - The parameters for the lock function
 * @returns The encoded call data as a hex string
 */
export const createCallDataForLockCall = (params: LockCallParams): Hex => {
  const { preimageHash, claimAddress, refundAddress, timelock } = params

  return encodeFunctionData({
    abi: lockAbi,
    functionName: 'lock',
    args: [preimageHash, claimAddress, refundAddress, timelock],
  })
}
