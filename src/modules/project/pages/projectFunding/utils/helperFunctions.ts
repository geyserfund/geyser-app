/** Convert Ethereum address to 32-byte buffer (left-padded with zeros) */
export const addressToBuffer32 = (address: string): Buffer => {
  const buffer = Buffer.alloc(32)
  const cleanAddress = address.replace('0x', '').replaceAll(' ', '')

  if (cleanAddress.length !== 40) {
    throw new Error(`Invalid Ethereum address format address: ${cleanAddress}`)
  }

  Buffer.from(cleanAddress, 'hex').copy(buffer, 12)
  return buffer
}

/** Convert numeric value to 32-byte big-endian buffer */
export const numberToBuffer32 = (num: number | bigint): Buffer => {
  if (typeof num === 'number' && !Number.isSafeInteger(num)) {
    throw new Error(`Invalid number for uint256 encoding: ${num}`)
  }

  const bigIntValue = BigInt(num)
  if (bigIntValue < 0n) {
    throw new Error(`Negative value cannot be encoded as uint256: ${bigIntValue}`)
  }

  // Handle the full 256-bit number, not just 64-bit
  // Convert BigInt to hex string, pad to 64 characters (32 bytes)
  const hexString = bigIntValue.toString(16).padStart(64, '0')

  // Convert hex string to buffer
  return Buffer.from(hexString, 'hex')
}
