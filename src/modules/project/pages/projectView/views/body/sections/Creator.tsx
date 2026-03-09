import { Badge, Box, HStack, Wrap, WrapItem, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { Body } from '@/shared/components/typography'
import { commaFormatted } from '@/utils'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { BodySectionLayout } from '../components'
import { CreatorSocial } from './header/components/CreatorSocial'

/** Displays project creator details and the creator bio when available. */
export const Creator = () => {
  const { loading, projectOwner } = useProjectAtom()
  const creatorBio = projectOwner?.user?.bio
  const creatorTrustStats = projectOwner?.user?.creatorTrustStats
  const { formatAmount } = useCurrencyFormatter(true)

  if (loading || !projectOwner?.user) {
    return null
  }

  const raisedAmount = formatAmount(creatorTrustStats?.totalFundingUsd || 0, FormatCurrencyType.Usd)
  const raisedAmountSats = formatAmount(creatorTrustStats?.totalFunding || 0, FormatCurrencyType.Btcsat)
  const raisedValue = `${raisedAmount} · ${raisedAmountSats}`
  const creatorStats = [
    creatorTrustStats?.totalFunding && creatorTrustStats.totalFunding > 0
      ? { label: t('Raised'), value: raisedValue }
      : null,
    creatorTrustStats?.backersCount && creatorTrustStats.backersCount > 0
      ? { label: t('Backers'), value: commaFormatted(creatorTrustStats.backersCount) }
      : null,
    creatorTrustStats?.publishedPostsCount && creatorTrustStats.publishedPostsCount > 0
      ? { label: t('Posts'), value: commaFormatted(creatorTrustStats.publishedPostsCount) }
      : null,
    creatorTrustStats?.joinedYear && creatorTrustStats.joinedYear > 0
      ? { label: t('Joined'), value: String(creatorTrustStats.joinedYear) }
      : null,
  ].filter((stat): stat is { label: string; value: string } => Boolean(stat))

  return (
    <BodySectionLayout title={t('Creator')}>
      <CardLayout w="full" spacing={3} paddingX={{ base: 3, lg: 5 }} paddingY={{ base: 3, lg: 4 }}>
        <CreatorSocial />
        {creatorStats.length > 0 ? (
          <Box w="full">
            <Box display={{ base: 'block', md: 'none' }}>
              <Body size="xs" muted medium lineHeight={1}>
                {t('Creator stats')}
              </Body>
              <Wrap w="full" spacing={2} mt={2}>
                {creatorStats.map((stat) => (
                  <WrapItem key={stat.label}>
                    <CreatorTrustStat label={stat.label} value={stat.value} />
                  </WrapItem>
                ))}
              </Wrap>
            </Box>

            <HStack display={{ base: 'none', md: 'flex' }} w="full" spacing={2} alignItems="center">
              <Body size="xs" muted medium lineHeight={1} whiteSpace="nowrap" flexShrink={0}>
                {t('Creator stats')}
              </Body>
              <Wrap w="full" spacing={2} align="center">
                {creatorStats.map((stat) => (
                  <WrapItem key={stat.label}>
                    <CreatorTrustStat label={stat.label} value={stat.value} />
                  </WrapItem>
                ))}
              </Wrap>
            </HStack>
          </Box>
        ) : null}
        {creatorBio && (
          <Box w="full">
            <Body size="sm" light noOfLines={2}>
              {creatorBio}
            </Body>
          </Box>
        )}
      </CardLayout>
    </BodySectionLayout>
  )
}

const CreatorTrustStat = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  const statBackgroundColor = useColorModeValue('neutral1.2', 'neutral1.4')
  const statLabelColor = useColorModeValue('neutral1.8', 'neutral1.8')
  const statValueColor = useColorModeValue('neutral1.11', 'neutral1.11')

  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      gap={1.5}
      borderRadius="full"
      backgroundColor={statBackgroundColor}
      paddingX={2.5}
      paddingY={1}
      textTransform="none"
      fontWeight="normal"
    >
      <Body size="11px" medium color={statLabelColor} lineHeight={1} whiteSpace="nowrap">
        {label}
      </Body>
      <Body size="11px" medium color={statValueColor} lineHeight={1} whiteSpace="nowrap">
        {value}
      </Body>
    </Badge>
  )
}
