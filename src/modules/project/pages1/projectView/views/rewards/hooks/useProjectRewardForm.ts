/* eslint-disable complexity */

import { gql, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
  useProjectRewardQuery,
} from '@/types'
import { useNotification } from '@/utils'

type FormValues = Omit<ProjectRewardFragment, 'id' | 'sold'>

const MAX_REWARD_IMAGES = 5

const REWARD_CATEGORIES_QUERY = gql`
  query Query {
    projectRewardCategoriesGet
  }
`

const rewardFormSchema = (soldAmount: number) =>
  yup.object().shape({
    name: yup.string().required('Name is required').max(50, 'Name must be at most 50 characters long'),
    description: yup.string().max(1200, 'Description must be at most 1200 characters long'),
    shortDescription: yup.string().max(250, 'Short Description must be at most 250 characters long'),
    cost: yup
      .number()
      .typeError('Price is required')
      .required('Price is required')
      .min(0.01, 'Price must be greater than 0'),
    maxClaimable: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .min(0, 'Limited Edition must be greater than or equal to 0')
      .test('min-sold-amount', 'Limited edition must be at minimum the amount sold', function (value) {
        return value !== null && value !== undefined && value >= soldAmount
      })
      .transform((value) => (value === null ? null : Math.round(value))),
    images: yup.array().of(yup.string()).max(MAX_REWARD_IMAGES, `Maximum ${MAX_REWARD_IMAGES} images allowed`),
    hasShipping: yup.boolean(),
    isAddon: yup.boolean(),
    isHidden: yup.boolean(),
    category: yup.string().nullable(),
    preOrder: yup.boolean(),
    rewardCurrency: yup.string(),
    estimatedAvailabilityDate: yup.date().nullable(),
    estimatedDeliveryInWeeks: yup.number().nullable().min(0, 'Delivery time must be greater than or equal to 0'),
    confirmationMessage: yup.string().max(500, 'Confirmation message must be at most 500 characters long'),
    privateCommentPrompts: yup.array().of(yup.string()),
  })

type UseProjectRewardFormProps = {
  rewardId?: string
  createOrUpdate: 'create' | 'update'
  isLaunch?: boolean
  defaultCategory?: string
}

export const useProjectRewardForm = ({
  rewardId,
  createOrUpdate,
  isLaunch,
  defaultCategory,
}: UseProjectRewardFormProps) => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { loading: rewardLoading, data } = useProjectRewardQuery({
    skip: !rewardId,
    variables: {
      getProjectRewardId: rewardId,
    },
  })

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

  const soldAmount = data?.getProjectReward?.sold || 0

  const { control, handleSubmit, reset, watch, formState, setValue, trigger } = useForm<FormValues>({
    resolver: yupResolver(rewardFormSchema(soldAmount)),
    defaultValues: {
      name: data?.getProjectReward?.name || '',
      description: data?.getProjectReward?.description || '',
      shortDescription: data?.getProjectReward?.shortDescription || '',
      cost: data?.getProjectReward?.cost || 0,
      maxClaimable: data?.getProjectReward?.maxClaimable || null,
      images: data?.getProjectReward?.images || [],
      hasShipping: data?.getProjectReward?.hasShipping || false,
      isAddon: data?.getProjectReward?.isAddon || false,
      isHidden: data?.getProjectReward?.isHidden || false,
      category: data?.getProjectReward?.category || defaultCategory || null,
      preOrder: data?.getProjectReward?.preOrder || false,
      estimatedAvailabilityDate: data?.getProjectReward?.estimatedAvailabilityDate || null,
      estimatedDeliveryInWeeks: data?.getProjectReward?.estimatedDeliveryInWeeks || null,
      privateCommentPrompts: data?.getProjectReward?.privateCommentPrompts || [],
      confirmationMessage: data?.getProjectReward?.confirmationMessage || '',
      rewardCurrency: projectCurrency,
    },
    mode: 'onBlur',
  })

  const { errors, isDirty, isValid } = formState

  const enableSubmit = isDirty && isValid

  // Fetch reward categories
  const { loading: isRewardCategoriesLoading, data: rewardCategoriesData } = useQuery(REWARD_CATEGORIES_QUERY)

  const rewardCategories =
    rewardCategoriesData?.projectRewardCategoriesGet.map((category: string) => ({
      label: category,
      value: category,
    })) || []

  useEffect(() => {
    if (data?.getProjectReward && createOrUpdate === 'update') {
      reset({
        name: data?.getProjectReward?.name || '',
        description: data?.getProjectReward?.description || '',
        shortDescription: data?.getProjectReward?.shortDescription || '',
        cost: data?.getProjectReward?.cost || 0,
        maxClaimable: data?.getProjectReward?.maxClaimable || null,
        images: data?.getProjectReward?.images || [],
        hasShipping: data?.getProjectReward?.hasShipping || false,
        isAddon: data?.getProjectReward?.isAddon || false,
        isHidden: data?.getProjectReward?.isHidden || false,
        category: data?.getProjectReward?.category || null,
        preOrder: data?.getProjectReward?.preOrder || false,
        estimatedAvailabilityDate: data?.getProjectReward?.estimatedAvailabilityDate || null,
        estimatedDeliveryInWeeks: data?.getProjectReward?.estimatedDeliveryInWeeks || null,
        privateCommentPrompts: data?.getProjectReward?.privateCommentPrompts || [],
        confirmationMessage: data?.getProjectReward?.confirmationMessage || '',
        rewardCurrency: projectCurrency,
      })
    }
  }, [data?.getProjectReward, reset, projectCurrency, createOrUpdate])

  const onSubmit = (formData: FormValues) => {
    const commonData = {
      name: formData.name.trim(),
      description: formData.description,
      shortDescription: formData.shortDescription,
      cost: formData.cost,
      maxClaimable: formData.maxClaimable,
      images: formData.images,
      hasShipping: formData.hasShipping,
      isAddon: formData.isAddon,
      isHidden: formData.isHidden,
      category: formData.category,
      preOrder: formData.preOrder,
      estimatedAvailabilityDate: formData.estimatedAvailabilityDate,
      estimatedDeliveryInWeeks: formData.estimatedDeliveryInWeeks,
      privateCommentPrompts: formData.privateCommentPrompts,
      confirmationMessage: formData.confirmationMessage,
    }

    if (data?.getProjectReward && createOrUpdate === 'update') {
      const updateInput: UpdateProjectRewardInput = {
        projectRewardId: data?.getProjectReward?.id,
        ...commonData,
      }

      updateReward.execute({
        variables: { input: updateInput },
        onCompleted(data) {
          reset()
          toast.success({
            title: 'Successfully updated!',
            description: `Reward ${data.projectRewardUpdate.name} was successfully updated`,
          })
          if (isLaunch) {
            navigate(-1)
          } else {
            navigate(getPath('projectRewardView', project.name, data.projectRewardUpdate.id))
          }
        },
        onError(error) {
          toast.error({
            title: 'Failed to update reward',
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
          toast.success({ title: 'Successfully created project reward!' })
          if (isLaunch) {
            navigate(-1)
          } else {
            navigate(getPath('projectRewardView', project.name, data.projectRewardCreate.id))
          }
        },
        onError(error) {
          toast.error({
            title: 'Failed to create reward',
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

  const handleCurrencySelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as RewardCurrency
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
