import { Button, Flex, HStack, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiBell, PiCoins } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

const AIRTABLE_FORM_URL = 'https://airtable.com/appyM7XlNIWVypuP5/tbll81HvN1CY7GC1x/viwbkXQNuMPFscFBr?blocks=hide'

/** Section prompting users to subscribe to upcoming grant notifications or make a one-off contribution */
export const GrantSubscriptionSection = () => {
  const navigate = useNavigate()

  return (
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
            as={Link}
            href={AIRTABLE_FORM_URL}
            isExternal
            colorScheme="primary1"
            variant="outline"
            _hover={{ textDecoration: 'none' }}
            w={{ base: '100%', md: 'auto' }}
            size="lg"
            minW={{ md: '140px' }}
            leftIcon={<PiBell />}
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
  )
}
