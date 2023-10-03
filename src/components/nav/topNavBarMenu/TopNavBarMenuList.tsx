import { DownloadIcon } from '@chakra-ui/icons'
import { MenuItem } from '@chakra-ui/menu'
import { Button, MenuDivider, Stack } from '@chakra-ui/react'
import { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'

import { FAQUrl, FeedbackUrl, getPath, PathName } from '../../../constants'
import {
  AuthContext,
  useNavContext,
  useServiceWorkerUpdate,
} from '../../../context'
import { ProjectStatus } from '../../../types'
import { useMobileMode } from '../../../utils'
import { useRouteMatchesForTopNavBar } from '../topNavBar/topNavBarAtom'
import {
  MenuItemLink,
  ModeChange,
  NavBarUserProfileMenuItem,
  NavBarUserProjectMenuItem,
} from './elements'

export const TopNavBarMenuList = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()
  const { user, isLoggedIn, isUserAProjectCreator, loginOnOpen, logout } =
    useContext(AuthContext)
  const { canInstall, handlePrompt } = useServiceWorkerUpdate()

  const { hideDashboardButton, hideMyProjectsButton, showSignInButton } =
    useRouteMatchesForTopNavBar()

  const navigate = useNavigate()
  const { navData } = useNavContext()
  const location = useLocation()
  const currentPathName = location.pathname
  const currentProjectRouteMatch = matchPath(
    getPath('project', PathName.projectId),
    currentPathName,
  )

  const userHasOnlyOneProject: boolean = useMemo(() => {
    return user.ownerOf?.length === 1
  }, [user.ownerOf])

  const onDashboardSelected = useCallback(() => {
    if (userHasOnlyOneProject) {
      navigate(getPath('projectDashboard', user.ownerOf[0]?.project?.name))
      return
    }

    const projectName =
      currentProjectRouteMatch?.params?.projectId || navData.projectName

    if (projectName) {
      navigate(getPath('projectDashboard', projectName))
    } else {
      navigate(getPath('landingPage'))
    }
  }, [
    navigate,
    userHasOnlyOneProject,
    currentProjectRouteMatch,
    navData.projectName,
    user.ownerOf,
  ])

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

  const shouldShowDashboardMenuItem: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      (isViewingOwnProject || userHasOnlyOneProject) &&
      hideDashboardButton === false
    )
  }, [
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    userHasOnlyOneProject,
    hideDashboardButton,
  ])

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

      <MenuItem fontWeight={'bold'} as={Link} to={getPath('projectDiscovery')}>
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
    </>
  )
}
