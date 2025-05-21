/* eslint-disable complexity */
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

import { useBTCConverter } from '@/helpers'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import {
  CreateProjectRewardInput,
  PrivateCommentPrompt,
  ProjectRewardFragment,
  RewardCurrency,
  Satoshis,
  UpdateProjectRewardInput,
  USDCents,
  useProjectRewardCurrencyUpdateMutation,
  useProjectRewardGetQuery,
  useRewardCategoriesQuery,
} from '@/types'
import { useNotification } from '@/utils'

export type RewardFormValues = Omit<ProjectRewardFragment, 'id' | 'sold' | 'createdAt'>

const MAX_REWARD_IMAGES = 5

const rewardFormSchema = () =>
  yup.object({
    name: yup.string().required('Name is required').max(50, 'Name must be at most 50 characters long'),
    description: yup.string().max(1200, 'Description must be at most 1200 characters long'),
    shortDescription: yup.string().max(250, 'Short Description must be at most 250 characters long'),
    cost: yup
      .number()
      .typeError('Price is required')
      .required('Price is required')
      .min(0.01, 'Price must be greater than 0'),
    images: yup.array().of(yup.string()).max(MAX_REWARD_IMAGES, `Maximum ${MAX_REWARD_IMAGES} images allowed`),
    hasShipping: yup.boolean(),
    isAddon: yup.boolean(),
    isHidden: yup.boolean(),
    category: yup.string().nullable(),
    preOrder: yup.boolean(),
    rewardCurrency: yup.string(),
    estimatedDeliveryInWeeks: yup.number().nullable().min(0, 'Delivery time must be greater than or equal to 0'),
    confirmationMessage: yup
      .string()
      .max(500, ({ value }) => `${value.length}/500 - Confirmation message must not be longer than 500 characters`),
    privateCommentPrompts: yup.array().of(yup.string()),
  }) as any

type UseProjectRewardFormProps = {
  rewardUUID?: string
  isUpdate?: boolean
  isLaunch?: boolean
  defaultCategory?: string | null
}

export const useProjectRewardForm = ({
  rewardUUID,
  isUpdate,
  isLaunch,
  defaultCategory = null,
}: UseProjectRewardFormProps) => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { loading: rewardLoading, data } = useProjectRewardGetQuery({
    skip: !rewardUUID,
    variables: {
      input: {
        where: {
          uuid: rewardUUID,
        },
      },
    },
  })

  const rewardData = data?.projectRewardGet

  const { createReward, updateReward } = useProjectRewardsAPI()

  const { project, projectOwner, partialUpdateProject } = useProjectAtom()

  const [pendingCurrency, setPendingCurrency] = useState<RewardCurrency | null>(null)
  const projectCurrency = project?.rewardCurrency || RewardCurrency.Usdcent

  const {
    isOpen: isCurrencyChangeModalOpen,
    onClose: closeCurrencyChangeModal,
    onOpen: openCurrencyChangeModal,
  } = useModal()

  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const soldAmount = rewardData?.sold || 0

  const { control, handleSubmit, reset, watch, formState, setValue, trigger } = useForm<RewardFormValues>({
    resolver: yupResolver(rewardFormSchema()),
    defaultValues: {
      uuid: rewardData?.uuid || '',
      name: rewardData?.name || '',
      description: rewardData?.description || '',
      shortDescription: rewardData?.shortDescription || '',
      cost: rewardData?.cost || 0,
      maxClaimable: rewardData?.maxClaimable || null,
      images: rewardData?.images || [],
      hasShipping: rewardData?.hasShipping || false,
      isAddon: rewardData?.isAddon || false,
      isHidden: rewardData?.isHidden || false,
      category: rewardData?.category || defaultCategory || null,
      preOrder: rewardData?.preOrder || false,
      estimatedAvailabilityDate: rewardData?.estimatedAvailabilityDate || null,
      estimatedDeliveryInWeeks: rewardData?.estimatedDeliveryInWeeks || null,
      privateCommentPrompts: rewardData?.privateCommentPrompts || [],
      confirmationMessage: rewardData?.confirmationMessage || '',
      rewardCurrency: projectCurrency,
    },
    mode: 'onChange',
  })

  const { errors, isDirty, isValid, defaultValues } = formState

  const enableSubmit = isDirty && isValid

  const formLoaded = rewardUUID
    ? Boolean(!rewardLoading && rewardData?.uuid && defaultValues?.uuid === rewardData.uuid)
    : true

  // Fetch reward categories
  const { loading: isRewardCategoriesLoading, data: rewardCategoriesData } = useRewardCategoriesQuery()

  const rewardCategories =
    rewardCategoriesData?.projectRewardCategoriesGet.map((category: string) => ({
      label: category,
      value: category,
    })) || []

  useEffect(() => {
    if (isUpdate) {
      reset({
        uuid: rewardData?.uuid || '',
        name: rewardData?.name || '',
        description: rewardData?.description || '',
        shortDescription: rewardData?.shortDescription || '',
        cost: rewardData?.cost || 0,
        maxClaimable: rewardData?.maxClaimable || undefined,
        images: rewardData?.images || [],
        hasShipping: rewardData?.hasShipping || false,
        isAddon: rewardData?.isAddon || false,
        isHidden: rewardData?.isHidden || false,
        category: rewardData?.category || null,
        preOrder: rewardData?.preOrder || false,
        estimatedAvailabilityDate: rewardData?.estimatedAvailabilityDate || null,
        estimatedDeliveryInWeeks: rewardData?.estimatedDeliveryInWeeks || null,
        privateCommentPrompts: rewardData?.privateCommentPrompts || [],
        confirmationMessage: rewardData?.confirmationMessage || '',
        rewardCurrency: projectCurrency,
      })
    }
  }, [rewardData, reset, projectCurrency, isUpdate])

  const onSubmit = (formData: RewardFormValues) => {
    const commonData = {
      name: formData.name.trim(),
      description: formData.description,
      shortDescription: formData.shortDescription,
      cost: formData.cost,
      maxClaimable: formData.maxClaimable ? Number(formData.maxClaimable) : undefined,
      images: formData.images,
      hasShipping: formData.hasShipping,
      isAddon: formData.isAddon,
      isHidden: formData.isHidden,
      category: formData.category || null,
      preOrder: formData.preOrder,
      estimatedAvailabilityDate: formData.estimatedAvailabilityDate?.valueOf(),
      estimatedDeliveryInWeeks: formData.estimatedDeliveryInWeeks,
      privateCommentPrompts: formData.privateCommentPrompts,
      confirmationMessage: formData.confirmationMessage,
    }

    if (isUpdate) {
      const updateInput: UpdateProjectRewardInput = {
        projectRewardId: rewardData?.id,
        ...commonData,
      }

      updateReward.execute({
        variables: { input: updateInput },
        onCompleted(data) {
          reset()
          toast.success({
            title: 'Successfully updated!',
            description: `Product ${data.projectRewardUpdate.name} was successfully updated`,
          })
          if (isLaunch) {
            navigate(-1)
          } else {
            navigate(getPath('projectRewardView', project.name, data.projectRewardUpdate.uuid))
          }
        },
        onError(error) {
          toast.error({
            title: 'Failed to update product',
            description: `${error}`,
          })
        },
      })
    } else {
      const createInput: CreateProjectRewardInput = {
        projectId: project?.id,
        ...commonData,
      }

      createReward.execute({
        variables: { input: createInput },
        onCompleted(data) {
          reset()
          toast.success({ title: 'Successfully created project product!' })
          if (isLaunch) {
            navigate(-1)
          } else {
            navigate(getPath('projectRewardView', project.name, data.projectRewardCreate.uuid))
          }
        },
        onError(error) {
          toast.error({
            title: 'Failed to create product',
            description: `${error}`,
          })
        },
      })
    }
  }

  const [updateProjectCurrencyMutation] = useProjectRewardCurrencyUpdateMutation({
    onCompleted(data) {
      // Update the project reward currency
      partialUpdateProject({ rewardCurrency: pendingCurrency })

      // Update the form values
      const newReward = data.projectRewardCurrencyUpdate.find(
        (newRewards) => newRewards.name === watch('name'),
      ) as ProjectRewardFragment

      if (newReward) {
        reset({
          ...newReward,
          cost: newReward.cost,
        })
      } else {
        const currentCost = watch('cost')
        const newCost =
          pendingCurrency === RewardCurrency.Usdcent
            ? getUSDAmount(currentCost as Satoshis)
            : getSatoshisFromUSDCents((currentCost * 100) as USDCents)
        setValue('cost', newCost)
      }

      toast.success({
        title: 'Project updated successfully!',
      })
    },
    onError(error) {
      setPendingCurrency(pendingCurrency === RewardCurrency.Usdcent ? RewardCurrency.Btcsat : RewardCurrency.Usdcent)
      toast.error({
        title: 'Failed to update project',
        description: `${error}`,
      })
    },
  })

  const handleCurrencySelectChange = (value: string) => {
    const newCurrency = value as RewardCurrency
    setPendingCurrency(newCurrency)

    // Prevent the update from being triggered - set the pending currency instead
    const initialCurrency = newCurrency === RewardCurrency.Usdcent ? RewardCurrency.Btcsat : RewardCurrency.Usdcent
    setValue('rewardCurrency', initialCurrency)

    openCurrencyChangeModal()
  }

  const handleConfirmCurrencyChange = () => {
    if (pendingCurrency) {
      updateProjectCurrencyMutation({
        variables: {
          input: {
            projectId: Number(project?.id),
            rewardCurrency: pendingCurrency,
          },
        },
      })
      setValue('rewardCurrency', pendingCurrency, { shouldValidate: true })
    }

    handleCurrencyModalClose()
  }

  const handleCurrencyModalClose = () => {
    closeCurrencyChangeModal()
    setPendingCurrency(null)
  }

  const handleImageUpload = (url: string) => {
    const currentImages = watch('images')
    if (currentImages.includes(url)) return
    setValue('images', [...currentImages, url], { shouldDirty: true })
  }

  const handleDeleteImage = () => {
    setValue('images', [], { shouldDirty: true })
  }

  const formatEstimatedAvailabilityDate = (date: Date | undefined) => {
    return date ? format(date, 'MMM yyyy') : ''
  }

  const privateCommentPrompts = watch('privateCommentPrompts') || []

  const handlePromptToggle = useCallback(
    (prompt: PrivateCommentPrompt) => {
      setValue(
        'privateCommentPrompts',
        privateCommentPrompts.includes(prompt)
          ? privateCommentPrompts.filter((p) => p !== prompt)
          : [...privateCommentPrompts, prompt],
        { shouldDirty: true, shouldValidate: true },
      )
    },
    [privateCommentPrompts, setValue],
  )

  const isPromptChecked = useCallback(
    (prompt: PrivateCommentPrompt) => {
      return privateCommentPrompts.includes(prompt)
    },
    [privateCommentPrompts],
  )

  return {
    control,
    formLoaded,
    handleSubmit: handleSubmit(onSubmit),
    loading: createReward.loading || updateReward.loading,
    error: createReward.error || updateReward.error,
    watch,
    errors,
    reset,
    enableSubmit,
    setValue,
    trigger,
    project,
    projectOwner,
    rewardLoading,
    currencyChangeModal: {
      isOpen: isCurrencyChangeModalOpen,
      onClose: handleCurrencyModalClose,
      onOpen: openCurrencyChangeModal,
    },
    utils: {
      handleConfirmCurrencyChange,
      handleCurrencySelectChange,
      pendingCurrency,
      rewardCategories,
      isRewardCategoriesLoading,
      handleImageUpload,
      handleDeleteImage,
      formatEstimatedAvailabilityDate,
      handlePromptToggle,
      isPromptChecked,
      maxClaimableDisabled: soldAmount > 0,
    },
  }
}
