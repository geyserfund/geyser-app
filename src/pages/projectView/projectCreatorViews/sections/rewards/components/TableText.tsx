import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const TableText = ({content}) => {
  const { t } = useTranslation()

  return (
    <p>{content}</p>
  )
}
