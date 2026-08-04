import { describe, expect, it } from 'vitest'

import { hasAccessibleProjectWalletRecoveryData } from '@/modules/project/pages/projectDashboard/views/wallet/components/projectWalletRecovery.ts'

describe('hasAccessibleProjectWalletRecoveryData', () => {
  it('requires encrypted keys associated with the selected project wallet', () => {
    expect(hasAccessibleProjectWalletRecoveryData(null)).toBe(false)
    expect(hasAccessibleProjectWalletRecoveryData({ encryptedMnemonic: null, encryptedSeed: null })).toBe(false)
    expect(hasAccessibleProjectWalletRecoveryData({ encryptedMnemonic: 'encrypted-mnemonic' })).toBe(true)
    expect(hasAccessibleProjectWalletRecoveryData({ encryptedSeed: 'encrypted-seed' })).toBe(true)
  })
})
