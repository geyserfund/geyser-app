import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import {
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { SatoshiIconTilted } from '../../../../components/icons'
import { StickToTop } from '../../../../components/layouts'
import { ActivityBrief } from '../../../../components/molecules'
import { MobileViews, useProjectContext } from '../../../../context'
import {
  QUERY_GET_FUNDING_TXS_LANDING,
  QUERY_PROJECT_FUNDERS,
} from '../../../../graphql'
import { useQueryWithPagination } from '../../../../hooks'
import {
  Funder,
  FundingTxFragment,
  ProjectFragment,
} from '../../../../types/generated/graphql'
import {
  aggregateTransactions,
  FundingTxWithCount,
  isActive,
  toInt,
  useMobileMode,
  useNotification,
} from '../../../../utils'
import { ProjectContributionList } from '../components/ProjectContributionList'
import { ProjectLeaderboardList } from '../components/ProjectLeaderboardList'

type Props = {
  project: ProjectFragment
  btcRate: number
  fundingTx: FundingTxFragment
}

const itemLimit = 50

export const ProjectFundingInitialInfoScreen = ({
  project,
  fundingTx,
}: Props) => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()

  const { mobileView, setMobileView } = useProjectContext()

  const [tab, setTab] = useState('activity')
  const [aggregatedFundingTxs, setAggregatedFundingTxs] = useState<
    FundingTxWithCount[]
  >([])

  const fundingTxs = useQueryWithPagination<
    FundingTxFragment,
    FundingTxWithCount
  >({
    itemLimit,
    queryName: 'getFundingTxs',
    query: QUERY_GET_FUNDING_TXS_LANDING,
    resultMap: aggregateTransactions,
    where: { projectId: toInt(project.id) },
    options: {
      onError() {
        toast({
          status: 'error',
          title: 'Failed to fetch contributions',
        })
      },
    },
  })

  const funders = useQueryWithPagination<Funder>({
    queryName: 'getFunders',
    itemLimit,
    query: QUERY_PROJECT_FUNDERS,
    where: { projectId: toInt(project.id) },
    orderBy: {
      amountFunded: 'desc',
    },
    options: {
      onError() {
        toast({
          status: 'error',
          title: 'Failed to fetch contributors leaderboard',
        })
      },
    },
  })

  useEffect(() => {
    setAggregatedFundingTxs(fundingTxs.data)
  }, [fundingTxs.data])

  useEffect(() => {
    if (mobileView === MobileViews.contribution) {
      setTab('activity')
    } else if (mobileView === MobileViews.leaderboard) {
      setTab('leaderBoard')
    }
  }, [mobileView])

  const renderActivityList = () => {
    if (tab === 'activity') {
      return (
        <ProjectContributionList
          fundingTxs={{ ...fundingTxs, data: aggregatedFundingTxs }}
        />
      )
    }

    return <ProjectLeaderboardList project={project} funders={funders} />
  }

  const contributionButton = () => {
    return (
      <>
        <Button
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={tab === 'activity' ? 'bold' : 'normal'}
          fontSize="16px"
          onClick={() => setTab('activity')}
        >
          Contributions{' '}
          <Text ml={2} bg="neutral.100" rounded="lg" px={3} py={1}>
            {project.fundingTxsCount}
          </Text>
        </Button>
        <Box
          bg={tab === 'activity' ? 'primary.800' : 'primary.50'}
          w="100%"
          h="4px"
          rounded="lg"
        ></Box>
      </>
    )
  }

  const leaderBoardButton = () => {
    return (
      <>
        <Button
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={tab === 'activity' ? 'normal' : 'bold'}
          fontSize="16px"
          onClick={() => setTab('leaderboard')}
        >
          Leaderboard{' '}
          <Text ml={2} bg="neutral.100" rounded="lg" px={3} py={1}>
            {project.fundersCount}
          </Text>
        </Button>
        <Box
          bg={tab === 'activity' ? 'primary.50' : 'primary.800'}
          w="100%"
          h="4px"
          rounded="lg"
        ></Box>
      </>
    )
  }

  const renderTabsList = () => {
    if (isMobile) {
      switch (mobileView) {
        case MobileViews.contribution:
          return (
            <StickToTop
              id="contribute-tab-activity-table"
              w="100%"
              _onStick={{ w: 'calc(100% - 20px)' }}
            >
              {contributionButton()}
            </StickToTop>
          )
        case MobileViews.leaderboard:
          return (
            <StickToTop
              id="contribute-tab-activity-table"
              w="100%"
              _onStick={{ w: 'calc(100% - 20px)' }}
            >
              {leaderBoardButton()}
            </StickToTop>
          )
        default:
      }
    }

    return (
      <HStack width="100%" spacing="0px">
        <Box w="50%">{contributionButton()}</Box>;
        <Box w="50%">{leaderBoardButton()}</Box>;
      </HStack>
    )
  }

  return (
    <VStack
      padding={{ base: '0px 10px 0px 10px', lg: '10px 20px' }}
      spacing="0px"
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <ActivityBrief project={project} />

      {!isMobile ? (
        <Button
          variant="primary"
          leftIcon={<SatoshiIconTilted />}
          width="100%"
          onClick={() => setMobileView(MobileViews.funding)}
          isDisabled={!isActive(project.status)}
        >
          Contribute
        </Button>
      ) : null}

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="hidden"
        flex="1"
        paddingTop="10px"
      >
        <Box display="flex" w="100%">
          {renderTabsList()}
        </Box>
        {renderActivityList()}
      </Box>
    </VStack>
  )
}

export const InfoPageSkeleton = () => {
  const isMobile = useMobileMode()

  return (
    <VStack
      padding={isMobile ? '10px 5px 0px 5px' : '10px 20px'}
      spacing="15px"
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <SkeletonText noOfLines={3} width="185px" />
      <SkeletonCircle height="208px" width="208px" marginY="30px" />
      <Skeleton height="40px" width="100%" />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="hidden"
        flex="1"
      >
        <HStack display="flex" marginBottom="10px" w="95%" spacing="5px">
          <Box w="50%">
            <Skeleton w="100%" h="40px" />
          </Box>
          <Box w="50%">
            <Skeleton w="100%" h="40px" />
          </Box>
        </HStack>
        <VStack
          spacing={'8px'}
          w="95%"
          overflow="auto"
          height={isMobile ? 'calc(100% - 44px)' : '100%'}
          paddingBottom="10px"
        >
          <Skeleton width="100%" height="80px" />
          <Skeleton width="100%" height="80px" />
          <Skeleton width="100%" height="80px" />
          <Skeleton width="100%" height="80px" />
        </VStack>
      </Box>
    </VStack>
  )
}
