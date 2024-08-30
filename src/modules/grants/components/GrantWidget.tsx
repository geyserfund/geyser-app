import { HStack, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { Grant, GrantStatusEnum } from '@/types'
import { getFormattedDate, getShortAmountLabel } from '@/utils'

const GrantWidget = ({ grant, compact = false }: { grant: Grant; compact?: boolean }) => {
  const votingStartDate = grant.statuses.find((s) => s.status === GrantStatusEnum.FundingOpen)?.startAt
  const isUpcomingGrant = votingStartDate > Date.now()
  const isClosedGrant = grant.status === GrantStatusEnum.Closed

  const votingEndDate = grant.statuses.find((s) => s.status === GrantStatusEnum.Closed)?.startAt

  if (isUpcomingGrant) {
    return <GrantInfo label="Starts on" value={getFormattedDate(votingStartDate || 0)} />
  }

  console.log('grant', grant)
  if (isClosedGrant) {
    return (
      <>
        <GrantInfo
          label="Lasted"
          value={`${getFormattedDate(votingStartDate || 0)} - ${getFormattedDate(votingEndDate || 0)}`}
          compact={compact}
        />
        {!compact && <GrantInfo label={'Applicants'} value={grant?.applicants?.length || 0} compact={compact} />}
        {grant.balance > 0 && (
          <GrantInfo label={'Grant pool'} value={`${getShortAmountLabel(grant.balance)} Sats`} compact={compact} />
        )}
      </>
    )
  }

  return (
    <>
      <GrantInfo label={'Time left to vote'} endDate={votingEndDate || 0} />
      {grant.__typename === 'CommunityVoteGrant' && <GrantInfo label={'Votes'} value={grant.votes.voteCount} />}
      <GrantInfo label={'Grant pool'} value={`${getShortAmountLabel(grant.balance)} Sats`} />
    </>
  )
}

export default GrantWidget

const GrantInfo = ({
  label,
  value,
  endDate = 0,
  compact = false,
}: {
  label: string
  value?: string | number
  endDate?: number
  compact?: boolean
}) => {
  if (compact) {
    return (
      <HStack alignItems="flex-start" spacing={1}>
        <Body size={'xs'} muted medium>
          {label}:
        </Body>
        <Body size={'xs'} bold>
          {value}
        </Body>
      </HStack>
    )
  }

  return (
    <VStack alignItems="flex-start" spacing={0}>
      <Body size={{ base: 'xs', lg: 'sm' }} muted medium>
        {label}
      </Body>
      {endDate ? (
        <LargeGrantCountdown endDate={endDate} />
      ) : (
        <Body size={{ base: 'lg', lg: 'xl' }} medium>
          {value}
        </Body>
      )}
    </VStack>
  )
}

export const LargeGrantCountdown = ({ endDate = 0 }: { endDate: number }) => {
  const { days, hours, minutes } = useCountdown(endDate)

  return (
    <HStack spacing={1} alignItems="flex-start">
      <Body size={{ base: 'lg', lg: 'xl' }} medium>
        <span>{days}</span>
        <span>d</span>
      </Body>
      <Body size={{ base: 'lg', lg: 'xl' }} medium>
        <span>{hours}</span>
        <span>h</span>{' '}
      </Body>
      <Body size={{ base: 'lg', lg: 'xl' }} medium>
        <span>{minutes}</span>
        <span>m</span>
      </Body>
    </HStack>
  )
}
