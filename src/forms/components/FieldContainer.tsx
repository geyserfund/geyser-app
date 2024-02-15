import { HStack, StackProps, Text, Tooltip, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BiInfoCircle } from 'react-icons/bi'

export interface FieldContainerProps extends Omit<StackProps, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  info?: ReactNode
  error?: ReactNode
  children?: ReactNode
  boldTitle?: boolean
}

export const FieldContainer = ({
  title,
  subtitle,
  children,
  info,
  error = null,
  boldTitle = false,
  ...props
}: FieldContainerProps) => {
  return (
    <VStack spacing={1} alignItems="start" w="100%" {...props}>
      {title && (
        <Text variant="body1" wordBreak="keep-all" fontWeight={boldTitle ? 500 : 'normal'}>
          {title}
        </Text>
      )}
      {subtitle && (
        <HStack w="full">
          <Text color="neutral.600">{subtitle}</Text>
          {info && (
            <Tooltip label={info}>
              <span>
                <BiInfoCircle />
              </span>
            </Tooltip>
          )}
        </HStack>
      )}

      {children}
      {error && (
        <Text color="secondary.red" fontSize="12px">
          {error}
        </Text>
      )}
    </VStack>
  )
}
