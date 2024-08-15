import { HStack, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { Grant } from '@/types'
import { getShortAmountLabel } from '@/utils'

const GrantWidget = ({ grant }: { grant: Grant }) => {
  const votingStartDate = grant.statuses.find((s) => s.status === grant.status)?.startAt
  const isUpcomingGrant = votingStartDate > Date.now()

  const votingEndDate = grant.statuses.find((s) => s.status === grant.status)?.endAt

  if (isUpcomingGrant) {
    return <GrantInfo label="Starts on" value={new Date(votingStartDate || 0).toLocaleDateString()} />
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

const GrantInfo = ({ label, value, endDate = 0 }: { label: string; value?: string | number; endDate?: number }) => {
  return (
    <VStack alignItems="flex-start" spacing={0}>
      <Body fontSize="14px" color="neutralAlpha.11" medium>
        {label}
      </Body>
      {endDate ? (
        <LargeGrantCountdown endDate={endDate} />
      ) : (
        <Body fontSize="20px" medium>
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
      <Body fontSize="20px" medium>
        <span>{days}</span>
        <span>d</span>
      </Body>
      <Body fontSize="20px" medium>
        <span>{hours}</span>
        <span>h</span>{' '}
      </Body>
      <Body fontSize="20px" medium>
        <span>{minutes}</span>
        <span>m</span>
      </Body>
    </HStack>
  )
}
