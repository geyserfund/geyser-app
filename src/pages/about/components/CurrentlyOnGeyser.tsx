import { useQuery } from '@apollo/client'
import { HStack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2, H1, MonoBody1 } from '../../../components/typography'
import { QUERY_PROJECTS_SUMMARY } from '../../../graphql'
import {
  getBitcoinAmount,
  getShortAmountLabel,
  toInt,
  useNotification,
} from '../../../utils'
import { SummarySkeleton } from '../../landing/components'

export const CurrentlyOnGeyser = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const {
    loading: isSummaryLoading,
    error: summaryError,
    data: summaryData,
  } = useQuery(QUERY_PROJECTS_SUMMARY)

  const projectsSummaryData = (summaryData && summaryData.projectsSummary) || {}

  useEffect(() => {
    if (summaryError) {
      toast({
        title: 'Could not load summary data',
        description: 'Please refresh the page',
        status: 'error',
      })
    }
  }, [toast, summaryError])

  const satsDataArray = [
    [projectsSummaryData.projectsCount, 'projects'],
    [projectsSummaryData.fundedTotal, 'bitcoin raised'],
    [projectsSummaryData.fundersCount, 'contributors'],
  ]
  return (
    <VStack width={'100%'} padding={3} spacing={5}>
      <H1>{t('Currently, on Geyser')}</H1>
      <HStack
        fontSize={'sm'}
        spacing={4}
        maxWidth={'870px'}
        w={'100%'}
        justifyContent={'space-between'}
        border={'2.6px solid'}
        borderColor={'primary.500'}
        backgroundColor={'neutral.0'}
        padding={{ base: '10px', lg: '2% 6%' }}
        borderRadius={'15px'}
      >
        {isSummaryLoading ? (
          <SummarySkeleton />
        ) : (
          satsDataArray.map((statsData, index) => {
            return (
              <VStack
                spacing={0}
                key={index}
                justifyContent="flex-start"
                alignItems={'center'}
              >
                <MonoBody1
                  bold
                  marginTop="2px"
                  color="primary.500"
                  fontSize={{ base: '35px', lg: '55px' }}
                >
                  {index === 1
                    ? getBitcoinAmount(toInt(statsData[0]), true)
                    : getShortAmountLabel(toInt(statsData[0]))}
                </MonoBody1>

                <Body2
                  textTransform={'uppercase'}
                  color="neutral.600"
                  fontSize={{ base: '14px', lg: '24px' }}
                  fontWeight={600}
                >
                  {t(statsData[1])}
                </Body2>
              </VStack>
            )
          })
        )}
      </HStack>
    </VStack>
  )
}
