import { VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { getPath, UserValidations } from '../../constants'
import { useAuthContext } from '../../context'
import {
  CreateProjectMutation,
  FormError,
  useCreateProjectMutation,
  useProjectByNameOrIdLazyQuery,
  User,
  useUpdateProjectMutation,
} from '../../types'
import { checkDiff, useNotification, validateEmail } from '../../utils'
import { FormContinueButton } from './components/FormContinueButton'
import {
  ProjectCreateForm,
  ProjectCreateFormValidation,
} from './components/ProjectCreateForm'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from './components/ProjectUnsavedModal'
import { ProjectCreationVariables } from './types'

const INITIAL_VALUES: ProjectCreationVariables = {
  title: '',
  shortDescription: '',
  description: '',
  image: '',
  thumbnailImage: '',
  email: '',
  name: '',
}

export const ProjectCreate = () => {
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()

  const isEditingExistingProject = Boolean(params.projectId)

  // @TODO: Figure a better way to type the form to reuse with the update flow
  const [form, setForm] = useState<any>(INITIAL_VALUES)

  const [formError, setFormError] = useState<
    FormError<ProjectCreationVariables>
  >({})

  const navigateBack = () => {
    navigate(
      params.projectId
        ? `${getPath('publicProjectLaunch')}/${params.projectId}`
        : getPath('publicProjectLaunch'),
    )
  }

  const onBackClick = () => {
    if (!data || !data.project || !params.projectId) {
      return unsavedModal.onOpen()
    }

    const diff = checkDiff(
      form,
      data.project,
      Object.keys(INITIAL_VALUES).filter(
        (v) => v !== 'email',
      ) as (keyof ProjectCreationVariables)[],
    )

    if (diff) {
      return unsavedModal.onOpen()
    }

    navigateBack()
  }

  const unsavedModal = useProjectUnsavedModal(navigateBack)

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

  const [getProjectById, { loading, data }] = useProjectByNameOrIdLazyQuery({
    variables: { where: { id: Number(params.projectId) } },
    onCompleted(data) {
      if (data && data.project) {
        setForm({
          title: data.project.title,
          name: data.project.name,
          image: data.project.image || '',
          thumbnailImage: data.project.thumbnailImage || '',
          shortDescription: data.project.shortDescription,
          description: data.project.description,
          email: user.email || '',
        })
      }
    },
  })

  const validateForm = useCallback(() => {
    let { errors, isValid } = ProjectCreateFormValidation(form)

    if (!form.email && !user.email) {
      errors.email = 'Email address is a required field.'
      isValid = false
    } else if (!user.email && !validateEmail(form.email)) {
      errors.email = 'Please enter a valid email address.'
      isValid = false
    } else if (form.email.length > UserValidations.email.maxLength) {
      errors.email = `Email address should be shorter than ${UserValidations.email.maxLength} characters.`
      isValid = false
    }

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }, [form, user.email])

  const handleNext = () => {
    if (validateForm()) {
      if (isEditingExistingProject && data?.project) {
        updateProject({
          variables: {
            input: {
              projectId: Number(data.project.id),
              title: form.title,
              image: form.image || '',
              thumbnailImage: form.thumbnailImage || '',
              shortDescription: form.shortDescription,
              description: form.description,
            },
          },
        })
      } else {
        createProject({
          variables: {
            input: {
              ...form,
              email: user.email || form.email,
            },
          },
        })
      }
    }
  }

  useEffect(() => {
    if (params.projectId) {
      getProjectById()
    }
  }, [getProjectById, params.projectId])

  const nextProps = {
    isLoading: loading || createLoading || updateLoading,
    isDisabled: createLoading || updateLoading,
    onClick: handleNext,
  }

  return (
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
        <ProjectCreateForm
          form={form}
          formError={formError}
          setForm={setForm}
          setFormError={setFormError}
        />
        <FormContinueButton width="100%" {...nextProps} />
      </VStack>

      <ProjectUnsavedModal {...unsavedModal} />
    </ProjectCreateLayout>
  )
}
