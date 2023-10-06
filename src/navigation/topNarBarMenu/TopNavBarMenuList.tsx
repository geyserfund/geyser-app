import { DownloadIcon } from '@chakra-ui/icons'
import { MenuItem } from '@chakra-ui/menu'
import { Button, MenuDivider, MenuGroup, Stack, VStack } from '@chakra-ui/react'
import { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { FAQUrl, FeedbackUrl, getPath, PathName } from '../../constants'
import {
  AuthContext,
  useNavContext,
  useServiceWorkerUpdate,
} from '../../context'
import { MobileDivider } from '../../pages/grants/components'
import { ProjectStatus } from '../../types'
import { useMobileMode } from '../../utils'
import { useRouteMatchesForTopNavBar } from '../topNavBar/topNavBarAtom'
import {
  MenuItemLink,
  ModeChange,
  NavBarUserProfileMenuItem,
  NavBarUserProjectMenuItem,
} from './components'

export const TopNavBarMenuList = ({ sideNav }: { sideNav?: boolean }) => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()
  const { user, isLoggedIn, isUserAProjectCreator, loginOnOpen, logout } =
    useContext(AuthContext)
  const { canInstall, handlePrompt } = useServiceWorkerUpdate()

  const { hideMyProjectsButton, showSignInButton } =
    useRouteMatchesForTopNavBar()

  const navigate = useNavigate()
  const { navData } = useNavContext()
  const location = useLocation()
  const currentPathName = location.pathname

  const userHasOnlyOneProject: boolean = useMemo(() => {
    return user.ownerOf?.length === 1
  }, [user.ownerOf])

  const onMyProjectsSelected = useCallback(() => {
    navigate(getPath('userProfile', user.id))
  }, [user.id, navigate])

  const isViewingOwnProject: boolean = useMemo(() => {
    return (
      (currentPathName.startsWith(`/${PathName.entry}`) ||
        currentPathName.startsWith(
          `/${PathName._deprecatedPathNameForProject}`,
        ) ||
        currentPathName.startsWith(`/${PathName.project}`)) &&
      navData.projectOwnerIDs.includes(Number(user.id))
    )
  }, [user.id, navData.projectOwnerIDs, currentPathName])

  const shouldShowMyProjectsMenuItem: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject === false &&
      hideMyProjectsButton === false &&
      !userHasOnlyOneProject
    )
  }, [
    hideMyProjectsButton,
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    userHasOnlyOneProject,
  ])

  const shouldShowSignInMenuItem: boolean = useMemo(() => {
    return isLoggedIn === false && isMobile === true && showSignInButton
  }, [showSignInButton, isLoggedIn, isMobile])

  const toDisplayProject =
    user.ownerOf?.length > 0
      ? user.ownerOf.find(
          (data) => data?.project?.status === ProjectStatus.Active,
        )?.project || user.ownerOf[0]?.project
      : undefined

  return (
    <>
      <MenuGroup as={VStack} w="full" spacing="0">
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
      </MenuGroup>
      <MenuGroup as={VStack} spacing="0" style={{ width: '100%' }}>
        <MobileDivider />
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
      </MenuGroup>
    </>
  )
}
