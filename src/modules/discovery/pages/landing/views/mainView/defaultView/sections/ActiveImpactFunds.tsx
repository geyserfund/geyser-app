import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { LabifBanner } from '@/shared/components/LabifBanner.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

type ActiveImpactFundsProps = {
  labifCommittedAmount: string
}

/** Landing-page impact fund section containing LABIF. */
export const ActiveImpactFunds = ({ labifCommittedAmount }: ActiveImpactFundsProps): JSX.Element => {
  return (
    <VStack w="full" align="stretch" spacing={5}>
      <HStack w="full" justify="space-between" align="center" gap={4}>
        <H3 size={{ base: 'md', lg: '2xl' }} bold sx={{ textWrap: 'balance' }}>
          {t('Regional Partner in Geyser Impact Fund')}
        </H3>
        <DiscoverMoreButton as={Link} to={getPath('impactFunds')} />
      </HStack>

      <LabifBanner
        learnMoreTo={getPath('impactFunds', 'latam-impact-fund')}
        applicationTo={`${getPath('impactFunds', 'latam-impact-fund')}#apply`}
        committedAmount={labifCommittedAmount}
      />
    </VStack>
  )
}
