import { encodeAbiParameters, Hex, keccak256 } from 'viem'

export const projectIdToProjectKey = (projectId: bigint): Hex => {
  return keccak256(encodeAbiParameters([{ type: 'uint256' }], [projectId]))
}
