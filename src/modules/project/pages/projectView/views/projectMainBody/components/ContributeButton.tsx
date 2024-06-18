import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BoltIcon } from '../../../../../../../components/icons'
import { PathName } from '../../../../../../../constants'
import { useAuthContext } from '../../../../../../../context'
import { GrantApplicantStatus, GrantStatusEnum } from '../../../../../../../types'
import { isActive, useMobileMode } from '../../../../../../../utils'
import { MobileViews, useProjectContext } from '../../../../../context'
import { LoginToVoteModal } from './LoginToVoteModal'

export const ContributeButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project, setMobileView, goals } = useProjectContext()
  const { user, isLoggedIn } = useAuthContext()
  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  const isInProjectPage = location.pathname.includes(PathName.project) && project?.rewards?.length > 0

  const isProjectAcceptedInOpenCommunityVoteGrant = project.grantApplications.some(
    (application) =>
      application.status === GrantApplicantStatus.Accepted &&
      application.grant?.__typename === 'CommunityVoteGrant' &&
      application.grant.status === GrantStatusEnum.FundingOpen,
  )

  const handleContribute = () => {
    setMobileView(MobileViews.funding)
    if (isInProjectPage && !isMobile) {
      navigate(PathName.projectRewards)
    }

    goals.setProjectGoalId(null)
  }

  const handleBeforeContribute = () => {
    if ((!isLoggedIn || !user?.hasSocialAccount) && isProjectAcceptedInOpenCommunityVoteGrant) {
      onOpen()
    } else {
      handleContribute()
    }
  }

  return (
    <>
      <LoginToVoteModal isOpen={isOpen} onClose={onClose} onContribute={handleContribute} />
      <Button
        variant="primary"
        leftIcon={<BoltIcon />}
        onClick={handleBeforeContribute}
        isDisabled={isFundingDisabled}
        {...props}
      >
        {t('Contribute')}
      </Button>
    </>
  )
}
