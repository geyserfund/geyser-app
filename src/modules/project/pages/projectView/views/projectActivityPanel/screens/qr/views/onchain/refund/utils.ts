/**
 * Get a hex encoded Buffer from a string
 *
 * @returns a hex encoded Buffer
 */
export const getHexBuffer = (input: string): Buffer => {
  return Buffer.from(input, 'hex')
}

/**
 * Get a hex encoded string from a Buffer
 *
 * @returns a hex encoded string
 */
export const getHexString = (input: Buffer): string => {
  return input.toString('hex')
}

export const generateRandomBytes = () => {
  const array = new Uint8Array(32) // Create a typed array of 32 bytes (256 bits)
  crypto.getRandomValues(array) // Fill the array with cryptographically secure random numbers
  return Buffer.from(array)
}
