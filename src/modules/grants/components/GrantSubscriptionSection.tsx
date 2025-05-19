import { Button, Flex, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiBell, PiCoins } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { SubscriptionForm } from '@/shared/molecules/forms/SubscriptionForm.tsx'

const GRANTS_SEGMENT_ID = '68023256928533361c8184e9'

/** Section prompting users to subscribe to upcoming grant notifications or make a one-off contribution */
export const GrantSubscriptionSection = () => {
  const navigate = useNavigate()

  const subscriptionModal = useModal()

  return (
    <>
      <CardLayout p={6}>
        <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }} gap={6}>
          <VStack align="start" spacing={2} flex={1}>
            <VStack align="start" spacing={1} w="90%">
              <H3 size="lg" bold>
                {t('Support Geyser Grants')}
              </H3>
              <Body size="md">{t('Help fund the next round — or get an email when it launches.')}</Body>
            </VStack>
          </VStack>

          <HStack spacing={3} align={{ base: 'stretch', md: 'flex-end' }}>
            <Button
              colorScheme="primary1"
              variant="outline"
              _hover={{ textDecoration: 'none' }}
              w={{ base: '100%', md: 'auto' }}
              size="lg"
              minW={{ md: '140px' }}
              leftIcon={<PiBell />}
              onClick={subscriptionModal.onOpen}
            >
              {t('Subscribe')}
            </Button>
            <Button
              size="lg"
              variant="solid"
              colorScheme="primary1"
              onClick={() => navigate(getPath('projectFunding', 'grants'))}
              w={{ base: '100%', md: 'auto' }}
              minW={{ md: '140px' }}
              leftIcon={<PiCoins />}
            >
              {t('Contribute')}
            </Button>
          </HStack>
        </Flex>
      </CardLayout>
      <SubscriptionForm
        title={t('Subscribe to Geyser Grants')}
        segmentIds={[GRANTS_SEGMENT_ID]}
        {...subscriptionModal}
      />
    </>
  )
}
