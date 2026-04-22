import { Button, ButtonProps, Link } from '@chakra-ui/react'
// import { useAtomValue } from 'jotai'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { useProjectGrantApplicationsAPI } from '@/modules/project/API/useProjectGrantApplicationsAPI'
import { useBlockedProjectContribution } from '@/modules/project/hooks/useBlockedProjectContribution.ts'
// import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { VotingInfoModal } from '@/shared/molecules/VotingInfoModal'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { CommunityVoteGrant, GrantStatusEnum, VotingSystem } from '@/types'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

type ContributeButtonProps = ButtonProps & {
  isWidget?: boolean
  paymentMethods?: string[]
}

export const ContributeButton = ({ isWidget, paymentMethods, onClick, ...rest }: ContributeButtonProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const votingInfoModal = useModal()

  useProjectGrantApplicationsAPI(true)

  const { project } = useProjectAtom()
  const { isFundingDisabled } = useProjectToolkit(project)
  const { handleBlockedContribution } = useBlockedProjectContribution(project)

  if (!project) {
    return null
  }

  const communityVotingGrant =
    project?.grantApplications &&
    project.grantApplications.length > 0 &&
    (project.grantApplications.find(
      (application) =>
        application.grant.__typename === 'CommunityVoteGrant' &&
        application.grant.status === GrantStatusEnum.FundingOpen,
    )?.grant as CommunityVoteGrant)

  const isStepVoting = communityVotingGrant ? communityVotingGrant.votingSystem === VotingSystem.StepLog_10 : false

  const buttonProps = isWidget
    ? {
        as: Link,
        href: getFullDomainUrl(getPath('projectFunding', project.name)),
        isExternal: true,
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          if (handleBlockedContribution(event)) {
            return
          }

          onClick?.(event)
        },
      }
    : {
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          if (handleBlockedContribution(event)) {
            return
          }

          onClick?.(event)
          if (event.defaultPrevented) {
            return
          }

          if (communityVotingGrant && isStepVoting) {
            votingInfoModal.onOpen()
          } else {
            navigate(getPath('projectFunding', project.name))
          }
        },
      }

  return (
    <>
      {communityVotingGrant && isStepVoting && (
        <VotingInfoModal
          {...votingInfoModal}
          modalTitle={t('Project is part of a voting grant')}
          grantName={communityVotingGrant.title}
          votingSystem={VotingSystem.StepLog_10}
          project={project}
        />
      )}

      <Button
        size="lg"
        variant="solid"
        colorScheme="primary1"
        isDisabled={isFundingDisabled()}
        position="relative"
        sx={{
          transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
          '&:active:not(:disabled)': { transform: 'scale(0.96)' },
        }}
        {...rest}
        {...buttonProps}
      >
        {t('Contribute')}
      </Button>
    </>
  )
}
