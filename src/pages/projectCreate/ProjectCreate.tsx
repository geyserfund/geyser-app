import { VStack } from '@chakra-ui/react'
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
import { ProjectCreateForm } from './components/ProjectCreateForm'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from './components/ProjectUnsavedModal'
import { useProjectCreateForm } from './hooks/useProjectCreateForm'
import { ProjectCreationVariables } from './types'

export const ProjectCreate = () => {
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()

  const isEdit = Boolean(params.projectId)

  const { loading, data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const form = useProjectCreateForm({
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
        title: 'project creation failed!',
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
        title: 'project update failed!',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const navigateBack = () =>
    navigate(
      params.projectId
        ? `${getPath('publicProjectLaunch')}/${params.projectId}`
        : getPath('publicProjectLaunch'),
    )

  const unsavedModal = useProjectUnsavedModal({
    onLeave: navigateBack,
    hasUnsaved: form.formState.isDirty,
  })

  const onBackClick = () => {
    if (form.formState.isDirty) {
      return unsavedModal.onOpen()
    }

    navigateBack()
  }

  const handleNext = (values: ProjectCreationVariables) => {
    if (isEdit && data?.project) {
      updateProject({
        variables: {
          input: {
            projectId: Number(data.project.id),
            title: values.title,
            image: values.image || '',
            thumbnailImage: values.thumbnailImage || '',
            shortDescription: values.shortDescription,
            description: values.description,
          },
        },
      })
    } else {
      createProject({
        variables: {
          input: {
            ...values,
            email: user.email || values.email,
          },
        },
      })
    }
  }

  const onSubmit = form.handleSubmit(handleNext)

  const nextProps = {
    isLoading: loading || createLoading || updateLoading,
    isDisabled: createLoading || updateLoading,
    onClick: onSubmit,
  }

  return (
    <form onSubmit={onSubmit}>
      <ProjectCreateLayout
        continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
        onBackClick={onBackClick}
        title={
          <TitleWithProgressBar
            title="Project description"
            subtitle="Create a project"
            index={1}
            length={4}
          />
        }
      >
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <ProjectCreateForm form={form} isEdit={isEdit} />
          <FormContinueButton width="100%" {...nextProps} />
        </VStack>
      </ProjectCreateLayout>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
