import { Menu, MenuList } from '@chakra-ui/menu'

import { TopNavBarMenuList } from '../topNarBarMenu/TopNavBarMenuList'
import { useProfileSideNavAtom } from './profileSideNavAtom'

export const ProfileRightSideNav = () => {
  const [_, changeProjectSideNavOpen] = useProfileSideNavAtom()
  return (
    <Menu
      size={'xm'}
      placement="bottom-end"
      isOpen={true}
      closeOnSelect={true}
      onClose={changeProjectSideNavOpen}
    >
      <MenuList
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
