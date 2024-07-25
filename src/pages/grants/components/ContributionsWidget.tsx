import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LiaVoteYeaSolid } from 'react-icons/lia'

import { BadgeIcon, ContributionsIcon, TimerIcon } from '../../../components/icons'
import { Countdown } from '../../../components/ui/Countdown'
import { fonts, primaryColorsLight } from '../../../styles'
import { DistributionSystem, Maybe, Sponsor, VotingSystem } from '../../../types'
import { SponsorList } from './SponsorList'
import { WidgetItem } from './WidgetItem'

interface Props {
  grantId?: string
  sponsors?: Maybe<Sponsor>[]
  balance?: string
  contributions?: string
  endDateSubtitle: string
  endDateTimestamp: number
  hasVoting?: boolean
  distributionSystem: DistributionSystem
  votingSystem: VotingSystem
}

const NASHVILLE_GRANT_END_DATE = 1722018600000

export const ContributionsWidget = ({
  grantId,
  sponsors,
  balance,
  contributions,
  endDateTimestamp,
  endDateSubtitle,
  hasVoting,
  distributionSystem,
  votingSystem,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Box borderRadius="8px" backgroundColor="neutral.100" pb={4} pt={2} my={4}>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={10}
        justifyContent={distributionSystem === DistributionSystem.None ? 'center' : 'space-around'}
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
              endDate={grantId === '10' ? NASHVILLE_GRANT_END_DATE : endDateTimestamp}
              sectionProps={{
                color: 'primary.500',
                fontSize: '22px',
                fontWeight: 700,
                fontFamily: fonts.livvic,
              }}
              dividerProps={{
                color: 'neutral.500',
                fontSize: '26px',
                fontWeight: 700,
                fontFamily: fonts.livvic,
              }}
            />
          </WidgetItem>
        </Box>
        {distributionSystem !== DistributionSystem.None && (
          <Box px={2} display="flex" alignItems="start" my={2}>
            <BadgeIcon mt={1} mr={2} width="36px" height="100%" color="primary.500" />
            <WidgetItem subtitle={t('Grant amount')}>{balance}</WidgetItem>
          </Box>
        )}
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
        <SponsorList sponsors={sponsors}>
          <Text fontSize="18px">{t('Sponsored by')}</Text>
        </SponsorList>
      </Box>
    </Box>
  )
}
