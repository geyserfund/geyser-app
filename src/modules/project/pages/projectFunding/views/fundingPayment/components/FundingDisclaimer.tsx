import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, BodyProps } from '@/shared/components/typography/Body.tsx'

/** Displays the standard funding disclaimer text used across the application */
export const FundingDisclaimer = (props: BodyProps) => {
  return (
    <VStack w="full" spacing={0}>
      <Body light size="xs" {...props}>
        {t(
          'Geyser helps fund valuable projects with Bitcoin. Contributions support ideas in progress, and outcomes are not guaranteed.',
        )}
      </Body>
    </VStack>
  )
}
