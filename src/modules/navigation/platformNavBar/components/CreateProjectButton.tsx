import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router'

import { getPath } from '@/shared/constants'

type CreateProjectButtonProps = {
  iconOnly?: boolean
  label?: string
  noIcon?: boolean
} & ButtonProps

export const CreateProjectButton = ({ iconOnly, label, noIcon, ...props }: CreateProjectButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      as={Link}
      to={getPath('launchStart')}
      size="lg"
      variant="outline"
      colorScheme="primary1"
      leftIcon={iconOnly || noIcon ? undefined : <PiRocketLaunch />}
      {...props}
    >
      {iconOnly ? <PiRocketLaunch /> : label || t('Create project')}
    </Button>
  )
}
