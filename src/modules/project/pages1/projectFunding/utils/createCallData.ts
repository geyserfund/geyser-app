import { keccak_256 } from '@noble/hashes/sha3'

import { VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS } from '@/shared/constants/config/env.ts'

import { createEIP712MessageForBoltzClaim, createEIP712MessageForBoltzClaimCall } from './createEIP712Message.ts'
import { addressToBuffer32, numberToBuffer32 } from './helperFunctions.ts'
import { signEIP712Message } from './signEIP712Message.ts'

/** Creates call data equivalent to Solidity's abi.encodeWithSignature("contributeFor(address, uint256)", contributorAddress, fees) */
export const createCallDataForContributeForAon = (contributorAddress: string, fees: number, tip: number): string => {
  try {
    // Step 1: Create function selector from signature
    const functionSignature = 'contributeFor(address,uint256,uint256)'
    const functionSelector = Buffer.from(keccak_256(functionSignature)).slice(0, 4)

    // Step 2: Encode parameters according to ABI encoding rules
    // Address parameter (32 bytes, left-padded with zeros)
    const addressBuffer = addressToBuffer32(contributorAddress)

    // Uint256 parameter (32 bytes, big-endian)
    const feesBuffer = numberToBuffer32(fees)

    const tipBuffer = numberToBuffer32(tip)

    // Step 3: Concatenate selector + encoded parameters
    const callData = Buffer.concat([functionSelector, addressBuffer, feesBuffer, tipBuffer])

    // Return as hex string with 0x prefix
    return '0x' + callData.toString('hex')
  } catch (error) {
    throw new Error(`Failed to create call data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Creates encoded Claim struct data for use in claimCall function */
export const createClaimStructData = (
  preimage: string,
  amount: number,
  refundAddress: string,
  timelock: number,
  v: number,
  r: string,
  s: string,
): string => {
  try {
    // Encode Claim struct according to ABI encoding rules
    // struct Claim { bytes32 preimage; uint256 amount; address refundAddress; uint256 timelock; uint8 v; bytes32 r; bytes32 s; }

    // bytes32 preimage (32 bytes)
    const preimageBuffer = Buffer.alloc(32)
    const cleanPreimage = preimage.replace('0x', '')
    if (cleanPreimage.length !== 64) {
      throw new Error('Invalid preimage format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanPreimage, 'hex').copy(preimageBuffer)

    // uint256 amount (32 bytes, big-endian)
    const amountBuffer = numberToBuffer32(amount)

    // address refundAddress (32 bytes, left-padded with zeros)
    const refundAddressBuffer = addressToBuffer32(refundAddress)

    // uint256 timelock (32 bytes, big-endian)
    const timelockBuffer = numberToBuffer32(timelock)

    // uint8 v (32 bytes, left-padded with zeros)
    const vBuffer = Buffer.alloc(32)
    vBuffer.writeUInt8(v, 31) // Write to last byte

    // bytes32 r (32 bytes)
    const rBuffer = Buffer.alloc(32)
    const cleanR = r.replace('0x', '')
    if (cleanR.length !== 64) {
      throw new Error('Invalid r format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanR, 'hex').copy(rBuffer)

    // bytes32 s (32 bytes)
    const sBuffer = Buffer.alloc(32)
    const cleanS = s.replace('0x', '')
    if (cleanS.length !== 64) {
      throw new Error('Invalid s format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanS, 'hex').copy(sBuffer)

    // Concatenate all struct fields
    const structData = Buffer.concat([
      preimageBuffer,
      amountBuffer,
      refundAddressBuffer,
      timelockBuffer,
      vBuffer,
      rBuffer,
      sBuffer,
    ])

    // Return as hex string with 0x prefix
    return '0x' + structData.toString('hex')
  } catch (error) {
    throw new Error(`Failed to create Claim struct data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Creates call data for claimCall function on Router contract */
export const createCallDataForClaimCall = (
  claimStructData: string,
  callee: string,
  callData: string,
  v: number,
  r: string,
  s: string,
): string => {
  try {
    // Step 1: Create function selector from signature
    // function claimCall(Claim calldata claim, address callee, bytes calldata callData, uint8 v, bytes32 r, bytes32 s)
    const functionSignature =
      'claimCall((bytes32,uint256,address,uint256,uint8,bytes32,bytes32),address,bytes,uint8,bytes32,bytes32)'
    const functionSelector = Buffer.from(keccak_256(functionSignature)).slice(0, 4)

    // Step 2: Encode parameters according to ABI encoding rules

    // Claim struct data (already encoded)
    const claimBuffer = Buffer.from(claimStructData.replace('0x', ''), 'hex')

    // address callee (32 bytes, left-padded with zeros)
    const calleeBuffer = addressToBuffer32(callee)

    // bytes callData - dynamic type, needs offset + length + data
    const callDataClean = callData.replace('0x', '')
    const callDataLength = callDataClean.length / 2
    const callDataLengthBuffer = numberToBuffer32(callDataLength)
    const callDataBuffer = Buffer.from(callDataClean, 'hex')
    // Pad callData to 32-byte boundary
    const callDataPadded = Buffer.alloc(Math.ceil(callDataBuffer.length / 32) * 32)
    callDataBuffer.copy(callDataPadded)

    // uint8 v (32 bytes, left-padded with zeros)
    const vBuffer = Buffer.alloc(32)
    vBuffer.writeUInt8(v, 31)

    // bytes32 r (32 bytes)
    const rBuffer = Buffer.alloc(32)
    const cleanR = r.replace('0x', '')
    if (cleanR.length !== 64) {
      throw new Error('Invalid r format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanR, 'hex').copy(rBuffer)

    // bytes32 s (32 bytes)
    const sBuffer = Buffer.alloc(32)
    const cleanS = s.replace('0x', '')
    if (cleanS.length !== 64) {
      throw new Error('Invalid s format: must be 32 bytes (64 hex chars)')
    }

    Buffer.from(cleanS, 'hex').copy(sBuffer)

    // For dynamic types, we need to calculate offsets
    // The callData bytes parameter needs an offset pointer
    const baseOffset = 12 * 32 // 12 parameters before the dynamic callData
    const callDataOffsetBuffer = numberToBuffer32(baseOffset)

    // Step 3: Concatenate selector + encoded parameters
    const encodedCall = Buffer.concat([
      functionSelector,
      claimBuffer, // Claim struct (7 * 32 bytes)
      calleeBuffer, // address callee (32 bytes)
      callDataOffsetBuffer, // offset to callData (32 bytes)
      vBuffer, // uint8 v (32 bytes)
      rBuffer, // bytes32 r (32 bytes)
      sBuffer, // bytes32 s (32 bytes)
      callDataLengthBuffer, // length of callData (32 bytes)
      callDataPadded, // actual callData (padded to 32-byte boundary)
    ])

    // Return as hex string with 0x prefix
    return '0x' + encodedCall.toString('hex')
  } catch (error) {
    throw new Error(`Failed to create claimCall call data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Creates an unsigned Rootstock transaction for Boltz claimCall */
export const createTransactionForBoltzClaimCall = (params: {
  contributorAddress: string
  fees: number
  tip: number
  preimage: string
  amount: number
  refundAddress: string
  timelock: number
  privateKey: string
  aonContractAddress: string
}): string => {
  const { contributorAddress, fees, tip, preimage, amount, refundAddress, timelock, privateKey, aonContractAddress } =
    params

  try {
    // Step 1: Create call data for contributeFor function
    const contributeForCallData = createCallDataForContributeForAon(contributorAddress, fees, tip)

    // Step 2: Create and sign the Boltz claim message
    const claimEIP712Message = createEIP712MessageForBoltzClaim(
      preimage,
      amount,
      refundAddress,
      timelock,
      VITE_APP_BOLTZ_ROUTER_CONTRACT_ADDRESS,
    )
    const claimSignature = signEIP712Message(claimEIP712Message, privateKey)

    // Step 3: Create Claim struct data
    const claimStructData = createClaimStructData(
      preimage,
      amount,
      refundAddress,
      timelock,
      claimSignature.v,
      claimSignature.r,
      claimSignature.s,
    )

    // Step 3.5: Calculate hashValues for verification (replicating Solidity hashValues function)
    // Note: Need to convert preimage to preimageHash using SHA256 (as per EtherSwap contract)

    // Step 4: Create and sign the claimCall message
    const claimCallEIP712Message = createEIP712MessageForBoltzClaimCall(
      preimage,
      aonContractAddress,
      contributeForCallData,
    )
    const claimCallSignature = signEIP712Message(claimCallEIP712Message, privateKey)

    // Step 5: Create the final claimCall transaction data
    const claimCallData = createCallDataForClaimCall(
      claimStructData,
      aonContractAddress, // callee
      contributeForCallData, // callData
      claimCallSignature.v,
      claimCallSignature.r,
      claimCallSignature.s,
    )

    return claimCallData
  } catch (error) {
    throw new Error(
      `Failed to create claimCall transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
