import { HStack, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { Grant, GrantStatusEnum } from '@/types'
import { getFormattedDate, getShortAmountLabel } from '@/utils'

const GrantWidget = ({ grant, compact = false }: { grant: Grant; compact?: boolean }) => {
  const votingStartDate = grant.statuses.find((s) => s.status === grant.status)?.startAt
  const isUpcomingGrant = votingStartDate > Date.now()
  const isClosedGrant = grant.status === GrantStatusEnum.Closed

  const votingEndDate = grant.statuses.find((s) => s.status === grant.status)?.endAt

  if (isUpcomingGrant) {
    return <GrantInfo label="Starts on" value={getFormattedDate(votingStartDate || 0)} />
  }

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
        <Body fontSize={'12px'} color="neutralAlpha.9" medium>
          {label}:
        </Body>
        <Body fontSize={'12px'} bold>
          {value}
        </Body>
      </HStack>
    )
  }

  return (
    <VStack alignItems="flex-start" spacing={0}>
      <Body fontSize={{ base: '12px', lg: '14px' }} color="neutralAlpha.11" medium>
        {label}
      </Body>
      {endDate ? (
        <LargeGrantCountdown endDate={endDate} />
      ) : (
        <Body fontSize={{ base: '18px', lg: '20px' }} medium>
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
      <Body fontSize={{ base: '18px', lg: '20px' }} medium>
        <span>{days}</span>
        <span>d</span>
      </Body>
      <Body fontSize={{ base: '18px', lg: '20px' }} medium>
        <span>{hours}</span>
        <span>h</span>{' '}
      </Body>
      <Body fontSize={{ base: '18px', lg: '20px' }} medium>
        <span>{minutes}</span>
        <span>m</span>
      </Body>
    </HStack>
  )
}
