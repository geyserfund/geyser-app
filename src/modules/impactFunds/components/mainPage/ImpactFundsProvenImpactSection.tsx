import { SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { H2 } from '@/shared/components/typography/Heading.tsx'

type ImpactFundsProvenImpactSectionProps = {
  totalDistributedSatsFormatted: string
  totalProjectsFundedFormatted: string
}

/** Centered headline stats only: distributed sats, projects funded, years in operation. */
export function ImpactFundsProvenImpactSection({
  totalDistributedSatsFormatted,
  totalProjectsFundedFormatted,
}: ImpactFundsProvenImpactSectionProps): JSX.Element {
  const statColor = useColorModeValue('neutral1.12', 'white')

  const stats = [
    { key: '', value: totalDistributedSatsFormatted },
    { key: 'projects', value: `${totalProjectsFundedFormatted}+` },
    { key: 'years', value: t('4+') },
  ] as const

  return (
    <VStack align="center" spacing={8} w="full" py={{ base: 10, md: 14 }}>
      <SimpleGrid
        w="full"
        maxW="5xl"
        mx="auto"
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 8, md: 10 }}
        alignItems="center"
        justifyItems="center"
      >
        {stats.map((stat) => (
          <H2
            key={stat.key}
            size={{ base: '2xl', md: '3xl' }}
            bold
            lineHeight={1.15}
            color={statColor}
            textAlign="center"
          >
            {stat.value} {stat.key}
          </H2>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
