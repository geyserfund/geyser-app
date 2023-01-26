import { HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Avatar, HStack, MenuDivider } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AboutUsUrl, FAQUrl, FeedbackUrl, getPath } from '../../../constants'
import { AuthContext } from '../../../context'
import { colors } from '../../../styles'
import { buttonCommon } from '../../../styles/common'
import { ButtonComponent } from '../../ui'
import { MenuItemLink } from './MenuItemLink'
import { NavBarUserProfileMenuItem } from './NavBarUserProfileMenuItem'
import { NavBarUserProjectMenuItem } from './NavBarUserProjectMenuItem'

type Props = {
  shouldShowDashboardMenuItem: boolean
  shouldShowSignInMenuItem: boolean
  shouldShowMyProjectsMenuItem: boolean
  onDashboardSelected: () => void
  onMyProjectsSelected: () => void
  onSignInSelected: () => void
  onSignOutSelected: () => void
}

export const TopNavBarMenu = ({
  shouldShowSignInMenuItem,
  shouldShowDashboardMenuItem,
  shouldShowMyProjectsMenuItem,
  onSignInSelected,
  onDashboardSelected,
  onMyProjectsSelected,
  onSignOutSelected,
}: Props) => {
  const textColor = useColorModeValue(colors.textBlack, colors.textWhite)

  const { user, isLoggedIn, isUserAProjectCreator } = useContext(AuthContext)

  return (
    <Menu placement="bottom-end">
      <MenuButton
        px={2.5}
        py={2.5}
        aria-label="options"
        transition="all 0.2s"
        maxHeight="40px"
        borderRadius="md"
        color={textColor}
        backgroundColor="brand.white"
        _hover={{ backgroundColor: colors.gray200 }}
        border={'1px'}
        borderColor="brand.bgGrey3"
        sx={buttonCommon}
      >
        <HStack
          color={useColorModeValue('brand.gray500', 'brand.gray200')}
          background="transparent"
        >
          <HamburgerIcon color={'#ADB5BD'} />

          {isLoggedIn ? (
            <Avatar height="22px" width="22px" src={user.imageUrl || ''} />
          ) : null}
        </HStack>
      </MenuButton>

      <MenuList width="150px">
        {shouldShowSignInMenuItem ? (
          <>
            <MenuItem px={4} py={2}>
              <ButtonComponent
                variant="solid"
                width="100%"
                onClick={onSignInSelected}
              >
                Connect
              </ButtonComponent>
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {shouldShowDashboardMenuItem ? (
          <>
            <MenuItem px={4} py={2}>
              <ButtonComponent
                primary
                variant="solid"
                width="100%"
                onClick={onDashboardSelected}
              >
                Dashboard
              </ButtonComponent>
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {shouldShowMyProjectsMenuItem ? (
          <>
            <MenuItem px={4} py={2}>
              <ButtonComponent
                primary
                variant="solid"
                width="100%"
                onClick={onMyProjectsSelected}
              >
                View my projects
              </ButtonComponent>
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {isLoggedIn ? (
          <>
            <MenuItem
              padding={0}
              as={Link}
              to={getPath('userProfile', user.id)}
              _focus={{ boxShadow: 'none' }}
            >
              <NavBarUserProfileMenuItem />
            </MenuItem>

            {isUserAProjectCreator && user.ownerOf[0]?.project ? (
              <MenuItem
                padding={0}
                as={Link}
                to={getPath('project', user.ownerOf[0].project.name)}
                _focus={{ boxShadow: 'none' }}
              >
                <NavBarUserProjectMenuItem project={user.ownerOf[0].project} />
              </MenuItem>
            ) : null}

            <MenuDivider />
          </>
        ) : null}

        <MenuItem as={Link} to={getPath('index')} fontWeight={'bold'}>
          Recent Activity
        </MenuItem>

        <MenuItem
          fontWeight={'bold'}
          as={Link}
          to={getPath('projectDiscovery')}
        >
          Discover Projects
        </MenuItem>

        <MenuItem fontWeight={'bold'} as={Link} to={getPath('grants')}>
          Grants
        </MenuItem>

        <MenuDivider />

        <MenuItem color={'brand.gray500'}>
          <MenuItemLink destinationPath={AboutUsUrl} isExternal>
            About
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'brand.gray500'}>
          <MenuItemLink destinationPath={FAQUrl} isExternal>
            FAQ
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'brand.gray500'}>
          <MenuItemLink destinationPath={FeedbackUrl} isExternal>
            Feedback
          </MenuItemLink>
        </MenuItem>

        {isLoggedIn ? (
          <>
            <MenuDivider />

            <MenuItem
              onClick={onSignOutSelected}
              color={'brand.gray500'}
              px={4}
              py={2}
            >
              Sign Out
            </MenuItem>
          </>
        ) : null}
      </MenuList>
    </Menu>
  )
}
