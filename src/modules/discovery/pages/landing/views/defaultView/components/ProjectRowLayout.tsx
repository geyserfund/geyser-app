import { Button, ButtonProps, HStack, Link, StackProps, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { BodyProps } from '@/components/typography'
import { Body, H3 } from '@/shared/components/typography'

export interface ProjectRowLayoutProps extends Omit<StackProps, 'title'> {
  title: string | React.ReactNode
  subtitle?: string
  subtitleProps?: BodyProps
  children: React.ReactNode
  onSeeAllClick?: () => void
  seeAllProps?: ButtonProps & { href: string; isExternal: boolean }
  seeAllText?: string
  rightContent?: React.ReactNode
}

export const ProjectRowLayout = ({
  title,
  subtitle,
  subtitleProps,
  children,
  onSeeAllClick,
  seeAllProps,
  seeAllText,
  rightContent,
  ...rest
}: ProjectRowLayoutProps) => {
  const { t } = useTranslation()
  return (
    <VStack alignItems="start" spacing="10px" {...rest}>
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
        {(onSeeAllClick || seeAllProps) && (
          <Button as={Link} variant="soft" colorScheme="neutral1" onClick={onSeeAllClick} {...seeAllProps}>
            {seeAllText || t('See all')}
          </Button>
        )}
        {rightContent}
      </HStack>
      {children}
    </VStack>
  )
}
