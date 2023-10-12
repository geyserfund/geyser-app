import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsArrowLeft } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPath } from '../../../../constants'

export const ProjectBackButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoBack = () => {
    if (location.key && location.key !== 'default') {
      navigate(-1)
    } else {
      navigate(getPath('landingPage'))
    }
  }

  return (
    <Button
      variant="secondary"
      size={{ base: 'sm', lg: 'md' }}
      leftIcon={<BsArrowLeft fontSize="20px" />}
      {...props}
      onClick={(event) => {
        if (props.onClick) props.onClick(event)
        handleGoBack()
      }}
    >
      {t('Back')}
    </Button>
  )
}
