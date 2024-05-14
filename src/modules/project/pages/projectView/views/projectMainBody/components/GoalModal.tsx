import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IoMdCloseCircle } from 'react-icons/io'

import {
  ControlledGoalAmount,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextInput,
} from '../../../../../../../components/inputs'
import { Body2 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../../../types'

type Props = {
  isOpen: boolean
  onClose: () => void
  goal?: ProjectGoal | null
  projectId: string
}

const denominationOptions = [
  { value: ProjectGoalCurrency.Btcsat, label: 'Bitcoin' },
  { value: ProjectGoalCurrency.Usdcent, label: 'USD' },
]

type FormValues = Record<string, string | number | ProjectGoalCurrency>

export const GoalModal = ({ isOpen, onClose, goal, projectId }: Props) => {
  const { t } = useTranslation()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      targetAmount: 0,
      currency: ProjectGoalCurrency.Usdcent,
      projectId,
    },
  })

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title || '',
        description: goal.description || '',
        targetAmount: goal.targetAmount || 0,
        currency: goal.currency,
        projectId,
      })
    }
  }, [goal, reset, projectId])

  useEffect(() => {
    reset()
  }, [onClose, reset])

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const renderActions = () => {
    return (
      <>
        <Button flexGrow={1} variant="secondary" onClick={onClose}>
          {t('Back')}
        </Button>{' '}
        <Button flexGrow={1} variant="primary">
          {t('Confirm')}
        </Button>
      </>
    )
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="8px" bg="neutral.0" pb={3}>
          <ModalHeader pb={2}>
            <HStack width="100%" alignItems={'center'} justifyContent="space-between">
              <Text color="neutral.700" fontWeight={700} fontSize={16}>
                {goal ? t('Edit goal') : t('Create goal')}
              </Text>
              <IconButtonComponent
                icon={<IoMdCloseCircle color="neutral.700" fontSize={20} />}
                onClick={onClose}
                variant="ghost"
                aria-label="Close"
              />
            </HStack>

            <Body2 color="neutral.700" fontSize={14} fontWeight={400}>
              {t(
                'Goals help you clarify what you can achieve with given amounts, and users can contribute to any live goal to support this achievement.',
              )}
            </Body2>
          </ModalHeader>

          <ModalBody>
            <form style={{ width: '100%', height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <VStack width="100%" alignItems="flex-start" gap={5}>
                <ControlledTextInput control={control} name="title" placeholder="Your goal title" label={t('Title')} />
                <ControlledTextArea
                  control={control}
                  name="description"
                  placeholder="Description"
                  label={t('Description')}
                />
                <ControlledGoalAmount
                  control={control}
                  name="targetAmount"
                  label={t('Amount')}
                  currency={goal?.currency || ProjectGoalCurrency.Usdcent}
                />
                <ControlledSelect
                  control={control}
                  name="currency"
                  label={t('Denomination')}
                  options={denominationOptions}
                  description={t('Denominate your goal in Bitcoin or USD')}
                  defaultValue={ProjectGoalCurrency.Usdcent}
                />
                <HStack mt={4} width="100%" justifyContent="space-between">
                  {renderActions()}
                </HStack>
              </VStack>
            </form>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
