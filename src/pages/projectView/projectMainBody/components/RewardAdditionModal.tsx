import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiDollar } from 'react-icons/bi'

import { SatoshiIconTilted } from '../../../../components/icons'
import { Modal } from '../../../../components/layouts/Modal'
import { FileUpload } from '../../../../components/molecules'
import { Body2 } from '../../../../components/typography'
import {
  ButtonComponent,
  ImageWithReload,
  TextArea,
  TextInputBox,
  UploadBox,
} from '../../../../components/ui'
import { ProjectRewardValidations } from '../../../../constants/validations'
import { defaultProjectReward } from '../../../../defaults'
import {
  CreateProjectRewardInput,
  ProjectFragment,
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
  UpdateProjectRewardInput,
  useCreateProjectRewardMutation,
  useUpdateProjectRewardMutation,
} from '../../../../types/generated/graphql'
import { commaFormatted, toInt, useNotification } from '../../../../utils'

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
  const { toast } = useNotification()

  const [formCostDollarValue, setFormCostDollarValue] = useState(
    defaultProjectReward.cost / 100,
  )

  const [reward, setReward] =
    useState<ProjectRewardForCreateUpdateFragment>(defaultProjectReward)

  const [formError, setFormError] = useState<any>({})

  const [createReward, { loading: createRewardLoading }] =
    useCreateProjectRewardMutation({
      onCompleted(data) {
        onSubmit(data.createProjectReward, false)
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
    useUpdateProjectRewardMutation({
      onCompleted({ updateProjectReward }) {
        toast({
          title: 'Successfully updated!',
          description: `Reward ${updateProjectReward.name} was successfully updated`,
          status: 'success',
        })
        onSubmit(updateProjectReward, true)
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
      isOpen={isOpen}
      onClose={onClose}
    >
      <VStack
        width="100%"
        paddingBottom="20px"
        marginBottom="20px"
        maxHeight="600px"
        overflowY="auto"
        alignItems="flex-start"
        spacing="10px"
        paddingX="2px"
      >
        <VStack width="100%" alignItems="flex-start">
          <Text>Name</Text>
          <TextInputBox
            placeholder={'T - Shirt ...'}
            value={reward.name}
            name="name"
            onChange={handleTextChange}
            error={formError.name}
          />
        </VStack>

        <VStack width="100%" alignItems="flex-start">
          <Text>Description</Text>
          <TextArea
            placeholder="..."
            value={reward.description || ''}
            name="description"
            onChange={handleTextChange}
            error={formError.description}
          />
        </VStack>

        <VStack width="100%" alignItems="flex-start">
          <FileUpload
            onUploadComplete={handleUpload}
            childrenOnLoading={<UploadBox loading />}
          >
            {reward.image ? (
              <HStack justifyContent="center">
                <ImageWithReload
                  borderRadius="4px"
                  src={reward.image}
                  maxHeight="200px"
                />
              </HStack>
            ) : (
              <UploadBox title="Add image" />
            )}
          </FileUpload>
        </VStack>

        <VStack width="100%" alignItems="flex-start">
          <Text textTransform={'capitalize'}>Cost of Reward</Text>

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
        </VStack>
      </VStack>

      <VStack spacing="10px">
        <ButtonComponent
          isLoading={createRewardLoading || updateRewardLoading}
          w="full"
          primary
          onClick={handleConfirmReward}
        >
          Confirm
        </ButtonComponent>
      </VStack>
    </Modal>
  )
}
