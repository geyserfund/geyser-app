import { HamburgerIcon } from '@chakra-ui/icons'
import { Button, HStack, IconButton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsLightningChargeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { isActive, useMobileMode } from '../../../../utils'
import { useSideNavbarAtom } from '../sideNavAtom'
import { ProjectBackButton } from './ProjectBackButton'

export const ProjectMobileNavigation = () => {
  const {
    mobileView,
    project,
    setMobileView,
    isProjectOwner,
    onCreatorModalOpen,
  } = useProjectContext()

  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const [sideNav, setSideNav] = useSideNavbarAtom()

  if (
    !project ||
    (isMobile && mobileView && mobileView !== MobileViews.description)
  ) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  return (
    <HStack
      padding={3}
      bg="neutral.0"
      borderBottom="2px solid"
      borderColor="neutral.200"
    >
      <IconButton
        aria-label="sidebar-menu-trigger"
        icon={<HamburgerIcon />}
        onClick={() => setSideNav({ open: !sideNav.open })}
      />
      <ProjectBackButton flexGrow={isProjectOwner ? 1 : 0} />

      {isProjectOwner ? (
        <>
          <Button
            as={Link}
            to={getPath('projectDashboard', project.name)}
            flexGrow={1}
            size="sm"
            variant="secondary"
          >
            {t('Dashboard')}
          </Button>
          <Button
            flexGrow={1}
            size="sm"
            variant="primary"
            onClick={() => onCreatorModalOpen()}
          >
            {t('Create')}
          </Button>
        </>
      ) : (
        <Button
          size="sm"
          flexGrow={1}
          variant="primary"
          isDisabled={isFundingDisabled}
          leftIcon={<BsLightningChargeFill />}
          onClick={() => setMobileView(MobileViews.funding)}
        >
          {t('Contribute')}
        </Button>
      )}
    </HStack>
  )
}
