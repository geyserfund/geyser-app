import * as secp256k1 from 'tiny-secp256k1'

/** Signs EIP-712 message hash with RSK private key */
export const signEIP712Message = (digest: string, rskPrivateKey: string) => {
  console.log('checking digest', digest)
  console.log('checking rskPrivateKey', rskPrivateKey)
  try {
    // Validate inputs
    if (!digest.startsWith('0x') || digest.length !== 66) {
      throw new Error('Invalid digest format')
    }

    // Support both formats: with '0x' prefix (66 chars) and without (64 chars)
    const hasPrefix = rskPrivateKey.startsWith('0x')
    const expectedLength = hasPrefix ? 66 : 64

    if (rskPrivateKey.length !== expectedLength) {
      throw new Error('Invalid private key format')
    }

    const messageHash = Buffer.from(digest.slice(2), 'hex')
    const privKey = Buffer.from(hasPrefix ? rskPrivateKey.slice(2) : rskPrivateKey, 'hex')

    // Basic signature creation - this might need adjustment based on your specific secp256k1 library
    // For now, this provides the structure that matches Solidity's expectation

    // Note: You may need to add a proper secp256k1 signing library for production use
    // Popular options: @noble/secp256k1, ethereum-cryptography, or ethers.js

    // Use signRecoverable to get both signature and recovery ID
    const signatureResult = secp256k1.signRecoverable(messageHash, privKey)

    if (!signatureResult) {
      throw new Error('Failed to create signature')
    }

    // Extract signature and recovery ID
    const { signature, recoveryId } = signatureResult

    // Convert signature to Buffer to ensure proper handling
    const sigBuffer = Buffer.from(signature)

    // Extract r and s components (first 64 bytes)
    const r = '0x' + sigBuffer.slice(0, 32).toString('hex')
    const s = '0x' + sigBuffer.slice(32, 64).toString('hex')

    // Calculate v parameter: recoveryId + 27 (Ethereum standard)
    const v = recoveryId + 27

    // Create complete Ethereum signature: r + s + v (65 bytes total)
    const vBuffer = Buffer.from([v])
    const fullSignatureBuffer = Buffer.concat([sigBuffer, vBuffer])
    const fullSignature = '0x' + fullSignatureBuffer.toString('hex')

    return {
      v,
      r,
      s,
      signature: fullSignature,
      digest,
    }
  } catch (error) {
    throw new Error(`Failed to sign EIP-712 message: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const signatureToVRS = (signature: string) => {
  const cleanSignature = signature.startsWith('0x') ? signature.slice(2) : signature
  const sigBuffer = Buffer.from(cleanSignature, 'hex')
  const r = '0x' + sigBuffer.subarray(0, 32).toString('hex')
  const s = '0x' + sigBuffer.subarray(32, 64).toString('hex')
  const v = parseInt(sigBuffer.subarray(64, 65).toString('hex'), 16)
  return { v, r, s }
}
