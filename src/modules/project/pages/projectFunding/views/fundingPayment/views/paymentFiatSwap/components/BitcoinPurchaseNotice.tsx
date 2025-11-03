import { Icon, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

/** Component for displaying bitcoin purchase notice with capital gains implications */
export const BitcoinPurchaseNotice = () => {
  return (
    <Feedback
      variant={FeedBackVariant.WARNING}
      icon={<Icon as={PiInfo} title={t('Important')} fontSize="30px" />}
      title={t('Important')}
    >
      <VStack w="full" alignItems="start">
        <Body size="sm">
          <Trans i18nextKey="The credit card payment flow works through the purchase of BTC that is automatically sent to the creator. This may trigger capital gains implications. Read more here.">
            The credit card payment flow works through the purchase of BTC that is automatically sent to the creator.
            This may trigger capital gains implications.{' '}
            <Link
              isExternal
              href="https://guide.geyser.fund/geyser-docs/product-features/project-features/fiat-contributions"
            >
              <Body as="span" medium textDecoration={'underline'}>
                {t('Read more here')}
              </Body>
            </Link>
          </Trans>
          .
        </Body>
      </VStack>
    </Feedback>
  )
}
