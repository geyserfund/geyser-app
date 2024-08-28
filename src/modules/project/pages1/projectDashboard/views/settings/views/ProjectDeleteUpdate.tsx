import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiTrash } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { useProjectDeleteMutation } from '@/types'
import { useNotification } from '@/utils'

import { DeleteProjectModal } from '../../../common/DeleteProjectModal'

export type ProjectSettingsVariables = {
  email: string
}

export const ProjectDeleteUpdate = () => {
  const { t } = useTranslation()

  const toast = useNotification()
  const navigate = useNavigate()

  const { queryCurrentUser } = useAuthContext()

  const { project } = useProjectAtom()

  const deleteProjectModal = useModal()

  const [deleteProject, { loading: deleteLoading }] = useProjectDeleteMutation()

  const handleDeleteProject = () => {
    if (project && project.id && project.balance <= 0) {
      deleteProject({
        variables: {
          input: {
            projectId: project.id,
          },
        },
      })
        .then(() => {
          toast.success({
            title: 'Project updated successfully!',

            description: 'you will be redirected shortly...',
          })
          queryCurrentUser()
          deleteProjectModal.onClose()
          setTimeout(() => navigate('/'), 1500)
        })
        .catch(() => toast.error({ title: 'failed to delete project' }))
    }
  }

  if (!project) {
    return null
  }

  return (
    <>
      <CardLayout padding={4}>
        <Body medium>{t('Delete Project')}</Body>
        <Body light>
          {t(
            'Deleting a project will make the project unaccessible to you and others. You can delete a project only if it has received no contributions. This is to ensure transparency for those who have contributed towards the project.',
          )}
        </Body>
        <HStack w="full" justifyContent="end">
          <Button
            w={{ base: '100%', lg: 'auto' }}
            variant="soft"
            colorScheme="error"
            rightIcon={<PiTrash />}
            isDisabled={project.balance > 0}
            onClick={() => deleteProjectModal.onOpen()}
          >
            {t('Delete')}
          </Button>
        </HStack>
      </CardLayout>

      <DeleteProjectModal {...deleteProjectModal} isLoading={deleteLoading} onConfirm={() => handleDeleteProject()} />
    </>
  )
}
