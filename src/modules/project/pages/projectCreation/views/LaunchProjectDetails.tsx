import { VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import { TextInputBox } from '@/components/ui'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { PromotionNetworkSettingsCard } from '@/modules/project/components/PromotionNetworkSettingsCard.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectCreationStep } from '@/types/index.ts'
import type { Country, CreateProjectInput, ProjectCategory, ProjectSubCategory, UpdateProjectInput } from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useAuthContext } from '../../../../../context'
import { FieldContainer } from '../../../../../shared/components/form/FieldContainer.tsx'
import { getPath } from '../../../../../shared/constants'
import { useModal } from '../../../../../shared/hooks'
import { projectCreationReferrerHeroIdAtom } from '../../../../../shared/state/projectReferralAtom.ts'
import { ProjectForm } from '../../../forms/ProjectForm'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../../projectDashboard/common/ProjectUnsavedModal'
import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'
import { ProjectCreationReferralCapture } from '../components/ProjectCreationReferralCapture.tsx'
import { ProjectExitConfirmModal } from '../components/ProjectExitConfirmModal'
import { useUpdateProjectWithLastCreationStep } from '../hooks/useIsStepAhead.tsx'
import { useProjectForm } from '../hooks/useProjectForm'
import type { ProjectCreationVariables } from '../hooks/useProjectForm.tsx'

export const LaunchProjectDetails = () => {
  const { t } = useTranslation()
  const params = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const toast = useNotification()
  const [projectReferrerHeroId, setProjectReferrerHeroId] = useAtom(projectCreationReferrerHeroIdAtom)

  const { queryCurrentUser } = useAuthContext()

  const isEdit = params.projectId ? params.projectId !== 'new' : false

  const { project, loading } = useProjectAtom()

  const exitModal = useModal()

  const form = useProjectForm({
    isEdit,
    project,
  })
  const referrerHeroId = form.watch('referrerHeroId')

  const { createProject, updateProject } = useProjectAPI()

  const { updateProjectWithLastCreationStep, loading: updateProjectLoading } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.ProjectDetails,
    getPath('launchFundingStrategy', project.id),
  )

  const onLeave = () => navigate(getPath('launchStart'))

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  useEffect(() => {
    if (isEdit) {
      return
    }

    if (!form.getValues('referrerHeroId') && projectReferrerHeroId) {
      form.setValue('referrerHeroId', projectReferrerHeroId, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      })
    }
  }, [form, isEdit, projectReferrerHeroId])

  useEffect(() => {
    if (isEdit) {
      return
    }

    const normalizedReferrerHeroId = referrerHeroId.trim() || null
    if (normalizedReferrerHeroId !== projectReferrerHeroId) {
      setProjectReferrerHeroId(normalizedReferrerHeroId)
    }
  }, [isEdit, projectReferrerHeroId, referrerHeroId, setProjectReferrerHeroId])

  const onSubmit = async ({
    category,
    subCategory,
    location,
    tags,
    referrerHeroId,
    ...values
  }: ProjectCreationVariables) => {
    const normalizedReferrerHeroId = referrerHeroId.trim() || undefined

    if (isEdit && project.id) {
      const projectUpdates: Omit<UpdateProjectInput, 'projectId'> | undefined = !form.formState.isDirty
        ? undefined
        : {
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
      const createProjectInput: CreateProjectInput = {
        ...values,
        countryCode: location as Country['code'],
        category: category as ProjectCategory,
        subCategory: subCategory as ProjectSubCategory,
        tagIds: tags,
        ...(normalizedReferrerHeroId ? { referrerHeroId: normalizedReferrerHeroId } : {}),
      }

      createProject.execute({
        variables: {
          input: createProjectInput,
        },
        onCompleted({ createProject }) {
          setProjectReferrerHeroId(null)
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
      <ProjectCreationReferralCapture />
      <ProjectCreationPageWrapper
        title={t('Project details')}
        continueButtonProps={continueProps}
        backButtonProps={backButtonProps}
      >
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <ProjectForm form={form} isEdit={isEdit} />
          {!isEdit ? (
            <FieldContainer
              title={t('Referral code')}
              subtitle={t('Optional. If someone referred you, enter their code here.')}
            >
              <TextInputBox
                name="referrerHeroId"
                onChange={(event) => {
                  form.setValue('referrerHeroId', event.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }}
                value={referrerHeroId}
                placeholder="Referral Hero ID"
              />
            </FieldContainer>
          ) : null}
          <PromotionNetworkSettingsCard
            promotionsEnabled={form.watch('promotionsEnabled')}
            onToggle={(isEnabled) =>
              form.setValue('promotionsEnabled', isEnabled, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />
        </VStack>
      </ProjectCreationPageWrapper>

      <ProjectUnsavedModal {...unsavedModal} />
      <ProjectExitConfirmModal {...exitModal} onConfirm={onBackClick} />
    </form>
  )
}
