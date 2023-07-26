import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface Props extends ButtonProps {
  isEdit?: boolean
}

export const FormContinueButton = ({ isEdit, ...rest }: Props) => {
  const { t } = useTranslation()
  return (
    <Button variant="primary" {...rest}>
      {isEdit ? t('Save') : t('Continue')}
    </Button>
  )
}
