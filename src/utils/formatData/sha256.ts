import { Buffer } from 'buffer'

export const sha256 = async (hex: string) => {
  // Encode as UTF-8
  // const msgBuffer = new TextEncoder().encode(message);
  const msgBuffer = Buffer.from(hex, 'hex')

  // Hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // Convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // Convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}
