import { Center, HStack, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

export const RECOVERABLE_GRANT_EXPLAINER_TEXT = t(
  'This project is a recoverable grant. The recipient will return the funds fully or in part. Returned funds are sent to the Bitcoin Adoption Impact Fund to be distributed to another recoverable grant in the future, maximizing the impact of every satoshi.',
)

const IMPACT_FUND_PATH = getPath('impactFunds')

export const RecoverableGrantExplainer = () => {
  return (
    <CardLayout
      w="full"
      direction="row"
      dense
      spacing={3}
      paddingX={{ base: 3, lg: 4 }}
      paddingY={{ base: 3, lg: 3 }}
      borderColor="primary1.8"
      backgroundColor="primary1.1"
    >
      <Center boxSize={{ base: '44px', lg: '52px' }} flexShrink={0}>
        <Image src="/icons/recoverable-grant.png" alt="" boxSize={{ base: '38px', lg: '46px' }} />
      </Center>
      <VStack alignItems="start" spacing={0}>
        <Body size="sm">
          <Body as="span" size="sm" bold>
            {t('Same sats, more impact.')}
          </Body>{' '}
          {t(
            'This project is a recoverable grant. The recipient will return the funds fully or in part. Returned funds are sent to the',
          )}{' '}
          <ChakraLink as={Link} to={IMPACT_FUND_PATH} textDecoration="underline">
            {t('Bitcoin Adoption Impact Fund')}
          </ChakraLink>{' '}
          {t('to be distributed to another recoverable grant in the future, maximizing the impact of every satoshi.')}
        </Body>
      </VStack>
    </CardLayout>
  )
}

export const RecoverableGrantTooltipLabel = () => (
  <HStack alignItems="start" spacing={2} maxW="320px">
    <Body size="sm" color="white">
      <Body as="span" size="sm" bold color="white">
        {t('Same sats, more impact.')}
      </Body>{' '}
      {RECOVERABLE_GRANT_EXPLAINER_TEXT}
    </Body>
  </HStack>
)
