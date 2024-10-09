import { gql, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

import { useBTCConverter } from '@/helpers'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { PathName } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import {
  CreateProjectRewardInput,
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

const rewardFormSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(50, 'Name must be at most 50 characters long'),
  description: yup.string().max(400, 'Description must be at most 400 characters long'),
  cost: yup
    .number()
    .typeError('Price is required')
    .required('Price is required')
    .min(0.01, 'Price must be greater than 0'),
  maxClaimable: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(0, 'Limited Edition must be greater than or equal to 0'),
  images: yup.array().of(yup.string()).max(MAX_REWARD_IMAGES, `Maximum ${MAX_REWARD_IMAGES} images allowed`),
  hasShipping: yup.boolean(),
  isAddon: yup.boolean(),
  isHidden: yup.boolean(),
  category: yup.string().nullable(),
  preOrder: yup.boolean(),
  rewardCurrency: yup.string(),
  estimatedAvailabilityDate: yup.date().nullable(),
  estimatedDeliveryInWeeks: yup.number().nullable().min(0, 'Delivery time must be greater than or equal to 0'),
})

type UseProjectRewardFormProps = {
  rewardId?: string
  createOrUpdate: 'create' | 'update'
}

export const useProjectRewardForm = ({ rewardId, createOrUpdate }: UseProjectRewardFormProps) => {
  const navigate = useNavigate()
  const toast = useNotification()

  console.log('rewardId', rewardId)

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

  console.log('reward', data)

  const { control, handleSubmit, reset, watch, formState, setValue, trigger } = useForm<FormValues>({
    resolver: yupResolver(rewardFormSchema),
    defaultValues: {
      name: data?.getProjectReward?.name || '',
      description: data?.getProjectReward?.description || '',
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
        rewardCurrency: projectCurrency,
      })
    }
  }, [data?.getProjectReward, reset, projectCurrency, createOrUpdate])

  const onSubmit = (formData: FormValues) => {
    const commonData = {
      name: formData.name.trim(),
      description: formData.description,
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
    }

    if (data?.getProjectReward && createOrUpdate === 'update') {
      const updateInput: UpdateProjectRewardInput = {
        projectRewardId: data?.getProjectReward?.id,
        ...commonData,
      }

      updateReward.execute({
        variables: { input: updateInput },
        onCompleted() {
          reset()
          toast.success({ title: 'Successfully updated project reward!' })
        },
      })
    } else {
      const createInput: CreateProjectRewardInput = {
        projectId: project?.id,
        ...commonData,
      }

      createReward.execute({
        variables: { input: createInput },
        onCompleted() {
          reset()
          toast.success({ title: 'Successfully created project reward!' })
          navigate(PathName.projectRewards)
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
    },
  }
}
