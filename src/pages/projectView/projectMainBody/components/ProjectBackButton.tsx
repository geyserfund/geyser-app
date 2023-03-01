import { Box } from '@chakra-ui/react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { ButtonComponent } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'

export const ProjectBackButton = () => {
  const { mobileView } = useProjectContext()

  if (mobileView && mobileView !== MobileViews.description) {
    return null
  }

  return (
    <Box padding={{ base: '10px 2px 2px 10px', md: '20px 2px 2px 20px' }}>
      <ButtonComponent
        as={Link}
        to={getPath('landingPage')}
        size="sm"
        leftIcon={<BsArrowLeft fontSize="20px" />}
      >
        back
      </ButtonComponent>
    </Box>
  )
}
