import { Button, ButtonProps, ComponentWithAs, forwardRef } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiDotsThree } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

interface CreatorEditButtonProps extends ButtonProps {
  /** Show three dots for the menu */
  isMenu?: boolean
}

/** Edit button for creator, can only be used inside project context */
export const CreatorEditButton: ComponentWithAs<'button', CreatorEditButtonProps> = forwardRef(
  ({ isMenu, ...props }: CreatorEditButtonProps, ref) => {
    const { isProjectOwner } = useProjectAtom()
    const { t } = useTranslation()

    if (!isProjectOwner) return null
    return (
      <Button
        ref={ref}
        size="sm"
        variant="outline"
        colorScheme="neutral1"
        justifySelf="end"
        rightIcon={isMenu ? <PiDotsThree /> : undefined}
        {...props}
      >
        {t('Edit')}
      </Button>
    )
  },
)
