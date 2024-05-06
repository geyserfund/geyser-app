import { Box, BoxProps, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { Caption, H3 } from '../../../../components/typography'
import { GrantApplicant } from '../../../../types'
import { getShortAmountLabel } from '../../../../utils'

const CHART_BAR_COLORS = ['primary.900', 'primary.700', 'primary.500', 'primary.400', 'primary.100']

interface Props {
  applicants: Array<GrantApplicant>
  isCompetitionVote: boolean
}

export const DistributionChart = ({ applicants, isCompetitionVote }: Props) => {
  const { t } = useTranslation()

  const total = applicants.reduce((prev, curr) => {
    return prev + (curr?.funding.communityFunding || 0)
  }, 0)

  const percentages: Array<
    GrantApplicant & { percentage: number; numberOfContributors: number; communityFundingAmount: number }
  > = applicants.map((applicant) => ({
    ...applicant,
    percentage: ((applicant.funding?.communityFunding || 0) * 100) / (total || 1),
    numberOfContributors: applicant.contributorsCount,
    communityFundingAmount: applicant.funding.communityFunding,
  }))

  const maxPercentage = Math.max(...percentages.map((p) => p.percentage))

  return (
    <CardLayout noMobileBorder p={{ base: 0, lg: 5 }} w="full">
      <H3>{isCompetitionVote ? t('Leaderboard') : t('Grant distribution status')}</H3>
      {percentages.length > 0 && (
        <Box py={2}>
          {percentages
            .sort((a, b) => {
              return a.percentage < b.percentage ? 1 : -1
            })
            .map(({ project, percentage, numberOfContributors, communityFundingAmount }, i) => (
              <Item
                key={project.id}
                bg={CHART_BAR_COLORS[i] || CHART_BAR_COLORS[4]}
                title={project.title}
                percentage={percentage}
                width={Math.trunc((percentage * 100) / maxPercentage)}
                numberOfContributors={numberOfContributors}
                isCompetitionVote={isCompetitionVote}
                communityFundingAmount={communityFundingAmount}
              />
            ))}
        </Box>
      )}
    </CardLayout>
  )
}

const Item = ({
  bg,
  title,
  width,
  ...rest
}: {
  bg?: string
  title: string
  width: number
  percentage: number
  numberOfContributors: number
  isCompetitionVote: boolean
  communityFundingAmount: number
}) => {
  return (
    <HStack pt={2} alignItems="center" justifyContent="start">
      <HStack pr={1} width="150px">
        <Text isTruncated={true} whiteSpace="nowrap" fontWeight={500}>
          {title}
        </Text>
      </HStack>
      <Box display="flex" alignItems="center" justifyContent="start" flexGrow={1}>
        <ChartBar bg={bg} width={`${width}%`} {...rest} />
      </Box>
    </HStack>
  )
}

const ChartBar = ({
  width,
  bg,
  children,
  percentage,
  numberOfContributors,
  isCompetitionVote,
  communityFundingAmount,
}: Pick<BoxProps, 'width' | 'bg' | 'children'> & {
  percentage: number
  numberOfContributors: number
  isCompetitionVote: boolean
  communityFundingAmount: number
}) => {
  const { t } = useTranslation()

  return (
    <HStack width="100%" alignItems="center">
      <HStack
        p={3}
        width={`calc(${width} - 100px)`}
        height="20px"
        bg={bg}
        borderRadius="20px"
        justifyContent={'end'}
        alignItems="center"
      >
        <Caption fontSize={'12px'} bold color={bg === 'primary.100' ? 'neutral.1000' : 'neutral.0'}>
          {percentage.toFixed(1)}%
        </Caption>
      </HStack>
      <HStack minWidth="100px">
        <Caption fontSize={'12px'} bold color="neutral.9000">
          {getShortAmountLabel(communityFundingAmount, true)}
        </Caption>
        <Caption fontSize={'12px'} bold color="neutral.600">
          {'( '}
          {getShortAmountLabel(numberOfContributors, true)} {isCompetitionVote ? t('voters') : t('contributors')}
          {' )'}
        </Caption>
      </HStack>
    </HStack>
  )
}
