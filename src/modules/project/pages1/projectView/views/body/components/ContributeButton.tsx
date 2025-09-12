import { Button, ButtonProps, HStack, Image, Link } from '@chakra-ui/react'
// import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useProjectGrantApplicationsAPI } from '@/modules/project/API/useProjectGrantApplicationsAPI'
// import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { VotingInfoModal } from '@/shared/molecules/VotingInfoModal'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { CommunityVoteGrant, GrantStatusEnum, VotingSystem } from '@/types'

import { isActive, isPrelaunch } from '../../../../../../../utils'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

type ContributeButtonProps = ButtonProps & {
  isWidget?: boolean
  paymentMethods?: string[]
}

export const ContributeButton = ({ isWidget, paymentMethods, ...props }: ContributeButtonProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const votingInfoModal = useModal()

  useProjectGrantApplicationsAPI(true)

  const { project } = useProjectAtom()

  // const hasFundingLimitReached = useAtomValue(hasProjectFundingLimitReachedAtom)

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

  const isFundingDisabled = !isActive(project.status) && !isPrelaunch(project.status)

  const buttonProps = isWidget
    ? {
        as: Link,
        href: getFullDomainUrl(getPath('projectFunding', project.name)),
        isExternal: true,
      }
    : {
        onClick: () =>
          communityVotingGrant && isStepVoting
            ? votingInfoModal.onOpen()
            : navigate(getPath('projectFunding', project.name)),
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
        isDisabled={isFundingDisabled}
        position="relative"
        {...buttonProps}
        {...props}
      >
        {t('Contribute')}
        <HStack position="absolute" right="10px">
          {paymentMethods?.map((method) => (
            <Image src={method} alt={`${method} payment method image`} key={method} maxHeight="14px" />
          ))}
        </HStack>
      </Button>
    </>
  )
}
