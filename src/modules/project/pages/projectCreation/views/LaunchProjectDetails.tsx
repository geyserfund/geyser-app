import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Country, ProjectCategory, ProjectCreationStep, ProjectSubCategory } from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useAuthContext } from '../../../../../context'
import { getPath } from '../../../../../shared/constants'
import { useModal } from '../../../../../shared/hooks'
import { ProjectForm } from '../../../forms/ProjectForm'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../../projectDashboard/common/ProjectUnsavedModal'
import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'
import { ProjectExitConfirmModal } from '../components/ProjectExitConfirmModal'
import { useUpdateProjectWithLastCreationStep } from '../hooks/useIsStepAhead.tsx'
import { useProjectForm } from '../hooks/useProjectForm'
import { ProjectCreationVariables } from '../hooks/useProjectForm.tsx'

export const LaunchProjectDetails = () => {
  const { t } = useTranslation()
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const toast = useNotification()

  const { queryCurrentUser } = useAuthContext()

  const isEdit = params.projectId ? params.projectId !== 'new' : false

  const { project, loading } = useProjectAtom()

  const exitModal = useModal()

  const form = useProjectForm({
    isEdit,
    project,
  })

  const { createProject, updateProject } = useProjectAPI()

  const { updateProjectWithLastCreationStep, loading: updateProjectLoading } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.ProjectDetails,
    // getPath('launchFundingStrategy', project.id), // TODO: uncomment when we release AON
    getPath('launchFundingGoal', project.id),
  )

  const onLeave = () => navigate(getPath('launchStart'))

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const onSubmit = async ({ category, subCategory, location, tags, ...values }: ProjectCreationVariables) => {
    console.log('checking is direty', form.formState.isDirty)

    if (isEdit && project.id) {
      const projectUpdates = !form.formState.isDirty
        ? {}
        : {
            projectId: Number(project.id),
            category: category as ProjectCategory,
            subCategory: subCategory as ProjectSubCategory,
            countryCode: location as Country['code'],
            tagIds: tags,
            ...values,
          }

      updateProjectWithLastCreationStep(projectUpdates, {
        onError(error) {
          toast.error({
            title: 'failed to update project',
            description: `${error}`,
          })
        },
      })
    } else {
      createProject.execute({
        variables: {
          input: {
            ...values,
            countryCode: location as Country['code'],
            category: category as ProjectCategory,
            subCategory: subCategory as ProjectSubCategory,
            tagIds: tags,
          },
        },
        onCompleted({ createProject }) {
          queryCurrentUser()
          updateProject.execute({
            variables: {
              input: {
                projectId: createProject.id,
                lastCreationStep: ProjectCreationStep.FundingType,
              },
            },
          })
          // navigate(getPath('launchFundingStrategy', createProject.id)) // TODO: uncomment when we release AON
          navigate(getPath('launchFundingGoal', createProject.id))
        },
        onError(error) {
          toast.error({
            title: 'failed to create project',
            description: `${error}`,
          })
        },
      })
    }
  }

  const continueProps = {
    isLoading: (isEdit && loading) || createProject.loading || updateProject.loading || updateProjectLoading,
    isDisabled: createProject.loading || updateProject.loading,
    type: 'submit' as const,
  }

  const onBackClick = () => {
    if (form.formState.isDirty) {
      return unsavedModal.onOpen({
        onLeave,
      })
    }

    onLeave()
  }

  const backButtonProps = {
    onClick: isEdit ? exitModal.onOpen : onBackClick,
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log(errors)
      })}
    >
      <ProjectCreationPageWrapper
        title={t('Project details')}
        continueButtonProps={continueProps}
        backButtonProps={backButtonProps}
      >
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <ProjectForm form={form} isEdit={isEdit} />
        </VStack>
      </ProjectCreationPageWrapper>

      <ProjectUnsavedModal {...unsavedModal} />
      <ProjectExitConfirmModal {...exitModal} onConfirm={onBackClick} />
    </form>
  )
}
