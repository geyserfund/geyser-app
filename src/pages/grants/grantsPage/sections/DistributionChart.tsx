import { Box, BoxProps, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Caption, H3 } from '../../../../components/typography'
import { CardLayout } from '../../../../shared/components/layouts'
import { standardPadding } from '../../../../styles'
import { GrantApplicant } from '../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../utils'

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
    <CardLayout noMobileBorder p={standardPadding} w="full">
      <H3 fontSize={'18px'}>{t('Leaderboard')}</H3>
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
    <HStack pt={2} alignItems="center" justifyContent="start" spacing="10px">
      <HStack pr={1} width="120px">
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
  percentage,
  numberOfContributors,
  isCompetitionVote,
  communityFundingAmount,
}: Pick<BoxProps, 'width' | 'bg'> & {
  percentage: number
  numberOfContributors: number
  isCompetitionVote: boolean
  communityFundingAmount: number
}) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  return (
    <HStack width="100%" alignItems="center">
      <HStack
        p={'5px'}
        width={percentage > 0 ? `calc(${width} - 150px)` : `calc(${width} - 190px)`}
        minWidth="40px"
        height="20px"
        bg={bg}
        borderRadius="20px"
        justifyContent={'end'}
        alignItems="center"
      >
        <Caption
          fontSize={'12px'}
          bold
          color={['primary.100', 'primary.400'].includes(`${bg}`) ? 'neutral.1000' : 'neutral.0'}
        >
          {isMobile ? Math.round(percentage) : percentage.toFixed(1)}%
        </Caption>
      </HStack>
      <HStack minWidth="150px">
        <Caption fontSize={'12px'} bold color="neutral.9000">
          {getShortAmountLabel(communityFundingAmount, true)}
        </Caption>
        <Caption fontSize={'12px'} bold color="neutral.600" isTruncated>
          {'('}
          {getShortAmountLabel(numberOfContributors, true)} {isCompetitionVote ? t('voters') : t('contributors')}
          {')'}
        </Caption>
      </HStack>
    </HStack>
  )
}
