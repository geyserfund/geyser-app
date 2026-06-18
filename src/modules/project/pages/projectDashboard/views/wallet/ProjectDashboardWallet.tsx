import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { useWithdrawFunds } from '@/modules/project/pages/projectView/views/body/sections/controlPanel/hooks/useWithdrawFunds.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useProjectPageBodyCreatorQuery } from '@/types/index.ts'

import { ProjectFundingStrategy } from '../../../../../../types/index.ts'
import { TiaRskEoaSetupNotice } from '../../../projectView/views/body/sections/tiaNotification/TiaRskEoaSetupNotice.tsx'
import { DashboardLayout } from '../../common/index.ts'
import { EnableFiatContributions } from './components/EnableFiatContributions.tsx'
import { ProjectRskEoaHistory } from './components/ProjectRskEoaHistory.tsx'

export const ProjectDashboardWallet = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()
  const { user } = useAuthContext()
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

  return (
    <DashboardLayout desktopTitle={t('Payment Settings')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <TiaRskEoaSetupNotice />
        <ProjectRskEoaHistory
          projectId={project.id}
          currentRskEoa={creatorProject?.rskEoa ?? project.rskEoa}
          rskEoas={creatorProject?.rskEoas}
          profileSeedSettingsPath={
            user.id ? `${getPath('userProfileSettingsWallet', user.id)}#recovery-seed` : undefined
          }
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
    </DashboardLayout>
  )
}
