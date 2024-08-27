import { Center, Container, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

export const ProfileError = () => {
  const { t } = useTranslation()
  return (
    <Container position="relative" height="100%" display={'flex'} justifyContent="center" alignItems="center">
      <Center>
        <Feedback variant={FeedBackVariant.WARNING}>
          <VStack alignItems={'start'}>
            <Body size="lg" medium>
              {t('An error occurred while attempting to load the profile page.')}
            </Body>
            <Body>
              {t('Please try refreshing the page. You may also want to contact support if the problem persists.')}
            </Body>
          </VStack>
        </Feedback>
      </Center>
    </Container>
  )
}
