/** Encrypts any string using AES-256-GCM with PBKDF2 key derivation */
export const encryptString = async ({
  plainText,
  password,
}: {
  plainText: string
  password: string
}): Promise<string> => {
  try {
    // Generate random salt (16 bytes)
    const salt = window.crypto.getRandomValues(new Uint8Array(16))

    // Generate random IV (12 bytes for GCM)
    const iv = window.crypto.getRandomValues(new Uint8Array(12))

    // Convert password to key using PBKDF2
    const passwordKey = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey'],
    )

    // Derive AES key from password using PBKDF2 with 100,000 iterations
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt'],
    )

    // Convert plain text to bytes
    const plainTextBytes = new TextEncoder().encode(plainText)

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      plainTextBytes,
    )

    // Convert encrypted data to Uint8Array
    const encryptedArray = new Uint8Array(encryptedData)

    // Extract authentication tag (last 16 bytes) and data (everything else)
    const authTag = encryptedArray.slice(-16)
    const data = encryptedArray.slice(0, -16)

    // Create the JSON structure for storage
    const encryptedObject = {
      iv: Buffer.from(iv).toString('base64'),
      tag: Buffer.from(authTag).toString('base64'),
      data: Buffer.from(data).toString('base64'),
      salt: Buffer.from(salt).toString('base64'),
    }

    // Return as base64 encoded JSON string
    return Buffer.from(JSON.stringify(encryptedObject)).toString('base64')
  } catch (error) {
    throw new Error(`Failed to encrypt string: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Decrypts an encrypted string using AES-256-GCM with PBKDF2 key derivation */
export const decryptString = async ({
  encryptedString,
  password,
}: {
  encryptedString: string
  password: string
}): Promise<string> => {
  try {
    // Decode base64 to get JSON string
    const jsonString = Buffer.from(encryptedString, 'base64').toString('utf8')

    // Parse JSON to extract components
    const encryptedObject = JSON.parse(jsonString)

    // Validate required fields
    if (!encryptedObject.iv || !encryptedObject.tag || !encryptedObject.data || !encryptedObject.salt) {
      throw new Error('Invalid encrypted string format: missing required fields')
    }

    // Decode base64 components
    const iv = new Uint8Array(Buffer.from(encryptedObject.iv, 'base64'))
    const authTag = new Uint8Array(Buffer.from(encryptedObject.tag, 'base64'))
    const data = new Uint8Array(Buffer.from(encryptedObject.data, 'base64'))
    const salt = new Uint8Array(Buffer.from(encryptedObject.salt, 'base64'))

    // Convert password to key using PBKDF2
    const passwordKey = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey'],
    )

    // Derive AES key from password using same salt and iterations
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt'],
    )

    // Reconstruct encrypted data with authentication tag appended
    const encryptedDataWithTag = new Uint8Array(data.length + authTag.length)
    encryptedDataWithTag.set(data, 0)
    encryptedDataWithTag.set(authTag, data.length)

    // Decrypt the data - this will throw if password is wrong or data is corrupted
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encryptedDataWithTag,
    )

    // Convert decrypted bytes back to string
    const decryptedString = new TextDecoder().decode(decryptedData)

    return decryptedString
  } catch (error) {
    // Throw a clear error if decryption fails (wrong password or corrupted data)
    if (error instanceof Error && error.message.includes('OperationError')) {
      throw new Error('Failed to decrypt string: Invalid password or corrupted data')
    }

    throw new Error(`Failed to decrypt string: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
