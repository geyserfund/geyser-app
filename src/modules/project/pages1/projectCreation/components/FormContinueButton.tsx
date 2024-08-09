import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface Props extends ButtonProps {
  isEdit?: boolean
  isSkip?: boolean
}

export const FormContinueButton = ({ isEdit, isSkip, ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Button variant="solid" colorScheme="primary1" {...rest}>
      {isSkip ? t('Skip') : isEdit ? t('Save') : t('Continue')}
    </Button>
  )
}
