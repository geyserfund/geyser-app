import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsExclamationCircle } from 'react-icons/bs'

import { Body2 } from '../../../../../../components/typography'

export const FundingErrorView = ({ error }: { error?: string }) => {
  const { t } = useTranslation()
  return (
    <VStack
      height={248}
      width={252}
      spacing="10px"
      padding={3}
      backgroundColor={'secondary.red'}
      justifyContent="center"
      borderRadius={'md'}
    >
      <BsExclamationCircle fontSize={'2em'} />
      <Body2 bold>{t('Funding failed')}</Body2>
      {error && <Body2 fontSize="12px">{`Error: ${error}`}</Body2>}
    </VStack>
  )
}
