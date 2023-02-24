import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
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

import { CloseIconButton } from '../../../components/buttons'
import { ProjectNavIcon, RewardGiftIcon } from '../../../components/icons'
import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { projectTypes } from '../../../constants'
import { useFilterContext } from '../../../context'
import { colors } from '../../../styles'
import { ProjectStatus, ProjectType } from '../../../types'

type FilterByStatusProps = CardLayoutProps

type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const FilterByStatus = ({ ...rest }: FilterByStatusProps) => {
  const { filters, updateFilter } = useFilterContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = ({ status, type }: StatusAndType) => {
    if (type) {
      updateFilter({ status: undefined, type })
    } else {
      updateFilter({ status, type: undefined })
    }

    onClose()
  }

  const handleClear = () => {
    updateFilter({ status: undefined, type: undefined })
  }

  const isSelected = filters.type || filters.status

  const options = [
    { type: ProjectType.Reward },
    { status: ProjectStatus.Active },
    { status: ProjectStatus.Deleted },
  ]

  const { icon, text } = getStatusTypeButtonContent({
    status: filters.status,
    type: filters.type,
  })

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
            {icon}
            <Body1 color={colors.neutral900}>{text}</Body1>
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
            <VStack
              width="100%"
              alignItems="start"
              spacing="20px"
              paddingX="30px"
            >
              {options.map((option, index) => {
                const isActive =
                  filters.type === option.type &&
                  filters.status === option.status
                const { icon, text } = getStatusTypeButtonContent(option)
                return (
                  <Button
                    key={index}
                    background={isActive ? 'brand.neutral100' : 'white'}
                    color="brand.neutral800"
                    onClick={() => handleClick(option)}
                    w="100%"
                    display="flex"
                    justifyContent="start"
                  >
                    {icon}
                    <Body1 ml="10px" color={colors.neutral900}>
                      {text}
                    </Body1>
                  </Button>
                )
              })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const getStatusTypeButtonContent = ({ status, type }: StatusAndType) => {
  if (type && type === projectTypes.reward) {
    return {
      icon: <RewardGiftIcon height="20px" />,
      text: 'Projects with perks',
    }
  }

  switch (status) {
    case ProjectStatus.Deleted:
      return {
        icon: <ProjectNavIcon color="brand.secondaryRed" height="20px" />,
        text: 'Inactive Projects',
      }
    default:
      return {
        icon: <ProjectNavIcon color="brand.primary500" height="20px" />,
        text: 'Active projects',
      }
  }
}
