import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, Checkbox, HStack, IconButton, Select, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiInfoCircle } from 'react-icons/bi'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../../../../components/layouts'
import { CreatorEmailButton, FileUpload, UpdateCurrencyModal } from '../../../../../../../components/molecules'
import { ImageCrop } from '../../../../../../../components/molecules/ImageCropperModal'
import { TextArea, TextInputBox, UploadBox } from '../../../../../../../components/ui'
import { ProjectRewardValidations } from '../../../../../../../constants'
import { useProjectContext } from '../../../../../../../context'
import { FieldContainer } from '../../../../../../../forms/components/FieldContainer'
import { MUTATION_UPDATE_PROJECT_CURRENCY } from '../../../../../../../graphql/mutations'
import { useBTCConverter } from '../../../../../../../helpers/useBTCConverter'
import { useModal } from '../../../../../../../hooks/useModal'
import {
  CreateProjectRewardInput,
  ProjectReward,
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
  Satoshis,
  UpdateProjectRewardInput,
  USDCents,
} from '../../../../../../../types'
import { commaFormatted, isProjectAnException, toInt, useNotification } from '../../../../../../../utils'

type Props = {
  buttonText: string
  titleText: string
  rewardSave: Function
  rewardSaving: boolean
  rewardData: ProjectReward
  createOrUpdate?: 'create' | 'update'
}

export const ProjectRewardForm = ({
  buttonText,
  titleText,
  rewardSave,
  rewardSaving,
  rewardData,
  createOrUpdate = 'create',
}: Props) => {
  const { t } = useTranslation()
  const { project, updateProject } = useProjectContext()
  const navigate = useNavigate()
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const { toast } = useNotification()

  const {
    isOpen: isCurrencyChangeModalOpen,
    onClose: closeCurrencyChangeModal,
    onOpen: openCurrencyChangeModal,
  } = useModal()

  const projectCurrency = project?.rewardCurrency || RewardCurrency.Usdcent
  const [rewardCurrency, setRewardCurrency] = useState<RewardCurrency>(projectCurrency)
  const ownerEmail = project?.owners[0]?.user.email || ''
  const [reward, setReward] = useState<ProjectRewardForCreateUpdateFragment>(rewardData)
  const [originalReward, setOriginalReward] = useState<ProjectRewardForCreateUpdateFragment>(rewardData)
  const [formCostValue, setFormCostValue] = useState(
    reward.cost > 0 && project?.rewardCurrency === RewardCurrency.Usdcent
      ? (reward.cost / 100).toFixed(2)
      : reward.cost.toFixed(0) || '',
  )
  const [formError, setFormError] = useState<any>({})

  const { loading: isRewardCategoriesLoading, data: rewardCategoriesData } = useQuery(gql`
    query Query {
      projectRewardCategoriesGet
    }
  `)

  const getRewardCreationInputVariables = (): CreateProjectRewardInput => {
    return {
      projectId: project?.id,
      cost: reward.cost,
      description: reward.description,
      image: reward.image || undefined,
      name: reward.name,
      maxClaimable: reward.maxClaimable || undefined,
      hasShipping: reward.hasShipping,
      isAddon: reward.isAddon,
      isHidden: reward.isHidden,
      category: reward.category || null,
      preOrder: reward.preOrder || true,
    }
  }

  const getRewardUpdateProjectRewardInputVariables = (): UpdateProjectRewardInput => {
    return {
      projectRewardId: reward.id,
      cost: reward.cost,
      description: reward.description,
      image: reward.image || undefined,
      name: reward.name,
      maxClaimable: reward.maxClaimable || undefined,
      hasShipping: reward.hasShipping,
      isAddon: reward.isAddon,
      isHidden: reward.isHidden,
      category: reward.category || null,
    }
  }

  const handleFormTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (name) {
      setReward((current) => ({ ...current, [name]: value }))
    }
  }

  const handleMaxClaimableAmountBlur = () => {
    // set cost with the dollar value converted to cents
    if (reward.maxClaimable && toInt(reward.maxClaimable) < reward.sold) {
      setReward((current) => ({
        ...current,
        maxClaimable: reward.sold,
      }))
      setFormError({
        ...formError,
        maxClaimable: 'Limited edition must be at minimum the amount sold',
      })
    } else {
      setReward((current) => ({
        ...current,
        maxClaimable: toInt(Math.round(reward.maxClaimable || 0)),
      }))
    }
  }

  const handleCostAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFormCostValue(value)
  }

  const handleCostAmountBlur = () => {
    // Dollar value rounded to two decimal places, satoshis int
    const costValue =
      project?.rewardCurrency && project?.rewardCurrency === RewardCurrency.Usdcent
        ? parseFloat(formCostValue).toFixed(2)
        : toInt(formCostValue).toFixed(0)
    setFormCostValue(costValue)

    // set cost to the project reward type
    setReward((current) => ({
      ...current,
      cost:
        project?.rewardCurrency && project?.rewardCurrency === RewardCurrency.Usdcent
          ? toInt(parseFloat(costValue) * 100)
          : toInt(costValue),
    }))
  }

  const handleUpload = (url: string) => {
    setReward((current) => ({ ...current, image: url }))
  }

  const handleDeleteThumbnail = () => {
    setReward((current) => ({ ...current, image: null }))
  }

  const handleFormShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReward((current) => ({ ...current, hasShipping: event.target.checked }))
  }

  const validateReward = () => {
    const errors: any = {}
    let isValid = true

    if (!reward.name) {
      errors.name = t('Name is a required field')
      isValid = false
    } else if (reward.name.length > ProjectRewardValidations.name.maxLength) {
      errors.name = t('Name should be less than') + ` ${ProjectRewardValidations.name.maxLength} ` + t('characters')
      isValid = false
    }

    if (reward.maxClaimable && reward.maxClaimable < 0) {
      errors.maxClaimable = t(`Limited Edition must be greater than 0 if set.`)
      isValid = false
    }

    if (!reward.cost || reward.cost <= 0) {
      errors.cost = t(`Price must be greater than 0.`)
      isValid = false
    }

    const isException = project && isProjectAnException(project?.name)

    if (
      !isException &&
      (project?.rewardCurrency && project?.rewardCurrency === RewardCurrency.Usdcent
        ? parseFloat(formCostValue) * 100
        : getUSDAmount(toInt(formCostValue) as Satoshis)) > ProjectRewardValidations.cost.maxUSDCentsAmount
    ) {
      errors.cost =
        t('Price must be less than') + ` $${commaFormatted(ProjectRewardValidations.cost.maxUSDCentsAmount / 100)}.`
      isValid = false
    }

    if (reward.description && reward.description.length > ProjectRewardValidations.description.maxLength) {
      errors.description =
        t('Description should be less than') + ` ${ProjectRewardValidations.description.maxLength} ` + t('characters')
      isValid = false
    }

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }

  const handleConfirmReward = () => {
    const isValid = validateReward()

    if (!isValid) {
      return
    }

    rewardSave({
      variables: {
        input: reward.id > 0 ? getRewardUpdateProjectRewardInputVariables() : getRewardCreationInputVariables(),
      },
    })
  }

  const [updateProjectCurrencyMutation] = useMutation<{
    projectRewardCurrencyUpdate: { id: number; cost: number; name: string }[]
  }>(MUTATION_UPDATE_PROJECT_CURRENCY, {
    onCompleted(data) {
      // Update the project
      updateProject({
        rewardCurrency,
        rewards: data.projectRewardCurrencyUpdate as ProjectReward[],
      })

      // Update the rewardId to the new reward Id
      const newReward = data.projectRewardCurrencyUpdate.find(
        (newRewards) => newRewards.name === originalReward.name,
      ) as ProjectReward
      if (newReward) {
        setReward((current) => ({
          ...current,
          id: newReward.id,
          cost: newReward.cost,
        }))
        const newCostValue =
          rewardCurrency === RewardCurrency.Usdcent ? (newReward.cost / 100).toFixed(2) : newReward.cost.toFixed(0)
        setFormCostValue(newCostValue)

        // Set the original reward for tracking updates
        // @TODO: Do a shallow react router update so if the user refreshes it wont 404 the page
        setOriginalReward((current) => ({ ...current, ...newReward }))
      } else {
        setFormCostValue(
          rewardCurrency === RewardCurrency.Usdcent
            ? getUSDAmount(toInt(formCostValue) as Satoshis).toFixed(2)
            : getSatoshisFromUSDCents((parseFloat(formCostValue) * 100) as USDCents).toFixed(0),
        )
      }

      // Close the modal
      closeCurrencyChangeModal()

      // Show the toast
      toast({
        title: 'Project updated successfully!',
        status: 'success',
      })
    },
    onError(error) {
      setRewardCurrency(rewardCurrency === RewardCurrency.Usdcent ? RewardCurrency.Btcsat : RewardCurrency.Usdcent)
      toast({
        title: 'failed to update project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const handleChangeProjectCurrency = () => {
    updateProjectCurrencyMutation({
      variables: {
        input: {
          projectId: Number(project?.id),
          rewardCurrency,
        },
      },
    })
  }

  if (!project || isRewardCategoriesLoading) {
    return null
  }

  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt={{ base: '10px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '40px' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <CardLayout h="auto" padding="30px 30px" minWidth="100%">
        <Stack direction={'row'} align={'center'}>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="twitter"
            icon={<RiArrowLeftSLine fontSize="20px" />}
            color={'neutral.700'}
            onClick={() => {
              navigate(-1)
            }}
          />
          <Text fontSize="18px" fontWeight={600}>
            {t(titleText)}
          </Text>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Reward Name')}>
            <TextInputBox
              placeholder={'T-Shirt'}
              value={reward.name}
              name="name"
              onChange={handleFormTextChange}
              error={formError.name}
            />
          </FieldContainer>
          <VStack spacing={1} alignItems="start" w="100%">
            <HStack>
              <Text variant="body1" wordBreak="keep-all" fontWeight={'normal'}>
                {t('Limited Edition (skip if no limit)')}
              </Text>
              <Tooltip label={t('Limited Rewards cannot be edited after reward has been published.')}>
                <span>
                  <BiInfoCircle />
                </span>
              </Tooltip>
            </HStack>
            <TextInputBox
              placeholder={'100'}
              value={reward.maxClaimable || ''}
              name="maxClaimable"
              onChange={handleFormTextChange}
              onBlur={handleMaxClaimableAmountBlur}
              error={formError.maxClaimable}
              isDisabled={Boolean(createOrUpdate === 'update' && originalReward.maxClaimable)}
              isReadOnly={Boolean(createOrUpdate === 'update' && originalReward.maxClaimable)}
            />
          </VStack>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Currency')}>
            <Select
              value={rewardCurrency}
              onChange={(event) => {
                setRewardCurrency(event.target.value as RewardCurrency)
                openCurrencyChangeModal()
              }}
            >
              <option value={RewardCurrency.Btcsat}>{t('BTC (sats)')}</option>
              <option value={RewardCurrency.Usdcent}>{t('USD ($)')}</option>
            </Select>
          </FieldContainer>
          <FieldContainer
            title={t('Price' + ` (${project.rewardCurrency === RewardCurrency.Usdcent ? 'USD' : 'SATS'})`)}
          >
            <TextInputBox
              placeholder={'150'}
              name="cost"
              value={formCostValue}
              isInvalid={formError.cost}
              onChange={handleCostAmountChange}
              onBlur={handleCostAmountBlur}
              error={formError.cost}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Category')}>
            <Select
              value={reward.category || ''}
              onChange={(event) => {
                setReward((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }}
            >
              <option value="">{t('Select Category')}</option>
              {rewardCategoriesData.projectRewardCategoriesGet &&
                rewardCategoriesData.projectRewardCategoriesGet.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </Select>
          </FieldContainer>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Description')}>
            <TextArea
              placeholder={t('Describe the item you would like to sell')}
              value={reward.description || ''}
              name="description"
              onChange={handleFormTextChange}
              error={formError.description}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Image')}>
            <FileUpload
              showcase
              containerProps={{ w: '100%' }}
              src={reward.image}
              onUploadComplete={handleUpload}
              onDeleteClick={handleDeleteThumbnail}
              childrenOnLoading={<UploadBox loading h={10} />}
              imageCrop={ImageCrop.Reward}
            >
              <UploadBox h={10} title="Select an Image" />
            </FileUpload>
          </FieldContainer>
        </Stack>
        <VStack spacing={4} w="100%" align={'flex-start'}>
          <FieldContainer>
            <Checkbox w="100%" isChecked={reward.hasShipping} onChange={handleFormShippingChange}>
              <Text>{t('Includes Shipping')}</Text>
            </Checkbox>
            {reward.hasShipping ? (
              <VStack pl={2} spacing={2} borderLeft="2px solid" borderColor="primary.400" align={'flex-start'}>
                <Text variant="body1" fontWeight={500}>
                  {t(
                    'Funders will see the following message in the shipping section. Make sure your email is up to date.',
                  )}
                </Text>
                <Text fontWeight={500}>
                  {t(
                    "To receive the selected items, you will need to send your shipping details to the creator's email. Which will be revealed in the success screen.",
                  )}
                </Text>
                <CreatorEmailButton email={ownerEmail} />
              </VStack>
            ) : null}
          </FieldContainer>
        </VStack>
        <Stack>
          <Button display={{ base: 'block' }} variant="primary" onClick={handleConfirmReward} isLoading={rewardSaving}>
            {buttonText}
          </Button>
        </Stack>
      </CardLayout>
      <UpdateCurrencyModal
        isOpen={isCurrencyChangeModalOpen}
        onClose={() => {
          setRewardCurrency(rewardCurrency === RewardCurrency.Usdcent ? RewardCurrency.Btcsat : RewardCurrency.Usdcent)
          closeCurrencyChangeModal()
        }}
        title={`${t('Are you sure you want to make the change?')}`}
        confirm={handleChangeProjectCurrency}
        description={`${t(
          'Please note that all reward prices will be automatically updated to reflect their equivalent value in SWITCH_TO_REWARD_CURRENCY, based on the current Bitcoin price in US Dollars. If you wish you can update prices individually for each reward on reward’s page.',
        ).replace('SWITCH_TO_REWARD_CURRENCY', rewardCurrency === RewardCurrency.Usdcent ? 'USD' : 'Bitcoin')}`}
        warning={`${t(
          'You are about to switch the currency denomination for all your rewards from CURRENT_REWARD_CURRENCY to SWITCH_TO_REWARD_CURRENCY. ',
        )
          .replace('SWITCH_TO_REWARD_CURRENCY', rewardCurrency === RewardCurrency.Usdcent ? 'USD($)' : 'Bitcoin(sats)')
          .replace(
            'CURRENT_REWARD_CURRENCY',
            project?.rewardCurrency === RewardCurrency.Usdcent ? 'USD($)' : 'Bitcoin(sats)',
          )}`}
      />
    </VStack>
  )
}
