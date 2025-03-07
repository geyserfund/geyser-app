import { VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { H3 } from '@/shared/components/typography'
import { AnalyticsGroupByInterval, useProjectHistoryStatsGetLazyQuery } from '@/types'
import { useNotification } from '@/utils'

import { HistoricalChart, HistoryDataType } from '../elements'
import { getNameForDate } from '../helpers'
import { InsightsOptions, useSelectionAtom } from '../insightsAtom'

export const HistoricalComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()

  const [historyData, setHistoryData] = useState<HistoryDataType[]>([])

  const [getProjectHistoryStats, { loading }] = useProjectHistoryStatsGetLazyQuery({
    onCompleted(data) {
      const stats = data.projectStatsGet

      const nameParam = {} as { [key: string]: HistoryDataType }

      stats.current?.projectViews?.visitorGraph.map((visitorData) => {
        const name = getNameForDate(visitorData?.dateTime || 0, selectionOption)

        if (!nameParam[name]) {
          nameParam[name] = {} as HistoryDataType
        }

        nameParam[name] = {
          visitorCount: visitorData?.visitorCount || 0,
          name,
          dateTime: visitorData?.dateTime || 0,
          amount: 0,
        }
      })

      stats.current?.projectContributionsStats?.contributions.graph[0]?.graphData?.map((amountData) => {
        const name = getNameForDate(amountData?.dateTime || 0, selectionOption)

        const val = nameParam[name] || ({} as HistoryDataType)

        nameParam[name] = {
          ...val,
          name,
          dateTime: amountData?.dateTime || 0,
          amount: amountData?.value || 0,
        }
      })

      const historyDataWithAmount = Object.keys(nameParam).map((key) => {
        return nameParam[key]
      }) as HistoryDataType[]

      setHistoryData(historyDataWithAmount)
    },
    onError(error) {
      toast({
        title: 'Error fetching project stats',
        description: 'Please refresh the page and try again.',
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (project?.id) {
      const currentDate = DateTime.now()
      let startDateTime
      let groupBy

      switch (selectionOption) {
        case InsightsOptions.lastWeek:
          startDateTime = currentDate.minus({ week: 1 }).toMillis()
          groupBy = AnalyticsGroupByInterval.Day
          break
        case InsightsOptions.lastMonth:
          startDateTime = currentDate.minus({ month: 1 }).toMillis()
          groupBy = AnalyticsGroupByInterval.Day
          break
        case InsightsOptions.lastYear:
          startDateTime = currentDate.minus({ year: 1 }).toMillis()
          groupBy = AnalyticsGroupByInterval.Month
          break
        default:
          startDateTime = currentDate.minus({ week: 1 }).toMillis()
          groupBy = AnalyticsGroupByInterval.Day
      }

      getProjectHistoryStats({
        variables: {
          input: {
            where: {
              projectId: project?.id,
              dateRange: {
                startDateTime,
                endDateTime: currentDate.toMillis(),
              },
              groupBy,
            },
          },
        },
      })
    }
  }, [getProjectHistoryStats, project?.id, selectionOption])

  return (
    <VStack w="full" alignItems={'start'}>
      <H3 size="xl" medium>
        {t('Historical')}
      </H3>
      <CardLayout direction="column" padding={1} w="full" alignItems="start" spacing="10px">
        <HistoricalChart data={historyData} loading={loading} />
      </CardLayout>
    </VStack>
  )
}
