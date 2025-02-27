import { Box, Image, ListItem, Tag, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1, H3 } from '@/shared/components/typography'
import { MarkdownField } from '@/shared/markdown/MarkdownField'
import { validateImageUrl } from '@/shared/markdown/validations/image'

import { StatusLabel } from '../../../../components/ui/StatusLabel'
import { Tooltip } from '../../../../components/ui/Tooltip'
import { VideoPlayer } from '../../../../shared/molecules/VideoPlayer'
import { DistributionSystem, Grant, GrantType, VotingSystem } from '../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../utils'
import { ContributionsWidget } from '../../components/ContributionsWidget'
import {
  GRANT_STATUS_COUNTDOWN_TITLES,
  GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE,
  GRANT_STATUS_MAP,
  GrantHasVoting,
} from '../../constants'

const CUSTOM_VIDEO_URL = 'https://youtu.be/xemVDGbQwHs'

const GRANT_TYPE = {
  [GrantType.BoardVote]: 'Board-voting grant',
  [GrantType.CommunityVote]: 'Community-voting grant',
}

const GRANT_DISTRIBUTION_SYSTEM = {
  [DistributionSystem.Proportional]: 'Proportional',
  [DistributionSystem.WinnerTakeAll]: 'Winner-take-all',
}

export const DistributionSystemExplanation = {
  [DistributionSystem.Proportional]:
    'The funds are split among the projects proportionally to the number of votes received.',
  [DistributionSystem.WinnerTakeAll]: 'The funds are received by the project with the most number of votes received.',
}

export const GrantSummary = ({ grant, grantHasVoting }: { grant: Grant; grantHasVoting?: boolean }) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const votingEndDate = grant.statuses.find((s) => s.status === grant.status)?.endAt

  const renderImageOrVideo = () => {
    if (grant.name === 'grant-round-008') {
      return <VideoPlayer url={CUSTOM_VIDEO_URL} />
    }

    const isImage = validateImageUrl(grant.image)

    if (isImage) {
      return (
        <Box width="100%">
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            borderTopLeftRadius="6px"
            borderTopRightRadius="6px"
            alt="grant header image"
            src={grant.image || undefined}
          />
        </Box>
      )
    }

    if (grant.image && !isImage) {
      return <VideoPlayer url={grant.image} />
    }

    return null
  }

  const votingSystemTooltipContent = () => {
    if (grant.type === GrantType.BoardVote) {
      return null
    }

    if (grant?.__typename === 'CommunityVoteGrant' && grant.votingSystem === VotingSystem.OneToOne) {
      return (
        <VStack px={2} py={4} alignItems="flex-start" gap={2}>
          <Body>
            {t('This grant uses ')}
            <Body as="i">{t('Proportional Voting')}</Body>
            {t(' to enable more funding to go towards projects. This means:')}
          </Body>
          <UnorderedList mt={4} spacing={2}>
            <ListItem>
              <Body>{t('1 Sat = 1 Vote. Each Sat is one Vote.')}</Body>
            </ListItem>
            <ListItem>
              <Body>{t('You can send Sats to projects to multiple projects and multiple times')}</Body>
            </ListItem>
            <ListItem>
              <Body>{t('You can send Sats anonymously')}</Body>
            </ListItem>
          </UnorderedList>
        </VStack>
      )
    }

    if (grant?.__typename === 'CommunityVoteGrant' && grant.votingSystem === VotingSystem.StepLog_10) {
      return (
        <VStack px={2} py={4} alignItems="flex-start" gap={2}>
          <Body>
            {t('This grant uses ')}
            <Body as="i">{t('Incremental Voting')}</Body>
            {t(', to ensure that all votes can have an impact. It works like this:')}
          </Body>
          <UnorderedList mt={4} spacing={2}>
            <ListItem>
              <Body>{t('You can vote by sending Sats')}</Body>
            </ListItem>
            <ListItem>
              <Body>{t('You can vote multiple times and towards multiple projects')}</Body>
            </ListItem>
            <ListItem>
              <Body>
                {t('You can cast up to 3 votes per project based on the cumulative amounts sent to each project:')}
              </Body>
              <UnorderedList>
                <ListItem>
                  <Body> {t('From 1,000 to 9,999 sats = 1 vote')}</Body>
                </ListItem>
                <ListItem>
                  <Body> {t('From 10,000 to 99,999 sats = 2 votes')}</Body>
                </ListItem>
                <ListItem>
                  <Body> {t('Above 100k sats = 3 votes')}</Body>
                </ListItem>
              </UnorderedList>
            </ListItem>
          </UnorderedList>
        </VStack>
      )
    }
  }

  const contributions = () => {
    if (grant?.__typename === 'CommunityVoteGrant' && grant.votingSystem === VotingSystem.OneToOne) {
      return getShortAmountLabel(
        grant.applicants.reduce((prev, curr) => prev + (curr?.funding.communityFunding || 0), 0) || 0,
        true,
      )
    }

    if (grant?.__typename === 'CommunityVoteGrant' && grant.votingSystem === VotingSystem.StepLog_10) {
      return getShortAmountLabel(grant.votes?.voteCount || 0, true)
    }
  }

  return (
    <CardLayout noborder={isMobile} padding={{ base: 0, lg: 0 }}>
      {renderImageOrVideo()}
      <Box px={{ base: 0, lg: 5 }}>
        <Box pb={2}>
          <StatusLabel textTransform="uppercase">{t(GRANT_STATUS_MAP[grant.status])}</StatusLabel>
        </Box>

        <Box display="flex" flexDir={{ base: 'column', lg: 'row' }} width="100%" pt={2} justifyContent="space-between">
          <Box pt={2}>
            <H1 size="4xl" bold>
              {t(grant.title)}
            </H1>
          </Box>
        </Box>
        <Box pt={4}>
          <H3 size="lg" medium>
            {t(grant.shortDescription)}
          </H3>
          <Box pt={4}>
            <MarkdownField preview content={grant.description || ''} />
          </Box>
          <Box display="flex" gap={5} pt={4}>
            <Tooltip content={votingSystemTooltipContent()}>
              <Tag border="1px solid" borderColor="neutral.200" bg="neutral.50">
                {t(GRANT_TYPE[grant.type])}
              </Tag>
            </Tooltip>

            {grant?.__typename === 'CommunityVoteGrant' && grant.distributionSystem !== DistributionSystem.None && (
              <Tooltip content={DistributionSystemExplanation[grant.distributionSystem]}>
                <Tag border="1px solid" borderColor="neutral.200" bg="neutral.50">
                  {t(GRANT_DISTRIBUTION_SYSTEM[grant.distributionSystem])}
                </Tag>
              </Tooltip>
            )}
          </Box>
          <ContributionsWidget
            sponsors={grant.sponsors}
            endDateSubtitle={
              grantHasVoting
                ? t(GRANT_STATUS_COUNTDOWN_TITLES[grant.status])
                : t(GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE[grant.status])
            }
            endDateTimestamp={votingEndDate}
            balance={getShortAmountLabel(grant.balance || 0, true)}
            hasVoting={GrantHasVoting[grant.name]}
            contributions={contributions()}
            distributionSystem={
              grant?.__typename === 'CommunityVoteGrant' ? grant.distributionSystem : DistributionSystem.None
            }
            votingSystem={grant?.__typename === 'CommunityVoteGrant' ? grant.votingSystem : VotingSystem.OneToOne}
          />
        </Box>
      </Box>
    </CardLayout>
  )
}
