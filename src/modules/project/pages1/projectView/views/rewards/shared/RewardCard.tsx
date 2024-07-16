import { Badge, Box, Button, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { getPath } from '@/shared/constants'
import { MarkdownField } from '@/forms/markdown/MarkdownField'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout, CardLayoutProps, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { ProjectRewardForCreateUpdateFragment, ProjectStatus, RewardCurrency } from '@/types'

import { useRewardBuy } from '../../../hooks'
import { ProjectRewardShippingEstimate } from '../components/ProjectRewardShippingEstimate'
import { RewardEditMenu } from '../components/RewardEditMenu'

type Props = {
  reward: ProjectRewardForCreateUpdateFragment
  hidden?: boolean
} & CardLayoutProps

export const RewardCard = ({ reward, hidden, ...rest }: Props) => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()

  const { buyReward, count } = useRewardBuy(reward)

  const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true

  const onBuyClick = (e: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation()
    e.preventDefault()
    buyReward()
  }

  return (
    <CardLayout
      as={Link}
      to={getPath('projectRewardView', project?.name, reward.id)}
      p={0}
      w="full"
      overflow={'hidden'}
      spacing={0}
      position="relative"
      {...rest}
    >
      {hidden && (
        <Box
          backgroundColor={'neutralAlpha.9'}
          zIndex="1"
          pointerEvents={'none'}
          position="absolute"
          width="100%"
          height="100%"
        />
      )}
      {reward.image && (
        <Box borderColor={'neutral.700'} overflow={'hidden'} width="100%" position="relative" paddingTop="75%">
          <ImageWithReload
            src={reward.image || ''}
            alt={reward.name}
            width="100%"
            height="100%"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
          />
        </Box>
      )}
      <VStack padding={4} alignItems="start" flex={1}>
        <Body size="md" medium>
          {reward.name}
        </Body>
        <HStack w="full" justifyContent="start" spacing={3}>
          <Body size="xs" medium muted>
            {t('Sold')}:{' '}
            <Box as="span" color="utils.text" fontWeight={700}>
              {reward.sold}
            </Box>
          </Body>
          {reward.stock && (
            <Body size="xs" medium muted>
              {t('Available')}:{' '}
              <Box as="span" color="utils.text" fontWeight={700}>
                {reward.stock - reward.sold - count}
              </Box>
            </Body>
          )}
        </HStack>
        <HStack>
          <Badge variant="soft" colorScheme="neutral1" size="sm" textTransform={'capitalize'}>
            {reward.category}
          </Badge>
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
          <MarkdownField preview content={reward.description || ''} />
        </Box>
        <HStack w="full" justifyContent={'space-between'} alignItems="center">
          {project && project.rewardCurrency === RewardCurrency.Usdcent ? (
            <Body bold dark>{`$${reward.cost / 100}`}</Body>
          ) : (
            <Body bold dark>
              {`${reward.cost.toLocaleString()}`}
              <Box as="span" color={'neutral1.9'}>
                {' '}
                sats
              </Box>
            </Body>
          )}

          {!isProjectOwner ? (
            <Button
              size="sm"
              variant="surface"
              colorScheme="primary1"
              minWidth="80px"
              onClick={onBuyClick}
              isDisabled={!isRewardAvailable || project?.status === ProjectStatus.Inactive}
            >
              {t('Buy')}
            </Button>
          ) : (
            <RewardEditMenu reward={reward} />
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
