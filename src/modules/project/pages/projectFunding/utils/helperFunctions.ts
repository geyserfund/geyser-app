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

/** Convert number to 32-byte big-endian buffer */
export const numberToBuffer32 = (num: number): Buffer => {
  const bigIntValue = BigInt(num)

  // Handle the full 256-bit number, not just 64-bit
  // Convert BigInt to hex string, pad to 64 characters (32 bytes)
  const hexString = bigIntValue.toString(16).padStart(64, '0')

  // Convert hex string to buffer
  return Buffer.from(hexString, 'hex')
}
