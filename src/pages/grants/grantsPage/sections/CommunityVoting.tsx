import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { ProjectFundingModal } from '../../../../modules/project/pages/projectFunding/components/ProjectFundingModal'
import { GrantApplicant, GrantStatusEnum } from '../../../../types'
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
}: Props) => {
  const { t } = useTranslation()
  const modalProps = useProjectFundingModal()

  if (!applicants) {
    return null
  }

  const canVote = grantHasVoting && grantStatus === GrantStatusEnum.FundingOpen

  return (
    <CardLayout noMobileBorder p={{ base: '10px', lg: '20px' }} spacing={{ base: '10px', lg: '20px' }} w="full">
      <H3 fontSize="18px">{t(title)}</H3>
      {applicants.map(({ project, funding, contributors, contributorsCount }) => {
        return (
          <GrantApplicantCard
            key={project.name}
            project={project}
            funding={funding}
            contributorsCount={contributorsCount}
            contributors={contributors || []}
            grantHasVoting={grantHasVoting || false}
            grantStatus={grantStatus as GrantStatusEnum}
            isClosed={isClosed || false}
            isCompetitionVote={isCompetitionVote || false}
            modalProps={modalProps}
            canVote={canVote || false}
          />
        )
      })}
      {modalProps.isOpen && <ProjectFundingModal {...modalProps} />}
    </CardLayout>
  )
}
