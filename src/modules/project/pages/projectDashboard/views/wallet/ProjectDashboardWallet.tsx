import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ProjectWalletBackupEntry,
  RecoveryAccountKeys,
  SeedWordsModal,
} from '@/modules/profile/pages/profileSettings/views/ProfileSettingsWallet/SeedWordsSection.tsx'
import { DirectPaymentDetailsForm } from '@/modules/project/components/DirectPaymentDetailsForm.tsx'
import { ManagedCircularGrantPaymentStatus } from '@/modules/project/components/ManagedCircularGrantPaymentStatus.tsx'
import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { useWithdrawFunds } from '@/modules/project/pages/projectView/views/body/sections/controlPanel/hooks/useWithdrawFunds.ts'
import { isStripeConnectSupportedForProject } from '@/modules/project/utils/stripeConnect.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { ProjectFundingStrategy, useProjectRskEoaHistoryQuery } from '@/types/index.ts'

import { TiaRskEoaSetupNotice } from '../../../projectView/views/body/sections/tiaNotification/TiaRskEoaSetupNotice.tsx'
import { DashboardLayout } from '../../common/DashboardLayout.tsx'
import { EnableFiatContributions } from './components/EnableFiatContributions.tsx'
import { ProjectRskEoaHistory, ProjectRskEoaHistoryItem } from './components/ProjectRskEoaHistory.tsx'

export const ProjectDashboardWallet = () => {
  const { project } = useProjectAtom()

  return isManagedCircularGrantProject(project) ? <ManagedCircularGrantPayments /> : <CreatorManagedPayments />
}

const ManagedCircularGrantPayments = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  return (
    <DashboardLayout desktopTitle={t('Payment Settings')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <ManagedCircularGrantPaymentStatus readiness={project.paymentMethods?.managedCircularGrant} />
      </VStack>
    </DashboardLayout>
  )
}

const CreatorManagedPayments = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()
  const seedWordsModal = useModal()
  const [selectedRecoveryData, setSelectedRecoveryData] = useState<{
    accountKeys: RecoveryAccountKeys
    projectWallets: ProjectWalletBackupEntry[]
  } | null>(null)
  const { data: walletHistoryData } = useProjectRskEoaHistoryQuery({
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
  const walletProject = walletHistoryData?.projectGet
  const currentWallet = walletProject?.rskEoas?.find((rskEoa) => rskEoa.isCurrent)
  const handleOpenRecoveryData = (rskEoa: ProjectRskEoaHistoryItem) => {
    if (!rskEoa.accountKeys?.encryptedMnemonic && !rskEoa.accountKeys?.encryptedSeed) {
      return
    }

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
  }

  const handleCloseRecoveryData = () => {
    seedWordsModal.onClose()
    setSelectedRecoveryData(null)
  }

  return (
    <DashboardLayout desktopTitle={t('Payment Settings')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        {TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && (
          <DirectPaymentDetailsForm
            projectId={project.id}
            directPaymentDetails={project.directPaymentDetails}
            showStripeConfiguration={isStripeConnectSupportedForProject(project)}
            stripeConfigurationAfterDirectPayments
            allowStripeOnly={Boolean(project.paymentMethods?.fiat?.stripe)}
          />
        )}
        {!TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && <TiaRskEoaSetupNotice />}
        <ProjectRskEoaHistory
          projectId={project.id}
          currentRskEoa={walletProject?.rskEoa ?? project.rskEoa}
          rskEoas={walletProject?.rskEoas}
          onOpenSeedWords={handleOpenRecoveryData}
          withdraw={
            TEMPORARY_BOLTZ_CONTINGENCY_ENABLED
              ? undefined
              : {
                  showWithdrawableBalance,
                  isBelowMinWithdrawThreshold,
                  hasOngoingWithdraw,
                  showWithdraw,
                  onOpen: payoutRskModal.onOpen,
                }
          }
        />
        {!TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && (
          <EnableFiatContributions
            isTiaProject={project.fundingStrategy === ProjectFundingStrategy.TakeItAll}
            projectId={project.id}
          />
        )}
      </VStack>

      {!TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && showWithdraw && (
        <PayoutRsk
          {...payoutRskModal}
          project={project}
          rskAddress={projectRskEoa}
          projectRskEoaDerivationPath={currentWallet?.derivationPath}
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
