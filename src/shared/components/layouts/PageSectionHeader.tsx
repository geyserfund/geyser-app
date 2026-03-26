import { HStack, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

type PageSectionHeaderProps = {
  action?: ReactNode
  subtitle: string
  title: string
}

/** Shared page header with a standardized title and subtitle treatment. */
export const PageSectionHeader = ({ action, subtitle, title }: PageSectionHeaderProps) => {
  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems={{ base: 'start', md: 'center' }}
      flexDirection={{ base: 'column', md: 'row' }}
      spacing={4}
      paddingTop={{ base: 2, lg: 6 }}
    >
      <VStack gap={2} alignItems="start" w="full" flex={1}>
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {title}
        </H2>
        <Body size="md" textAlign="start" w="full">
          {subtitle}
        </Body>
      </VStack>
      {action}
    </HStack>
  )
}
