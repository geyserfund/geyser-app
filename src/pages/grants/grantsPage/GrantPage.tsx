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
import { GrantWinnerAnnouncement, MobileDivider } from '../components'
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
      marginTop={{ base: 0, lg: '40px' }}
      maxWidth="879px"
      px={{ base: '0px', lg: '20px' }}
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
      return 'Grant Winners!'
    }

    return ''
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
        <GrantSummary grant={grant} />
        <MobileDivider />
        {showDistributionChart && (
          <>
            <DistributionChart applicants={applicants} />
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
              title={t(getTitle())}
              applicants={applicants}
              grantHasVoting={grantHasVoting}
              grantStatus={grant.status}
              fundingOpenEndDate={fundingOpenStatus?.endAt}
              fundingOpenStartDate={fundingOpenStatus?.startAt}
              isClosed={grant.status === GrantStatusEnum.Closed}
            />
            <MobileDivider />
          </>
        )}
        {showGrantApply && (
          <>
            <GrantApply grant={grant} />
            <MobileDivider />
          </>
        )}
        <GrantContribute
          grantProjectName={GrantProjectNameMap[grant.name]}
          grantTitle={grant.title}
          grantHasVoting={grantHasVoting}
        />
        <MobileDivider />
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
