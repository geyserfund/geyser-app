import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../components/layouts'
import { H3 } from '../../../../../../components/typography'
import { useProjectContext } from '../../../../../../context'
import {
  GroupBy,
  useProjectHistoryStatsGetLazyQuery,
} from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import { HistoricalChart, HistoryDataType } from '../elements'
import { useSelectionAtom } from '../insightsAtom'
import { InsightsOptions } from './InsightsHeader'

export const HistoricalComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()

  const [historyData, setHistoryData] = useState<HistoryDataType[]>([])

  const [getProjectHistoryStats, { loading }] =
    useProjectHistoryStatsGetLazyQuery({
      onCompleted(data) {
        const stats = data.projectStatsGet

        const nameParam = {} as { [key: string]: HistoryDataType }

        stats.current?.projectViews?.visitorGraph.map((visitorData) => {
          const name = getNameForDate(
            visitorData?.dateTime || 0,
            selectionOption,
          )

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

        stats.current?.projectFundingTxs?.amountGraph?.map((amountData) => {
          const name = getNameForDate(
            amountData?.dateTime || 0,
            selectionOption,
          )

          const val = nameParam[name] || ({} as HistoryDataType)

          nameParam[name] = {
            ...val,
            name,
            dateTime: amountData?.dateTime || 0,
            amount: amountData?.sum || 0,
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
          groupBy = GroupBy.Day
          break
        case InsightsOptions.lastMonth:
          startDateTime = currentDate.minus({ month: 1 }).toMillis()
          groupBy = GroupBy.Day
          break
        case InsightsOptions.lastYear:
          startDateTime = currentDate.minus({ year: 1 }).toMillis()
          groupBy = GroupBy.Month
          break
        default:
          startDateTime = currentDate.minus({ week: 1 }).toMillis()
          groupBy = GroupBy.Day
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
    <CardLayout
      direction="column"
      padding="20px"
      w="full"
      alignItems="start"
      spacing="10px"
    >
      <H3>{t('Historical')}</H3>

      <HistoricalChart data={historyData} loading={loading} />
    </CardLayout>
  )
}

export const getNameForDate = (
  date: number,
  selectionOption: InsightsOptions,
) => {
  let name

  if (selectionOption === InsightsOptions.lastYear) {
    name = DateTime.fromMillis(date).toFormat('MMM')
  } else if (selectionOption === InsightsOptions.lastMonth) {
    name = DateTime.fromMillis(date).toFormat('MMM dd')
  } else {
    name = DateTime.fromMillis(date).toFormat('EEE (dd/MM)')
  }

  return name
}
