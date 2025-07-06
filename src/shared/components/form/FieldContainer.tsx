import { Collapse, HStack, StackProps, Tooltip, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { BodyProps } from '../typography/Body.tsx'

export interface FieldContainerProps extends Omit<StackProps, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  info?: ReactNode
  error?: ReactNode
  children?: ReactNode
  boldTitle?: boolean
  boldSubtitle?: boolean
  required?: boolean
  size?: BodyProps['size']
}

export const FieldContainer = ({
  title,
  subtitle,
  children,
  required,
  info,
  error = null,
  boldTitle = false,
  boldSubtitle = false,
  size = 'lg',
  ...props
}: FieldContainerProps) => {
  return (
    <VStack spacing={0} alignItems="start" w="100%" {...props}>
      {title && (
        <Body size={size} wordBreak="keep-all" fontWeight={boldTitle ? 700 : 500}>
          {title}
          {required && '*'}
        </Body>
      )}
      {subtitle ? (
        <HStack w="full">
          <Body size={'sm'} light fontWeight={boldSubtitle ? 700 : 400}>
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
      ) : null}

      {children}

      <Collapse in={Boolean(error)}>
        <Body size="xs" color="error.9">
          {error}
        </Body>
      </Collapse>
    </VStack>
  )
}
