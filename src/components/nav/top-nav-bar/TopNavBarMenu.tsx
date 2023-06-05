import { HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  MenuDivider,
  Stack,
  Tooltip,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AboutUsUrl, FAQUrl, FeedbackUrl, getPath } from '../../../constants'
import { AuthContext } from '../../../context'
import { buttonCommon } from '../../../styles/common'
import { ProjectStatus } from '../../../types'
import { ColorModeSwitcher } from '../../../utils'
import { SatSymbolIcon } from '../../icons'
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

      <MenuList width="150px">
        {shouldShowSignInMenuItem ? (
          <>
            <MenuItem as={Stack} px={4} py={2}>
              <Button
                variant="secondary"
                width="100%"
                onClick={onSignInSelected}
              >
                Connect
              </Button>
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {shouldShowDashboardMenuItem ? (
          <>
            <MenuItem as={Stack} px={4} py={2}>
              <Button
                variant="primary"
                width="100%"
                onClick={onDashboardSelected}
              >
                Edit project
              </Button>
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {shouldShowMyProjectsMenuItem ? (
          <>
            <MenuItem as={Stack} px={4} py={2}>
              <Button
                variant="primary"
                width="100%"
                onClick={onMyProjectsSelected}
              >
                View my projects
              </Button>
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

        <MenuItem color={'neutral.700'}>
          <MenuItemLink destinationPath={AboutUsUrl} isExternal>
            About
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'neutral.700'}>
          <MenuItemLink destinationPath={FAQUrl} isExternal>
            FAQ
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'neutral.700'}>
          <MenuItemLink destinationPath={FeedbackUrl} isExternal>
            Feedback
          </MenuItemLink>
        </MenuItem>

        {isLoggedIn ? (
          <>
            <MenuDivider />

            <MenuItem
              onClick={onSignOutSelected}
              color={'neutral.700'}
              px={4}
              py={2}
            >
              Sign Out
            </MenuItem>
          </>
        ) : null}
        <MenuDivider />
        <ModeChange />
      </MenuList>
    </Menu>
  )
}

export const ModeChange = () => {
  return (
    <HStack bgColor="neutral.200" borderRadius={8} mx={3} p={2} spacing={3}>
      <ColorModeSwitcher />
      <Tooltip label="currency">
        <IconButton
          bgColor="neutral.50"
          variant="primaryNeutral"
          aria-label="currency-convert"
          icon={<SatSymbolIcon color="neutral.600" />}
          isDisabled
        />
      </Tooltip>
      <Tooltip label="language">
        <Button
          bgColor="neutral.50"
          color="neutral.600"
          variant="primaryNeutral"
          isDisabled
        >
          English
        </Button>
      </Tooltip>
    </HStack>
  )
}
