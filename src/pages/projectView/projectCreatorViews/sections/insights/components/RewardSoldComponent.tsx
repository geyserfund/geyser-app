import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../components/layouts'
import { H3 } from '../../../../../../components/typography'
import { useProjectContext } from '../../../../../../context'
import {
  GroupBy,
  useProjectRewardSoldGraphStatsGetLazyQuery,
} from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import {
  RewardSoldChart,
  RewardSoldDataType,
  RewardSoldGraphType,
} from '../elements/RewardSoldChart'
import { useSelectionAtom } from '../insightsAtom'
import { InsightsOptions } from './InsightsHeader'

export const RewardSoldComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()

  const [rewardSoldData, setRewardSoldData] = useState<RewardSoldGraphType[]>(
    [],
  )

  const [getProjectRewardSoldGraphStats, { loading }] =
    useProjectRewardSoldGraphStatsGetLazyQuery({
      onCompleted(data) {
        console.log('checking data', data)
        const stats = data.projectStatsGet

        const dateParam = {} as { [key: string]: RewardSoldDataType[] }

        stats.current?.projectFunderRewards?.quantityGraph?.map((data) => {
          let name
          if (selectionOption === InsightsOptions.lastYear) {
            name = DateTime.fromMillis(data?.dateTime).toFormat('MMM')
          } else if (selectionOption === InsightsOptions.lastMonth) {
            name = DateTime.fromMillis(data?.dateTime).toFormat('MMM dd')
          } else {
            name = DateTime.fromMillis(data?.dateTime).toFormat('EEE')
          }

          const param: RewardSoldDataType = {
            dateTime: data?.dateTime || 0,
            sum: data?.sum || 0,
            rewardId: data?.rewardId || 0,
            rewardName: data?.rewardName || '',
          }

          if (dateParam[name]) {
            dateParam[name]?.push(param)
          } else {
            dateParam[name] = [param]
          }
        })

        const rewardSoldGraphData: RewardSoldGraphType[] = Object.keys(
          dateParam,
        ).map((key) => {
          return {
            name: key,
            rewards: dateParam[key] || [],
          }
        })

        setRewardSoldData(rewardSoldGraphData)
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

      getProjectRewardSoldGraphStats({
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
  }, [getProjectRewardSoldGraphStats, project?.id, selectionOption])

  return (
    <CardLayout
      direction="column"
      padding="20px"
      w="full"
      alignItems="start"
      spacing="10px"
    >
      <H3>{t('Reward Sold')}</H3>

      <RewardSoldChart data={rewardSoldData} loading={loading} />
    </CardLayout>
  )
}
