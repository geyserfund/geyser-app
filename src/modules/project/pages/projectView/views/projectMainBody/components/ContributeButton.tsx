import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { BoltIcon } from '../../../../../../../components/icons'
// import { PathName } from '../../../../../../../constants'
// import { useAuthContext } from '../../../../../../../context'
// import { GrantApplicantStatus, GrantStatusEnum } from '../../../../../../../types'
import {
  isActive,
  // useMobileMode
} from '../../../../../../../utils'
// import { MobileViews, useProjectContext } from '../../../../../context'
import {
  // useGoalsAtom,
  useProjectAtom,
} from '../../../../../hooks/useProjectAtom'
// import { LoginToVoteModal } from './LoginToVoteModal'

export const ContributeButton = (props: ButtonProps) => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  return (
    <Button
      variant="primary"
      leftIcon={<BoltIcon />}
      onClick={() => {
        // setMobileView(MobileViews.funding)
        // if (isInProjectPage && !isMobile) {
        //   navigate(PathName.projectRewards)
        // }
        // goals.setProjectGoalId(null)
      }}
      isDisabled={isFundingDisabled}
      {...props}
    >
      {t('Contribute')}
    </Button>
  )
}
