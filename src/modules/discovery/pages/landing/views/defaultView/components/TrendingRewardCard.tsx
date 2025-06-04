import { Badge, Box, Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { guardianRewardUUIDs } from '@/modules/guardians/pages/character/characterAssets'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { InteractiveCardLayout } from '@/shared/components/layouts/InteractiveCardLayout.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H3 } from '@/shared/components/typography'
import { getPath, getPathWithGeyserHero } from '@/shared/constants'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { GuardianType, RewardCurrency, RewardForLandingPageFragment } from '@/types'

type TrendingRewardCardProps = {
  reward: RewardForLandingPageFragment
  sold?: number
} & StackProps

export const TrendingRewardCard = ({ reward, sold, ...rest }: TrendingRewardCardProps) => {
  const { formatSatsAmount, formatUsdAmount, formatAmount } = useCurrencyFormatter(true)
  const navigate = useNavigate()

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('projectFunding', reward.project.name), {
      state: { rewardUUID: reward.uuid },
    })
  }

  const guardian = useMemo(() => {
    const guardian = Object.keys(guardianRewardUUIDs).find(
      (key) =>
        guardianRewardUUIDs[key as GuardianType].main === reward.uuid ||
        guardianRewardUUIDs[key as GuardianType].discount === reward.uuid,
    ) as GuardianType | undefined

    return guardian
  }, [reward])

  return (
    <InteractiveCardLayout
      to={
        guardian
          ? getPath('guardiansCharacter', guardian)
          : getPathWithGeyserHero('projectRewardView', reward.project.name, reward.uuid)
      }
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      flexDirection={{ base: 'row', lg: 'column' }}
      spacing={{ base: 3, lg: 4 }}
      flex={{ base: 'unset', lg: 1 }}
      hoverContent={
        <VStack paddingX={{ base: 3, lg: 4 }} paddingBottom={{ base: 3, lg: 4 }} width="100%">
          <Body size="sm" light>
            {reward.shortDescription}
          </Body>
          <Button variant="solid" colorScheme="primary1" size="sm" width="100%" onClick={handleBuy}>
            {t('Buy')}
          </Button>
        </VStack>
      }
      {...rest}
    >
      <Box width={{ base: '96px', lg: 'auto' }} height={{ base: '96px', lg: 'auto' }}>
        <ImageWithReload
          id={`${reward.uuid}-image`}
          width="100%"
          height="100%"
          aspectRatio={{ base: 1, lg: ImageCropAspectRatio.Reward }}
          objectFit="cover"
          borderRadius="8px"
          src={reward.images[0]}
          alt={`${reward.name}-header-image`}
        />
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
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

        <HStack w="full" justifyContent={'space-between'} spacing={3}>
          <Body size="sm" dark>
            {reward.project.rewardCurrency === RewardCurrency.Usdcent ? (
              <>
                {formatAmount(reward.cost, FormatCurrencyType.Usdcent)}
                <Body as="span" size="sm" light>
                  {' '}
                  ({formatSatsAmount(reward.cost)})
                </Body>
              </>
            ) : (
              <>
                {formatAmount(reward.cost, FormatCurrencyType.Btcsat)}
                <Body as="span" size="sm" light>
                  {' '}
                  ({formatUsdAmount(reward.cost)})
                </Body>
              </>
            )}
          </Body>
          {sold ? (
            <Badge size="sm" variant="soft" colorScheme="neutral1">
              {sold} {t('sold')}
            </Badge>
          ) : null}
        </HStack>
      </VStack>
    </InteractiveCardLayout>
  )
}

export const TrendingRewardCardSkeleton = () => {
  return (
    <InteractiveCardLayout
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={4}
      flex={{ base: 'unset', lg: 1 }}
    >
      <Box
        width={{ base: '96px', lg: 'auto' }}
        height={{ base: '96px', lg: 'auto' }}
        aspectRatio={ImageCropAspectRatio.Reward}
      >
        <SkeletonLayout borderRadius={'8px'} width="100%" height="100%" />
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
        alignItems="start"
        justifyContent="space-between"
        overflow="hidden"
        spacing={1}
      >
        <SkeletonLayout height="24px" width="200px" />

        <HStack spacing={0.5}>
          <SkeletonLayout width="16px" height="14px" borderRadius={'4px'} />
          <SkeletonLayout width="60px" height="14px" />
        </HStack>

        <HStack w="full" justifyContent={'start'} spacing={3}>
          <SkeletonLayout width="120px" height="16px" />
        </HStack>
      </VStack>
    </InteractiveCardLayout>
  )
}
