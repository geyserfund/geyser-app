import { useTranslation } from 'react-i18next'
import { PiPencilSimpleLine } from 'react-icons/pi'

import { isCircularGrantProject } from '@/modules/project/utils/isCircularGrantProject.ts'

import { ProjectStatus } from '../../../../../../../../../types/generated/graphql.ts'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { useWriteUpdateModal } from '../../../../../hooks/useWriteUpdateModal.ts'
import { ControlPanelButton } from './ControlPanelButton.tsx'
import { PromoteProjectMenu } from './PromoteProjectMenu.tsx'

export const ControlPanelButtons = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()
  const { openWriteUpdateModal } = useWriteUpdateModal()

  const isCircularGrant = isCircularGrantProject(project)

  if (!isProjectOwner || (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status)))
    return null

  return (
    <>
      <ControlPanelButton
        icon={PiPencilSimpleLine}
        label={t('Write an update')}
        mobileLabel={t('Update')}
        onClick={() => openWriteUpdateModal()}
      />

      {!isCircularGrant && <PromoteProjectMenu projectName={project?.name} />}
    </>
  )
}
