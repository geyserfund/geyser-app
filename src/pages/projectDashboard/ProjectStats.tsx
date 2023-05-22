import { useQuery } from '@apollo/client'
import { GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { SatoshiAmount } from '../../components/ui'
import { ReactJSSTheme, useProjectContext } from '../../context'
import { QUERY_PROJECT_DASHBOARD_DATA } from '../../graphql'
import { fonts } from '../../styles'
import { Project, UniqueProjectQueryInput } from '../../types/generated/graphql'
import { numberWithCommas, toInt } from '../../utils'
import { DashboardGridLayout } from './components/DashboardGridLayout'

const useStyles = createUseStyles((theme: ReactJSSTheme) => ({
  statBox: {
    padding: '22px',
    backgroundColor: theme.primary[100],
    borderRadius: '4px',
  },
  numberText: {
    fontFamily: fonts.mono,
    fontSize: '28px',
    color: theme.neutral[900],
  },
  labelText: {
    fontSize: '16px',
    color: theme.neutral[600],
  },
}))

type ResponseData = {
  project: Project
}

type QueryVariables = {
  where: UniqueProjectQueryInput
}

export const ProjectStats = () => {
  const classes = useStyles()

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
    <DashboardGridLayout>
      <GridItem colSpan={6} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack w="100%" spacing="40px">
            <VStack alignItems="flex-start">
              <Text fontSize="18px" fontWeight={600} color="neutral.600">
                All Time Statistics
              </Text>
              <HStack spacing="22px">
                <VStack className={classes.statBox}>
                  <Text className={classes.numberText}>
                    {loading ? 0 : numberWithCommas(visitorsCount)}
                  </Text>
                  <Text className={classes.labelText}>VISITS</Text>
                </VStack>
                <VStack className={classes.statBox}>
                  <SatoshiAmount
                    fontSize="28px"
                    color="neutral.900"
                    fontFamily={fonts.mono}
                  >
                    {loading ? 0 : project.balance}
                  </SatoshiAmount>
                  <Text className={classes.labelText}>FUNDED</Text>
                </VStack>
                <VStack className={classes.statBox}>
                  <Text className={classes.numberText}>
                    {`${
                      loading ? 0 : getFundersToVisitorsPercentage().toFixed(0)
                    } %`}
                  </Text>
                  <Text className={classes.labelText}>FUNDERS/VISITORS</Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem colSpan={5} display="flex" justifyContent="center">
        <VStack
          justifyContent="center"
          alignItems="flex-start"
          maxWidth="370px"
          spacing="10px"
        ></VStack>
      </GridItem>
    </DashboardGridLayout>
  )
}
