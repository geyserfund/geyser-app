import { type Address, encodeFunctionData, type Hex } from 'viem'

const PRISM_DEPOSIT_FOR_ABI = [
  {
    name: 'depositFor',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'payer', type: 'address' },
      { name: 'receivers', type: 'address[]' },
      { name: 'amounts', type: 'uint256[]' },
    ],
    outputs: [],
  },
] as const

export const createCallDataForPrismDepositFor = (params: {
  payer: Address
  receivers: Address[]
  amounts: bigint[]
}): Hex => {
  const { payer, receivers, amounts } = params

  if (receivers.length !== amounts.length) {
    throw new Error('Receivers and amounts length mismatch for Prism deposit')
  }

  return encodeFunctionData({
    abi: PRISM_DEPOSIT_FOR_ABI,
    functionName: 'depositFor',
    args: [payer, receivers, amounts],
  })
}
