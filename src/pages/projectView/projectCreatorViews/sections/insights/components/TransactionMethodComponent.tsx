import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CardLayout,
  CardLayoutProps,
} from '../../../../../../components/layouts'
import { H3 } from '../../../../../../components/typography'
import { useProjectContext } from '../../../../../../context'
import { useProjectFundingMethodStatsGetLazyQuery } from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import { FundingMethodsPieChart } from '../elements'
import { getDateParams } from '../helpers'
import { useSelectionAtom } from '../insightsAtom'

type MethodCountType = {
  method: string
  count: number
}

export const TransactionMethodComponent = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()

  const [methodCount, setMethodCount] = useState<MethodCountType[]>([])

  const [getProjectFundingMethodStats, { loading }] =
    useProjectFundingMethodStatsGetLazyQuery({
      onCompleted(data) {
        const stats = data.projectStatsGet
        const value: MethodCountType[] =
          stats.current?.projectFundingTxs?.methodCount?.map((count) => {
            return {
              method: count?.method || '',
              count: count?.count || 0,
            }
          }) || []
        setMethodCount(value)
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
      const { startDateTime, endDateTime } = getDateParams(selectionOption)

      getProjectFundingMethodStats({
        variables: {
          input: {
            where: {
              projectId: project?.id,
              dateRange: {
                startDateTime,
                endDateTime,
              },
            },
          },
        },
      })
    }
  }, [getProjectFundingMethodStats, project?.id, selectionOption])

  return (
    <CardLayout
      direction="column"
      padding={{ base: '0px', lg: '20px' }}
      w="full"
      alignItems="start"
      spacing="10px"
      mobileDense
      {...props}
    >
      <H3>{t('Funding transactions')}</H3>
      <FundingMethodsPieChart data={methodCount} loading={loading} />
    </CardLayout>
  )
}
