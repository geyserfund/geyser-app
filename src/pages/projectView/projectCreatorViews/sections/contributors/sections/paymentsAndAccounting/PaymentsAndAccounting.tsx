import { VStack } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
import { standardPadding } from '../../../../../../../styles'
import { PaymentsAndAccoutningList } from './PaymentsAndAccoutningList'

export const PaymentsAndAccounting = () => {
  return (
    <VStack w="full" alignItems="flex-start">
      <Body1 px={standardPadding}>
        <Trans i18nKey="This page is for reviewing all your received contributions (donations and reward purchases). For more information about each transaction you can <1>Export</1> the CSV file.">
          {
            'This page is for reviewing all your received contributions (donations and reward purchases). For more information about each transaction you can '
          }
          <strong>Export</strong>
          {' the CSV file.'}
        </Trans>
      </Body1>
      <PaymentsAndAccoutningList />
    </VStack>
  )
}
