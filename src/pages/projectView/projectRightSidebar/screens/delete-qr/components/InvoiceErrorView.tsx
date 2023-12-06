import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiRefresh } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'

import { Body2 } from '../../../../../../components/typography'

export const InvoiceErrorView = ({
  onRefreshSelected,
}: {
  onRefreshSelected: () => void
}) => {
  const { t } = useTranslation()
  return (
    <VStack
      height={248}
      width={252}
      spacing="10px"
      padding={3}
      backgroundColor={'primary.100'}
      justifyContent="center"
      borderRadius={'md'}
    >
      <BsExclamationCircle fontSize={'2em'} />

      <Body2 bold>{t('Invoice was cancelled or expired.')}</Body2>
      <Body2>{t('Click refresh to try again')}</Body2>

      <Button
        leftIcon={<BiRefresh fontSize={'2em'} />}
        iconSpacing={2}
        backgroundColor={'neutral.0'}
        textTransform={'uppercase'}
        onClick={onRefreshSelected}
        borderRadius={'full'}
        fontSize={'10px'}
      >
        {t('Refresh')}
      </Button>
    </VStack>
  )
}
