import { Box, HStack, Image, SkeletonCircle, SkeletonText, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { TimeAgo } from '@/shared/molecules/TimeAgo'
import { ProjectFundingTxFragment } from '@/types'
import { commaFormatted, convertSatsToUsd } from '@/utils'

import { UserAvatar } from '../../../../../../../../../shared/molecules/UserAvatar'

type ContributionItemProps = {
  contribution: ProjectFundingTxFragment
} & StackProps

export const ContributionItem = ({ contribution, ...props }: ContributionItemProps) => {
  const { t } = useTranslation()

  return (
    <HStack
      w="full"
      alignItems={'start'}
      spacing={1}
      key={contribution.id}
      paddingX={6}
      paddingY={2}
      {...(contribution.funder.user && {
        as: Link,
        to: getPath('userProfile', contribution.funder.user.id),
        _hover: {
          backgroundColor: 'neutral1.3',
        },
      })}
      {...props}
    >
      <UserAvatar user={contribution.funder.user} id={contribution.funder.id} />
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body size="sm" bold dark>
            {contribution.funder.user?.username || t('Anonymous')}
          </Body>
          <TimeAgo date={contribution.paidAt} />
        </HStack>

        <HStack spacing={2}>
          <Body size="sm">
            {commaFormatted(contribution.amountPaid)}{' '}
            <Body as="span" size="sm" muted>
              sats{' '}
              {`($${convertSatsToUsd({ sats: contribution.amountPaid, bitcoinQuote: contribution.bitcoinQuote })})`}
            </Body>
          </Body>
        </HStack>
        {contribution.comment && (
          <Body size="sm" dark>
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
