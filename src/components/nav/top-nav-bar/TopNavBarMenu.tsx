import { HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Avatar, HStack, MenuDivider, Stack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AboutUsUrl, FAQUrl, FeedbackUrl, getPath } from '../../../constants'
import { AuthContext } from '../../../context'
import { colors } from '../../../styles'
import { buttonCommon } from '../../../styles/common'
import { ProjectStatus } from '../../../types'
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

  const toDisplayProject =
    user.ownerOf?.length > 0
      ? user.ownerOf.find(
          (data) => data?.project?.status === ProjectStatus.Active,
        )?.project || user.ownerOf[0]?.project
      : undefined

  return (
    <Menu placement="bottom-end">
      <MenuButton
        padding="5px 8px"
        aria-label="options"
        transition="all 0.2s"
        maxHeight="32px"
        borderRadius="md"
        color={textColor}
        backgroundColor="brand.bgWhite"
        _hover={{ backgroundColor: colors.gray200 }}
        border={'1px'}
        borderColor="brand.bgGrey3"
        sx={buttonCommon}
      >
        <HStack
          color={useColorModeValue('brand.gray500', 'brand.gray200')}
          spacing="4px"
        >
          <HamburgerIcon color={'#ADB5BD'} fontSize="22px" />

          {isLoggedIn ? (
            <Avatar height="22px" width="22px" src={user.imageUrl || ''} />
          ) : null}
        </HStack>
      </MenuButton>

      <MenuList width="150px">
        {shouldShowSignInMenuItem ? (
          <>
            <MenuItem as={Stack} px={4} py={2}>
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
            <MenuItem as={Stack} px={4} py={2}>
              <ButtonComponent
                primary
                variant="solid"
                width="100%"
                onClick={onDashboardSelected}
              >
                Edit project
              </ButtonComponent>
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {shouldShowMyProjectsMenuItem ? (
          <>
            <MenuItem as={Stack} px={4} py={2}>
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
              _hover={{ backgroundColor: 'neutral.200' }}
              width="100%"
              overflow="hidden"
            >
              <NavBarUserProfileMenuItem />
            </MenuItem>

            {isUserAProjectCreator && toDisplayProject && (
              <MenuItem
                padding={0}
                as={Link}
                to={getPath('project', toDisplayProject.name)}
                _focus={{ boxShadow: 'none' }}
              >
                <NavBarUserProjectMenuItem project={toDisplayProject} />
              </MenuItem>
            )}

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
