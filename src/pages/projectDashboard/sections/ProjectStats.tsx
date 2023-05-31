import { useQuery } from '@apollo/client'
import { HStack, Text, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../../context'
import { QUERY_PROJECT_DASHBOARD_DATA } from '../../../graphql'
import {
  Project,
  UniqueProjectQueryInput,
} from '../../../types/generated/graphql'
import { numberWithCommas, toInt } from '../../../utils'
import { StatCard } from '../components/StatCard'

type ResponseData = {
  project: Project
}

type QueryVariables = {
  where: UniqueProjectQueryInput
}

export const ProjectStats = () => {
  const { project } = useProjectContext()

  const { loading, data } = useQuery<ResponseData, QueryVariables>(
    QUERY_PROJECT_DASHBOARD_DATA,
    {
      skip: !project,
      variables: { where: { id: toInt(project?.id) } },
    },
  )

  const visitorsCount = data?.project?.statistics?.totalVisitors || 0

  if (!project) {
    return null
  }

  const getFundersToVisitorsPercentage = (): number => {
    if (visitorsCount === 0) {
      return 100
    }

    const fundersCount = project.fundersCount || 0

    return (fundersCount / visitorsCount) * 100
  }

  return (
    <VStack
      px={{ base: 0, lg: 12 }}
      pt={{ base: 0, lg: 4 }}
      pb={{ base: 0, lg: 16 }}
      spacing={4}
    >
      <Text w="100%" variant="h3" color="neutral.900">
        All Time Statistics
      </Text>
      <HStack
        spacing={{ base: 0, lg: 6 }}
        justifyContent="start"
        alignItems="start"
        w="100%"
        flexWrap="wrap"
      >
        <StatCard title="VISITS">
          {loading ? 0 : numberWithCommas(visitorsCount)}
        </StatCard>
        <StatCard title="FUNDED">{loading ? 0 : project.balance}</StatCard>
        <StatCard
          title="
            FUNDERS/VISITORS"
        >
          {`${loading ? 0 : getFundersToVisitorsPercentage().toFixed(0)} %`}
        </StatCard>
      </HStack>
    </VStack>
  )
}
