import { Button, Container, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useEffect } from 'react'
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
import { CommunityVoting } from './sections/CommunityVoting'
import { DistributionChart } from './sections/DistributionChart'
import { GrantApply } from './sections/GrantApply'
import { MoreInfo } from './sections/MoreInfo'

const PageContainer = ({
  children,
  image,
  title,
}: PropsWithChildren<{ image?: Maybe<string>; title?: string }>) => {
  return (
    <Container
      marginTop={{ base: '20px', md: '40px' }}
      maxWidth="879px"
      px={{ base: '10px', md: '20px' }}
    >
      <Head title={title} image={image || ''} />
      {children}
    </Container>
  )
}

export const GrantPage = () => {
  const { toast } = useNotification()
  const { grantId } = useParams<{ grantId: string }>()
  const navigate = useNavigate()

  const { grant, loading, error } = useGrant(grantId)

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: 'Something went wrongg.',
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

  if (grant.name === 'grant-round-001') {
    return <GrantsRoundOne applicants={applicants} />
  }

  if (grant.name === 'grant-round-002') {
    return (
      <GrantsRoundTwo
        isLoading={loading}
        sponsors={grant.sponsors}
        applicants={applicants}
      />
    )
  }

  const canVote =
    GrantHasVoting[grant.name] && grant.status === GrantStatusEnum.FundingOpen

  const winnerAnnouncement = GrantAnnouncements[grant.name]

  const getTitle = () => {
    if (grant.status === GrantStatusEnum.Closed) {
      return 'Grant Winners!'
    }

    return ''
  }

  const showCommunityVoting = grant.status !== GrantStatusEnum.ApplicationsOpen
  const showDistributionChart =
    grant.status !== GrantStatusEnum.ApplicationsOpen

  const showGrantApply = grant.status !== GrantStatusEnum.Closed

  const fundingOpenStatus = grant.statuses.find(
    (s) => s.status === GrantStatusEnum.FundingOpen,
  )

  return (
    <PageContainer title={grant.title} image={grant.image}>
      <VStack w="full" spacing="30px" alignItems="start">
        <Button
          size="sm"
          bg="brand.bgWhite"
          variant="outline"
          gap={2}
          onClick={() => navigate(getPath('grants'))}
          fontSize="sm"
        >
          <FaArrowLeft /> See all Grants
        </Button>
        <GrantSummary grant={grant} />
        {showGrantApply && <GrantApply grant={grant} />}

        <GrantContribute grantProjectName={GrantProjectNameMap[grant.name]} />

        {showDistributionChart && <DistributionChart applicants={applicants} />}
        {winnerAnnouncement && (
          <GrantWinnerAnnouncement {...winnerAnnouncement} />
        )}
        {showCommunityVoting && (
          <CommunityVoting
            title={getTitle()}
            applicants={applicants}
            canVote={canVote}
            fundingOpenEndDate={fundingOpenStatus?.endAt}
            fundingOpenStartDate={fundingOpenStatus?.startAt}
            isClosed={grant.status === GrantStatusEnum.Closed}
          />
        )}
        <MoreInfo />
      </VStack>
    </PageContainer>
  )
}
