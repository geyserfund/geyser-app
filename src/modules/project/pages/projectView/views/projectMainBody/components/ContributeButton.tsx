import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BoltIcon } from '../../../../../../../components/icons'
import { PathName } from '../../../../../../../constants'
import { isActive, useMobileMode } from '../../../../../../../utils'
import { MobileViews, useProjectContext } from '../../../../../context'

export const ContributeButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project, setMobileView, goals } = useProjectContext()
  const isMobile = useMobileMode()

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  const isInProjectPage = location.pathname.includes(PathName.project) && project?.rewards?.length > 0

  return (
    <Button
      variant="primary"
      leftIcon={<BoltIcon />}
      onClick={() => {
        setMobileView(MobileViews.funding)
        if (isInProjectPage && !isMobile) {
          navigate(PathName.projectRewards)
        }

        goals.setProjectGoalId(null)
      }}
      isDisabled={isFundingDisabled}
      {...props}
    >
      {t('Contribute')}
    </Button>
  )
}
