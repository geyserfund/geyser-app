import { Center, Container } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { AlertBox } from '../../../components/ui'

export const ProfileError = () => {
  const { t } = useTranslation()
  return (
    <Container position="relative" height="100%" display={'flex'} justifyContent="center" alignItems="center">
      <Center>
        <AlertBox
          height="200px"
          status="error"
          title={t('An error occurred while attempting to load the profile page.')}
          message={t('Please try refreshing the page. You may also want to contact support if the problem persists.')}
        />
      </Center>
    </Container>
  )
}
