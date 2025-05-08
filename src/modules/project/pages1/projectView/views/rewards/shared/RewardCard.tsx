import { Badge, Box, Button, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { SkeletonLayout } from '@/shared/components/layouts'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { ProjectRewardFragment, ProjectStatus, RewardCurrency } from '@/types'

import { ProjectRewardShippingEstimate } from '../components/ProjectRewardShippingEstimate'
import { RewardEditMenu } from '../components/RewardEditMenu'

export type RewardCardProps = {
  reward: ProjectRewardFragment
  hidden?: boolean
  buyReward?: () => void
  count?: number
  noLink?: boolean
  isLaunch?: boolean
} & CardLayoutProps

/** Helper component for displaying the reward price */
const RewardPriceDisplay = ({
  reward,
  rewardCurrency,
  formatUsdAmount,
  formatSatsAmount,
}: {
  reward: ProjectRewardFragment
  rewardCurrency: RewardCurrency | null | undefined
  formatUsdAmount: (amount: number) => string
  formatSatsAmount: (amount: number) => string
}) => {
  return (
    <HStack alignItems={'start'} justifyContent={'end'} gap={1}>
      {rewardCurrency === RewardCurrency.Usdcent ? (
        <>
          <Body bold dark>{`$${reward.cost / 100}`}</Body>
          <Body medium muted>
            {`(${formatSatsAmount(reward.cost)})`}
          </Body>
        </>
      ) : (
        <>
          <Body bold dark>
            {`${reward.cost.toLocaleString()}`}
            <Box as="span" color={'neutral1.9'}>
              {' '}
              sats
            </Box>
          </Body>
          <Body medium muted>
            {`(${formatUsdAmount(reward.cost)})`}
          </Body>
        </>
      )}
    </HStack>
  )
}

export const RewardCard = ({ reward, hidden, noLink, isLaunch, buyReward, count = 0, ...rest }: RewardCardProps) => {
  const { project, isProjectOwner } = useProjectAtom()

  const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const onBuyClick = (e: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation()
    e.preventDefault()

    if (buyReward) {
      buyReward()
    }
  }

  const linkProps = noLink ? {} : { as: Link, to: getPath('projectRewardView', project?.name, reward.uuid) }

  const isHidden = hidden || reward.isHidden

  return (
    <CardLayout
      hover
      {...linkProps}
      dense
      w="full"
      overflow={'hidden'}
      minHeight="450px"
      spacing={0}
      position="relative"
      {...rest}
    >
      {isHidden && (
        <Box
          backgroundColor={'utils.pbg'}
          opacity={0.5}
          zIndex="1"
          pointerEvents={'none'}
          position="absolute"
          width="100%"
          height="100%"
        />
      )}
      {reward.images.length <= 1 ? (
        <Box borderColor={'neutral.700'} overflow={'hidden'} width="100%" position="relative" paddingTop="75%">
          <ImageWithReload
            src={reward.images[0] || ''}
            alt={reward.name}
            width="100%"
            height="100%"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
          />
        </Box>
      ) : (
        <Box borderColor={'neutral.700'} overflow={'hidden'} width="100%" position="relative">
          <MediaCarousel links={reward.images} aspectRatio={ImageCropAspectRatio.Reward} />
        </Box>
      )}

      <VStack padding={4} alignItems="start" flex={1}>
        <Body size="md" medium>
          {reward.name}
        </Body>
        <HStack w="full" justifyContent="start" spacing={3}>
          <Body size="sm" medium muted>
            {t('Sold')}:{' '}
            <Box as="span" color="utils.text" fontWeight={700}>
              {reward.sold}
            </Box>
          </Body>
          {reward.maxClaimable && (
            <Body size="sm" medium muted>
              {t('Available')}:{' '}
              <Box as="span" color="utils.text" fontWeight={700}>
                {reward.maxClaimable - reward.sold - count > 0 ? reward.maxClaimable - reward.sold - count : 0}
              </Box>
            </Body>
          )}
        </HStack>
        <HStack>
          {reward.category && (
            <Badge variant="soft" colorScheme="neutral1" size="sm" textTransform={'capitalize'}>
              {reward.category}
            </Badge>
          )}
          <ProjectRewardShippingEstimate reward={reward} />
        </HStack>
        <Box
          fontSize="14px"
          color="neutral1.11"
          sx={{
            p: {
              marginTop: '0px',
            },
          }}
          flex={1}
        >
          <Body size="sm" light>
            {reward?.shortDescription}
          </Body>
          {/* <MarkdownField preview content={description} /> */}
        </Box>
        <HStack w="full" justifyContent={'space-between'} alignItems="center">
          <RewardPriceDisplay
            reward={reward}
            rewardCurrency={project?.rewardCurrency}
            formatUsdAmount={formatUsdAmount}
            formatSatsAmount={formatSatsAmount}
          />

          {!isProjectOwner ? (
            buyReward && (
              <Button
                variant="solid"
                colorScheme="primary1"
                minWidth="80px"
                onClick={onBuyClick}
                isDisabled={!isRewardAvailable || project?.status === ProjectStatus.Inactive}
              >
                {t('Buy')}
              </Button>
            )
          ) : (
            <RewardEditMenu reward={reward} isLaunch={isLaunch} zIndex={2} />
          )}
        </HStack>
      </VStack>
    </CardLayout>
  )
}

export const RewardCardSkeleton = () => {
  return (
    <CardLayout p={0} w="full" overflow={'hidden'} spacing={0}>
      <Skeleton height="230px" width="100%" />
      <VStack padding={4} alignItems="start" flex={1}>
        <SkeletonLayout height="25px" width="100px" />
        <HStack w="full" justifyContent="start" spacing={3}>
          <SkeletonLayout height="20px" width="40px" />
          <SkeletonLayout height="20px" width="80px" />
        </HStack>
        <HStack>
          <SkeletonLayout height="20px" width="45px" />
          <SkeletonLayout height="20px" width="120px" />
        </HStack>
        <SkeletonText width="100%" height="150px" noOfLines={9} />
        <HStack w="full" justifyContent={'space-between'} justifySelf={'end'}>
          <SkeletonLayout height="24px" width="90px" />
          <SkeletonLayout height="24px" width="80px" />
        </HStack>
      </VStack>
    </CardLayout>
  )
}
