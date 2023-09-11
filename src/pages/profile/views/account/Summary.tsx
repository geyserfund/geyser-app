import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

import { numberWithCommas, getShortAmountLabel } from '../../../../utils'
import type { User, UserProjectContribution } from '../../../../types'
import { CardLayout } from '../../../../components/layouts'
import { SatoshiAmount } from '../../../../components/ui'
import { H2, H3 } from '../../../../components/typography'
import { useContributionSummary } from '../../hooks/useContributionSummary'

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
  const { isShown, toggle } = useContributionSummary()
  return isShown ? (
    <CardLayout width="100%" wrap="wrap" noMobileBorder>
      <HStack justifyContent="space-between">
        <H2 whiteSpace="nowrap">{t('Contributions summary')}</H2>
        <IconButton
          aria-label={t('Hide')}
          bg="transparent"
          cursor="pointer"
          onClick={toggle}
          _hover={{ bg: 'transparent' }}
          as={ViewIcon}
          boxSize={4}
        />
      </HStack>
      <HStack
        w="full"
        h="full"
        justifyContent="space-between"
        mt={4}
        flexWrap="wrap"
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
              {numberWithCommas(ranking)}
            </Text>
          </VStack>
        )}
      </HStack>
    </CardLayout>
  ) : null
}

export const Summary = ({ userProfile }: { userProfile: User }) => {
  // todo: ranking query
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
    <SummaryBody totalFunded={totalFunded} projectsFunded={projectsFunded} />
  )
}
