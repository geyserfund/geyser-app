import { Button, Container, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../../../components/ui/Loader'
import { Head } from '../../../config'
import { getPath } from '../../../constants'
import {
  GrantApplicant,
  GrantApplicantStatus,
  GrantStatusEnum,
  Maybe,
} from '../../../types'
import { useNotification } from '../../../utils'
import { GrantWinnerAnnouncement } from '../components'
import {
  GrantAnnouncements,
  GrantHasVoting,
  GrantProjectNameMap,
} from '../constants'
import { useGrant } from '../hooks/useGrant'
import { GrantsRoundOne } from './GrantsRoundOne'
import { GrantsRoundTwo } from './GrantsRoundTwo'
import { GrantContribute, GrantSummary } from './sections'
import {
  CommunityVoting,
  DistributionChart,
  GrantApply,
  MoreInfo,
} from './sections'
import { CommonBoardMembers } from './sections/CommonBoardMembers'

const PageContainer = ({
  children,
  image,
  title,
}: PropsWithChildren<{ image?: Maybe<string>; title?: string }>) => {
  return (
    <Container
      marginTop={{ base: '20px', lg: '40px' }}
      maxWidth="879px"
      px={{ base: '10px', lg: '20px' }}
    >
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

  const applicants: Array<GrantApplicant> =
    grant && grant.applicants
      ? (grant.applicants.filter((applicant) =>
          Boolean(
            applicant &&
              (applicant.status === GrantApplicantStatus.Accepted ||
                applicant.status === GrantApplicantStatus.Funded),
          ),
        ) as Array<GrantApplicant>)
      : []

  const fundingOpenStatus = grant.statuses.find(
    (s) => s.status === GrantStatusEnum.FundingOpen,
  )

  if (grant.name === 'grant-round-001') {
    return (
      <GrantsRoundOne
        fundingOpenEndDate={fundingOpenStatus?.endAt}
        fundingOpenStartDate={fundingOpenStatus?.startAt}
        applicants={applicants}
      />
    )
  }

  if (grant.name === 'grant-round-002') {
    return (
      <GrantsRoundTwo
        fundingOpenEndDate={fundingOpenStatus?.endAt}
        fundingOpenStartDate={fundingOpenStatus?.startAt}
        applicants={applicants}
      />
    )
  }

  const winnerAnnouncement = GrantAnnouncements[grant.name]

  const getTitle = () => {
    if (grant.status === GrantStatusEnum.Closed) {
      return t('Grant Winners!')
    }

    const defaultTitle = 'Let the Sats flow to your favorite projects.'

    if (grantHasVoting) {
      return `${defaultTitle} ${t('1 Sat = 1 vote.')}`
    }

    return defaultTitle
  }

  const grantHasVoting = GrantHasVoting[grant.name]
  const showCommunityVoting = grant.status !== GrantStatusEnum.ApplicationsOpen
  const showDistributionChart =
    grant.status !== GrantStatusEnum.ApplicationsOpen && grantHasVoting
  const showGrantApply = grant.status !== GrantStatusEnum.Closed

  const showBoardMembers =
    !GrantHasVoting[grant.name] && grant.boardMembers.length > 0

  return (
    <PageContainer title={t(grant.title)} image={grant.image}>
      <VStack w="full" spacing="30px" alignItems="start">
        <Button
          size="sm"
          bg="neutral.0"
          variant="outline"
          gap={2}
          onClick={() => navigate(getPath('grants'))}
          fontSize="sm"
        >
          <FaArrowLeft /> {t('See all Grants')}
        </Button>
        <GrantSummary grant={grant} grantHasVoting={grantHasVoting} />

        {showDistributionChart && <DistributionChart applicants={applicants} />}
        {winnerAnnouncement && (
          <GrantWinnerAnnouncement {...winnerAnnouncement} />
        )}
        {showCommunityVoting && (
          <CommunityVoting
            title={getTitle()}
            applicants={applicants}
            grantHasVoting={grantHasVoting}
            grantStatus={grant.status}
            fundingOpenEndDate={fundingOpenStatus?.endAt}
            fundingOpenStartDate={fundingOpenStatus?.startAt}
            isClosed={grant.status === GrantStatusEnum.Closed}
          />
        )}
        {showGrantApply && <GrantApply grant={grant} />}
        <GrantContribute
          grantProjectName={GrantProjectNameMap[grant.name]}
          grantTitle={grant.title}
          grantHasVoting={grantHasVoting}
        />
        {showBoardMembers && (
          <CommonBoardMembers members={grant.boardMembers} />
        )}
        <MoreInfo />
      </VStack>
    </PageContainer>
  )
}
