import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiDollar } from 'react-icons/bi'

import { SatoshiIconTilted } from '../../../../components/icons'
import { Modal } from '../../../../components/layouts/Modal'
import { FileUpload } from '../../../../components/molecules'
import { Body2 } from '../../../../components/typography'
import { TextArea, TextInputBox, UploadBox } from '../../../../components/ui'
import { ProjectRewardValidations } from '../../../../constants/validations'
import { defaultProjectReward } from '../../../../defaults'
import { FieldContainer } from '../../../../forms/components/FieldContainer'
import {
  CreateProjectRewardInput,
  ProjectFragment,
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
  UpdateProjectRewardInput,
  useProjectRewardCreateMutation,
  useProjectRewardUpdateMutation,
} from '../../../../types/generated/graphql'
import { commaFormatted, toInt, useNotification } from '../../../../utils'
import { CreatorEmailButton } from '../../projectActivityPanel/components/CreatorEmailButton'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    reward: ProjectRewardForCreateUpdateFragment,
    isEdit: boolean,
  ) => void
  isSatoshi: boolean
  project: ProjectFragment
  props: {
    reward?: ProjectRewardForCreateUpdateFragment
  }
}

export const RewardAdditionModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSatoshi,
  project,
  props,
}: Props) => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const ownerEmail = project.owners[0]?.user.email || ''

  const [formCostDollarValue, setFormCostDollarValue] = useState(
    defaultProjectReward.cost / 100,
  )

  const [reward, setReward] =
    useState<ProjectRewardForCreateUpdateFragment>(defaultProjectReward)

  const [formError, setFormError] = useState<any>({})

  const [createReward, { loading: createRewardLoading }] =
    useProjectRewardCreateMutation({
      onCompleted(data) {
        onSubmit(data.projectRewardCreate, false)
        onClose()
      },
      onError(error) {
        toast({
          title: 'Failed to create reward',
          description: `${error}`,
          status: 'error',
        })
      },
    })

  const [updateReward, { loading: updateRewardLoading }] =
    useProjectRewardUpdateMutation({
      onCompleted(data) {
        toast({
          title: 'Successfully updated!',
          description: `Reward ${data.projectRewardUpdate.name} was successfully updated`,
          status: 'success',
        })
        onSubmit(data.projectRewardUpdate, true)
        onClose()
      },
      onError(error) {
        toast({
          title: 'Failed to update reward',
          description: `${error}`,
          status: 'error',
        })
      },
    })

  const getRewardCreationInputVariables = (): CreateProjectRewardInput => {
    return {
      projectId: project.id,
      cost: reward.cost,
      costCurrency: RewardCurrency.Usdcent,
      description: reward.description,
      image: reward.image || undefined,
      name: reward.name,
      stock: reward.stock || undefined,
      hasShipping: reward.hasShipping,
    }
  }

  const getRewardUpdateInputVariables = (): UpdateProjectRewardInput => {
    return {
      projectRewardId: toInt(reward.id),
      cost: reward.cost,
      costCurrency: RewardCurrency.Usdcent, // @TODO: when we do have more options for reward currency this will be updated
      description: reward.description,
      image: reward.image || undefined,
      name: reward.name,
      stock: reward.stock || undefined,
      hasShipping: reward.hasShipping,
    }
  }

  useEffect(() => {
    if (props.reward) {
      setFormCostDollarValue(props.reward.cost / 100)
      return setReward(props.reward)
    }

    setFormCostDollarValue(defaultProjectReward.cost)
    return setReward(defaultProjectReward)
  }, [props.reward])

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormError({})
    const { name, value } = event.target
    if (name) {
      setReward((current) => ({ ...current, [name]: value }))
    }
  }

  const handleCostAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormError({})

    // Dollar value rounded to two decimal places
    const dollarValue = Math.round(parseFloat(event.target.value) * 100) / 100

    setFormCostDollarValue(dollarValue)

    // set cost with the dollar value converted to cents
    setReward((current) => ({
      ...current,
      cost: toInt(dollarValue * 100),
    }))
  }

  const handleConfirmReward = () => {
    const isValid = validateReward()

    if (!isValid) {
      return
    }

    if (reward.id) {
      updateReward({
        variables: { input: getRewardUpdateInputVariables() },
      })
    } else {
      createReward({
        variables: {
          input: getRewardCreationInputVariables(),
        },
      })
    }
  }

  const handleUpload = (url: string) => {
    setReward((current) => ({ ...current, image: url }))
  }

  const handleDeleteThumbnail = () => {
    setReward((current) => ({ ...current, image: null }))
  }

  const handleShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReward((current) => ({ ...current, hasShipping: event.target.checked }))
  }

  const validateReward = () => {
    const errors: any = {}
    let isValid = true

    if (!reward.name) {
      errors.name = 'Name is a required field'
      isValid = false
    } else if (reward.name.length > ProjectRewardValidations.name.maxLength) {
      errors.name = `Name should be less than ${ProjectRewardValidations.name.maxLength} characters`
      isValid = false
    }

    if (!reward.cost || reward.cost <= 0) {
      errors.cost = `Cost must be greater than 0.`
      isValid = false
    }

    if (
      formCostDollarValue * 100 >
      ProjectRewardValidations.cost.maxUSDCentsAmount
    ) {
      errors.cost = `Cost must be less than $${commaFormatted(
        ProjectRewardValidations.cost.maxUSDCentsAmount / 100,
      )}.`
      isValid = false
    }

    if (
      reward.description &&
      reward.description.length > ProjectRewardValidations.description.maxLength
    ) {
      errors.description = `Description should be less than ${ProjectRewardValidations.description.maxLength} characters`
      isValid = false
    }

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <Text fontSize="18px" fontWeight={600}>
            Reward
          </Text>
          <Body2 color="neutral.900">
            Adding rewards and items that can be purchased makes it more
            worthwhile for contributors to fund your project
          </Body2>
        </>
      }
    >
      <VStack width="100%" overflowY="auto" spacing={4}>
        <FieldContainer title="Name">
          <TextInputBox
            placeholder={'T - Shirt ...'}
            value={reward.name}
            name="name"
            onChange={handleTextChange}
            error={formError.name}
          />
        </FieldContainer>

        <FieldContainer title="Description">
          <TextArea
            placeholder="..."
            value={reward.description || ''}
            name="description"
            onChange={handleTextChange}
            error={formError.description}
          />
        </FieldContainer>

        <FieldContainer title="Image">
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

        <FieldContainer title="Price">
          <InputGroup>
            <InputLeftAddon>
              {isSatoshi ? <SatoshiIconTilted /> : <BiDollar />}
            </InputLeftAddon>

            {/*
              @TODO: Use a different `value` here if when we support currency
              types beyond USD cents (e.g: satoshis)
            */}
            <Input
              focusBorderColor="primary.400"
              name="Dollar Amount Cost"
              type="number"
              onChange={handleCostAmountChange}
              value={formCostDollarValue}
              isInvalid={formError.cost}
            />
          </InputGroup>

          {formError.cost ? (
            <Text fontSize="12px" color="red.500">
              {formError.cost}
            </Text>
          ) : null}
        </FieldContainer>

        <FieldContainer>
          <VStack spacing={4}>
            <Checkbox
              w="100%"
              checked={reward.hasShipping}
              onChange={handleShipping}
            >
              <Text variant="body2">{t('Includes Shipping')}</Text>
            </Checkbox>
            {reward.hasShipping ? (
              <VStack
                pl={2}
                spacing={2}
                borderLeft="2px solid"
                borderColor="primary.400"
              >
                <Text variant="body2" fontWeight={500}>
                  {t(
                    'Funders will see the following message in the shipping section. Make sure your email is up to date.',
                  )}
                </Text>
                <Text variant="body2" fontWeight={500}>
                  {t(
                    "To receive the selected items, you will need to send your shipping details to the creator's email. Which will be revealed in the success screen.",
                  )}
                </Text>

                <CreatorEmailButton email={ownerEmail} />
              </VStack>
            ) : null}
          </VStack>
        </FieldContainer>

        <Button
          isLoading={createRewardLoading || updateRewardLoading}
          w="full"
          variant="primary"
          onClick={handleConfirmReward}
        >
          Confirm
        </Button>
      </VStack>
    </Modal>
  )
}
