import { Text, Stack, VStack, Checkbox, Button, IconButton, Select, useBreakpoint } from '@chakra-ui/react'
import { CardLayout } from '../../../../../../../components/layouts'
import { useTranslation } from 'react-i18next'
import { FieldContainer } from '../../../../../../../forms/components/FieldContainer'
import { TextArea, TextInputBox, UploadBox } from '../../../../../../../components/ui'
import { useState } from 'react'
import {
  CreateProjectRewardInput,
  ProjectReward,
  ProjectRewardForCreateUpdateFragment, RewardCurrency, UpdateProjectRewardInput,
} from '../../../../../../../types'
import { commaFormatted, toInt} from '../../../../../../../utils'
import { ProjectRewardValidations} from '../../../../../../../constants'
import { useProjectContext } from '../../../../../../../context'
import { CalendarButton, CreatorEmailButton, FileUpload } from '../../../../../../../components/molecules'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

type CreateOrUpdate {
  ''
}

type Props = {
  buttonText: string,
  titleText: string,
  rewardSave: Function,
  rewardSaving: boolean,
  rewardData: ProjectReward,
  createOrUpdate: 'create' | 'update'
}

export const ProjectRewardForm = ({buttonText, titleText, rewardSave, rewardSaving, rewardData, createOrUpdate = 'create'}: Props) => {
  const { t } = useTranslation()
  const {project} = useProjectContext();
  const navigate = useNavigate()

  if(!project) {
    return null;
  }

  const ownerEmail = project.owners[0]?.user.email || ''
  const [formCostDollarValue, setFormCostDollarValue] = useState('')
  const [reward, setReward] =
    useState<ProjectRewardForCreateUpdateFragment>(rewardData)
  const [formError, setFormError] = useState<any>({})

  const getRewardCreationInputVariables = (): CreateProjectRewardInput => {
    return {
      projectId: project.id,
      cost: reward.cost,
      costCurrency: RewardCurrency.Usdcent,
      description: reward.description,
      image: reward.image || undefined,
      name: reward.name,
      maxClaimable: reward.maxClaimable || undefined,
      hasShipping: reward.hasShipping,
      estimatedDeliveryDate: reward.estimatedDeliveryDate || undefined,
      rewardType: reward.rewardType
    }
  }

  const getRewardUpdateProjectRewardInputVariables = (): UpdateProjectRewardInput => {
    return {
      projectRewardId: reward.id,
      cost: reward.cost,
      costCurrency: RewardCurrency.Usdcent,
      description: reward.description,
      image: reward.image || undefined,
      name: reward.name,
      maxClaimable: reward.maxClaimable || undefined,
      hasShipping: reward.hasShipping,
      estimatedDeliveryDate: reward.estimatedDeliveryDate || undefined,
      rewardType: reward.rewardType
    }
  }

  const handleFormTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name) {
      setReward((current) => ({ ...current, [name]: value }))
    }
  }

  const handleFormCalendarChange = (date: Date) => {
    setReward((current) => ({ ...current, ['estimatedDeliveryDate']: date }))
  }

  const handleMaxClaimableAmountBlur = () => {
    // set cost with the dollar value converted to cents
    setReward((current) => ({
      ...current,
      maxClaimable: toInt(Math.round(reward.maxClaimable || 0)),
    }))
  }

  const handleCostAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target
    setFormCostDollarValue(value)
  }

  const handleCostAmountBlur = () => {

    // Dollar value rounded to two decimal places
    const dollarValue = parseFloat(formCostDollarValue).toFixed(2)
    setFormCostDollarValue(dollarValue)

    // set cost with the dollar value converted to cents
    setReward((current) => ({
      ...current,
      cost: toInt(parseFloat(dollarValue) * 100),
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

    console.log(reward);

    if (!reward.name) {
      errors.name = t('Name is a required field')
      isValid = false
    } else if (reward.name.length > ProjectRewardValidations.name.maxLength) {
      errors.name = t('Name should be less than') + ` ${ProjectRewardValidations.name.maxLength} ` + t('characters')
      isValid = false
    }

    if (reward.stock && reward.stock < 0) {
      errors.stock = t(`Stock must be greater than 0 if set.`)
      isValid = false
    }

    if (!reward.cost || reward.cost <= 0) {
      errors.cost = t(`Price must be greater than 0.`)
      isValid = false
    }

    if (
        parseFloat(formCostDollarValue) * 100 >
        ProjectRewardValidations.cost.maxUSDCentsAmount
    ) {
      errors.cost = t('Price must be less than') + ` $${commaFormatted(
          ProjectRewardValidations.cost.maxUSDCentsAmount / 100,
      )}.`
      isValid = false
    }

    if (
        reward.description &&
        reward.description.length > ProjectRewardValidations.description.maxLength
    ) {
      errors.description = t('Description should be less than') + ` ${ProjectRewardValidations.description.maxLength} ` + t('characters')
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
    });

  }

  return(
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt={{ base: '10px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
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
          <FieldContainer title={t('Limited Edition (skip if no limit)')}>
            <TextInputBox
              placeholder={'100'}
              value={reward.maxClaimable || ''}
              name="maxClaimable"
              onChange={handleFormTextChange}
              onBlur={handleMaxClaimableAmountBlur}
              error={formError.maxClaimable}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Currency')}>
            <TextInputBox
              placeholder={'USD'}
              value={'USD'}
              isReadOnly={true}
            />
          </FieldContainer>
          <FieldContainer title={t('Price (USD)')}>
            <TextInputBox
              placeholder={'150'}
              name="cost"
              value={formCostDollarValue}
              isInvalid={formError.cost}
              onChange={handleCostAmountChange}
              onBlur={handleCostAmountBlur}
              error={formError.cost}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Reward Type')}>
          <Select value={reward.rewardType} onChange={(event) => {
            setReward((current) => ({ ...current, ['rewardType']: event.target.value }))
          }}>
            <option value='PHYSICAL'>{t('Physical')}</option>
            <option value='DIGITAL'>{t('Digital')}</option>
          </Select>
          </FieldContainer>
        </Stack>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <FieldContainer title={t('Description')}>
            <TextArea
              placeholder={t('Describe the item you would like to sell')}
              value={reward.description}
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
            >
              <UploadBox h={10} title="Select an Image" />
            </FileUpload>
          </FieldContainer>
          <FieldContainer title={t('Estimated Delivery Date')}>
            <CalendarButton 
              onChange={handleFormCalendarChange}
              value={reward.estimatedDeliveryDate}
              containerProps={{w:"100%"}}
            >
              <TextInputBox
                style={{border: 0, background: 'none', width: '100%'}}
                value={reward.estimatedDeliveryDate}
              />
            </CalendarButton>
          </FieldContainer>
        </Stack>
        <VStack spacing={4} w="100%" align={'flex-start'}>
          <FieldContainer>
            <Checkbox
              w="100%"
              isChecked={reward.hasShipping}
              onChange={handleFormShippingChange}
            >
              <Text>{t('Includes Shipping')}</Text>
            </Checkbox>
            {reward.hasShipping ? (
              <VStack
                pl={2}
                spacing={2}
                borderLeft="2px solid"
                borderColor="primary.400"
                align={'flex-start'}
              >
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
          <Button
              display={{ base: 'block' }}
              variant="primary"
              onClick={handleConfirmReward}
              isLoading={rewardSaving}
          >
            {buttonText}
          </Button>
        </Stack>
      </CardLayout>
    </VStack>
  )
}