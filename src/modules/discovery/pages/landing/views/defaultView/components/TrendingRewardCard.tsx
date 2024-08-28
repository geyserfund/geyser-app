import { Box, HStack, StackProps, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { RewardCurrency, RewardForLandingPageFragment } from '@/types'
import { commaFormatted } from '@/utils'

type TrendingRewardCardProps = {
  reward: RewardForLandingPageFragment
} & StackProps

export const TrendingRewardCard = ({ reward, ...rest }: TrendingRewardCardProps) => {
  return (
    <CardLayout
      hover
      as={Link}
      to={getPath('projectRewardView', reward.project.name, reward.id)}
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={0}
      flex={{ base: 'unset', lg: 1 }}
      {...rest}
    >
      <Box width={{ base: '96px', lg: 'auto' }} height={{ base: '96px', lg: 'auto' }}>
        <ImageWithReload
          width="100%"
          height="100%"
          aspectRatio={{ base: 1, lg: ImageCropAspectRatio.Reward }}
          objectFit="cover"
          src={reward.image}
          alt={`${reward.name}-header-image`}
        />
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
        padding={{ base: 3, lg: 4 }}
        alignItems="start"
        justifyContent="space-between"
        overflow="hidden"
        spacing={0}
      >
        <H3 size="lg" medium flex={1} isTruncated width="100%">
          {reward.name}
        </H3>

        <HStack spacing={1} w="full">
          <ImageWithReload
            width="16px"
            height="16px"
            borderRadius={'4px'}
            objectFit="cover"
            src={reward.project.thumbnailImage}
            alt={`${reward.project.name}-header-image`}
          />
          <Body size="sm" light isTruncated>
            {reward.project.title}
          </Body>
        </HStack>

        <HStack w="full" justifyContent={'start'} spacing={3}>
          <Body size="sm" dark>
            {reward.project.rewardCurrency === RewardCurrency.Usdcent ? (
              <>
                <Body as="span" size="sm" light>
                  $
                </Body>{' '}
                {reward.cost < 100 ? (reward.cost / 100).toFixed(2) : commaFormatted(Math.round(reward.cost / 100))}
              </>
            ) : (
              <>
                {commaFormatted(reward.cost)}{' '}
                <Body as="span" size="sm" light>
                  sats
                </Body>
              </>
            )}
          </Body>
        </HStack>
      </VStack>
    </CardLayout>
  )
}

export const TrendingRewardCardSkeleton = () => {
  return (
    <CardLayout
      hover
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={0}
      flex={{ base: 'unset', lg: 1 }}
    >
      <Box
        width={{ base: '96px', lg: 'auto' }}
        height={{ base: '96px', lg: 'auto' }}
        aspectRatio={ImageCropAspectRatio.Reward}
      >
        <SkeletonLayout width="100%" height="100%" />
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
        padding={4}
        alignItems="start"
        justifyContent="space-between"
        overflow="hidden"
        spacing={1}
      >
        <SkeletonLayout height="29px" width="200px" />

        <HStack spacing={0.5}>
          <SkeletonLayout width="16px" height="16px" borderRadius={'4px'} />
          <SkeletonLayout width="60px" height="16px" />
        </HStack>

        <HStack w="full" justifyContent={'start'} spacing={3}>
          <SkeletonLayout width="120px" height="20px" />
        </HStack>
      </VStack>
    </CardLayout>
  )
}
