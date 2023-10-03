import { DownloadIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Avatar, Button, HStack, MenuDivider, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { FAQUrl, FeedbackUrl, getPath } from '../../../constants'
import { AuthContext, useServiceWorkerUpdate } from '../../../context'
import { buttonCommon } from '../../../styles'
import { ProjectStatus } from '../../../types'
import { MenuItemLink } from './MenuItemLink'
import { ModeChange } from './ModeChange'
import { NavBarUserProfileMenuItem } from './NavBarUserProfileMenuItem'
import { NavBarUserProjectMenuItem } from './NavBarUserProjectMenuItem'

type Props = {
  shouldShowDashboardMenuItem: boolean
  shouldShowSignInMenuItem: boolean
  shouldShowMyProjectsMenuItem: boolean
  onDashboardSelected: () => void
  onMyProjectsSelected: () => void
  isOpen?: boolean
}

export const TopNavBarMenu = ({
  shouldShowSignInMenuItem,
  shouldShowDashboardMenuItem,
  shouldShowMyProjectsMenuItem,
  onDashboardSelected,
  onMyProjectsSelected,
  isOpen,
}: Props) => {
  const { t } = useTranslation()
  const { user, isLoggedIn, isUserAProjectCreator, loginOnOpen, logout } =
    useContext(AuthContext)
  const { canInstall, handlePrompt } = useServiceWorkerUpdate()

  const toDisplayProject =
    user.ownerOf?.length > 0
      ? user.ownerOf.find(
          (data) => data?.project?.status === ProjectStatus.Active,
        )?.project || user.ownerOf[0]?.project
      : undefined

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
        {shouldShowSignInMenuItem ? (
          <>
            <MenuItem as={Stack} px={4} py={2}>
              <Button variant="secondary" width="100%" onClick={loginOnOpen}>
                {t('Login')}
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
                {t('Edit project')}
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
                {t('View my projects')}
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
          {t('Recent Activity')}
        </MenuItem>

        <MenuItem
          fontWeight={'bold'}
          as={Link}
          to={getPath('projectDiscovery')}
        >
          {t('Discover Projects')}
        </MenuItem>

        <MenuItem fontWeight={'bold'} as={Link} to={getPath('grants')}>
          {t('Grants')}
        </MenuItem>

        <MenuDivider />

        <MenuItem color={'neutral.700'}>
          <MenuItemLink destinationPath={getPath('about')}>
            {t('About')}
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'neutral.700'}>
          <MenuItemLink destinationPath={FAQUrl} isExternal>
            {t('FAQ')}
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'neutral.700'}>
          <MenuItemLink destinationPath={FeedbackUrl} isExternal>
            {t('Feedback')}
          </MenuItemLink>
        </MenuItem>

        {isLoggedIn ? (
          <>
            <MenuDivider />

            <MenuItem onClick={logout} color={'neutral.700'} px={4} py={2}>
              {t('Sign Out')}
            </MenuItem>
          </>
        ) : null}
        <MenuDivider />
        <ModeChange />

        {canInstall && isLoggedIn && (
          <>
            <MenuDivider />
            <MenuItem as={Stack} px={4} py={2}>
              <Button
                variant="secondary"
                leftIcon={<DownloadIcon />}
                width="100%"
                onClick={handlePrompt}
              >
                {t('Install Geyser')}
              </Button>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}
