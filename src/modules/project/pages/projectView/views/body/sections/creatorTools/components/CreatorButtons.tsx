import { useTranslation } from 'react-i18next'

import { isAllOrNothing, useMobileMode } from '@/utils'

import { getPath } from '../../../../../../../../../shared/constants'
import { ProjectStatus } from '../../../../../../../../../types'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { useGoalsModal } from '../../../../../hooks'
import { CreatorToolsImages } from '../constant.ts'
import { CreatorToolButton } from './CreatorToolButton.tsx'
import { PromoteProjectMenu } from './PromoteProjectMenu.tsx'

export const CreatorButtons = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()
  const isMobile = useMobileMode()

  const isAon = isAllOrNothing(project)

  const { onGoalModalOpen } = useGoalsModal()

  if (!isProjectOwner || (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status)))
    return null

  return (
    <>
      <CreatorToolButton
        emoji={CreatorToolsImages.product}
        label={t('Sell a product')}
        mobileLabel={t('Product')}
        to={getPath('projectRewardCreate', project?.name)}
      />

      {!isAon && (
        <CreatorToolButton
          emoji={CreatorToolsImages.goal}
          label={isMobile ? t('Goal') : t('Add a Goal')}
          mobileLabel={t('Goal')}
          onClick={() => onGoalModalOpen()}
        />
      )}

      <CreatorToolButton
        emoji={CreatorToolsImages.update}
        label={t('Write an update')}
        mobileLabel={t('Update')}
        to={getPath('projectPostCreate', project?.name)}
      />

      <PromoteProjectMenu projectName={project?.name} />
    </>
  )
}
