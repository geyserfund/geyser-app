import { HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H2, H3 } from '../../../../../../components/typography'
import { SatoshiAmount } from '../../../../../../components/ui'
import { CardLayout, SkeletonLayout } from '../../../../../../shared/components/layouts'
import { commaFormatted, getShortAmountLabel } from '../../../../../../utils'

interface SummaryBodyProps {
  totalFunded: number
  projectsFunded: number
  ranking?: number
  isLoading?: boolean
}

export const SummaryBody = ({ totalFunded, projectsFunded, ranking, isLoading }: SummaryBodyProps) => {
  const { t } = useTranslation()

  const renderSkeleton = (children: React.ReactNode) => {
    if (isLoading) {
      return <SkeletonLayout height="34px" width="60px" />
    }

    return children
  }

  return (
    <CardLayout width="100%" wrap="wrap" noMobileBorder>
      <H2>{t('Contributions summary')}</H2>
      <HStack w="full" h="full" justifyContent="space-between" mt={4} flexWrap="wrap" spacing="10px">
        <VStack
          bg="neutral.50"
          p={'10px'}
          borderRadius="8px"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          flexGrow="1"
        >
          <H3 fontWeight="normal" fontSize="sm" whiteSpace="nowrap">
            {t('Total funded')}
          </H3>
          {renderSkeleton(
            <SatoshiAmount isShortened fontWeight="bold" fontSize="2xl">
              {totalFunded}
            </SatoshiAmount>,
          )}
        </VStack>
        <VStack bg="neutral.50" p={'10px'} borderRadius="8px" flexGrow="1">
          <H3 fontWeight="normal" fontSize="sm" whiteSpace="nowrap">
            {t('Projects funded')}
          </H3>
          {renderSkeleton(
            <Text variant="satoshi" fontWeight="bold" fontSize="2xl">
              {getShortAmountLabel(projectsFunded)}
            </Text>,
          )}
        </VStack>
        {ranking && (
          <VStack bg="neutral.50" p={'10px'} borderRadius="8px" flexGrow="1">
            <H3 fontWeight="normal" fontSize="sm" whiteSpace="nowrap">
              {t('Ranking')}
            </H3>
            {renderSkeleton(
              <Text variant="satoshi" fontWeight="bold" fontSize="2xl">
                #{commaFormatted(ranking)}
              </Text>,
            )}
          </VStack>
        )}
      </HStack>
    </CardLayout>
  )
}
