import { Box, Button, Container, Image } from '@chakra-ui/react'
import { PropsWithChildren, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { createUseStyles } from 'react-jss'
import { useNavigate, useParams } from 'react-router-dom'

import { Body1, H1, H3 } from '../../components/typography'
import Loader from '../../components/ui/Loader'
import { StatusLabel } from '../../components/ui/StatusLabel'
import { Head } from '../../config'
import {
  getPath,
  Grant3AnnouncementImageUrl,
  Grant3AnnouncementTwitterUrl,
} from '../../constants'
import {
  GrantApplicant,
  GrantApplicantStatus,
  GrantStatusEnum,
  Maybe,
} from '../../types'
import {
  getShortAmountLabel,
  useMobileMode,
  useNotification,
} from '../../utils'
import { GrantWinnerAnnouncement } from './components'
import { CommunityVoting } from './components/CommunityVoting'
import { ContributionsWidget } from './components/ContributionsWidget'
import { DistributionChart } from './components/DistributionChart'
import { MoreInfo } from './components/MoreInfo'
import { SectionCard } from './components/SectionCard'
import { GRANT_STATUS_MAP } from './constants'
import { GrantsRoundOne } from './GrantsRoundOne'
import { GrantsRoundTwo } from './GrantsRoundTwo'
import { useGrant } from './hooks/useGrant'

const useStyles = createUseStyles({
  container: {
    maxWidth: '879px',
  },
  imageContainer: {
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },
})

const PageContainer = ({
  children,
  image,
}: PropsWithChildren<{ image?: Maybe<string> }>) => {
  const classes = useStyles()
  return (
    <Container className={classes.container} px={6}>
      <Head image={image || ''} />
      {children}
    </Container>
  )
}

const GRANT_STATUS_COUNTDOWN_TITLES = {
  [GrantStatusEnum.ApplicationsOpen]: 'Countdown to grant going live',
  [GrantStatusEnum.FundingOpen]: 'Time left to vote',
  [GrantStatusEnum.Closed]: 'Time left to vote',
}

export const GrantPage = () => {
  const { toast } = useNotification()
  const { grantId } = useParams<{ grantId: string }>()
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const classes = useStyles()

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

  const votingEndDate = grant.statuses.find(
    (s) => s.status === grant.status,
  )?.endAt

  const canVote = grant.status === GrantStatusEnum.FundingOpen

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

  return (
    <PageContainer image={grant.image}>
      <Button
        mt={4}
        size="sm"
        bg="brand.bgWhite"
        variant="outline"
        gap={2}
        onClick={() => navigate(getPath('grants'))}
        fontSize="sm"
      >
        <FaArrowLeft /> See all Grants
      </Button>
      <SectionCard>
        {grant.image ? (
          <Box
            className={classes.imageContainer}
            height={isMobile ? '127px' : '291px'}
          >
            <Image
              className={classes.headerImage}
              alt="grant header image"
              src={grant.image}
            />
          </Box>
        ) : null}
        <Box p={5}>
          {isMobile ? null : (
            <Box pb={2}>
              <StatusLabel textTransform="uppercase">
                {GRANT_STATUS_MAP[grant.status]}
              </StatusLabel>
            </Box>
          )}
          <Box
            display="flex"
            flexDir={isMobile ? 'column' : 'row'}
            width="100%"
            pt={2}
            justifyContent="space-between"
          >
            <Box pt={2}>
              <H1>{grant.title}</H1>
            </Box>
          </Box>
          <Box pt={4}>
            <H3 fontSize="18px">{grant.shortDescription}</H3>
            <Body1 fontSize="16px" pt={4}>
              {grant.description}
            </Body1>
            <ContributionsWidget
              sponsors={grant.sponsors}
              endDateSubtitle={GRANT_STATUS_COUNTDOWN_TITLES[grant.status]}
              endDateTimestamp={votingEndDate}
              balance={getShortAmountLabel(grant.balance || 0, true)}
              contributions={getShortAmountLabel(
                grant.applicants.reduce(
                  (prev, curr) => prev + (curr?.funding.communityFunding || 0),
                  0,
                ) || 0,
                true,
              )}
            />
          </Box>
        </Box>
      </SectionCard>
      <DistributionChart applicants={applicants} />
      <GrantWinnerAnnouncement
        imageUrl={Grant3AnnouncementImageUrl}
        linkUrl={Grant3AnnouncementTwitterUrl}
      />
      <CommunityVoting
        title="Grant winners!"
        applicants={applicants}
        canVote={canVote}
        isClosed={true}
      />
      <MoreInfo />
    </PageContainer>
  )
}
