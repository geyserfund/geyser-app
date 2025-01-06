import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout,  CardLayoutProps} from '@/shared/components/layouts/CardLayout'
import { H3 } from '@/shared/components/typography'
import { useProjectFundingMethodStatsGetLazyQuery } from '@/types'
import { useNotification } from '@/utils'

import { FundingMethodsPieChart } from '../elements'
import { getDateParams } from '../helpers'
import { useSelectionAtom } from '../insightsAtom'

type MethodSumType = {
  method: string
  sum: number
}

export const TransactionMethodComponent = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { toast } = useNotification()

  const [selectionOption] = useSelectionAtom()

  const [methodSum, setMethodSum] = useState<MethodSumType[]>([])

  const [getProjectFundingMethodStats, { loading }] = useProjectFundingMethodStatsGetLazyQuery({
    onCompleted(data) {
      const stats = data.projectStatsGet
      const value: MethodSumType[] =
        stats.current?.projectFundingTxs?.methodSum?.map((sum) => {
          return {
            method: sum?.method || '',
            sum: sum?.sum || 0,
          }
        }) || []
      setMethodSum(value)
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
    <VStack w="full" alignItems={'start'}>
      <H3 size="xl" medium>
        {t('Funding by method')}
      </H3>
      <CardLayout padding={{ base: 3, lg: 6 }} w="full" {...props}>
        <FundingMethodsPieChart data={methodSum} loading={loading} />
      </CardLayout>
    </VStack>
  )
}
