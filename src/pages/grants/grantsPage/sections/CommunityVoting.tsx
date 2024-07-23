import { useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { AuthModal } from '../../../../components/molecules'
import { H3 } from '../../../../components/typography'
import { useAuthContext } from '../../../../context'
import { ProjectFundingModal } from '../../../../modules/project/pages/projectFunding/components/ProjectFundingModal'
import { Grant, GrantApplicant, GrantStatusEnum, VotingSystem } from '../../../../types'
import { GrantApplicantCard } from '../components/GrantApplicantCard'
import { useProjectFundingModal } from '../components/useProjectFundingModal'

interface Props {
  applicants: Array<GrantApplicant>
  grantHasVoting?: boolean
  grantStatus: string
  title: string
  isClosed?: boolean
  fundingOpenStartDate: number
  fundingOpenEndDate: number
  isCompetitionVote: boolean
  votingSystem?: VotingSystem
  grant?: Grant
}

export const CommunityVoting = ({
  fundingOpenStartDate,
  fundingOpenEndDate,
  applicants,
  grantHasVoting,
  grantStatus,
  title,
  isClosed,
  isCompetitionVote,
  votingSystem,
  grant,
}: Props) => {
  const { t } = useTranslation()
  const fundingModalProps = useProjectFundingModal()
  const { onOpen, onClose, isOpen } = useDisclosure()
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
        <H3 fontSize="18px">{t(title)}</H3>
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
              fundingModalProps={fundingModalProps}
              canVote={canVote || false}
              onOpenLoginModal={onOpen}
              currentUser={user}
              votingSystem={votingSystem}
            />
          )
        })}
        {fundingModalProps.isOpen && <ProjectFundingModal {...fundingModalProps} grant={grant} />}

        <AuthModal
          title={t('Login to vote')}
          description={t('You need to login to vote for this community voting grant. ')}
          isOpen={isOpen}
          onClose={onClose}
          showLightning={false}
        />
      </CardLayout>
    </>
  )
}
