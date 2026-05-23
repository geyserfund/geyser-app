import { privateKeyToAccount } from 'viem/accounts'

import { decryptString, encryptString } from '@/modules/project/forms/accountPassword/encryptDecrptString.ts'
import type { AccountKeys } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'

const RECOVERY_CODE_BYTES = 16

export type SwapRecoveryMetadata = {
  encryptedPrivateKey: string
  encryptionVersion: string
  encryptionAlgorithm: string
  contributorRskAddress: string
  contributorRskPublicKey: string
}

export const generateRecoveryCode = () => {
  const bytes = new Uint8Array(RECOVERY_CODE_BYTES)
  window.crypto.getRandomValues(bytes)

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const createRecoveryKey = (contributionUuid: string, recoveryCode: string) => {
  return `${contributionUuid}-${recoveryCode}`
}

export const parseRecoveryKey = (recoveryKey: string) => {
  const normalizedRecoveryKey = recoveryKey.trim()
  const lastSeparatorIndex = normalizedRecoveryKey.lastIndexOf('-')

  if (lastSeparatorIndex <= 0 || lastSeparatorIndex === normalizedRecoveryKey.length - 1) {
    throw new Error('Invalid recovery key')
  }

  return {
    contributionUuid: normalizedRecoveryKey.slice(0, lastSeparatorIndex),
    recoveryCode: normalizedRecoveryKey.slice(lastSeparatorIndex + 1),
  }
}

export const createSwapRecoveryMetadata = async (
  accountKeys: Pick<AccountKeys, 'privateKey' | 'publicKey' | 'address'>,
  recoveryCode: string,
): Promise<SwapRecoveryMetadata> => {
  const encryptedPrivateKey = await encryptString({
    plainText: accountKeys.privateKey,
    password: recoveryCode,
  })

  return {
    encryptedPrivateKey,
    encryptionVersion: '1',
    encryptionAlgorithm: 'AES-256-GCM-PBKDF2-SHA256',
    contributorRskAddress: accountKeys.address,
    contributorRskPublicKey: accountKeys.publicKey,
  }
}

export const decryptSwapRecoveryMetadata = async (
  metadata: SwapRecoveryMetadata,
  recoveryCode: string,
): Promise<Pick<AccountKeys, 'privateKey' | 'publicKey' | 'address'>> => {
  const privateKey = await decryptString({
    encryptedString: metadata.encryptedPrivateKey,
    password: recoveryCode,
  })
  const normalizedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`
  const account = privateKeyToAccount(normalizedPrivateKey as `0x${string}`)

  if (account.address.toLowerCase() !== metadata.contributorRskAddress.toLowerCase()) {
    throw new Error('Recovery key does not match this contribution')
  }

  return {
    privateKey,
    publicKey: metadata.contributorRskPublicKey,
    address: metadata.contributorRskAddress,
  }
}

export const hasSwapRecoveryMetadata = (value: unknown): value is SwapRecoveryMetadata => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const metadata = value as Partial<SwapRecoveryMetadata>
  return Boolean(
    metadata.encryptedPrivateKey &&
      metadata.encryptionVersion &&
      metadata.encryptionAlgorithm &&
      metadata.contributorRskAddress &&
      metadata.contributorRskPublicKey,
  )
}
