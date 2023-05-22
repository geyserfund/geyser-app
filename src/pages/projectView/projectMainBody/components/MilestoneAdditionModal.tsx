import { useMutation } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import {
  HStack,
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

import { AmountInputWithSatoshiToggle } from '../../../../components/molecules'
import { Body2 } from '../../../../components/typography'
import {
  ButtonComponent,
  IconButtonComponent,
  TextInputBox,
} from '../../../../components/ui'
import { MilestoneValidations } from '../../../../constants/validations'
import {
  MUTATION_CREATE_PROJECT_MILESTONE,
  MUTATION_DELETE_PROJECT_MILESTONE,
  MUTATION_UPDATE_PROJECT_MILESTONE,
} from '../../../../graphql/mutations'
import { useBTCConverter } from '../../../../helpers'
import { colors } from '../../../../styles'
import { ProjectFragment, ProjectMilestone } from '../../../../types'
import { Satoshis, USDCents, USDollars } from '../../../../types/types'
import { toInt, useNotification } from '../../../../utils'

type Props = {
  isOpen: boolean
  onClose: (newMilestones: ProjectMilestone[]) => void
  onSubmit: (newMilestones: ProjectMilestone[]) => void
  project: ProjectFragment
}

export const defaultMilestone = {
  id: 0,
  name: '',
  projectId: 0,
  description: '',
  amount: 0 as Satoshis,
} as ProjectMilestone

export const MilestoneAdditionModal = ({
  project,
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  const { toast } = useNotification()
  const { getUSDCentsAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const [milestones, setMilestones] = useState<ProjectMilestone[]>([])

  useEffect(() => {
    setMilestones(
      project.milestones && project.milestones.length > 0
        ? project.milestones
        : [defaultMilestone],
    )
  }, [project])

  const [isFormInputUsingSatoshis, setIsFormInputUsingSatoshis] = useState(true)

  const [formError, setFormError] = useState<any>([])

  const handleAddMilestone = () => {
    setMilestones((current) => [...current, defaultMilestone])
  }

  const getFilteredMilestones = (): ProjectMilestone[] => {
    return milestones.filter(
      (milestone: ProjectMilestone) => milestone.amount > 0 && milestone.name,
    )
  }

  const getMutationConvertedMilestoneAmount = (
    amount: Satoshis | USDollars,
  ): Satoshis => {
    return isFormInputUsingSatoshis
      ? (amount as Satoshis)
      : getSatoshisFromUSDCents((amount * 100) as USDCents)
  }

  const getFormConvertedMilestoneAmount = (
    satoshiAmount: Satoshis,
  ): Satoshis | USDollars => {
    if (isFormInputUsingSatoshis) {
      return satoshiAmount as Satoshis
    }

    const usdCentsAmount = getUSDCentsAmount(satoshiAmount)

    // Dollar value rounded to two decimal places
    return (Math.round(usdCentsAmount) / 100) as USDollars
  }

  const handleAmountChange = (newAmount: Satoshis, itemIndex: number) => {
    setFormError([])
    setMilestones((current) => {
      const milestonesCopy = [...current]

      const currentMilestone = current[itemIndex]

      if (currentMilestone) {
        milestonesCopy[itemIndex] = {
          ...currentMilestone,
          amount: newAmount,
        }
      }

      return milestonesCopy
    })
  }

  const handleTextChange = (event: any, itemIndex: number) => {
    if (event) {
      const newMilestones = milestones.map((milestone, index) => {
        if (index === itemIndex) {
          return { ...milestone, name: event.target.value }
        }

        return milestone
      })
      setFormError([])
      setMilestones(newMilestones)
    }
  }

  const handleModalClose = () => {
    const isValid = validateMilestones()

    if (!isValid) {
      onClose(milestones)
    }

    onClose(getFilteredMilestones())
  }

  /**
   * TODO: REFACTOR -- This updates all milestones, even unchanged ones.
   * We should refactor it to only update the relevant milestones.
   */
  const handleConfirmMilestone = async () => {
    const isValid = validateMilestones()

    if (!isValid) {
      return
    }

    const filteredMilestones = getFilteredMilestones()

    try {
      const newMilestones = await Promise.all(
        filteredMilestones.map(async (milestone) => {
          const createMilestoneInput = {
            ...milestone,
            id: undefined,
            projectId: project.id,
          }

          if (milestone.id) {
            await updateMilestone({
              variables: {
                input: {
                  projectMilestoneId: toInt(milestone.id),
                  name: milestone.name,
                  description: milestone.description,
                  amount: milestone.amount,
                },
              },
            })

            return milestone
          }

          const { data } = await createMilestone({
            variables: { input: createMilestoneInput },
          })
          if (data?.createProjectMilestone?.id) {
            return {
              ...milestone,
              id: toInt(data.createProjectMilestone.id),
            }
          }

          throw Error('missing id for created project milestone')
        }),
      )
      onSubmit(newMilestones)
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        status: 'error',
      })
    }
  }

  const handleRemoveMilestone = async (itemIndex: number) => {
    const currentMilestone = milestones[itemIndex]
    const newMilestones = milestones.filter(
      (_milestone, index) => index !== itemIndex,
    )

    if (currentMilestone && currentMilestone.id) {
      try {
        await removeMilestone({
          variables: { projectMilestoneId: toInt(currentMilestone.id) },
        })
        setMilestones(newMilestones)
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        })
      }
    } else {
      setMilestones(newMilestones)
    }
  }

  const [createMilestone, { loading: createMilestoneLoading }] = useMutation(
    MUTATION_CREATE_PROJECT_MILESTONE,
  )

  const [updateMilestone, { loading: updateMilestoneLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT_MILESTONE,
  )

  const [removeMilestone, { loading: removeMilestoneLoading }] = useMutation(
    MUTATION_DELETE_PROJECT_MILESTONE,
  )

  const validateMilestones = () => {
    let isValid = true
    const totalErrors: any = []

    milestones.map((milestone, index) => {
      const errors: any = {}
      if (!milestone.name) {
        errors.name = 'Name is a required field.'
        isValid = false
      } else if (milestone.name.length > MilestoneValidations.name.maxLength) {
        errors.name = `Name cannot be longer than ${MilestoneValidations.name.maxLength} characters.`
        isValid = false
      }

      if (!milestone.amount || milestone.amount < 1) {
        errors.amount = 'Amount needs to be at least 1 satoshi.'
        isValid = false
      }

      const previous = milestones[index - 1]

      if (index > 0 && previous && previous.amount > milestone.amount) {
        errors.amount = 'Amount must to be at greater than previous milestone.'
        isValid = false
      }

      if (
        milestone.description &&
        milestone.description.length >
          MilestoneValidations.description.maxLength
      ) {
        errors.description = `Description cannot be longer than ${MilestoneValidations.description.maxLength} characters.`
        isValid = false
      }

      totalErrors.push(errors)
    })

    if (!isValid) {
      setFormError(totalErrors)
    }

    return isValid
  }

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="flex-start" padding="20px 0px">
        <ModalHeader paddingX="20px">
          <Text fontSize="18px" fontWeight={600}>
            Select Milestones
          </Text>
          <Body2 color="brand.neutral900">
            Milestones help you clarify your next steps, aims and objectives
          </Body2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <VStack
            width="100%"
            paddingBottom="20px"
            marginBottom="20px"
            borderBottom="1px solid"
            borderBottomColor={colors.gray300}
            maxHeight="600px"
            overflowY="auto"
            spacing="15px"
          >
            {milestones.map((milestone, index) => (
              <VStack
                key={index}
                width="100%"
                alignItems="flex-start"
                paddingX="2px"
              >
                <HStack justifyContent="space-between" width="100%">
                  <Text marginTop="10px" marginBottom="5px">
                    {`Milestone ${index + 1}`}
                  </Text>
                  <IconButtonComponent
                    noBorder
                    aria-label="remove-milestone-button"
                    size="xs"
                    padding="7px"
                    rounded="full"
                    onClick={() => handleRemoveMilestone(index)}
                    icon={<CloseIcon fontSize="10px" />}
                  />
                </HStack>
                <TextInputBox
                  placeholder={'Enter a Milestone Title'}
                  value={milestone.name}
                  onChange={(event: any) => handleTextChange(event, index)}
                  error={formError[index] && formError[index].name}
                />

                <AmountInputWithSatoshiToggle
                  isUsingSatoshis={isFormInputUsingSatoshis}
                  onUnitTypeChanged={setIsFormInputUsingSatoshis}
                  value={getFormConvertedMilestoneAmount(
                    milestone.amount as Satoshis,
                  )}
                  onValueChanged={(newAmount: Satoshis | USDollars) =>
                    handleAmountChange(
                      getMutationConvertedMilestoneAmount(newAmount),
                      index,
                    )
                  }
                  error={formError[index] && formError[index].amount}
                />
              </VStack>
            ))}
          </VStack>
          <VStack spacing="10px">
            <ButtonComponent w="full" onClick={handleAddMilestone}>
              Add a Milestone
            </ButtonComponent>
            <ButtonComponent
              w="full"
              primary
              isLoading={
                createMilestoneLoading ||
                updateMilestoneLoading ||
                removeMilestoneLoading
              }
              onClick={handleConfirmMilestone}
            >
              Confirm
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
