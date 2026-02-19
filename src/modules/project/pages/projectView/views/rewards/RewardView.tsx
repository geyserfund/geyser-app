/* eslint-disable complexity */
import { Badge, Box, Button, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { PiArrowLeft, PiEyeSlash } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useParams } from 'react-router'

import { Head } from '@/config/Head'
import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavigation } from '@/modules/project/navigation/ProjectNavigation.tsx'
import { isNumericString } from '@/modules/project/utils/checkId.ts'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H2 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { MarkdownField } from '@/shared/markdown/MarkdownField'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { RewardCurrency, Satoshis, USDCents, useProjectRewardGetQuery } from '@/types'
import { toInt, useMobileMode } from '@/utils'

import { ProjectRewardShippingEstimate } from '../../../../forms/shippingConfigForm/ProjectRewardShippingEstimate.tsx'
import { PostsUpdates } from '../../components/PostsUpdates.tsx'
import { useRewardBuy } from '../../hooks/index.ts'
import { FollowButton } from '../body/components/FollowButton.tsx'
import { AonNotice } from './components/AonNotice.tsx'
import { RewardEditMenu } from './components/RewardEditMenu.tsx'
import { RewardShare } from './components/RewardShare.tsx'

export const RewardView = () => {
  const { project, isProjectOwner, loading: projectLoading } = useProjectAtom()
  const { rewardUUID } = useParams<{ rewardUUID: string }>()
  const location = useLocation()
  const isMobileMode = useMobileMode()

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const navigate = useNavigate()

  const isRewardID = isNumericString(rewardUUID)

  const where = isRewardID ? { id: toInt(rewardUUID) } : { uuid: rewardUUID }

  const { loading, data } = useProjectRewardGetQuery({
    skip: !rewardUUID,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
      },
    },
  })

  const reward = data?.projectRewardGet

  const { count, buyReward, isAvailable } = useRewardBuy(reward)

  useEffect(() => {
    if (isRewardID && data?.projectRewardGet?.uuid) {
      navigate(
        {
          pathname: `../${data.projectRewardGet.uuid}`,
          search: location.search,
        },
        { replace: true, relative: 'path' },
      )
    }
  }, [isRewardID, data?.projectRewardGet, navigate, location.search])

  if (loading || isRewardID) {
    return <RewardViewSkeleton />
  }

  if (!reward) {
    return null
  }

  const renderAmountComponent = () => {
    if (reward && reward.rewardCurrency === RewardCurrency.Usdcent)
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

  const isBuyDisabled = !isAvailable

  return (
    <>
      <Head title={reward.name} description={reward.shortDescription || ''} image={reward.images[0]} />
      <VStack w="full" paddingBottom="120px">
        <TopNavContainerBar>
          <Button
            as={Link}
            to={getPath('projectRewards', project?.name)}
            size="lg"
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
            isDisabled={projectLoading}
          >
            {t('All products')}
          </Button>
          {!isProjectOwner ? <FollowButton size="lg" withLabel project={project} /> : <RewardShare reward={reward} />}
        </TopNavContainerBar>

        <AonNotice />

        <CardLayout
          w="full"
          maxWidth={dimensions.project.rewards.view.maxWidth}
          direction="row"
          justifyContent="center"
          paddingY={{ base: 6, lg: 12 }}
        >
          <VStack w="full" spacing={6}>
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
                    <Button
                      variant="solid"
                      colorScheme="primary1"
                      width="160px"
                      onClick={buyReward}
                      isDisabled={isBuyDisabled}
                    >
                      {t('Buy')}
                    </Button>
                  ))}
              </HStack>
              <HStack w="full" alignItems="start" justifyContent="space-between">
                <VStack flex={1} alignItems="start">
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
                          {reward.maxClaimable - reward.sold - count > 0
                            ? reward.maxClaimable - reward.sold - count
                            : 0}
                        </Box>
                      </Body>
                    )}
                    {reward.category && (
                      <Badge variant="soft" colorScheme="neutral1" size="sm" textTransform={'capitalize'}>
                        {reward.category}
                      </Badge>
                    )}
                  </HStack>
                  <ProjectRewardShippingEstimate reward={reward} />
                </VStack>

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
              <MediaCarousel
                altText={'Reward view image'}
                links={reward.images}
                aspectRatio={ImageCropAspectRatio.Reward}
                borderRadius={'8px'}
              />
            )}
            {isProjectOwner && !reward.isHidden && (
              <CardLayout w={'full'} padding={3}>
                <VStack w={'full'} p={0}>
                  <Body size="md" medium>
                    {t(
                      'Engage your community, followers, contributors, and product purchasers by sending them an update about your product via email.',
                    )}
                  </Body>
                  <Button
                    w="full"
                    variant="solid"
                    size="lg"
                    colorScheme="primary1"
                    onClick={() => {
                      navigate(`${getPath('projectPostCreate', project?.name)}?rewardUuid=${reward.uuid}`)
                    }}
                  >
                    {' '}
                    {t('Write an update')}{' '}
                  </Button>
                </VStack>
              </CardLayout>
            )}
            {reward?.description && (
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
            )}
            {reward.posts.length > 0 && (
              <VStack w="full" spacing={2} alignItems="start">
                <Body size="xl" bold>
                  {t('Product Updates')}
                </Body>
                <PostsUpdates posts={reward.posts} />
              </VStack>
            )}
          </VStack>
        </CardLayout>
        <BottomNavBarContainer direction="column" paddingBottom={2}>
          <HStack justifyContent={'space-between'} flexWrap="wrap">
            {renderAmountComponent()}
            {reward.isHidden && <HiddenRewardBadge />}
          </HStack>
          {isProjectOwner ? (
            <RewardEditMenu size="lg" w="full" reward={reward} />
          ) : (
            <Button
              size="lg"
              variant="solid"
              colorScheme="primary1"
              width="full"
              onClick={buyReward}
              isDisabled={isBuyDisabled}
            >
              {t('Buy')}
            </Button>
          )}
          <ProjectNavigation inBottomBar />
        </BottomNavBarContainer>
      </VStack>
    </>
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
      <BottomNavBarContainer direction="column" paddingBottom={2}>
        <SkeletonLayout height="28px" width="180px" />
        <SkeletonLayout height="28px" w={'100%'} />
      </BottomNavBarContainer>
    </VStack>
  )
}
