import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { BoltIcon } from '../../../../../../../components/icons'
import { isActive } from '../../../../../../../utils'
import { useProjectAtom } from '../../../../../pages1/projectView/hooks/useProjectAtom'

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
