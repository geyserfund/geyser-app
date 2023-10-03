import { HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { Avatar, HStack } from '@chakra-ui/react'
import { useContext } from 'react'

import { AuthContext } from '../../context'
import { buttonCommon } from '../../styles'
import { TopNavBarMenuList } from './TopNavBarMenuList'

type Props = {
  isOpen?: boolean
}

export const TopNavBarMenu = ({ isOpen }: Props) => {
  const { user, isLoggedIn } = useContext(AuthContext)

  return (
    <Menu placement="bottom-end" isOpen={isOpen}>
      {!isOpen && (
        <MenuButton
          padding="5px 8px"
          aria-label="options"
          transition="all 0.2s"
          maxHeight="32px"
          borderRadius="md"
          data-testid="topnavbar-dropdown-menu"
          color="neutral.1000"
          backgroundColor="neutral.0"
          _hover={{ backgroundColor: 'neutral.100' }}
          border={'1px'}
          borderColor="neutral.200"
          sx={buttonCommon}
        >
          <HStack color="neutral.700" spacing="4px">
            <HamburgerIcon color="neutral.500" fontSize="22px" />

            {isLoggedIn ? (
              <Avatar height="22px" width="22px" src={user.imageUrl || ''} />
            ) : null}
          </HStack>
        </MenuButton>
      )}

      <MenuList width="150px">
        <TopNavBarMenuList />
      </MenuList>
    </Menu>
  )
}
