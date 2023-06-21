import { Button, HStack } from '@chakra-ui/react'
import { BsLightningChargeFill } from 'react-icons/bs'

import { MobileViews, useProjectContext } from '../../../../context'
import { isActive, useMobileMode } from '../../../../utils'
import { ProjectBackButton } from './ProjectBackButton'

export const ProjectMobileNavigation = () => {
  const { mobileView, project, setMobileView } = useProjectContext()

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
      <ProjectBackButton />
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
    </HStack>
  )
}
