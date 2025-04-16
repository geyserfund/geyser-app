import { HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { fundingFormStateAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { Body } from '@/shared/components/typography'

import { commaFormatted } from '../../../../../../../utils'

/** Only to be used inside the funding context, after the fund mutation is initiated */
export const TotalAmountToPay = () => {
  const { t } = useTranslation()

  const formState = useAtomValue(fundingFormStateAtom)
  return (
    <HStack w="full" justifyContent="center">
      <Body light>{t(' Total to pay')}: </Body>

      <Body>
        {`${commaFormatted(formState.totalAmount)} `}

        <Body as="span" light>
          sats
        </Body>
      </Body>
      <Body light>{`($${commaFormatted(formState.totalAmountUsdCent / 100)})`}</Body>
    </HStack>
  )
}
