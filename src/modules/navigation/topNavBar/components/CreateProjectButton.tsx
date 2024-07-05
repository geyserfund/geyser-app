import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { getPath } from '@/constants'

export const CreateProjectButton = () => {
  const { t } = useTranslation()
  return (
    <Button
      as={Link}
      to={getPath('publicProjectLaunch')}
      size="lg"
      variant="outline"
      colorScheme="primary1"
      leftIcon={<PiRocketLaunch />}
    >
      {t('Create project')}
    </Button>
  )
}
