import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import {
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { SatoshiIconTilted } from '../../../components/icons'
import { StickToTop } from '../../../components/layouts'
import { ActivityBrief } from '../../../components/molecules'
import { ButtonComponent } from '../../../components/ui'
import { MobileViews, useProjectContext } from '../../../context'
import {
  QUERY_GET_FUNDING_TXS_LANDING,
  QUERY_GET_PROJECT_FUNDERS,
} from '../../../graphql'
import { useQueryWithPagination } from '../../../hooks'
import { Funder, Project } from '../../../types/generated/graphql'
import {
  aggregateTransactions,
  FundingTxWithCount,
  isActive,
  toInt,
  useMobileMode,
} from '../../../utils'
import { ProjectContributionList } from './ProjectContributionList'
import { ProjectLeaderboardList } from './ProjectLeaderboardList'

type Props = {
  project: Project
  btcRate: number
  test?: boolean
  fundingTx: any
}

const itemLimit = 50

export const ProjectFundingInitialInfoScreen = ({
  project,
  test,
  fundingTx,
}: Props) => {
  const isMobile = useMobileMode()
  const [tab, setTab] = useState('activity')
  const { mobileView, setMobileView } = useProjectContext()

  const [aggregatedFundingTxs, setAggregatedFundingTxs] = useState<
    FundingTxWithCount[]
  >([])

  const fundingTxs = useQueryWithPagination<FundingTxWithCount>({
    itemLimit,
    queryName: 'getFundingTxs',
    query: QUERY_GET_FUNDING_TXS_LANDING,
    resultMap: aggregateTransactions,
    where: { projectId: toInt(project.id) },
  })

  const funders = useQueryWithPagination<Funder>({
    queryName: 'getFunders',
    itemLimit,
    query: QUERY_GET_PROJECT_FUNDERS,
    where: { projectId: toInt(project.id) },
    orderBy: {
      amountFunded: 'desc',
    },
  })

  useEffect(() => {
    setAggregatedFundingTxs(fundingTxs.data)
  }, [fundingTxs.data])

  useEffect(() => {
    if (fundingTx && fundingTx.id && fundingTx.status === 'paid') {
      setAggregatedFundingTxs([fundingTx, ...aggregatedFundingTxs])
    }
  }, [fundingTx])

  useEffect(() => {
    if (mobileView === MobileViews.contribution) {
      setTab('activity')
    } else if (mobileView === MobileViews.leaderboard) {
      setTab('leaderBoard')
    }
  }, [mobileView])

  if (test) {
    return <InfoPageSkeleton />
  }

  const renderActivityList = () => {
    switch (tab) {
      case 'activity':
        return (
          <ProjectContributionList
            fundingTxs={{ ...fundingTxs, data: aggregatedFundingTxs }}
          />
        )
      default:
        return <ProjectLeaderboardList project={project} funders={funders} />
    }
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
          <Text ml={2} bg="brand.bgGrey" rounded="lg" px={3} py={1}>
            {project.fundingTxsCount}
          </Text>
        </Button>
        <Box
          bg={tab === 'activity' ? 'darkgrey' : 'lightgrey'}
          w="100%"
          h="2px"
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
          <Text ml={2} bg="brand.bgGrey" rounded="lg" px={3} py={1}>
            {project.fundersCount}
          </Text>
        </Button>
        <Box
          bg={tab === 'activity' ? 'lightgrey' : 'darkgrey'}
          w="100%"
          h="2px"
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
              _onStick={{ w: 'calc(100% - 29px)' }}
            >
              {contributionButton()}
            </StickToTop>
          )
        case MobileViews.leaderboard:
          return (
            <StickToTop
              id="contribute-tab-activity-table"
              w="100%"
              _onStick={{ w: 'calc(100% - 29px)' }}
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
      padding={isMobile ? '0px 5px 0px 5px' : '10px 20px'}
      spacing="0px"
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <ActivityBrief project={project} />

      {!isMobile ? (
        <ButtonComponent
          standard
          leftIcon={<SatoshiIconTilted />}
          width="100%"
          backgroundColor={
            isActive(project.status) ? 'brand.primary' : 'brand.grayPlaceholder'
          }
          onClick={() => setMobileView(MobileViews.funding)}
          isDisabled={!isActive(project.status)}
        >
          Contribute
        </ButtonComponent>
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
        <Box display="flex" marginBottom="10px" w="95%">
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
