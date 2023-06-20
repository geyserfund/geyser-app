import { Button, HStack } from '@chakra-ui/react'
import { BsLightningChargeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { isActive, useMobileMode } from '../../../../utils'
import { ProjectBackButton } from './ProjectBackButton'

export const ProjectMobileNavigation = () => {
  const {
    mobileView,
    project,
    setMobileView,
    isProjectOwner,
    onCreatorModalOpen,
  } = useProjectContext()

  const isMobile = useMobileMode()

  if (
    !project ||
    (isMobile && mobileView && mobileView !== MobileViews.description)
  ) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  return (
    <HStack padding="10px 10px 2px 10px">
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
            Dashboard
          </Button>
          <Button
            flexGrow={1}
            size="sm"
            variant="primary"
            onClick={() => onCreatorModalOpen()}
          >
            Create
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
          Contribute
        </Button>
      )}
    </HStack>
  )
}
