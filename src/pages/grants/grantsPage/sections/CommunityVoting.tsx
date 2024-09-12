import { useTranslation } from 'react-i18next'

import { H3 } from '@/shared/components/typography'

import { useAuthContext } from '../../../../context'
import { CardLayout } from '../../../../shared/components/layouts'
import { GrantApplicant, GrantStatusEnum, VotingSystem } from '../../../../types'
import { GrantApplicantCard } from '../components/GrantApplicantCard'

interface Props {
  applicants: Array<GrantApplicant>
  grantHasVoting?: boolean
  grantStatus: string
  title: string
  isClosed?: boolean
  isCompetitionVote: boolean
  votingSystem?: VotingSystem
}

export const CommunityVoting = ({
  applicants,
  grantHasVoting,
  grantStatus,
  title,
  isClosed,
  isCompetitionVote,
  votingSystem,
}: Props) => {
  const { t } = useTranslation()
  const { user, isLoggedIn } = useAuthContext()

  if (!applicants) {
    return null
  }

  let sortedApplicants = applicants

  if (user) {
    const userId = user.id
    const contributedApplicants: Array<GrantApplicant> = []
    const nonContributedApplicants: Array<GrantApplicant> = []

    applicants.forEach((applicant) => {
      const hasUserContributed = applicant.contributors.some((contributor) => contributor.user?.id === userId)
      if (hasUserContributed) {
        contributedApplicants.push(applicant)
      } else {
        nonContributedApplicants.push(applicant)
      }
    })

    sortedApplicants = [...contributedApplicants, ...nonContributedApplicants]
  }

  const canVote = grantHasVoting && grantStatus === GrantStatusEnum.FundingOpen

  return (
    <>
      <CardLayout noMobileBorder p={{ base: '10px', lg: '20px' }} spacing={{ base: '10px', lg: '20px' }} w="full">
        <H3 size="lg">{t(title)}</H3>
        {sortedApplicants.map(({ project, funding, contributors, contributorsCount, voteCount }) => {
          return (
            <GrantApplicantCard
              key={project.name}
              project={project}
              funding={funding}
              contributorsCount={contributorsCount}
              contributors={contributors || []}
              voteCount={voteCount}
              grantHasVoting={grantHasVoting || false}
              grantStatus={grantStatus as GrantStatusEnum}
              isLoggedIn={isLoggedIn}
              isClosed={isClosed || false}
              isCompetitionVote={isCompetitionVote || false}
              canVote={canVote || false}
              currentUser={user}
              votingSystem={votingSystem}
            />
          )
        })}
      </CardLayout>
    </>
  )
}
