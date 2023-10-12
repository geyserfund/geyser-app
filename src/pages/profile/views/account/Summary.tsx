import { HStack, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { H2, H3 } from '../../../../components/typography'
import { SatoshiAmount } from '../../../../components/ui'
import type { User, UserProjectContribution } from '../../../../types'
import { getShortAmountLabel, numberWithCommas } from '../../../../utils'

interface SummaryBodyProps {
  totalFunded: number
  projectsFunded: number
  ranking?: number
}

export const SummaryBody = ({
  totalFunded,
  projectsFunded,
  ranking,
}: SummaryBodyProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout width="100%" wrap="wrap" noMobileBorder>
      <H2>{t('Contributions summary')}</H2>
      <HStack
        w="full"
        h="full"
        justifyContent="space-between"
        mt={4}
        flexWrap="wrap"
        spacing="10px"
      >
        <VStack
          bg="neutral.50"
          p={4}
          borderRadius="8px"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          flexGrow="1"
        >
          <H3 fontWeight="normal" fontSize="sm" whiteSpace="nowrap">
            {t('Total funded')}
          </H3>
          <SatoshiAmount isShortened fontWeight="bold" fontSize="2xl">
            {totalFunded}
          </SatoshiAmount>
        </VStack>
        <VStack bg="neutral.50" p={4} borderRadius="8px" flexGrow="1">
          <H3 fontWeight="normal" fontSize="sm" whiteSpace="nowrap">
            {t('Projects funded')}
          </H3>
          <Text variant="satoshi" fontWeight="bold" fontSize="2xl">
            {getShortAmountLabel(projectsFunded)}
          </Text>
        </VStack>
        {ranking && (
          <VStack bg="neutral.50" p={4} borderRadius="8px" flexGrow="1">
            <H3 fontWeight="normal" fontSize="sm" whiteSpace="nowrap">
              {t('Ranking')}
            </H3>
            <Text variant="satoshi" fontWeight="bold" fontSize="2xl">
              #{numberWithCommas(ranking)}
            </Text>
          </VStack>
        )}
      </HStack>
    </CardLayout>
  )
}

export const Summary = ({ userProfile }: { userProfile: User }) => {
  const totalFunded = useMemo(() => {
    return userProfile.contributions.reduce(
      (acc: number, c: UserProjectContribution) => {
        return acc + (c.funder?.amountFunded ?? 0)
      },
      0,
    )
  }, [userProfile.contributions])

  const projectsFunded = useMemo(() => {
    return userProfile.contributions.length
  }, [userProfile.contributions])

  return (
    <SummaryBody
      totalFunded={totalFunded}
      projectsFunded={projectsFunded}
      ranking={userProfile.ranking ? Number(userProfile.ranking) : undefined}
    />
  )
}
