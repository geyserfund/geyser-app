import { HStack, StackProps, Tooltip, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

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
        <Body wordBreak="keep-all" fontWeight={boldTitle ? 700 : 500}>
          {title}
        </Body>
      )}
      {subtitle && (
        <HStack w="full">
          <Body size="sm" light>
            {subtitle}
          </Body>
          {info && (
            <Tooltip label={info}>
              <span>
                <PiInfo />
              </span>
            </Tooltip>
          )}
        </HStack>
      )}

      {children}
      {error && (
        <Body size="xs" color="error.9">
          {error}
        </Body>
      )}
    </VStack>
  )
}
