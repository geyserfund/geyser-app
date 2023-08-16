import { StackProps, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface FieldContainerProps extends Omit<StackProps, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  error?: ReactNode
  children?: ReactNode
}

export const FieldContainer = ({
  title,
  subtitle,
  children,
  error = null,
  ...props
}: FieldContainerProps) => {
  return (
    <VStack spacing={1} alignItems="start" w="100%" {...props}>
      {title && (
        <Text variant="body1" wordBreak="keep-all">
          {title}
        </Text>
      )}
      {subtitle && <Text color="neutral.600">{subtitle}</Text>}
      {children}
      {error && (
        <Text color="secondary.red" fontSize="12px">
          {error}
        </Text>
      )}
    </VStack>
  )
}
