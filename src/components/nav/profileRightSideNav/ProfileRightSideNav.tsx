import { HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuList } from '@chakra-ui/menu'

import { TopNavBarMenuList } from '../topNavBarMenu/TopNavBarMenuList'

export const ProfileRightSideNav = () => {
  return (
    <Menu size={'xm'} placement="bottom-end" isOpen={true}>
      <MenuList
        marginLeft="10px"
        minWidth={100}
        width="full"
        borderWidth="0px"
        rootProps={{ width: '100%', maxWidth: '200px' }}
        backgroundColor="neutral.0"
        shadow="none"
      >
        <TopNavBarMenuList />
      </MenuList>
    </Menu>
  )
}
