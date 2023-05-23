import { StackProps, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'

export const FormInputContainer = ({
  title,
  subtitle,
  children,
  error = null,
  ...props
}: PropsWithChildren<
  {
    title?: string
    subtitle?: ReactNode
    error?: ReactNode
  } & StackProps
>) => {
  return (
    <VStack spacing={1} alignItems="start" w="100%" {...props}>
      {title && <Text variant="body1">{title}</Text>}
      {subtitle && (
        <Text variant="body2" color="neutral.600">
          {subtitle}
        </Text>
      )}
      {children}
      {error && (
        <Text color="brand.error" fontSize="12px">
          {error}
        </Text>
      )}
    </VStack>
  )
}
