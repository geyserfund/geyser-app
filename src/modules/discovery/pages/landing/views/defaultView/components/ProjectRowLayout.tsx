import { Button, ButtonProps, HStack, Link, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'

export interface ProjectRowLayoutProps extends Omit<StackProps, 'title'> {
  title: string | React.ReactNode
  subtitle?: string
  children: React.ReactNode
  onSeeAllClick?: () => void
  seeAllProps?: ButtonProps & { href: string; isExternal: boolean }
  seeAllText?: string
}

export const ProjectRowLayout = ({
  title,
  subtitle,
  children,
  onSeeAllClick,
  seeAllProps,
  seeAllText,
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
              <Body as="span" color="primary1.11" paddingRight="4px" bold>
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
      </HStack>
      {children}
    </VStack>
  )
}
