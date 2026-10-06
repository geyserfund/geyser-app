import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'

import { useLaunchNow } from '@/modules/project/pages/projectCreation/hooks/useLaunchNow.tsx'

/** Starts the project creation flow from the profile page. */
export const CreateAProjectButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  return (
    <>
      <Button
        variant="solid"
        colorScheme="primary1"
        marginTop="20px"
        px="10px"
        onClick={handleLauchNowClick}
        {...props}
        leftIcon={<Icon as={PiPlus} fontSize={'12px'} />}
      >
        {t('Create a project')}
      </Button>
      {renderModal()}
    </>
  )
}
