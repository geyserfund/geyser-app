import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'

import { FilterAndSorts } from './FilterAndSorts'

interface FilterDrawerProps extends Omit<DrawerProps, 'children'> {
  title?: string
}

export const FilterDrawer = ({ title, ...rest }: FilterDrawerProps) => {
  return (
    <Drawer placement="right" {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="brand.neutral600">
          {title || 'Sort & Filter'}
        </DrawerHeader>

        <DrawerBody paddingX="0px">
          <FilterAndSorts />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
