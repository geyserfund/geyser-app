import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'

import { useLaunchNow } from '@/modules/project/pages/projectCreation/hooks/useLaunchNow.tsx'

type CreateProjectButtonProps = {
  iconOnly?: boolean
  label?: string
  noIcon?: boolean
} & ButtonProps

/** Starts the project creation flow, prompting for sign-in or a social account first when needed. */
export const CreateProjectButton = ({ iconOnly, label, noIcon, ...props }: CreateProjectButtonProps) => {
  const { t } = useTranslation()
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        fontWeight={600}
        fontSize={{ lg: 'sm', xl: 'md' }}
        leftIcon={iconOnly || noIcon ? undefined : <PiRocketLaunch />}
        onClick={handleLauchNowClick}
        {...props}
      >
        {iconOnly ? <PiRocketLaunch /> : label || t('Create project')}
      </Button>
      {renderModal()}
    </>
  )
}
