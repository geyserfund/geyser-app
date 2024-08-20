import { Box, BoxProps, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Caption, H3 } from '../../../../components/typography'
import { CardLayout } from '../../../../shared/components/layouts'
import { getPath } from '../../../../shared/constants'
import { standardPadding } from '../../../../shared/styles'
import { GrantApplicant, VotingSystem } from '../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../utils'

const CHART_BAR_COLORS = ['primary.900', 'primary.700', 'primary.500', 'primary.400', 'primary.100']

interface Props {
  applicants: Array<GrantApplicant>
  isCompetitionVote: boolean
  showAll?: boolean
  votingSystem?: VotingSystem
  totalVotes?: number
}

export const DistributionChart = ({
  applicants,
  isCompetitionVote,
  showAll = true,
  votingSystem,
  totalVotes,
}: Props) => {
  const { t } = useTranslation()

  let total: number

  if (totalVotes) {
    total = totalVotes
  } else {
    total = applicants.reduce((prev, curr) => {
      return prev + (curr?.funding.communityFunding || 0)
    }, 0)
  }

  const percentages: Array<
    GrantApplicant & {
      percentage: number
      numberOfContributors: number
      communityFundingAmount: number
      votes: number
    }
  > = applicants.map((applicant) => {
    const value =
      votingSystem === VotingSystem.OneToOne ? applicant.funding?.communityFunding || 0 : applicant.voteCount || 0
    return {
      ...applicant,
      percentage: (value * 100) / (total || 1),
      numberOfContributors: applicant.contributorsCount,
      communityFundingAmount: applicant.funding.communityFunding,
      votes: applicant.voteCount,
    }
  })

  const sortedPercentages = percentages.sort((a, b) => b.percentage - a.percentage)
  const displayedPercentages = showAll ? sortedPercentages : sortedPercentages.slice(0, 5)

  const maxPercentage = Math.max(...displayedPercentages.map((p) => p.percentage))

  return (
    <CardLayout noMobileBorder p={standardPadding} w="full">
      <H3 fontSize={'18px'}>{t('Leaderboard')}</H3>
      {percentages.length > 0 && (
        <Box py={2}>
          {displayedPercentages.map(
            ({ project, percentage, numberOfContributors, communityFundingAmount, votes }, i) => (
              <Item
                key={project.id}
                bg={CHART_BAR_COLORS[i] || CHART_BAR_COLORS[4]}
                title={project.title}
                percentage={percentage}
                width={
                  votingSystem === VotingSystem.OneToOne
                    ? Math.trunc((percentage * 100) / maxPercentage)
                    : Math.trunc(percentage)
                }
                numberOfContributors={numberOfContributors}
                isCompetitionVote={isCompetitionVote}
                communityFundingAmount={communityFundingAmount}
                to={showAll ? getPath('project', project.name) : undefined}
                votingSystem={votingSystem}
                votes={votes}
              />
            ),
          )}
        </Box>
      )}
    </CardLayout>
  )
}

const Item = ({
  bg,
  title,
  width,
  to,
  votingSystem,
  votes,
  ...rest
}: {
  bg?: string
  title: string
  width: number
  percentage: number
  numberOfContributors: number
  isCompetitionVote: boolean
  communityFundingAmount: number
  to?: string | undefined
  votingSystem?: VotingSystem
  votes?: number
}) => {
  const itemContent = () => {
    return (
      <HStack pt={2} alignItems="center" justifyContent="start" spacing="10px">
        <HStack pr={1} width="120px">
          <Text isTruncated={true} whiteSpace="nowrap" fontWeight={500}>
            {title}
          </Text>
        </HStack>
        <Box display="flex" alignItems="center" justifyContent="start" flexGrow={1}>
          <ChartBar bg={bg} width={`${width}%`} {...rest} votingSystem={votingSystem} votes={votes} />
        </Box>
      </HStack>
    )
  }

  return to ? <Link to={to}>{itemContent()}</Link> : itemContent()
}

const ChartBar = ({
  width,
  bg,
  percentage,
  numberOfContributors,
  isCompetitionVote,
  communityFundingAmount,
  votingSystem,
  votes,
}: Pick<BoxProps, 'width' | 'bg'> & {
  percentage: number
  numberOfContributors: number
  isCompetitionVote: boolean
  communityFundingAmount: number
  votingSystem?: VotingSystem
  votes?: number
}) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const renderSats = ({ withParentheses }: { withParentheses: boolean }) => {
    return (
      <Caption fontSize={'12px'} bold color="neutral.9000">
        {withParentheses ? '(' : ''}
        {`${getShortAmountLabel(communityFundingAmount, true)} sats`}
        {withParentheses ? ')' : ''}
      </Caption>
    )
  }

  const votesOrVoters = votingSystem === VotingSystem.OneToOne ? numberOfContributors : votes

  const renderVotesOrVoters = ({ withParentheses }: { withParentheses: boolean }) => {
    return (
      <Caption fontSize={'12px'} bold color="neutral.600" isTruncated>
        {withParentheses ? '(' : ''}
        {votesOrVoters}{' '}
        {isCompetitionVote ? (votingSystem === VotingSystem.OneToOne ? t('voters') : t('votes')) : t('contributors')}
        {withParentheses ? ')' : ''}
      </Caption>
    )
  }

  return (
    <HStack width="100%" alignItems="center">
      <HStack
        p={'5px'}
        width={percentage > 0 ? `calc(${width})` : `calc(${width} - 190px)`}
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
        {votingSystem === VotingSystem.OneToOne
          ? renderSats({ withParentheses: false })
          : renderVotesOrVoters({ withParentheses: false })}
        {votingSystem === VotingSystem.OneToOne
          ? renderVotesOrVoters({ withParentheses: true })
          : renderSats({ withParentheses: true })}
      </HStack>
    </HStack>
  )
}
