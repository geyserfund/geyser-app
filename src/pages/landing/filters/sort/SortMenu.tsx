import {
  Button,
  CloseButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsSliders } from 'react-icons/bs'

import { Body2 } from '../../../../components/typography'
import { useFilterContext } from '../../../../context'
import { SortBody } from './SortBody'
import { getCurrentSelection } from './sortSelection'

export const SortMenu = () => {
  const { t } = useTranslation()
  const { filters } = useFilterContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton as={Button} size="xs" backgroundColor="neutral.100">
        <HStack overflow="hidden">
          <Body2 semiBold isTruncated>
            {t(getCurrentSelection(filters.sort))}
          </Body2>
          <BsSliders fontSize="16px" />
        </HStack>
      </MenuButton>
      <MenuList>
        <HStack width="100%" padding="5px 10px" justifyContent="space-between">
          <Body2>{`${t('Sort By')}:`}</Body2>
          <CloseButton onClick={onClose} />
        </HStack>
        <SortBody />
      </MenuList>
    </Menu>
  )
}
