import { Button, Flex, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiBell } from 'react-icons/pi'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { SubscriptionForm } from '@/shared/molecules/forms/SubscriptionForm.tsx'

type GrantSubscriptionSectionProps = {
  title: string
  description: string
  modalTitle: string
  segmentId: string
} & CardLayoutProps

export const GrantSubscriptionSection = ({
  title,
  description,
  modalTitle,
  segmentId,
  ...rest
}: GrantSubscriptionSectionProps) => {
  const subscriptionModal = useModal()

  return (
    <>
      <CardLayout p={6} width="full" {...rest}>
        <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }} gap={6}>
          <VStack align="start" spacing={2} flex={1}>
            <VStack align="start" spacing={1} w="90%">
              <H3 size="lg" medium>
                {title}
              </H3>
              <Body size="md">{description}</Body>
            </VStack>
          </VStack>

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
        </Flex>
      </CardLayout>
      <SubscriptionForm title={modalTitle} segmentIds={[segmentId]} {...subscriptionModal} />
    </>
  )
}
