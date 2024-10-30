import { Badge, Box, Button, HStack, SkeletonText, Tag, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft, PiEyeSlash, PiFile } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { MarkdownField } from '@/shared/markdown/MarkdownField'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { RewardCurrency, Satoshis, USDCents, useProjectRewardQuery } from '@/types'
import { getFormattedDate, useMobileMode } from '@/utils'

import { useRewardBuy } from '../../hooks'
import { postTypeOptions } from '../posts/utils/postTypeLabel'
import { ProjectRewardShippingEstimate, RewardEditMenu } from './components'
import { RewardShare } from './components/RewardShare'

export const RewardView = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { rewardId } = useParams<{ rewardId: string }>()
  const isMobileMode = useMobileMode()

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const navigate = useNavigate()

  const { loading, data } = useProjectRewardQuery({
    skip: !rewardId,
    fetchPolicy: 'network-only',
    variables: {
      getProjectRewardId: rewardId,
    },
  })

  const reward = data?.getProjectReward

  const { count, buyReward } = useRewardBuy(reward)

  if (loading) {
    return <RewardViewSkeleton />
  }

  if (!reward) {
    return null
  }

  const renderAmountComponent = () => {
    if (project && project.rewardCurrency === RewardCurrency.Usdcent)
      return (
        <Body bold dark>
          {`$${reward.cost / 100} `}
          <Box as="span" color={'neutral1.9'}>
            {`(${formatSatsAmount(reward.cost as USDCents)})`}
          </Box>
        </Body>
      )

    return (
      <Body bold dark>
        {`${reward.cost.toLocaleString()}`}
        <Box as="span" color={'neutral1.9'}>
          {' '}
          sats
          {` (${formatUsdAmount(reward.cost as Satoshis)})`}
        </Box>
      </Body>
    )
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <TopNavContainerBar>
        <Button
          as={Link}
          to={getPath('projectRewards', project?.name)}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('All rewards')}
        </Button>
        <RewardShare reward={reward} />
      </TopNavContainerBar>

      <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }}>
        <VStack maxWidth={dimensions.project.rewards.view.maxWidth} w="full" spacing={6}>
          <VStack w="full" spacing={3}>
            <HStack w="full" alignItems="start" justifyContent="space-between">
              <H2 flex={1} size="2xl" bold>
                {reward.name}
              </H2>
              {!isMobileMode &&
                (isProjectOwner ? (
                  <HStack>
                    {reward.isHidden && <HiddenRewardBadge />}
                    <RewardEditMenu size="md" reward={reward} />
                  </HStack>
                ) : (
                  <Button variant="solid" colorScheme="primary1" width="160px" onClick={buyReward}>
                    {t('Buy')}
                  </Button>
                ))}
            </HStack>
            <HStack w="full" alignItems="center" justifyContent="space-between">
              <HStack spacing={{ base: 2, lg: 3 }} alignItems="center">
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
                {reward.category && (
                  <Badge variant="soft" colorScheme="neutral1" size="sm" textTransform={'capitalize'}>
                    {reward.category}
                  </Badge>
                )}
                <ProjectRewardShippingEstimate reward={reward} />
              </HStack>
              <HStack display={{ base: 'none', lg: 'flex' }}>{renderAmountComponent()}</HStack>
            </HStack>
          </VStack>
          {reward.images.length <= 1 ? (
            <Box overflow={'hidden'} width="100%" position="relative" paddingTop="75%" borderRadius={'8px'}>
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
            <MediaCarousel links={reward.images} aspectRatio={ImageCropAspectRatio.Reward} />
          )}
          <CardLayout w={'full'} padding={3}>
            <VStack w={'full'} p={0}>
              <Body size="sm" medium>
                {t(
                  'Engage your community, followers, contributors, and reward purchasers by sending them an update about your new reward via email.',
                )}
              </Body>
              <Button
                w="full"
                variant="solid"
                size="lg"
                colorScheme="primary1"
                onClick={() => {
                  navigate(getPath('projectPostCreate', project?.name))
                }}
              >
                {' '}
                {t('Write an update')}{' '}
              </Button>
            </VStack>
          </CardLayout>
          <HStack
            w="full"
            justifyContent="start"
            fontSize="16px"
            color="utils.text"
            sx={{
              p: {
                marginTop: '0px',
              },
            }}
            flex={1}
          >
            <MarkdownField preview content={reward.description || ''} />
          </HStack>
          <VStack w="full" spacing={2} alignItems="start">
            <Body size="xl" bold>
              {t('Reward Updates')}
            </Body>
            <RewardUpdates posts={reward.posts} />
          </VStack>
        </VStack>
      </CardLayout>
      <BottomNavBarContainer direction="column">
        <HStack justifyContent={'space-between'} flexWrap="wrap">
          {renderAmountComponent()}
          {reward.isHidden && <HiddenRewardBadge />}
        </HStack>
        {isProjectOwner ? (
          <RewardEditMenu size="lg" w="full" reward={reward} />
        ) : (
          <Button size="lg" variant="solid" colorScheme="primary1" width="full" onClick={buyReward}>
            {t('Buy')}
          </Button>
        )}
      </BottomNavBarContainer>
    </VStack>
  )
}

const RewardUpdates = ({ posts }: { posts: any[] }) => {
  return (
    <HStack
      w="full"
      justifyContent="space-between"
      border="1px solid"
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      p={1}
    >
      {posts.map((post) => (
        <>
          <HStack key={post.id}>
            <Tag size="sm" variant="soft" bg="neutralAlpha.3">
              <PiFile />
              <Body size="sm" light pl={2}>
                {postTypeOptions.find((option) => option.value === post.postType)?.label}
              </Body>
            </Tag>
            <Body size="md" medium>
              {post.title}
            </Body>
          </HStack>
          <Body size="sm" light>
            {getFormattedDate(post.createdAt)}
          </Body>
        </>
      ))}
    </HStack>
  )
}

const HiddenRewardBadge = () => {
  return (
    <Badge size={'xl'} variant="soft" colorScheme="neutral1">
      <PiEyeSlash />
      <Body size="sm" light pl={2}>
        {t('Hidden')}
      </Body>
    </Badge>
  )
}

export const RewardViewSkeleton = () => {
  return (
    <VStack w="full" paddingBottom="120px">
      <TopNavContainerBar>
        <SkeletonLayout height="40px" width="135px" />
        <SkeletonLayout height="40px" width="100px" />
      </TopNavContainerBar>

      <CardLayout
        w="full"
        direction="row"
        justifyContent="center"
        paddingX={{ base: 3, lg: 6 }}
        backgroundColor="neutral1.1"
        paddingY={{ base: 6, lg: 12 }}
      >
        <VStack maxWidth={dimensions.project.rewards.view.maxWidth} spacing={6}>
          <VStack w="full" spacing={3}>
            <HStack w="full" alignItems="start" justifyContent="space-between">
              <SkeletonLayout height="28px" flex={1} />
              <SkeletonLayout height="28px" width="160px" display={{ base: 'none', lg: undefined }} />
            </HStack>
            <HStack w="full" alignItems="end" justifyContent="space-between">
              <HStack spacing={{ base: 2, lg: 3 }} alignItems="end">
                <SkeletonLayout height="28px" width="40px" />

                <SkeletonLayout height="28px" width="40px" />

                <SkeletonLayout height="28px" width="80px" />

                <SkeletonLayout height="28px" width="120px" />
              </HStack>
              <SkeletonLayout height="28px" width="180px" />
            </HStack>
          </VStack>
          <SkeletonLayout height="330px" width="100%" />
          <SkeletonText noOfLines={10} width="100%" />
        </VStack>
      </CardLayout>
      <BottomNavBarContainer direction="column">
        <SkeletonLayout height="28px" width="180px" />
        <SkeletonLayout height="28px" w={'100%'} />
      </BottomNavBarContainer>
    </VStack>
  )
}
