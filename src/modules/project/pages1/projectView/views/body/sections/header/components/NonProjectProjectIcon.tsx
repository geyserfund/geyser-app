import { Box, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiHeartbeatFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { LegalEntityType, Maybe, UserTaxProfile } from '@/types/index.ts'
import { useMobileMode } from '@/utils/index.ts'

export const NonProjectProjectIcon = ({ taxProfile }: { taxProfile?: Maybe<Partial<UserTaxProfile>> }) => {
  const isMobile = useMobileMode()

  const countries = useAtomValue(countriesAtom)

  if (taxProfile?.legalEntityType !== LegalEntityType.NonProfit || !taxProfile?.verified) {
    return null
  }

  const country = countries.find((country) => country.code === taxProfile?.country)

  return (
    <Popover trigger={isMobile ? 'click' : 'hover'} strategy="fixed">
      <PopoverTrigger>
        <Box as="span" marginLeft={2}>
          <Icon as={PiHeartbeatFill} color="orange.11" boxSize={5} />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody maxWidth="300px">
          <Body size="sm">
            {t(
              'This is a project is run by a non-profit in {{country}}. Your donation is tax-deductible and comes with a receipt for your tax records.',
              { country: country?.name },
            )}
          </Body>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
