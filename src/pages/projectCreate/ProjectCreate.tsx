import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import {
  CreateProjectMutation,
  useCreateProjectMutation,
  useProjectByNameOrIdQuery,
  User,
  useUpdateProjectMutation,
} from '../../types'
import { useNotification } from '../../utils'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectForm } from './components/ProjectForm'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from './components/ProjectUnsavedModal'
import { useProjectForm } from './hooks/useProjectForm'
import { ProjectCreationVariables } from './types'

export const ProjectCreate = () => {
  const { t } = useTranslation()
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()

  const isEdit = Boolean(params.projectId)

  const { loading, data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const form = useProjectForm({
    isEdit,
    project: data?.project,
  })

  const [createProject, { loading: createLoading }] = useCreateProjectMutation({
    onCompleted({ createProject }) {
      if (createProject && createProject.owners[0]) {
        const newOwnershipInfo = [
          ...user.ownerOf,
          {
            project: createProject,
            owner: createProject.owners[0],
          },
        ] satisfies CreateProjectMutation['createProject']['owners'][number]['user']['ownerOf']

        setUser(
          (current) =>
            ({
              ...current,
              ownerOf: current.ownerOf
                ? [...current.ownerOf, newOwnershipInfo]
                : [newOwnershipInfo],
            } as User),
        )

        navigate(getPath('launchProjectDetails', createProject.id))
      }
    },
    onError(error) {
      toast({
        title: 'failed to create project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const [updateProject, { loading: updateLoading }] = useUpdateProjectMutation({
    onCompleted() {
      navigate(getPath('launchProjectDetails', params.projectId || ''))
    },
    onError(error) {
      toast({
        title: 'failed to update project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const onLeave = () =>
    navigate(
      params.projectId
        ? `${getPath('publicProjectLaunch')}/${params.projectId}`
        : getPath('publicProjectLaunch'),
    )

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const onBackClick = () => {
    if (form.formState.isDirty) {
      return unsavedModal.onOpen({
        onLeave,
      })
    }

    onLeave()
  }

  const onSubmit = ({ email, name, ...values }: ProjectCreationVariables) => {
    if (isEdit && data?.project) {
      updateProject({
        variables: {
          input: {
            projectId: Number(data.project.id),
            ...values,
          },
        },
      })
    } else {
      createProject({
        variables: {
          input: {
            ...values,
            name,
            email,
          },
        },
      })
    }
  }

  const nextProps = {
    isLoading: loading || createLoading || updateLoading,
    isDisabled: createLoading || updateLoading,
    onClick: form.handleSubmit(onSubmit),
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ProjectCreateLayout
        continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
        onBackClick={onBackClick}
        title={
          <TitleWithProgressBar
            title={t('Story')}
            subtitle={t('Create a project')}
            index={1}
            length={4}
          />
        }
      >
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <ProjectForm form={form} isEdit={isEdit} />
          <FormContinueButton width="100%" {...nextProps} />
        </VStack>
      </ProjectCreateLayout>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
