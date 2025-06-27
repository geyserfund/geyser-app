import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Country, ProjectCategory, ProjectCreationStep, ProjectSubCategory } from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useAuthContext } from '../../../../../context'
import { getPath } from '../../../../../shared/constants'
import { useModal } from '../../../../../shared/hooks'
import { ProjectForm } from '../../../forms/ProjectForm'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../../projectDashboard/common/ProjectUnsavedModal'
import { ProjectExitConfirmModal } from '../components/ProjectExitConfirmModal'
import { useProjectForm } from '../hooks/useProjectForm'
import { ProjectCreationLayout } from '../Layouts/ProjectCreationLayout.tsx'
import { ProjectCreationVariables } from '../types'

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

  const onLeave = () =>
    navigate(params.projectId ? `${getPath('launchStartProject', params.projectId)}` : getPath('launchStart'))

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const onSubmit = async ({ category, subCategory, location, tags, ...values }: ProjectCreationVariables) => {
    console.log('checking is direty', form.formState.isDirty)

    if (isEdit && project.id) {
      if (!form.formState.isDirty) {
        navigate(getPath('launchFundingStrategy', project.id))
        return
      }

      updateProject.execute({
        variables: {
          input: {
            projectId: Number(project.id),
            category: category as ProjectCategory,
            subCategory: subCategory as ProjectSubCategory,
            countryCode: location as Country['code'],
            tagIds: tags,
            ...values,
          },
        },
        onCompleted({ updateProject }) {
          navigate(getPath('launchFundingStrategy', updateProject.id))
        },
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
          navigate(getPath('launchFundingStrategy', createProject.id))
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
    isLoading: (isEdit && loading) || createProject.loading || updateProject.loading,
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
      <ProjectCreationLayout
        title={t('Project details')}
        continueButtonProps={continueProps}
        backButtonProps={backButtonProps}
      >
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <ProjectForm form={form} isEdit={isEdit} />
        </VStack>
      </ProjectCreationLayout>

      <ProjectUnsavedModal {...unsavedModal} />
      <ProjectExitConfirmModal {...exitModal} onConfirm={onBackClick} />
    </form>
  )
}
