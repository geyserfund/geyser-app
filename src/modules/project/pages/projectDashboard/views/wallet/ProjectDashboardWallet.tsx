import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ProjectWalletBackupEntry,
  RecoveryAccountKeys,
  SeedWordsModal,
} from '@/modules/profile/pages/profileSettings/views/ProfileSettingsWallet/SeedWordsSection.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { useWithdrawFunds } from '@/modules/project/pages/projectView/views/body/sections/controlPanel/hooks/useWithdrawFunds.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { useProjectPageBodyCreatorQuery } from '@/types/index.ts'

import { ProjectFundingStrategy } from '../../../../../../types/index.ts'
import { TiaRskEoaSetupNotice } from '../../../projectView/views/body/sections/tiaNotification/TiaRskEoaSetupNotice.tsx'
import { DashboardLayout } from '../../common/index.ts'
import { EnableFiatContributions } from './components/EnableFiatContributions.tsx'
import { ProjectRskEoaHistory, ProjectRskEoaHistoryItem } from './components/ProjectRskEoaHistory.tsx'

export const ProjectDashboardWallet = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()
  const seedWordsModal = useModal()
  const [selectedRecoveryData, setSelectedRecoveryData] = useState<{
    accountKeys: RecoveryAccountKeys
    projectWallets: ProjectWalletBackupEntry[]
  } | null>(null)
  const { data: creatorProjectData } = useProjectPageBodyCreatorQuery({
    variables: {
      where: { id: project.id },
    },
    skip: !project.id,
    fetchPolicy: 'cache-and-network',
  })
  const {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    showWithdrawableBalance,
    isBelowMinWithdrawThreshold,
    hasOngoingWithdraw,
    showWithdraw,
    onCompleted,
  } = useWithdrawFunds()
  const creatorProject = creatorProjectData?.projectGet as typeof project & {
    rskEoas?: Parameters<typeof ProjectRskEoaHistory>[0]['rskEoas']
  }
  const handleOpenRecoveryData = (rskEoa: ProjectRskEoaHistoryItem) => {
    if (rskEoa.accountKeys?.encryptedMnemonic || rskEoa.accountKeys?.encryptedSeed) {
      setSelectedRecoveryData({
        accountKeys: rskEoa.accountKeys,
        projectWallets: [
          {
            projectId: project.id,
            projectName: project.name,
            projectTitle: project.title,
            address: rskEoa.rskAddress,
            derivationPath: rskEoa.derivationPath,
            current: rskEoa.isCurrent,
            createdAt: rskEoa.createdAt?.toString(),
            replacedAt: rskEoa.replacedAt?.toString(),
          },
        ],
      })
      seedWordsModal.onOpen()

      return
    }

    if (rskEoa.isCurrent) {
      setSelectedRecoveryData(null)
      seedWordsModal.onOpen()
    }
  }

  const handleCloseRecoveryData = () => {
    seedWordsModal.onClose()
    setSelectedRecoveryData(null)
  }

  return (
    <DashboardLayout desktopTitle={t('Payment Settings')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <TiaRskEoaSetupNotice />
        <ProjectRskEoaHistory
          projectId={project.id}
          currentRskEoa={creatorProject?.rskEoa ?? project.rskEoa}
          rskEoas={creatorProject?.rskEoas}
          onOpenSeedWords={handleOpenRecoveryData}
          withdraw={{
            showWithdrawableBalance,
            isBelowMinWithdrawThreshold,
            hasOngoingWithdraw,
            showWithdraw,
            onOpen: payoutRskModal.onOpen,
          }}
        />
        <EnableFiatContributions
          isTiaProject={project.fundingStrategy === ProjectFundingStrategy.TakeItAll}
          projectId={project.id}
        />
      </VStack>

      {showWithdraw && (
        <PayoutRsk
          {...payoutRskModal}
          project={project}
          rskAddress={projectRskEoa}
          payoutAmountOverride={withdrawableSats}
          onCompleted={onCompleted}
        />
      )}

      <SeedWordsModal
        isOpen={seedWordsModal.isOpen}
        onClose={handleCloseRecoveryData}
        accountKeys={selectedRecoveryData?.accountKeys}
        projectWallets={selectedRecoveryData?.projectWallets}
      />
    </DashboardLayout>
  )
}
