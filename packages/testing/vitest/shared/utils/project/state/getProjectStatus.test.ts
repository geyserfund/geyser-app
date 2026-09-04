import { describe, expect, it } from 'vitest'

import { getProjectStatus, ProjectStatusLabels } from '@/shared/utils/project/getProjectStatus.ts'
import { ProjectFundingStrategy, ProjectStatus, WalletStatus } from '@/types/index.ts'

const project = {
  id: 1,
  name: 'project',
  rejectionReason: null,
  rskEoa: null,
  status: ProjectStatus.Active,
}

const inactiveWallet = { state: { status: WalletStatus.Inactive } }

describe('getProjectStatus', () => {
  it('continues to report an inactive wallet for legacy ordinary TIA projects', () => {
    expect(
      getProjectStatus({
        project: {
          ...project,
          fundingStrategy: ProjectFundingStrategy.TakeItAll,
          isRecoverableGrant: false,
        },
        wallet: inactiveWallet,
      }),
    ).toBe(ProjectStatusLabels.INACTIVE_WALLET)
  })

  it('does not require a creator wallet for managed Recoverable Grants', () => {
    expect(
      getProjectStatus({
        project: {
          ...project,
          fundingStrategy: ProjectFundingStrategy.TakeItAll,
          isRecoverableGrant: true,
        },
        wallet: inactiveWallet,
      }),
    ).toBe(ProjectStatusLabels.RUNNING)
  })
})
