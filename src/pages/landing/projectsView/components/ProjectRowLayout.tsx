import { StackProps, VStack } from '@chakra-ui/react'

import { H3 } from '../../../../components/typography'
import { colors } from '../../../../styles'

interface ProjectRowLayoutComponent extends StackProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const ProjectRowLayout = ({
  title,
  subtitle,
  children,
}: ProjectRowLayoutComponent) => {
  return (
    <VStack alignItems="start" spacing="30px">
      <H3 color="brand.primary600">
        {subtitle && (
          <span style={{ color: colors.neutral800 }}>{`${subtitle} `}</span>
        )}
        {title}
      </H3>
      {children}
    </VStack>
  )
}
