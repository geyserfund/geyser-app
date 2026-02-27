import { useTranslation } from 'react-i18next'

import { isAllOrNothing, useMobileMode } from '@/utils'

import { getPath } from '../../../../../../../../../shared/constants'
import { ProjectStatus } from '../../../../../../../../../types'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { useGoalsModal } from '../../../../../hooks'
import { ControlPanelImages } from '../constant.ts'
import { ControlPanelButton } from './ControlPanelButton.tsx'
import { PromoteProjectMenu } from './PromoteProjectMenu.tsx'

export const ControlPanelButtons = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()
  const isMobile = useMobileMode()

  const isAon = isAllOrNothing(project)

  const { onGoalModalOpen } = useGoalsModal()

  if (!isProjectOwner || (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status)))
    return null

  return (
    <>
      <ControlPanelButton
        emoji={ControlPanelImages.product}
        label={t('Sell a product')}
        mobileLabel={t('Product')}
        to={getPath('projectRewardCreate', project?.name)}
      />

      {!isAon && (
        <ControlPanelButton
          emoji={ControlPanelImages.goal}
          label={isMobile ? t('Goal') : t('Add a Goal')}
          mobileLabel={t('Goal')}
          onClick={() => onGoalModalOpen()}
        />
      )}

      <ControlPanelButton
        emoji={ControlPanelImages.update}
        label={t('Write an update')}
        mobileLabel={t('Update')}
        to={getPath('projectPostCreate', project?.name)}
      />

      <PromoteProjectMenu projectName={project?.name} />
    </>
  )
}
