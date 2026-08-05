export type ProjectWalletRecoveryAccountKeys = {
  encryptedMnemonic?: string | null
  encryptedSeed?: string | null
} | null

export const hasAccessibleProjectWalletRecoveryData = (accountKeys?: ProjectWalletRecoveryAccountKeys) =>
  Boolean(accountKeys?.encryptedMnemonic || accountKeys?.encryptedSeed)
