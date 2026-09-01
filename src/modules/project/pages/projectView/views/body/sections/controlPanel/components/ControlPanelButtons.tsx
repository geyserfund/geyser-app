import { useTranslation } from 'react-i18next'

import { isRecoverableGrantProject } from '@/modules/project/utils/isRecoverableGrantProject.ts'

import { ProjectStatus } from '../../../../../../../../../types/generated/graphql.ts'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { useWriteUpdateModal } from '../../../../../hooks/useWriteUpdateModal.ts'
import { ControlPanelImages } from '../constant.ts'
import { ControlPanelButton } from './ControlPanelButton.tsx'
import { PromoteProjectMenu } from './PromoteProjectMenu.tsx'

export const ControlPanelButtons = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()
  const { openWriteUpdateModal } = useWriteUpdateModal()

  const isRecoverableGrant = isRecoverableGrantProject(project)

  if (!isProjectOwner || (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status)))
    return null

  return (
    <>
      <ControlPanelButton
        emoji={ControlPanelImages.update}
        label={t('Write an update')}
        mobileLabel={t('Update')}
        onClick={() => openWriteUpdateModal()}
      />

      {!isRecoverableGrant && <PromoteProjectMenu projectName={project?.name} />}
    </>
  )
}
