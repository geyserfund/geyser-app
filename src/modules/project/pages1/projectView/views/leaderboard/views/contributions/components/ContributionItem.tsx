import { Box, HStack, Image, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { BitcoinQuote, ProjectFundingTxFragment } from '@/types'
import { commaFormatted, GetDaysAgo } from '@/utils'

import { UserAvatar } from '../../../../../components/UserAvatar'

export const ContributionItem = ({ contribution }: { contribution: ProjectFundingTxFragment }) => {
  const { t } = useTranslation()

  return (
    <HStack w="full" alignItems={'start'} spacing={1} key={contribution.id} paddingX={6} paddingY={2}>
      <UserAvatar user={contribution.funder.user} id={contribution.funder.id} />
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body size="sm" bold dark>
            {contribution.funder.user?.username || t('Anonymous')}
          </Body>
          <Body size="xs" muted>
            {GetDaysAgo(contribution.paidAt)}
          </Body>
        </HStack>

        <HStack spacing={2}>
          <Body size="xs">
            {commaFormatted(contribution.amountPaid)}{' '}
            <Body as="span" size="sm" muted>
              sats {usdFromSats({ sats: contribution.amountPaid, bitcoinQuote: contribution.bitcoinQuote })}
            </Body>
          </Body>
        </HStack>
        {contribution.comment && (
          <Body size="xs" dark>
            {contribution.comment}
          </Body>
        )}
        {contribution.media && (
          <Box h={'178px'} bg={'gray.100'} pos={'relative'} borderRadius="8px">
            <Image
              src={contribution.media}
              alt="Contribution media attachment"
              objectFit={'cover'}
              width="full"
              height="full"
              borderRadius="4px"
            />
          </Box>
        )}
      </VStack>
    </HStack>
  )
}

const usdFromSats = ({ sats, bitcoinQuote }: { sats: number; bitcoinQuote?: BitcoinQuote | null }) => {
  if (bitcoinQuote && bitcoinQuote.quote) {
    const dollars = sats / bitcoinQuote.quote
    return `( $${dollars.toFixed(1)} )`
  }

  return ''
}

export const ContributionItemSkeleton = () => {
  return (
    <HStack w="full" spacing={1} paddingX={6} paddingY={2}>
      <SkeletonCircle size="40px" />
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0.5}>
        <SkeletonLayout height="16px" width="150px" />
        <SkeletonLayout height="16px" width="200px" />
        <SkeletonText noOfLines={1} width="100%" />
      </VStack>
    </HStack>
  )
}
