import { HStack, StackProps, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { BodyProps } from '@/components/typography'
import { Body, H3 } from '@/shared/components/typography'

export interface ProjectRowLayoutProps extends Omit<StackProps, 'title'> {
  title: string | React.ReactNode
  subtitle?: string
  subtext?: string
  subtitleProps?: BodyProps
  children: React.ReactNode
  rightContent?: React.ReactNode
}

export const ProjectRowLayout = ({
  title,
  subtitle,
  subtitleProps,
  subtext,
  children,
  rightContent,
  ...rest
}: ProjectRowLayoutProps) => {
  const { t } = useTranslation()
  return (
    <VStack alignItems="start" spacing={5} {...rest}>
      <VStack w="full" spacing={0} alignItems={'start'}>
        <HStack width="100%" justifyContent="space-between">
          {typeof title === 'string' || subtitle ? (
            <H3 size="2xl" dark bold>
              {title}{' '}
              {subtitle && (
                <Body as="span" color="primary1.11" paddingRight="4px" bold {...subtitleProps}>
                  {subtitle}
                </Body>
              )}
            </H3>
          ) : (
            title
          )}
          {rightContent}
        </HStack>
        {subtext && (
          <Body as="span" color="neutralAlpha.11" regular>
            {t(subtext)}
          </Body>
        )}
      </VStack>

      {children}
    </VStack>
  )
}
