import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../components/layouts'
import { Body1, H3 } from '../../../../../../components/typography'
import { useProjectContext } from '../../../../../../context'
import { useProjectRewardSoldGraphStatsGetLazyQuery } from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import {
  RewardListType,
  RewardSoldChart,
  RewardSoldDataType,
  RewardSoldGraphType,
} from '../elements/RewardSoldChart'
import { getDateParams, getNameForDate } from '../helpers'
import { useSelectionAtom } from '../insightsAtom'

export const RewardSoldComponent = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()

  const [rewardSoldData, setRewardSoldData] = useState<RewardSoldGraphType[]>(
    [],
  )
  const [rewardList, setRewardList] = useState<RewardListType[]>([])

  const [getProjectRewardSoldGraphStats, { loading }] =
    useProjectRewardSoldGraphStatsGetLazyQuery({
      onCompleted(data) {
        const stats = data.projectStatsGet

        const rewardList = [] as RewardListType[]

        const dateParam = {} as {
          [key: string]: { [key: string]: RewardSoldDataType }
        }
        stats.current?.projectFunderRewards?.quantityGraph?.map((data) => {
          const name = getNameForDate(data?.dateTime || 0, selectionOption)

          if (
            data?.rewardId &&
            !rewardList.some(
              (reward) => reward.rewardId === Number(data?.rewardId),
            )
          ) {
            rewardList.push({
              rewardId: Number(data?.rewardId),
              rewardName: data?.rewardName,
            })
          }

          const param: RewardSoldDataType = {
            dateTime: data?.dateTime || 0,
            sum: data?.sum || 0,
            rewardId: data?.rewardId || 0,
            rewardName: data?.rewardName || '',
          }

          dateParam[name] = {
            ...dateParam[name],
            [param.rewardId]: param,
          }
        })

        const rewardSoldGraphData: RewardSoldGraphType[] = Object.keys(
          dateParam,
        ).map((key) => {
          return {
            name: key,
            rewards: dateParam[key] || {},
          }
        })

        setRewardSoldData(rewardSoldGraphData)
        setRewardList(rewardList)
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
      const { startDateTime, endDateTime, groupBy } =
        getDateParams(selectionOption)

      getProjectRewardSoldGraphStats({
        variables: {
          input: {
            where: {
              projectId: project?.id,
              dateRange: {
                startDateTime,
                endDateTime,
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
      padding={{ base: 0, lg: '20px' }}
      w="full"
      alignItems="start"
      spacing="10px"
      mobileDense
    >
      <H3>{t('Rewards sold')}</H3>

      {rewardSoldData.length > 0 ? (
        <RewardSoldChart
          data={rewardSoldData}
          rewardList={rewardList}
          loading={loading}
        />
      ) : (
        <Body1>{t('No data available')}</Body1>
      )}
    </CardLayout>
  )
}
