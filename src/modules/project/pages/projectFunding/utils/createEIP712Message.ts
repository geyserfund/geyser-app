import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex } from '@noble/hashes/utils'
import { Buffer } from 'buffer'

import { CreateBoltzEtherSwapDomainSeparator, CreateBoltzRouterDomainSeparator } from './createDomainSeparator.ts'
import { addressToBuffer32, numberToBuffer32 } from './helperFunctions.ts'
import { signEIP712Message } from './signEIP712Message.ts'

export const BOLTZ_TYPEHASH_CLAIM =
  'Claim(bytes32 preimage,uint256 amount,address refundAddress,uint256 timelock,address destination)'
export const BOLTZ_TYPEHASH_CLAIM_CALL = 'ClaimCall(bytes32 preimage,address callee,bytes32 callData)'

export const BOLTZ_TYPEHASH_PAYMENT_REFUND =
  'Refund(bytes32 preimageHash,uint256 amount,address claimAddress,address refundAddress,uint256 timelock)'

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

  const structTypeHash = Buffer.from(keccak_256(BOLTZ_TYPEHASH_CLAIM_CALL))

  const preimageBuffer = Buffer.from(preimage, 'hex')
  const calleeBuffer = addressToBuffer32(callee)

  // IMPORTANT: Hash the callData first, as per Router contract line 192: keccak256(callData)
  const callDataHash = Buffer.from(keccak_256(Buffer.from(callData.replace('0x', ''), 'hex')))

  const structEncoded = Buffer.concat([structTypeHash, preimageBuffer, calleeBuffer, callDataHash])

  const structHash = Buffer.from(keccak_256(structEncoded))

  const eip712Prefix = Buffer.from('1901', 'hex') // "\x19\x01"
  const digestData = Buffer.concat([eip712Prefix, domainSeparator, structHash])

  const digest = keccak_256(digestData)
  return '0x' + bytesToHex(digest)
}

/**
 * @param preimageHash - The preimage hash value of the original swap that failed
 * @param amount - The amount of the original swap that failed
 * @param claimAddress - The claim address of the original swap that failed
 * @param timelock - The timelock of the original swap that failed
 */
export const createEIP712MessageForPaymentRefund = (
  preimageHash: string,
  amount: number,
  claimAddress: string,
  refundAddress: string,
  timelock: number,
) => {
  const domainSeparator = Buffer.from(CreateBoltzEtherSwapDomainSeparator().slice(2), 'hex')

  const structTypeHash = Buffer.from(keccak_256(BOLTZ_TYPEHASH_PAYMENT_REFUND))

  const preimageHashBuffer = Buffer.from(preimageHash, 'hex')
  const amountBuffer = numberToBuffer32(amount)
  const claimAddressBuffer = addressToBuffer32(claimAddress)
  const refundAddressBuffer = addressToBuffer32(refundAddress)
  const timelockBuffer = numberToBuffer32(timelock)

  const structEncoded = Buffer.concat([
    structTypeHash,
    preimageHashBuffer,
    amountBuffer,
    claimAddressBuffer,
    refundAddressBuffer,
    timelockBuffer,
  ])

  const structHash = Buffer.from(keccak_256(structEncoded))

  const eip712Prefix = Buffer.from('1901', 'hex') // "\x19\x01"
  const digestData = Buffer.concat([eip712Prefix, domainSeparator, structHash])

  const digest = keccak_256(digestData)
  return '0x' + bytesToHex(digest)
}

export const createAndSignEIP712MessageForPaymentRefund = (params: {
  preimageHash: string
  amount: number
  claimAddress: string
  refundAddress: string
  timelock: number
  privateKey: string
}) => {
  const { preimageHash, amount, claimAddress, refundAddress, timelock, privateKey } = params

  const eip712Message = createEIP712MessageForPaymentRefund(preimageHash, amount, claimAddress, refundAddress, timelock)
  const signature = signEIP712Message(eip712Message, privateKey)
  return signature
}
