import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DashboardLayout } from '../../common/index.ts'
import { WalletLimitsAndVerification } from './components/WalletLimitsAndVerification.tsx'

export const ProjectDashboardLimitsVerification = () => {
  const { t } = useTranslation()

  return (
    <DashboardLayout desktopTitle={t('Limits & Verification')}>
      <VStack spacing="20px" paddingX={{ base: 0, lg: 6 }}>
        <WalletLimitsAndVerification />
      </VStack>
    </DashboardLayout>
  )
}
