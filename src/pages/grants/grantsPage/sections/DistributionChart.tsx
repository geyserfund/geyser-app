import { Box, BoxProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { H2 } from '../../../../components/typography'
import { GrantApplicant } from '../../../../types'

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

  const percentages: Array<GrantApplicant & { percentage: number; numberOfContributors: number }> = applicants.map(
    (applicant) => ({
      ...applicant,
      percentage: isCompetitionVote
        ? Math.round(
            ((applicant.contributors?.reduce((acc, contributor) => acc + contributor.amount, 0) || 0) * 100) /
              (total || 1),
          )
        : Math.round(((applicant.funding?.communityFunding || 0) * 100) / (total || 1)),
      numberOfContributors: applicant.contributorsCount,
    }),
  )

  const maxPercentage = Math.max(...percentages.map((p) => p.percentage))

  return (
    <CardLayout noMobileBorder p={{ base: 0, lg: 5 }} w="full">
      <H2>{t('Grant distribution status')}</H2>
      {percentages.length > 0 && (
        <Box py={2}>
          {percentages
            .sort((a, b) => {
              return a.percentage < b.percentage ? 1 : -1
            })
            .map(({ project, percentage, numberOfContributors }, i) => (
              <Item
                key={project.id}
                bg={CHART_BAR_COLORS[i] || CHART_BAR_COLORS[4]}
                title={project.title}
                percentage={percentage}
                width={Math.trunc((percentage * 100) / maxPercentage)}
                numberOfContributors={numberOfContributors}
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
  percentage,
  numberOfContributors,
}: {
  bg?: string
  title: string
  width: number
  percentage: number
  numberOfContributors: number
}) => {
  return (
    <Box pt={1} alignItems="center" justifyContent="start" display="flex">
      <Box pr={3} maxWidth="330px" width="75%" display="flex" flexDirection="row" gap={5}>
        <Text isTruncated={true} whiteSpace="nowrap" fontWeight={500}>
          {title}
        </Text>
        <Text>
          <Text as="span" fontWeight={700}>
            {numberOfContributors}
          </Text>{' '}
          contributions
        </Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="start" flexGrow={1}>
        <ChartBar bg={bg} width={`${width}%`}>
          {percentage.toFixed(1)}%
        </ChartBar>
      </Box>
    </Box>
  )
}

const ChartBar = ({ width, bg, children }: Pick<BoxProps, 'width' | 'bg' | 'children'>) => (
  <Box width={width}>
    <Box display="flex" flexGrow={1} alignItems="center">
      <Box width="90%" height="16px" bg={bg} borderTopRightRadius="8px" borderBottomRightRadius="8px">
        &nbsp;
      </Box>
      <Text ml={2} fontSize="18px" fontWeight={700} overflowWrap="normal">
        {children}
      </Text>
    </Box>
  </Box>
)
