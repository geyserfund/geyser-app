import { keccak_256 } from '@noble/hashes/sha3'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { BIP32Factory } from 'bip32'
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'

import { __production__ } from '@/shared/constants/index.ts'

// Initialize BIP32 with ecc
const bip32 = BIP32Factory(ecc)

enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

const derivationPathMap = {
  [Network.TESTNET]: "m/44'/37310'/0'/0/0",
  [Network.MAINNET]: "m/44'/137'/0'/0/0",
}

const getEntropy = (bytes = 16) => {
  const entropy = new Uint8Array(bytes)
  window.crypto.getRandomValues(entropy)
  return entropy
}

export const generateMnemonic = () => {
  const entropy = getEntropy()
  return bip39.entropyToMnemonic(entropy, wordlist)
}

export const generateSeedHexForUser = () => {
  const mnemonic = generateMnemonic()
  // console.log('checking what is mnemonic', mnemonic)

  if (!bip39.validateMnemonic(mnemonic, wordlist)) {
    throw new Error('Invalid mnemonic')
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const seedHex = Buffer.from(seed).toString('hex')

  return seedHex
}

/** Encrypts seed hex using AES-256-GCM with PBKDF2 key derivation */
export const encryptSeed = async (seedHex: string, password: string): Promise<string> => {
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

    // Create JSON structure containing the seed
    const seedJson = JSON.stringify({
      seed: seedHex,
      version: '1.0',
      algorithm: 'AES-256-GCM',
      timestamp: Date.now(),
    })

    // Convert JSON string to bytes
    const seedJsonBytes = new TextEncoder().encode(seedJson)

    // Encrypt the JSON data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      seedJsonBytes,
    )

    // Convert encrypted data to Uint8Array
    const encryptedArray = new Uint8Array(encryptedData)

    // Extract authentication tag (last 16 bytes) and data (everything else)
    const authTag = encryptedArray.slice(-16)
    const data = encryptedArray.slice(0, -16)

    // Create the JSON structure expected by backend
    const encryptedObject = {
      iv: Buffer.from(iv).toString('base64'),
      tag: Buffer.from(authTag).toString('base64'),
      data: Buffer.from(data).toString('base64'),
      salt: Buffer.from(salt).toString('base64'),
    }

    // Return as base64 encoded JSON string
    return Buffer.from(JSON.stringify(encryptedObject)).toString('base64')
  } catch (error) {
    throw new Error(`Failed to encrypt seed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Decrypts seed hex using AES-256-GCM with PBKDF2 key derivation */
export const decryptSeed = async (encryptedSeed: string, password: string): Promise<string> => {
  try {
    // Decode base64 to get JSON string
    const jsonString = Buffer.from(encryptedSeed, 'base64').toString('utf8')

    // Parse JSON to extract components
    const encryptedObject = JSON.parse(jsonString)

    console.log('checking what is encryptedObject', encryptedObject)

    // Validate required fields
    if (!encryptedObject.iv || !encryptedObject.tag || !encryptedObject.data || !encryptedObject.salt) {
      throw new Error('Invalid encrypted seed format: missing required fields')
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
    console.log('checking what is decryptedData', encryptedDataWithTag)

    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encryptedDataWithTag,
    )

    // Convert decrypted bytes back to JSON string
    const decryptedJson = new TextDecoder().decode(decryptedData)

    // Parse JSON and extract seed
    const seedData = JSON.parse(decryptedJson)

    // Validate the JSON structure
    if (!seedData || typeof seedData.seed !== 'string') {
      throw new Error('Invalid encrypted seed format: missing seed property')
    }

    return seedData.seed
  } catch (error) {
    throw new Error(`Failed to decrypt seed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const generateKeysFromSeedHex = (seedHex: string): AccountKeys => {
  const network = __production__ ? Network.MAINNET : Network.TESTNET
  const derivationPath = derivationPathMap[network]
  const bitcoinNetwork = __production__ ? bitcoin.networks.bitcoin : bitcoin.networks.testnet

  const seedFromSeedHex = Buffer.from(seedHex, 'hex')

  console.log('checking what is seed from SeedHex', seedFromSeedHex)

  // Create BIP32 root from seed
  const root = bip32.fromSeed(seedFromSeedHex, bitcoinNetwork)

  console.log('checking what is root', root)

  // Derive child node
  const child = root.derivePath(derivationPath)

  console.log('checking what is child', child)
  console.log('checking child methods', Object.getOwnPropertyNames(child))

  if (!child || typeof child.toWIF !== 'function') {
    throw new Error('Failed to derive BIP32 child node')
  }

  // Generate Ethereum-style address for RSK
  // RSK uses Ethereum-style addresses (0x prefix) even though it's a Bitcoin sidechain

  if (!child.privateKey) {
    throw new Error('Private key is required for address generation')
  }

  // Get uncompressed public key directly from private key (65 bytes starting with 0x04)
  const uncompressedPublicKey = ecc.pointFromScalar(child.privateKey, false)
  if (!uncompressedPublicKey) {
    throw new Error('Failed to generate uncompressed public key')
  }

  // Remove the 0x04 prefix to get the 64-byte key for hashing
  const publicKeyForHashing = uncompressedPublicKey.slice(1)

  // Hash with Keccak-256 and take last 20 bytes for address
  const hash = keccak_256(publicKeyForHashing)
  const address = '0x' + Buffer.from(hash.slice(-20)).toString('hex')

  console.log('checking what is address', address)

  const privateKey = child.privateKey?.toString('hex')
  const publicKey = child.publicKey.toString('hex')

  console.log('checking what is privateKey', privateKey)
  console.log('checking what is publicKey', publicKey)

  return {
    derivationPath,
    address,
    privateKey,
    publicKey,
  }
}

export type AccountKeys = {
  derivationPath: string
  address: string
  privateKey: string
  publicKey: string
}
