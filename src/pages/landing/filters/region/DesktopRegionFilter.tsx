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
import { useTranslation } from 'react-i18next'
import { SlLocationPin } from 'react-icons/sl'

import { CloseIconButton } from '../../../../components/buttons'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body1 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { useFilterContext } from '../../../../context'
import { Country, ProjectCountriesGetResult, ProjectRegionsGetResult } from '../../../../types'
import { RegionFilterBody } from './RegionFilterBody'

interface DesktopRegionFilterProps extends CardLayoutProps {
  label: string
  regions: ProjectRegionsGetResult[]
  countries: ProjectCountriesGetResult[]
  options: Country[]
}

export const DesktopRegionFilter = ({ label, regions, countries, options, ...rest }: DesktopRegionFilterProps) => {
  const { t } = useTranslation()
  const { filters, updateFilter } = useFilterContext()

  const { region, countryCode } = filters

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    updateFilter({ countryCode: undefined, region: undefined })
  }

  const isSelected = region || countryCode

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
        <ButtonComponent noBorder onClick={onOpen} w="full" _hover={{}} paddingX="10px">
          <HStack width="100%">
            <SlLocationPin color={'neutral.600'} fontSize="20px" />
            <Body1 color={'neutral.900'}>{label}</Body1>
          </HStack>
          {!isSelected && <ChevronRightIcon position="absolute" right="10px" fontSize="20px" />}
        </ButtonComponent>
        {isSelected && <CloseIconButton position="absolute" right="10px" onClick={handleClear} />}
      </CardLayout>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent maxHeight="700px" overflow="hidden" borderRadius="8px">
          <ModalHeader>
            <HStack width="100%" position="relative" alignItems="center">
              <SlLocationPin stroke={'neutral.600'} color={'neutral.600'} fontSize="20px" />
              <Body1 color={'neutral.600'}>{t('Filter by location')}</Body1>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={VStack} overflow="hidden" paddingX="0px">
            <RegionFilterBody {...{ regions, countries, options, onClose }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
