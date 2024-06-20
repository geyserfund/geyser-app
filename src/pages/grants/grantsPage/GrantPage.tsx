/* eslint-disable complexity */
import { Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../../../components/ui/Loader'
import { Head } from '../../../config'
import { getPath } from '../../../constants'
import { useAuthContext } from '../../../context'
import {
  BoardVoteGrant,
  Grant,
  GrantApplicant,
  GrantApplicantStatus,
  GrantStatusEnum,
  GrantType,
  Maybe,
} from '../../../types'
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

const PageContainer = ({ children, image, title }: PropsWithChildren<{ image?: Maybe<string>; title?: string }>) => {
  return (
    <Container marginTop={{ base: 0, lg: '40px' }} maxWidth="879px" px={{ base: '0px', lg: '20px' }}>
      <Head title={title} image={image || ''} />
      {children}
    </Container>
  )
}

export const GrantPage = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { grantId } = useParams<{ grantId: string }>()
  const navigate = useNavigate()

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
    return (
      <PageContainer>
        <Loader paddingTop="20px" />
      </PageContainer>
    )
  }

  const userProjectIds = new Set(user.ownerOf.map((ownership) => ownership.project?.id))

  const applicants: Array<GrantApplicant> =
    grant && grant.applicants
      ? (grant.applicants
          .filter((applicant) =>
            Boolean(
              applicant &&
                (grant.status === GrantStatusEnum.Closed
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

  const fundingOpenStatus = grant.statuses.find((s) => s.status === GrantStatusEnum.FundingOpen)

  if (grant.name === 'grant-round-001') {
    return (
      <GrantsRoundOne
        fundingOpenEndDate={fundingOpenStatus?.endAt}
        fundingOpenStartDate={fundingOpenStatus?.startAt}
        applicants={applicants}
        isCompetitionVote={grant.type === GrantType.CommunityVote}
      />
    )
  }

  if (grant.name === 'grant-round-002') {
    return (
      <GrantsRoundTwo
        fundingOpenEndDate={fundingOpenStatus?.endAt}
        fundingOpenStartDate={fundingOpenStatus?.startAt}
        applicants={applicants}
        isCompetitionVote={grant.type === GrantType.CommunityVote}
      />
    )
  }

  const winnerAnnouncement = GrantAnnouncements[grant.name]

  const getTitle = () => {
    if (grant.status === GrantStatusEnum.Closed) {
      return t('Grant Winners!')
    }

    if (grant.type === GrantType.CommunityVote) {
      return t('Vote for your favorite projects with your Sats!')
    }

    const defaultTitle = 'Let the Sats flow to your favorite projects.'

    if (grantHasVoting) {
      return `${defaultTitle} ${t('1 Sat = 1 vote.')}`
    }

    return defaultTitle
  }

  const isBoardVoteGrant = (grant: Grant): grant is BoardVoteGrant => {
    return grant.__typename === 'BoardVoteGrant'
  }

  const grantHasVoting = GrantHasVoting[grant.name]
  const isCompetitionVote = grant.type === GrantType.CommunityVote
  const showCommunityVoting = grant.status !== GrantStatusEnum.ApplicationsOpen && applicants.length > 0
  const showDistributionChart = grant.status !== GrantStatusEnum.ApplicationsOpen && grantHasVoting
  const showGrantApply = grant.status !== GrantStatusEnum.Closed
  const showContributeToGrant = !isCompetitionVote && !NoContributionInGrant.includes(grant.name)

  const showBoardMembers = isBoardVoteGrant(grant) && grant.boardMembers.length > 0
  const showApplicationPending =
    (GrantHasVoting[grant.name] || showBoardMembers) &&
    (grant.status === GrantStatusEnum.ApplicationsOpen || grant.status === GrantStatusEnum.FundingOpen)

  return (
    <PageContainer title={t(grant.title)} image={grant.image}>
      <VStack w="full" spacing="15px" alignItems="start">
        <Button
          size="sm"
          bg="neutral.0"
          variant="outline"
          gap={3}
          onClick={() => navigate(getPath('grants'))}
          fontSize="sm"
          mx={'10px'}
          mt={'10px'}
        >
          <FaArrowLeft /> {t('See all Grants')}
        </Button>
        <GrantSummary grant={grant} grantHasVoting={grantHasVoting} />
        <MobileDivider />
        <Tabs variant="secondary" w="full">
          <TabList gap="30px">
            <Tab>
              <Text fontSize={'16px'}>{t('Projects')}</Text>
            </Tab>
            <Tab>
              <Text fontSize={'16px'}>{t('Leaderboard (All)')}</Text>
            </Tab>
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
                      fundingOpenEndDate={fundingOpenStatus?.endAt}
                      fundingOpenStartDate={fundingOpenStatus?.startAt}
                      isClosed={grant.status === GrantStatusEnum.Closed}
                      isCompetitionVote={isCompetitionVote}
                      votingSystem={grant.__typename === 'CommunityVoteGrant' ? grant.votingSystem : undefined}
                      grant={grant}
                    />
                    <MobileDivider />
                  </>
                )}
                {showGrantApply && !isCompetitionVote && (
                  <>
                    <GrantApply grant={grant} />
                    <MobileDivider />
                  </>
                )}

                {showApplicationPending && pendingApplicants.length > 0 && !isCompetitionVote && (
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
    </PageContainer>
  )
}
