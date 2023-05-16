import { useLazyQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useNavigate, useParams } from 'react-router'

import { Body2 } from '../../../components/typography'
import { ButtonComponent, TextInputBox } from '../../../components/ui'
import { getPath } from '../../../constants'
import { UserValidations } from '../../../constants/validations'
import { useAuthContext } from '../../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import { FormError } from '../../../types'
import {
  CreateProjectMutation,
  Project,
  useCreateProjectMutation,
  User,
  useUpdateProjectMutation,
} from '../../../types/generated/graphql'
import { toInt, useNotification, validateEmail } from '../../../utils'
import {
  ProjectCreateForm,
  ProjectCreateFormValidation,
} from './components/ProjectCreateForm'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectFundraisingDeadline } from './components/ProjectFundraisingDeadline'
import { ProjectPreviewComponent } from './components/ProjectPreviewComponent'
import { ProjectCreationVariables } from './types'

const useStyles = createUseStyles({
  backIcon: {
    fontSize: '25px',
  },
  rowItem: {
    width: '100%',
    alignItems: 'flex-start',
  },
})

export const ProjectCreate = () => {
  const classes = useStyles()

  const params = useParams<{ projectId: string }>()
  const isEditingExistingProject = Boolean(params.projectId)

  const navigate = useNavigate()
  const { toast } = useNotification()

  const { user, setUser } = useAuthContext()

  const [form, setForm] = useState<ProjectCreationVariables>({
    title: '',
    shortDescription: '',
    description: '',
    image: '',
    thumbnailImage: '',
    email: '',
    name: '',
  })

  const [formError, setFormError] = useState<
    FormError<ProjectCreationVariables>
  >({})

  const [createProject, { loading: createLoading }] = useCreateProjectMutation({
    onCompleted({ createProject: createdProject }) {
      if (createdProject && createdProject.owners[0]) {
        const newOwnershipInfo = [
          ...user.ownerOf,
          {
            project: createdProject,
            owner: createdProject.owners[0],
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

        navigate(getPath('launchProjectDetails', createdProject.id))
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

  const [getProjectById, { loading, data }] = useLazyQuery<{
    project: Project
  }>(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { id: toInt(params.projectId) } },
    onCompleted(data) {
      if (data && data.project) {
        setForm({
          title: data.project.title,
          name: data.project.name,
          image: `${data.project.image}`,
          thumbnailImage: `${data.project.thumbnailImage}`,
          shortDescription: data.project.shortDescription,
          description: data.project.description,
          email: user.email || '',
        })
      }
    },
  })

  useEffect(() => {
    if (params.projectId) {
      getProjectById()
    }
  }, [getProjectById, params.projectId])

  const handleNextButtonTapped = () => {
    const isValid = validateForm()
    if (isValid) {
      if (isEditingExistingProject && data?.project) {
        updateProject({
          variables: {
            input: {
              projectId: toInt(data.project.id),
              title: form.title,
              image: `${form.image}`,
              thumbnailImage: `${form.thumbnailImage}`,
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

  const validateForm = () => {
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
  }

  const handleBack = () => {
    navigate(getPath('publicProjectLaunch'))
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: event.target.value })
  }

  return (
    <ProjectCreateLayout
      handleBack={handleBack}
      sideView={<ProjectPreviewComponent data={form} />}
      title="Project details"
      subtitle="Step 1 of 3"
      percentage={33}
    >
      <VStack width="100%" alignItems="flex-start" spacing="24px">
        <ProjectCreateForm
          form={form}
          formError={formError}
          setForm={setForm}
          setFormError={setFormError}
        />
        <ProjectFundraisingDeadline form={form} setForm={setForm} />

        <VStack className={classes.rowItem} spacing="5px">
          <Body2>Project E-mail</Body2>
          <TextInputBox
            name="email"
            value={user.email || form.email}
            onChange={handleEmail}
            error={formError.email}
            isDisabled={Boolean(user.email)}
          />
        </VStack>
        <ButtonComponent
          isLoading={loading || createLoading || updateLoading}
          primary
          w="full"
          onClick={handleNextButtonTapped}
          isDisabled={createLoading || updateLoading}
        >
          Next
        </ButtonComponent>
      </VStack>
    </ProjectCreateLayout>
  )
}
