import { Box, Text } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { LiaVoteYeaSolid } from 'react-icons/lia'

import { centsToDollars, getShortAmountLabel } from '@/utils/index.ts'

import { BadgeIcon, ContributionsIcon, TimerIcon } from '../../../../../components/icons/index.tsx'
import { Countdown } from '../../../../../components/ui/Countdown.tsx'
import { primaryColorsLight } from '../../../../../shared/styles/index.ts'
import { Grant, VotingSystem } from '../../../../../types/index.ts'
import {
  GRANT_STATUS_COUNTDOWN_TITLES,
  GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE,
  GrantBalanceCurrency,
  GrantHasVoting,
} from '../../../constants.ts'
import { SponsorList } from './SponsorList'
import { WidgetItem } from './WidgetItem'

interface Props {
  grant: Grant
}

export const ContributionsWidget = ({ grant }: Props) => {
  const isSatoshi = !GrantBalanceCurrency[grant.name] || !(GrantBalanceCurrency[grant.name] === 'USDCENT')
  console.log(GrantBalanceCurrency[grant.name])

  const grantAmount = isSatoshi
    ? `${getShortAmountLabel(grant.balance, false, true)} sats`
    : `$${getShortAmountLabel(centsToDollars(grant.balance), false, true)}`

  const contributions = useMemo(() => {
    if (grant?.__typename === 'CommunityVoteGrant' && grant.votingSystem === VotingSystem.OneToOne) {
      return getShortAmountLabel(
        grant.applicants.reduce((prev, curr) => prev + (curr?.funding.communityFunding || 0), 0) || 0,
        true,
      )
    }

    if (grant?.__typename === 'CommunityVoteGrant' && grant.votingSystem === VotingSystem.StepLog_10) {
      return getShortAmountLabel(grant.votes?.voteCount || 0, true)
    }
  }, [grant])

  const endDateTimestamp = useMemo(() => grant.statuses.find((s) => s.status === grant.status)?.endAt, [grant])

  const hasVoting = GrantHasVoting[grant.name]

  const endDateSubtitle = hasVoting
    ? t(GRANT_STATUS_COUNTDOWN_TITLES[grant.status])
    : t(GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE[grant.status])

  const votingSystem = grant?.__typename === 'CommunityVoteGrant' ? grant.votingSystem : VotingSystem.OneToOne

  const isCommunityVoteGrant = grant?.__typename === 'CommunityVoteGrant'

  return (
    <Box borderRadius="8px" backgroundColor="neutral.100" pb={4} pt={2} my={4}>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={10}
        justifyContent={!isCommunityVoteGrant ? 'center' : 'space-around'}
      >
        <Box
          px={2}
          width={{ base: '100%', lg: 'auto' }}
          display="flex"
          alignItems="start"
          justifyContent="center"
          my={2}
        >
          <TimerIcon mt={1} mr={2} width="36px" height="100%" color="primary.500" />
          <WidgetItem isSatLogo={false} subtitle={endDateSubtitle}>
            <Countdown
              endDate={endDateTimestamp}
              sectionProps={{
                color: 'primary1.11',
                fontSize: '22px',
                fontWeight: 700,
              }}
              dividerProps={{
                color: 'neutral1.11',
                fontSize: '26px',
                fontWeight: 700,
              }}
            />
          </WidgetItem>
        </Box>

        <Box px={2} display="flex" alignItems="start" my={2}>
          <BadgeIcon mt={1} mr={2} width="36px" height="100%" color="primary.500" />
          <WidgetItem isSatLogo={false} subtitle={t('Grant amount')}>
            {grantAmount}
          </WidgetItem>
        </Box>

        {hasVoting && (
          <Box px={2} display="flex" alignItems="start" my={2}>
            {votingSystem === VotingSystem.OneToOne ? (
              <>
                <ContributionsIcon mt={1} mr={2} width="36px" height="100%" color="primary.500" />
                <WidgetItem subtitle={t('Sats sent')}>{contributions}</WidgetItem>
              </>
            ) : (
              <>
                <LiaVoteYeaSolid style={{ marginTop: 4, marginRight: 2 }} size={36} color={primaryColorsLight[500]} />
                <WidgetItem isSatLogo={false} subtitle={t('Votes sent')}>
                  {contributions}
                </WidgetItem>
              </>
            )}
          </Box>
        )}
      </Box>
      <Box mt={{ base: 1, lg: 4 }} display="flex" alignItems="center" justifyContent="center">
        <SponsorList sponsors={grant.sponsors}>
          <Text fontSize="18px">{t('Sponsored by')}</Text>
        </SponsorList>
      </Box>
    </Box>
  )
}
