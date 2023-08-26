import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import { useCommands } from '@remirror/react'
import { useTranslation } from 'react-i18next'

export const TableCellMenuComponent = () => {
  const { t } = useTranslation()
  const commands = useCommands()

  return (
    <Menu>
      <MenuButton
        mr="5px"
        size="sm"
        as={IconButton}
        icon={<ChevronDownIcon />}
        border="1px solid"
        borderRadius="4px"
        borderColor="neutral.200"
        _hover={{ color: 'primary.400', borderColor: 'primary.400' }}
      />
      <MenuList
        as={VStack}
        bg="neutral.0"
        border="1px solid"
        borderColor="neutral.200"
        borderRadius={'4px'}
      >
        <ModifiedMenuItem onClick={() => commands.addTableRowBefore()}>
          {t('Add row above')}
        </ModifiedMenuItem>
        <ModifiedMenuItem onClick={() => commands.addTableRowAfter()}>
          {t('Add row below')}
        </ModifiedMenuItem>
        <ModifiedMenuItem onClick={() => commands.addTableColumnBefore()}>
          {t('Add column left')}
        </ModifiedMenuItem>
        <ModifiedMenuItem onClick={() => commands.addTableColumnAfter()}>
          {t('Add column right')}
        </ModifiedMenuItem>
        <ModifiedMenuItem onClick={() => commands.deleteTableColumn()}>
          {t('Remove column')}
        </ModifiedMenuItem>
        <ModifiedMenuItem onClick={() => commands.deleteTableRow()}>
          {t('Remove row')}
        </ModifiedMenuItem>
      </MenuList>
    </Menu>
  )
}

const ModifiedMenuItem = (props: MenuItemProps) => {
  return (
    <MenuItem
      paddingX="10px"
      paddingY="5px"
      _hover={{ bg: 'neutral.200' }}
      {...props}
    />
  )
}
