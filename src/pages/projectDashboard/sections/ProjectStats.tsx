import { HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../context'
import { useProjectDashboardDataQuery } from '../../../types'
import { numberWithCommas, toInt } from '../../../utils'
import { StatCard } from '../components/StatCard'

export const ProjectStats = () => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  const { loading, data } = useProjectDashboardDataQuery({
    skip: !project,
    variables: { where: { id: toInt(project?.id) } },
  })

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
        {t('All Time Statistics')}
      </Text>
      <HStack
        spacing={{ base: 0, lg: 6 }}
        justifyContent="start"
        alignItems="start"
        w="100%"
        flexWrap="wrap"
      >
        <StatCard title={t('VISITS')}>
          {loading ? 0 : numberWithCommas(visitorsCount)}
        </StatCard>
        <StatCard title={t('FUNDED')}>{loading ? 0 : project.balance}</StatCard>
        <StatCard title={t('FUNDERS/VISITORS')}>
          {`${loading ? 0 : getFundersToVisitorsPercentage().toFixed(0)} %`}
        </StatCard>
      </HStack>
    </VStack>
  )
}
