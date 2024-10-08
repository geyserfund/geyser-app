import { HStack, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { Grant, GrantStatusEnum } from '@/types'
import { getFormattedDate, getShortAmountLabel } from '@/utils'

const GrantWidget = ({ grant, compact = false }: { grant: Grant; compact?: boolean }) => {
  const { formatUsdAmount } = useCurrencyFormatter(true)

  const votingStartDate = grant.statuses.find((s) => s.status === GrantStatusEnum.FundingOpen)?.startAt
  const isUpcomingGrant = votingStartDate > Date.now()
  const isClosedGrant = grant.status === GrantStatusEnum.Closed

  const votingEndDate = grant.statuses.find((s) => s.status === GrantStatusEnum.Closed)?.startAt

  const grantPool = `${getShortAmountLabel(grant.balance, false, true)} Sats`
  const grantPoolUsd = `(${formatUsdAmount(grant.balance)})`

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
          <GrantInfo label={'Grant pool'} value={`${grantPool}`} suffix={grantPoolUsd} compact={compact} />
        )}
      </>
    )
  }

  return (
    <>
      <GrantInfo label={'Time left to vote'} endDate={votingEndDate || 0} />
      {grant.__typename === 'CommunityVoteGrant' && <GrantInfo label={'Votes'} value={grant.votes.voteCount} />}
      {grant.balance > 0 && <GrantInfo label={'Grant pool'} value={`${grantPool}`} suffix={grantPoolUsd} />}
    </>
  )
}

export default GrantWidget

const GrantInfo = ({
  label,
  value,
  suffix = '',
  endDate = 0,
  compact = false,
}: {
  label: string
  value?: string | number
  endDate?: number
  compact?: boolean
  suffix?: string
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
        {suffix && (
          <Body as="span" size={'xs'} muted medium>
            {suffix}
          </Body>
        )}
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
        <HStack>
          <Body size={{ base: 'lg', lg: 'xl' }} medium>
            {value}
          </Body>
          {suffix && (
            <Body as="span" size={{ base: 'lg', lg: 'xl' }} muted medium>
              {suffix}
            </Body>
          )}
        </HStack>
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
