import { Box, Button, HStack } from '@chakra-ui/react'
import { BsArrowLeft, BsLightningChargeFill } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { isActive, useMobileMode } from '../../../../utils'

export const ProjectBackButton = () => {
  const { mobileView, project, setMobileView } = useProjectContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMobileMode()

  const handleGoBack = () => {
    if (location.key) {
      navigate(-1)
    } else {
      navigate(getPath('landingPage'))
    }
  }

  if (isMobile && mobileView && mobileView !== MobileViews.description) {
    return null
  }

  const isFundingDisabled = !isActive(project?.status)

  return (
    <Box>
      <HStack
        padding={{ base: '10px 10px 2px 10px', md: '20px 10px 2px 10px' }}
      >
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<BsArrowLeft fontSize="20px" />}
          onClick={handleGoBack}
        >
          back
        </Button>
        {isMobile ? (
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
        ) : null}
      </HStack>
    </Box>
  )
}
