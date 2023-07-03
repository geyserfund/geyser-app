import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = ButtonProps

export const FormContinueButton = (props: Props) => {
  const { t } = useTranslation()
  return (
    <Button variant="primary" {...props}>
      {t('Continue')}
    </Button>
  )
}
