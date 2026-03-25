import { Badge, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ElementType } from 'react'

import { CopyableLinkCard } from '@/components/molecules/CopyableLinkCard.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'

type AffiliateReferralProgramCardProps = {
  title: string
  description: string
  icon: ElementType
  payoutHighlight: string
  linkValue: string
}

/** Displays one ambassador program option with its payout summary and copyable link. */
export const AffiliateReferralProgramCard = ({
  title,
  description,
  icon,
  payoutHighlight,
  linkValue,
}: AffiliateReferralProgramCardProps) => {
  const referralLinkContent = linkValue ? (
    <CopyableLinkCard label={t('Ambassador link')} linkValue={linkValue} />
  ) : (
    <Body size="sm" color="neutral1.11">
      {t('Your hero ID is required before sharing ambassador links.')}
    </Body>
  )

  return (
    <CardLayout spacing={4} borderColor="neutral1.6" height="100%">
      <VStack spacing={3} alignItems="stretch">
        <HStack justifyContent="space-between" alignItems="center" spacing={4} flexWrap="wrap">
          <HStack spacing={3} alignItems="center" minW={0} flexWrap="wrap">
            <Icon as={icon} boxSize={5} color="primary1.9" />
            <H2 size="md">{title}</H2>
            <Badge colorScheme="primary1" variant="soft" borderRadius="full" px={3} py={1.5}>
              <Body size="md" medium>
                {payoutHighlight}
              </Body>
            </Badge>
          </HStack>
        </HStack>

        <Body color="neutral1.11" w="100%">
          {description}
        </Body>

        {referralLinkContent}
      </VStack>
    </CardLayout>
  )
}
