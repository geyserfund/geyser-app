import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { FilterAndSorts } from './FilterAndSorts'

interface FilterDrawerProps extends Omit<DrawerProps, 'children'> {
  title?: string
}

export const FilterDrawer = ({ title, ...rest }: FilterDrawerProps) => {
  const { t } = useTranslation()
  return (
    <Drawer placement="right" {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="neutral.600">
          {title || t('Sort & Filter')}
        </DrawerHeader>

        <DrawerBody paddingX="0px">
          <FilterAndSorts />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
