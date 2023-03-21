import { Box } from '@chakra-ui/react'
import { BsArrowLeft } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'

import { ButtonComponent } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { useMobileMode } from '../../../../utils'

export const ProjectBackButton = () => {
  const { mobileView } = useProjectContext()
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

  return (
    <Box padding={{ base: '10px 2px 2px 10px', md: '20px 2px 2px 20px' }}>
      <ButtonComponent
        to={getPath('landingPage')}
        size="sm"
        leftIcon={<BsArrowLeft fontSize="20px" />}
        onClick={handleGoBack}
      >
        back
      </ButtonComponent>
    </Box>
  )
}
