import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ProjectFundingStrategy } from '../../../../../../types/index.ts'
import { TiaRskEoaSetupNotice } from '../../../projectView/views/body/sections/tiaNotification/TiaRskEoaSetupNotice.tsx'
import { DashboardLayout } from '../../common/index.ts'
import { EnableFiatContributions } from './components/EnableFiatContributions.tsx'

export const ProjectDashboardWallet = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  return (
    <DashboardLayout desktopTitle={t('Payment Settings')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <TiaRskEoaSetupNotice />
        <EnableFiatContributions
          isTiaProject={project.fundingStrategy === ProjectFundingStrategy.TakeItAll}
          projectId={project.id}
        />
      </VStack>
    </DashboardLayout>
  )
}
