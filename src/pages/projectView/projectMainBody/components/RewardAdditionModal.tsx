import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiDollar } from 'react-icons/bi'

import { SatoshiIconTilted } from '../../../../components/icons'
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
  ProjectReward,
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
  onSubmit: (reward: ProjectRewardForCreateUpdateFragment) => void
  isSatoshi: boolean
  project: ProjectFragment
  reward?: ProjectRewardForCreateUpdateFragment
}

export const RewardAdditionModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSatoshi,
  project,
  reward,
}: Props) => {
  const { toast } = useNotification()

  const [formCostDollarValue, setFormCostDollarValue] = useState(
    (reward || defaultProjectReward).cost / 100,
  )

  const [rewards, setRewards] = useState<ProjectRewardForCreateUpdateFragment>(
    reward || defaultProjectReward,
  )

  const [formError, setFormError] = useState<any>({})

  const [createReward, { loading: createRewardLoading }] =
    useCreateProjectRewardMutation({
      onCompleted(data) {
        onSubmit(data.createProjectReward)
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
        onSubmit(updateProjectReward)
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
      cost: rewards.cost,
      costCurrency: RewardCurrency.Usdcent,
      description: rewards.description,
      image: rewards.image || undefined,
      name: rewards.name,
      stock: rewards.stock || undefined,
    }
  }

  const getRewardUpdateInputVariables = (): UpdateProjectRewardInput => {
    return {
      projectRewardId: toInt((rewards as ProjectReward).id),
      cost: rewards.cost,
      costCurrency: RewardCurrency.Usdcent, // @TODO: when we do have more options for reward currency this will be updated
      description: rewards.description,
      image: rewards.image || undefined,
      name: rewards.name,
      stock: rewards.stock || undefined,
    }
  }

  useEffect(() => {
    setRewards((current) => {
      if (reward && reward !== rewards) {
        return reward
      }

      return current
    })
  }, [reward, rewards])

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormError({})
    const { name, value } = event.target
    if (name) {
      setRewards({ ...rewards, [name]: value })
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
    setRewards({ ...rewards, ...{ cost: toInt(dollarValue * 100) } })
  }

  const handleConfirmReward = () => {
    const isValid = validateReward()

    if (!isValid) {
      return
    }

    if ((rewards as ProjectReward).id) {
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
    setRewards({ ...rewards, image: url })
  }

  const validateReward = () => {
    const errors: any = {}
    let isValid = true

    if (!rewards.name) {
      errors.name = 'Name is a required field'
      isValid = false
    } else if (rewards.name.length > ProjectRewardValidations.name.maxLength) {
      errors.name = `Name should be less than ${ProjectRewardValidations.name.maxLength} characters`
      isValid = false
    }

    if (!rewards.cost || rewards.cost <= 0) {
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
      rewards.description &&
      rewards.description.length >
        ProjectRewardValidations.description.maxLength
    ) {
      errors.description = `Description should be less than ${ProjectRewardValidations.description.maxLength} characters`
      isValid = false
    }

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="flex-start" padding="20px 0px">
        <ModalHeader paddingX="20px">
          <Text fontSize="18px" fontWeight={600}>
            Reward
          </Text>
          <Body2 color="brand.neutral900">
            Adding rewards and items that can be purchased makes it more
            worthwhile for contributors to fund your project
          </Body2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
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
                value={rewards.name}
                name="name"
                onChange={handleTextChange}
                error={formError.name}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Description</Text>
              <TextArea
                placeholder="..."
                value={rewards.description || ''}
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
                {rewards.image ? (
                  <HStack justifyContent="center">
                    <ImageWithReload
                      borderRadius="4px"
                      src={rewards.image}
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
                  focusBorderColor="brand.primary"
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
