import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router'

import { getPath } from '@/shared/constants'

type CreateProjectButtonProps = {
  iconOnly?: boolean
} & ButtonProps

export const CreateProjectButton = ({ iconOnly, ...props }: CreateProjectButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      as={Link}
      to={getPath('launchStart')}
      size="lg"
      variant="outline"
      colorScheme="primary1"
      leftIcon={iconOnly ? undefined : <PiRocketLaunch />}
      {...props}
    >
      {iconOnly ? <PiRocketLaunch /> : t('Create project')}
    </Button>
  )
}
