import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { ProfileSettingsLayout } from '../../common/ProfileSettingsLayout.tsx'
import { UpdateVerifyEmail } from '../../components/UpdateVerifyEmail.tsx'
import { IdentityVerification } from './views/IdentityVerification.tsx'

export const ProfileSettingsVerifications = () => {
  return (
    <ProfileSettingsLayout desktopTitle={t('Verifications')}>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <UpdateVerifyEmail />
        <IdentityVerification />
      </VStack>
    </ProfileSettingsLayout>
  )
}
