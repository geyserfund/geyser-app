import { Box, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiHeartbeatFill } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { LegalEntityType, useProjectCountriesGetQuery } from '@/types/index.ts'
import { useMobileMode } from '@/utils/index.ts'

export const NonProjectProjectIcon = () => {
  const isMobile = useMobileMode()
  const { projectOwner } = useProjectAtom()

  const { data } = useProjectCountriesGetQuery()

  console.log(projectOwner?.user?.taxProfile)

  if (projectOwner?.user?.taxProfile?.legalEntityType !== LegalEntityType.NonProfit) {
    return null
  }

  const country = data?.projectCountriesGet.find(
    (country) => country.country.code === projectOwner?.user?.taxProfile?.country,
  )

  return (
    <Popover trigger={isMobile ? 'click' : 'hover'}>
      <PopoverTrigger>
        <Box as="span" marginLeft={2}>
          <Icon as={PiHeartbeatFill} color="blue.11" boxSize={5} />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody maxWidth="300px">
          <Body size="sm">
            {t(
              'This is a project is run by a non-profit in {{country}}. Your donation is tax-deductible and comes with a receipt for your tax records.',
              { country: country?.country.name },
            )}
          </Body>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
