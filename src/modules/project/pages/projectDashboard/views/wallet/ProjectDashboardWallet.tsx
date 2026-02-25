import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useModal } from '@/shared/hooks/useModal.tsx'

import { useAuthContext } from '../../../../../../context/index.ts'
import { ProjectFundingStrategy } from '../../../../../../types/index.ts'
import { TiaRskEoaSetupNotice } from '../../../projectView/views/body/sections/tiaNotification/TiaRskEoaSetupNotice.tsx'
import { DashboardLayout } from '../../common/index.ts'
import { VerificationModal } from '../../components/VerificationModal.tsx'
import { EnableFiatContributions } from './components/EnableFiatContributions.tsx'

export const ProjectDashboardWallet = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  const { project } = useProjectAtom()

  const verifyIntroModal = useModal()

  const isIdentityVerified = user.complianceDetails.verifiedDetails.identity?.verified

  return (
    <DashboardLayout desktopTitle={t('Payment Settings')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <TiaRskEoaSetupNotice />
        <EnableFiatContributions
          isIdentityVerified={Boolean(isIdentityVerified)}
          isTiaProject={project.fundingStrategy === ProjectFundingStrategy.TakeItAll}
          projectId={project.id}
          onRequireVerification={verifyIntroModal.onOpen}
        />
      </VStack>
      <VerificationModal {...verifyIntroModal} />
    </DashboardLayout>
  )
}
