import { StackProps, VStack } from '@chakra-ui/react'

import { H3 } from '../../../../components/typography'
import { colors } from '../../../../styles'

interface ProjectDiscoveryComponentComponent extends StackProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const ProjectDiscoveryComponent = ({
  title,
  subtitle,
  children,
}: ProjectDiscoveryComponentComponent) => {
  return (
    <VStack alignItems="start" spacing="30px">
      <H3 color="brand.primary600">
        <span color={colors.neutral800}>{subtitle}</span>
        {title}
      </H3>
      {children}
    </VStack>
  )
}
