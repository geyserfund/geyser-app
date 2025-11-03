import { useTranslation } from 'react-i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { useAuthContext } from '../../../../../context'
import { GrantApplicant, GrantStatusEnum, VotingSystem } from '../../../../../types'
import { GrantApplicantCard } from '../components/GrantApplicantCard'
import { GrantItemTitle } from '../components/GrantItemTitle.tsx'

interface Props {
  applicants: Array<GrantApplicant>
  grantHasVoting?: boolean
  grantStatus: string
  title: string
  isClosed?: boolean
  isCompetitionVote: boolean
  votingSystem?: VotingSystem
  grantName: string
}

export const CommunityVoting = ({
  applicants,
  grantHasVoting,
  grantStatus,
  title,
  isClosed,
  isCompetitionVote,
  votingSystem,
  grantName,
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
        <GrantItemTitle>{t(title)}</GrantItemTitle>
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
              grantName={grantName}
            />
          )
        })}
      </CardLayout>
    </>
  )
}
