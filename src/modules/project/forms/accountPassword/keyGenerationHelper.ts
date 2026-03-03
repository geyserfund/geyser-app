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

const derivationPathMapRSK = {
  [Network.TESTNET]: "m/44'/37310'/0'/0/0",
  [Network.MAINNET]: "m/44'/137'/0'/0/0",
}

const projectDerivationPathMapRSK = {
  [Network.TESTNET]: "m/44'/37310'/0'/1",
  [Network.MAINNET]: "m/44'/137'/0'/1",
}

const getEntropy = (bytes = 32) => {
  const entropy = new Uint8Array(bytes)
  window.crypto.getRandomValues(entropy)
  return entropy
}

export const generateMnemonic = () => {
  const entropy = getEntropy()
  return bip39.entropyToMnemonic(entropy, wordlist)
}

export const generateSeedDataForUser = () => {
  const mnemonic = generateMnemonic()

  if (!bip39.validateMnemonic(mnemonic, wordlist)) {
    throw new Error('Invalid mnemonic')
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const seedHex = Buffer.from(seed).toString('hex')

  return { mnemonic, seedHex }
}

export const generateSeedHexForUser = () => {
  return generateSeedDataForUser().seedHex
}

const encryptPayload = async (payload: Record<string, unknown>, password: string): Promise<string> => {
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

    // Create JSON structure containing the payload
    const payloadJson = JSON.stringify({
      ...payload,
      version: '1.0',
      algorithm: 'AES-256-GCM',
      timestamp: Date.now(),
    })

    // Convert JSON string to bytes
    const payloadBytes = new TextEncoder().encode(payloadJson)

    // Encrypt the JSON data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      payloadBytes,
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
    throw new Error(`Failed to encrypt payload: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const decryptPayload = async (encryptedPayload: string, password: string): Promise<Record<string, unknown>> => {
  try {
    // Decode base64 to get JSON string
    const jsonString = Buffer.from(encryptedPayload, 'base64').toString('utf8')

    // Parse JSON to extract components
    const encryptedObject = JSON.parse(jsonString)

    // Validate required fields
    if (!encryptedObject.iv || !encryptedObject.tag || !encryptedObject.data || !encryptedObject.salt) {
      throw new Error('Invalid encrypted payload format: missing required fields')
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

    // Parse JSON and extract payload
    const payload = JSON.parse(decryptedJson)

    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid encrypted payload format')
    }

    return payload as Record<string, unknown>
  } catch (error) {
    throw new Error(`Failed to decrypt payload: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Encrypts seed hex using AES-256-GCM with PBKDF2 key derivation */
export const encryptSeed = async (seedHex: string, password: string, mnemonic?: string): Promise<string> => {
  return encryptPayload(
    {
      seed: seedHex,
      ...(mnemonic ? { mnemonic } : {}),
    },
    password,
  )
}

export type DecryptedSeedPayload = {
  seed: string
  mnemonic?: string
}

export const decryptSeedPayload = async (encryptedSeed: string, password: string): Promise<DecryptedSeedPayload> => {
  try {
    const seedData = await decryptPayload(encryptedSeed, password)
    if (typeof seedData.seed !== 'string') {
      throw new Error('Invalid encrypted seed format: missing seed property')
    }

    const mnemonic = typeof seedData.mnemonic === 'string' ? seedData.mnemonic : undefined
    return {
      seed: seedData.seed,
      mnemonic,
    }
  } catch (error) {
    throw new Error(`Failed to decrypt seed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Decrypts seed hex using AES-256-GCM with PBKDF2 key derivation */
export const decryptSeed = async (encryptedSeed: string, password: string): Promise<string> => {
  const seedPayload = await decryptSeedPayload(encryptedSeed, password)
  return seedPayload.seed
}

export const encryptMnemonic = async (mnemonic: string, password: string): Promise<string> => {
  return encryptPayload({ mnemonic }, password)
}

export const decryptMnemonic = async (encryptedMnemonic: string, password: string): Promise<string> => {
  try {
    const payload = await decryptPayload(encryptedMnemonic, password)
    if (typeof payload.mnemonic !== 'string') {
      throw new Error('Invalid encrypted mnemonic format: missing mnemonic property')
    }

    return payload.mnemonic
  } catch (error) {
    throw new Error(`Failed to decrypt mnemonic: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const normalizeMnemonic = (value: string) => value.trim().replace(/\s+/g, ' ')

const seedInputToSeedHex = (seedInput: string) => {
  const normalizedSeedInput = seedInput.trim()
  const normalizedMnemonic = normalizeMnemonic(normalizedSeedInput)

  if (bip39.validateMnemonic(normalizedMnemonic, wordlist)) {
    return Buffer.from(bip39.mnemonicToSeedSync(normalizedMnemonic)).toString('hex')
  }

  const isHexSeed = /^[0-9a-fA-F]+$/.test(normalizedSeedInput)
  if (isHexSeed && normalizedSeedInput.length % 2 === 0) {
    return normalizedSeedInput
  }

  throw new Error('Invalid seed format')
}

export const getSeedWords = (seed: string, mnemonic?: string): string[] => {
  if (mnemonic) {
    const normalizedMnemonic = normalizeMnemonic(mnemonic)
    if (bip39.validateMnemonic(normalizedMnemonic, wordlist)) {
      return normalizedMnemonic.split(' ')
    }
  }

  const normalizedSeed = normalizeMnemonic(seed)
  if (bip39.validateMnemonic(normalizedSeed, wordlist)) {
    return normalizedSeed.split(' ')
  }

  return []
}

const generateKeysFromSeedHexWithPath = (seedInput: string, derivationPath: string): AccountKeys => {
  const bitcoinNetwork = __production__ ? bitcoin.networks.bitcoin : bitcoin.networks.testnet

  const seedHex = seedInputToSeedHex(seedInput)
  const seedFromSeedHex = Buffer.from(seedHex, 'hex')

  // Create BIP32 root from seed
  const root = bip32.fromSeed(seedFromSeedHex, bitcoinNetwork)

  // Derive child node
  const child = root.derivePath(derivationPath)

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

  const privateKey = child.privateKey?.toString('hex')
  const publicKey = child.publicKey.toString('hex')

  return {
    derivationPath,
    address,
    privateKey,
    publicKey,
  }
}

export const generateKeysFromSeedHex = (seedHex: string): AccountKeys => {
  const network = __production__ ? Network.MAINNET : Network.TESTNET
  const derivationPath = derivationPathMapRSK[network]
  return generateKeysFromSeedHexWithPath(seedHex, derivationPath)
}

export const generateProjectKeysFromSeedHex = (seedHex: string, projectId: number | string | bigint): AccountKeys => {
  const network = __production__ ? Network.MAINNET : Network.TESTNET
  const MIN_PROJECT_DERIVATION_INDEX = 0n
  const MAX_PROJECT_DERIVATION_INDEX = 2147483647n

  let projectIndex: number
  if (typeof projectId === 'bigint') {
    if (projectId < MIN_PROJECT_DERIVATION_INDEX || projectId > MAX_PROJECT_DERIVATION_INDEX) {
      throw new Error('Invalid project id for derivation path')
    }

    projectIndex = Number(projectId)
  } else if (typeof projectId === 'string') {
    const normalizedProjectId = projectId.trim()
    if (!/^-?\d+$/.test(normalizedProjectId)) {
      throw new Error('Invalid project id for derivation path')
    }

    const parsedProjectId = BigInt(normalizedProjectId)
    if (parsedProjectId < MIN_PROJECT_DERIVATION_INDEX || parsedProjectId > MAX_PROJECT_DERIVATION_INDEX) {
      throw new Error('Invalid project id for derivation path')
    }

    projectIndex = Number(parsedProjectId)
  } else {
    if (!Number.isInteger(projectId) || projectId < 0 || projectId > Number(MAX_PROJECT_DERIVATION_INDEX)) {
      throw new Error('Invalid project id for derivation path')
    }

    projectIndex = projectId
  }

  const derivationPath = `${projectDerivationPathMapRSK[network]}/${projectIndex}`
  return generateKeysFromSeedHexWithPath(seedHex, derivationPath)
}

export const generateAccountKeys = (): AccountKeys => {
  const seedHex = generateSeedHexForUser()
  const accountKeys = generateKeysFromSeedHex(seedHex)
  return accountKeys
}

export type AccountKeys = {
  derivationPath: string
  address: string
  privateKey: string
  publicKey: string
}

export const generatePreImageHash = () => {
  const preimage = new Uint8Array(32)
  window.crypto.getRandomValues(preimage)
  const preimageHash = bitcoin.crypto.sha256(Buffer.from(preimage)).toString('hex')
  const preimageHex = Buffer.from(preimage).toString('hex')
  return { preimageHash, preimageHex }
}
