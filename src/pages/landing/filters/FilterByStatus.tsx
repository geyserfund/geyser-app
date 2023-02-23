import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonProps,
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

import { ProjectNavIcon, RewardGiftIcon } from '../../../components/icons'
import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent, IconButtonComponent } from '../../../components/ui'
import { projectTypes } from '../../../constants'
import { FilterState } from '../../../hooks/state'
import { colors } from '../../../styles'
import { ProjectStatus, ProjectType } from '../../../types'

interface FilterByStatusProps extends CardLayoutProps, FilterState {}

type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const FilterByStatus = ({
  filters,
  updateFilter,
  ...rest
}: FilterByStatusProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = ({ status, type }: StatusAndType) => {
    if (type) {
      updateFilter({ status: undefined, type })
    } else {
      updateFilter({ status, type: undefined })
    }
  }

  const getButtonContent = ({ status, type }: StatusAndType) => {
    if (type && type === projectTypes.reward) {
      return (
        <>
          <RewardGiftIcon mr="10px" />
          Projects with perks
        </>
      )
    }

    switch (status) {
      case ProjectStatus.Deleted:
        return (
          <>
            <ProjectNavIcon mr="10px" color="brand.secondaryRed" />
            Closed projects
          </>
        )
      default:
        return (
          <>
            <ProjectNavIcon mr="10px" color="brand.primary500" />
            Active projects
          </>
        )
    }
  }

  const options = [
    { type: ProjectType.Reward },
    { status: ProjectStatus.Active },
    { status: ProjectStatus.Deleted },
  ]

  return (
    <>
      <CardLayout
        hover
        width="100%"
        direction="column"
        padding={'0px'}
        spacing="10px"
        {...rest}
      >
        <ButtonComponent
          noBorder
          onClick={onOpen}
          w="full"
          _hover={{}}
          paddingX="10px"
        >
          <HStack width="100%" position="relative">
            {getButtonContent({ status: filters.status, type: filters.type })}
            <IconButtonComponent
              noBorder
              size="xs"
              aria-label="filter-close-icon"
              position="absolute"
              right="-5px"
              icon={<ChevronRightIcon fontSize="20px" />}
            />
          </HStack>
        </ButtonComponent>
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
          <ModalBody as={VStack} overflow="hidden" paddingX="0px">
            <VStack
              width="100%"
              alignItems="start"
              spacing="5px"
              paddingX="50px"
            >
              {options.map((option, index) => {
                const isActive =
                  filters.type === option.type &&
                  filters.status === option.status
                return (
                  <Button
                    key={index}
                    {...getStatusFilterButtonStyles(isActive)}
                    onClick={() => handleClick(option)}
                  >
                    {getButtonContent(option)}
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

const getStatusFilterButtonStyles = (isActive?: boolean): ButtonProps => ({
  w: 'full',
  display: 'flex',
  justifyContent: 'start',
  background: isActive ? 'brand.neutral100' : 'white',
  color: 'brand.neutral800',
})
