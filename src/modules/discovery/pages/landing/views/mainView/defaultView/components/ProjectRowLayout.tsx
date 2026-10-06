import { HStack, StackProps, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import type { BodyProps } from '@/shared/components/typography/Body.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import type { HeaderProps } from '@/shared/components/typography/Heading.tsx'
import { displayHeadingProps, H3 } from '@/shared/components/typography/Heading.tsx'

export interface ProjectRowLayoutProps extends Omit<StackProps, 'title'> {
  titleWrapperProps?: StackProps
  headerProps?: StackProps
  titleProps?: HeaderProps
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
  titleProps,
  titleWrapperProps,
  headerProps,
  ...rest
}: ProjectRowLayoutProps) => {
  const { t } = useTranslation()
  return (
    <VStack alignItems="start" spacing={6} {...rest}>
      <VStack w="full" spacing={0} alignItems={'start'} {...titleWrapperProps}>
        {/* <LandingBackdropWrapper paddingY={2} borderRadius="12px"> */}
        <HStack width="100%" justifyContent="space-between" alignItems="center" flexWrap={'wrap'} {...headerProps}>
          {typeof title === 'string' || subtitle ? (
            <H3
              size={{ base: 'xl', lg: '3xl' }}
              fontWeight={600}
              lineHeight={1.2}
              {...displayHeadingProps}
              {...titleProps}
            >
              {title}{' '}
              {subtitle && (
                <Body
                  as="span"
                  color="primary1.11"
                  paddingX="4px"
                  bold
                  fontStyle="italic"
                  textTransform="capitalize"
                  {...subtitleProps}
                >
                  {subtitle}
                </Body>
              )}
            </H3>
          ) : (
            title
          )}
          {rightContent}
        </HStack>
        {/* </LandingBackdropWrapper> */}

        {subtext && (
          <Body as="span" light>
            {t(subtext)}
          </Body>
        )}
      </VStack>

      {children}
    </VStack>
  )
}
