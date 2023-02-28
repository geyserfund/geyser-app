import {
  Accordion,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { BsSliders } from 'react-icons/bs'

import { Body1 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { FilterByRegion } from '../../filters/region'
import { MobileSort } from '../../filters/sort/MobileSort'
import { FilterByStatus } from '../../filters/status'
import { FilterByTags } from '../../filters/tag'
import { FilterTopBar } from './FilterTopBar'

export const ProjectsTopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef(null)

  return (
    <>
      <HStack
        width="100%"
        borderBottom="2px solid"
        borderColor="brand.neutral200"
        justifyContent="space-between"
        paddingY="6px"
      >
        <Body1 semiBold color="black">
          Projects
        </Body1>
        <ButtonComponent
          ref={btnRef}
          noBorder
          size="sm"
          color="brand.neutral800"
          rightIcon={<BsSliders fontSize="16px" />}
          onClick={onOpen}
        >
          Sort & filter
        </ButtonComponent>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="brand.neutral600">Sort & Filter</DrawerHeader>

          <DrawerBody paddingX="0px">
            <FilterAndSorts />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const FilterAndSorts = () => {
  return (
    <Accordion allowToggle>
      <FilterTopBar padding="10px" />
      <Box width="100%" padding="8px 30px" backgroundColor="brand.neutral200">
        <Body1 semiBold color="brand.neutral800">
          Filter
        </Body1>
      </Box>
      <FilterByTags mobile />
      <FilterByRegion mobile />
      <FilterByStatus mobile />

      <Box width="100%" padding="8px 30px" backgroundColor="brand.neutral200">
        <Body1 semiBold color="brand.neutral800">
          Sort
        </Body1>
      </Box>
      <MobileSort />
    </Accordion>
  )
}
