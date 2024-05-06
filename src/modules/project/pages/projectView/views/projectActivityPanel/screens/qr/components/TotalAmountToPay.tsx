import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../../../components/typography'
import { useFundCalc } from '../../../../../../../../../helpers'
import { useFundingContext } from '../../../../../../../context'

export const TotalAmountToPay = () => {
  const { t } = useTranslation()

  const {
    fundForm: { state: formState },
    project,
  } = useFundingContext()

  const { getTotalAmount } = useFundCalc(formState)

  if (!project || !project.name) return null

  return (
    <HStack w="full" justifyContent="center">
      <Body1 color="neutral.900" semiBold>
        {' '}
        {t('Total to Pay')}:{' '}
      </Body1>
      <HStack>
        <Body1 color="neutral.900" xBold>
          {`$${getTotalAmount('dollar', project.name)}`}
        </Body1>
        <Body1 color="neutral.700">{`(${getTotalAmount('sats', project.name).toLocaleString()} sats)`}</Body1>
      </HStack>
    </HStack>
  )
}
