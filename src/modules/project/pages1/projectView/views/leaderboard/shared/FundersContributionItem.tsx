import { Box, HStack, Image, SkeletonText, VStack } from '@chakra-ui/react'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { TimeAgo } from '@/shared/molecules/TimeAgo'
import { ProjectFundingTxFragment } from '@/types'
import { commaFormatted, convertSatsToUsd } from '@/utils'

export const FundersContributionItem = ({ contribution }: { contribution: ProjectFundingTxFragment }) => {
  return (
    <HStack w="full" alignItems={'start'} spacing={1} key={contribution.id} paddingX={6} paddingY={2}>
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body size="xs">
            {commaFormatted(contribution.amountPaid)}{' '}
            <Body as="span" size="sm" muted>
              sats {convertSatsToUsd({ sats: contribution.amountPaid, bitcoinQuote: contribution.bitcoinQuote })}
            </Body>
          </Body>
          <TimeAgo date={contribution.paidAt} />
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

export const FundersContributionItemSkeleton = () => {
  return (
    <>
      <HStack w="full" alignItems={'start'} spacing={1} paddingX={6} paddingY={2}>
        <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
          <HStack w="full" justifyContent={'space-between'}>
            <SkeletonLayout height="16px" width="200px" />

            <SkeletonLayout height="16px" width="150px" />
          </HStack>

          <SkeletonText noOfLines={1} width="100%" />
        </VStack>
      </HStack>
    </>
  )
}