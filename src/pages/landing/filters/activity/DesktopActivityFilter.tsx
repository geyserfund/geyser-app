import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { CloseIconButton } from '../../../../components/buttons'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body1 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { useFilterContext } from '../../../../context'
import { colors } from '../../../../styles'
import { StatusTypeButton } from '../status'
import { ActivityFilterBody } from './ActivityFilterBody'

interface DesktopActivityFilterProps extends CardLayoutProps {
  button: StatusTypeButton
}

export const DesktopActivityFilter = ({
  button,
  ...rest
}: DesktopActivityFilterProps) => {
  const { filters, updateFilter } = useFilterContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClear = () => {
    updateFilter({ activity: undefined })
  }

  const isSelected = filters.activity

  return (
    <>
      <CardLayout
        hover
        width="100%"
        direction="column"
        padding={'0px'}
        position="relative"
        justifyContent="center"
        spacing="0px"
        {...rest}
      >
        <ButtonComponent
          noBorder
          onClick={onOpen}
          w="full"
          _hover={{}}
          paddingX="10px"
        >
          <HStack width="100%" spacing="10px">
            <button.icon color={button.color} height="20px" />
            <Body1 color={colors.neutral900}>{button.text}</Body1>
          </HStack>
        </ButtonComponent>
        {isSelected ? (
          <CloseIconButton
            position="absolute"
            right="10px"
            onClick={handleClear}
          />
        ) : (
          <ChevronRightIcon position="absolute" right="10px" fontSize="20px" />
        )}
      </CardLayout>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent maxHeight="700px" overflow="hidden" borderRadius="8px">
          <ModalHeader>
            <HStack width="100%" position="relative" alignItems="center">
              <Body1 color={colors.neutral600}>Filter by:</Body1>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={VStack}
            overflow="hidden"
            paddingX="0px"
            paddingBottom="20px"
          >
            <ActivityFilterBody button={button} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
