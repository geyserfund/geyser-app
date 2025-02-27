/* eslint-disable complexity */
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useParams } from 'react-router-dom'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav/TopNavContainerBar'

import Loader from '../../../components/ui/Loader'
import { useAuthContext } from '../../../context'
import { dimensions, getPath } from '../../../shared/constants'
import { BoardVoteGrant, Grant, GrantApplicant, GrantApplicantStatus, GrantStatusEnum, GrantType } from '../../../types'
import { useNotification } from '../../../utils'
import { GrantWinnerAnnouncement, MobileDivider } from '../components'
import { GrantAnnouncements, GrantHasVoting, GrantProjectNameMap, NoContributionInGrant } from '../constants'
import { useGrant } from '../hooks/useGrant'
import { GrantsRoundOne } from './GrantsRoundOne'
import { GrantsRoundTwo } from './GrantsRoundTwo'
import { GrantContribute, GrantSummary } from './sections'
import { CommunityVoting, DistributionChart, GrantApply, MoreInfo } from './sections'
import { CommonBoardMembers } from './sections/CommonBoardMembers'
import { PendingApplications } from './sections/PendingApplications'

export const GrantPage = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { grantId } = useParams<{ grantId: string }>()

  const { grant, loading, error } = useGrant(grantId)

  const { user } = useAuthContext()

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
      })
    }
  }, [error, toast])

  if (loading || !grant) {
    return <Loader paddingTop="20px" />
  }

  const userProjectIds = new Set(user.ownerOf.map((ownership) => ownership.project?.id))

  const applicants: Array<GrantApplicant> =
    grant && grant.applicants
      ? (grant.applicants
          .filter((applicant) =>
            Boolean(
              applicant &&
                (grant.status === GrantStatusEnum.Closed && grant.type === GrantType.BoardVote
                  ? applicant.status === GrantApplicantStatus.Funded
                  : applicant.status === GrantApplicantStatus.Accepted ||
                    applicant.status === GrantApplicantStatus.Funded),
            ),
          )
          .sort(
            (a, b) => Number(userProjectIds.has(b.project.id)) - Number(userProjectIds.has(a.project.id)),
          ) as Array<GrantApplicant>)
      : []

  const pendingApplicants: Array<GrantApplicant> =
    grant && grant.applicants
      ? grant.applicants
          .filter((applicant) => applicant.status === GrantApplicantStatus.Pending)
          .sort((a, b) => Number(userProjectIds.has(b.project.id)) - Number(userProjectIds.has(a.project.id)))
      : []

  if (grant.name === 'grant-round-001') {
    return <GrantsRoundOne applicants={applicants} isCompetitionVote={grant.type === GrantType.CommunityVote} />
  }

  if (grant.name === 'grant-round-002') {
    return <GrantsRoundTwo applicants={applicants} isCompetitionVote={grant.type === GrantType.CommunityVote} />
  }

  const winnerAnnouncement = GrantAnnouncements[grant.name]

  const getTitle = () => {
    if (grant.status === GrantStatusEnum.Closed) {
      return t('Grant Winners!')
    }

    if (grant.type === GrantType.CommunityVote) {
      return t('Vote for your favorite projects with your Sats!')
    }

    if (grantHasVoting) {
      return `${t('Let the Sats flow to your favorite projects.')} ${t('1 Sat = 1 vote.')}`
    }

    return 'Applicants'
  }

  const isBoardVoteGrant = (grant: Grant): grant is BoardVoteGrant => {
    return grant.__typename === 'BoardVoteGrant'
  }

  const grantHasVoting = GrantHasVoting[grant.name]
  const isCompetitionVote = grant.type === GrantType.CommunityVote
  const showCommunityVoting = applicants.length > 0
  const showDistributionChart = grant.status !== GrantStatusEnum.ApplicationsOpen && grantHasVoting
  const showGrantApply = grant.status === GrantStatusEnum.ApplicationsOpen
  const showContributeToGrant = !isCompetitionVote && !NoContributionInGrant.includes(grant.name)

  const showBoardMembers = isBoardVoteGrant(grant) && grant.boardMembers.length > 0
  const showApplicationPending =
    (GrantHasVoting[grant.name] || showBoardMembers) &&
    (grant.status === GrantStatusEnum.ApplicationsOpen || grant.status === GrantStatusEnum.FundingOpen)

  return (
    <>
      <TopNavContainerBar>
        <Button
          as={Link}
          to={getPath('grants')}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('All Grants')}
        </Button>
      </TopNavContainerBar>

      <VStack
        paddingTop={{
          base: `${dimensions.topNavBar.mobile.height - 24}px`,
          lg: `${dimensions.topNavBar.desktop.height - 24}px`,
        }}
        w="full"
        spacing="15px"
        alignItems="center"
      >
        <GrantSummary grant={grant} grantHasVoting={grantHasVoting} />
        <MobileDivider />
        <Tabs variant="secondary" w="full">
          <TabList gap="30px">
            {grantHasVoting && !showGrantApply && (
              <>
                <Tab>
                  <Text fontSize={'16px'}>{t('Projects')}</Text>
                </Tab>

                <Tab>
                  <Text fontSize={'16px'}>{t('Leaderboard (All)')}</Text>
                </Tab>
              </>
            )}
          </TabList>
          <TabPanels>
            <TabPanel p={'16px 0px 16px 0px'}>
              <VStack w="full" spacing="15px" alignItems="start">
                {showDistributionChart && (
                  <>
                    <DistributionChart
                      applicants={applicants}
                      isCompetitionVote={isCompetitionVote}
                      showAll={false}
                      votingSystem={grant.__typename === 'CommunityVoteGrant' ? grant.votingSystem : undefined}
                      totalVotes={grant.__typename === 'CommunityVoteGrant' ? grant.votes?.voteCount : undefined}
                    />
                    <MobileDivider />
                  </>
                )}
                {winnerAnnouncement && (
                  <>
                    <GrantWinnerAnnouncement {...winnerAnnouncement} />
                    <MobileDivider />
                  </>
                )}
                {showCommunityVoting && (
                  <>
                    <CommunityVoting
                      title={getTitle()}
                      applicants={applicants}
                      grantHasVoting={grantHasVoting}
                      grantStatus={grant.status}
                      isClosed={grant.status === GrantStatusEnum.Closed}
                      isCompetitionVote={isCompetitionVote}
                      votingSystem={grant.__typename === 'CommunityVoteGrant' ? grant.votingSystem : undefined}
                    />
                    <MobileDivider />
                  </>
                )}
                {showGrantApply && (
                  <>
                    <GrantApply grant={grant} pendingApplicants={pendingApplicants} />
                    <MobileDivider />
                  </>
                )}

                {showApplicationPending && pendingApplicants.length > 0 && showGrantApply && (
                  <>
                    <PendingApplications applicants={pendingApplicants} />
                    <MobileDivider />
                  </>
                )}
              </VStack>
            </TabPanel>
            <TabPanel w="full" p={'16px 0px 16px 0px'}>
              <VStack w="full" spacing="15px" alignItems="start">
                <DistributionChart
                  applicants={applicants}
                  isCompetitionVote={isCompetitionVote}
                  votingSystem={grant.__typename === 'CommunityVoteGrant' ? grant.votingSystem : undefined}
                  totalVotes={grant.__typename === 'CommunityVoteGrant' ? grant.votes?.voteCount : undefined}
                />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {showContributeToGrant && (
          <>
            <GrantContribute
              grantProjectName={GrantProjectNameMap[grant.name]}
              grantTitle={grant.title}
              grantHasVoting={grantHasVoting}
            />

            <MobileDivider />
          </>
        )}

        {showBoardMembers && (
          <>
            <CommonBoardMembers members={grant.boardMembers} />
            <MobileDivider mt={'2'} />
          </>
        )}
        <MoreInfo />
      </VStack>
    </>
  )
}
