import { Badge, Box, Button, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useParams } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { useBTCConverter } from '@/helpers'
import { BottomNavBarContainer } from '@/modules/navigation/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { MarkdownField } from '@/shared/markdown/MarkdownField'
import { RewardCurrency, Satoshis, USDCents, useProjectRewardQuery } from '@/types'

import { useRewardBuy } from '../../hooks'
import { ProjectRewardShippingEstimate, RewardEditMenu } from './components'
import { RewardShare } from './components/RewardShare'

export const RewardView = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { rewardId } = useParams<{ rewardId: string }>()

  const { getSatoshisFromUSDCents, getUSDAmount } = useBTCConverter()

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
            {`(${getSatoshisFromUSDCents(reward.cost as USDCents)}) sats`}
          </Box>
        </Body>
      )

    return (
      <Body bold dark>
        {`${reward.cost.toLocaleString()}`}
        <Box as="span" color={'neutral1.9'}>
          {' '}
          sats
          {` $(${getUSDAmount(reward.cost as Satoshis)}) sats`}
        </Box>
      </Body>
    )
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectNavContainer>
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
      </ProjectNavContainer>

      <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }}>
        <VStack maxWidth={dimensions.project.rewards.view.maxWidth} w="full" spacing={6}>
          <VStack w="full" spacing={3}>
            <HStack w="full" alignItems="start" justifyContent="space-between">
              <H2 flex={1} size="2xl" bold>
                {reward.name}
              </H2>
              {isProjectOwner ? (
                <RewardEditMenu size="md" display={{ base: 'none', lg: 'undefined' }} reward={reward} />
              ) : (
                <Button
                  variant="solid"
                  colorScheme="primary1"
                  width="160px"
                  display={{ base: 'none', lg: 'undefined' }}
                  onClick={buyReward}
                >
                  {t('Buy')}
                </Button>
              )}
            </HStack>
            <HStack w="full" alignItems="end" justifyContent="space-between">
              <HStack spacing={{ base: 2, lg: 3 }} alignItems="end">
                <Body size="xs" medium muted>
                  {t('Sold')}:{' '}
                  <Box as="span" color="utils.text" fontWeight={700}>
                    {reward.sold}
                  </Box>
                </Body>
                {reward.maxClaimable && (
                  <Body size="xs" medium muted>
                    {t('Available')}:{' '}
                    <Box as="span" color="utils.text" fontWeight={700}>
                      {reward.maxClaimable - reward.sold - count}
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
          {reward.image && (
            <Box overflow={'hidden'} width="100%" position="relative" paddingTop="75%" borderRadius={'8px'}>
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
        </VStack>
      </CardLayout>
      <BottomNavBarContainer direction="column">
        {renderAmountComponent()}
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

export const RewardViewSkeleton = () => {
  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectNavContainer>
        <SkeletonLayout height="40px" width="135px" />
        <SkeletonLayout height="40px" width="100px" />
      </ProjectNavContainer>

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
