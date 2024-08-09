import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { getPath } from '@/shared/constants'

export const CreateProjectButton = () => {
  const { t } = useTranslation()
  return (
    <Button
      as={Link}
      to={getPath('launchStart')}
      size="lg"
      variant="outline"
      colorScheme="primary1"
      leftIcon={<PiRocketLaunch />}
    >
      {t('Create project')}
    </Button>
  )
}
