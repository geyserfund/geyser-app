import { Button, ButtonProps } from '@chakra-ui/react'
import { BsArrowLeft } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPath } from '../../../../constants'

export const ProjectBackButton = (props: ButtonProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoBack = () => {
    if (location.key) {
      navigate(-1)
    } else {
      navigate(getPath('landingPage'))
    }
  }

  return (
    <Button
      variant="containedClear"
      size="sm"
      leftIcon={<BsArrowLeft fontSize="20px" />}
      onClick={handleGoBack}
      {...props}
    >
      Back
    </Button>
  )
}
