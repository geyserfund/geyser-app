import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Body, BodyProps } from '@/shared/components/typography/Body.tsx'

import { isFiatSwapMethodAtom } from '../state/paymentMethodAtom.ts'

/** Displays the standard funding disclaimer text used across the application */
export const FundingDisclaimer = (props: BodyProps) => {
  const { t } = useTranslation()
  const isFiatSwapMethod = useAtomValue(isFiatSwapMethodAtom)

  return (
    <VStack w="full">
      {isFiatSwapMethod && (
        <Body light size="xs" {...props}>
          {t(
            'Any sensitive information shared during the verification process is securly handled by the verification provider.',
          )}
        </Body>
      )}
      <Body light size="xs" {...props}>
        {t(
          'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your product will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or product fulfillment.',
        )}
      </Body>
    </VStack>
  )
}
