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
  goal?: ProjectGoal
  projectId: string
}

const denominationOptions = [
  { value: ProjectGoalCurrency.Btcsat, label: 'Bitcoin' },
  { value: ProjectGoalCurrency.Usdcent, label: 'USD' },
]

export const GoalModal = ({ isOpen, onClose, goal, projectId }: Props) => {
  const { t } = useTranslation()

  const { control } = useForm()

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
                name="amount"
                label={t('Amount')}
                denomination={ProjectGoalCurrency.Btcsat}
              />
              <ControlledSelect
                control={control}
                name="denomination"
                label={t('Denomination')}
                options={denominationOptions}
                description={t('Denominate your goal in Bitcoin or USD')}
                defaultValue={ProjectGoalCurrency.Usdcent}
              />
              <HStack mt={4} width="100%" justifyContent="space-between">
                {renderActions()}
              </HStack>
            </VStack>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
