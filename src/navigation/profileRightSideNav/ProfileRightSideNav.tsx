import { Menu, MenuList } from '@chakra-ui/menu'
import { VStack } from '@chakra-ui/react'

import { TopNavBarMenuList } from '../topNarBarMenu/TopNavBarMenuList'
import { useProfileSideNavAtom } from './profileSideNavAtom'

export const ProfileRightSideNav = () => {
  const [_, changeProjectSideNavOpen] = useProfileSideNavAtom()
  return (
    <Menu
      placement="bottom-end"
      isOpen={true}
      closeOnSelect={true}
      onClose={changeProjectSideNavOpen}
    >
      <MenuList
        minWidth={100}
        width="full"
        height="100%"
        borderWidth="0px"
        rootProps={{ width: '100%', height: '100%', maxWidth: '200px' }}
        backgroundColor="neutral.0"
        shadow="none"
        as={VStack}
        justifyContent="space-between"
      >
        <TopNavBarMenuList />
      </MenuList>
    </Menu>
  )
}
