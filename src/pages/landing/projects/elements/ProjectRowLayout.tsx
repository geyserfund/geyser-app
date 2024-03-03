import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonProps, HStack, Link, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H3 } from '../../../../components/typography'

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
        {typeof title === 'string' ? (
          <H3 color="primary.600">
            {subtitle && (
              <Box as="span" color="neutral.800" paddingRight="4px">
                {subtitle}
              </Box>
            )}
            {title}
          </H3>
        ) : (
          title
        )}
        {(onSeeAllClick || seeAllProps) && (
          <Button
            as={Link}
            variant="ghost"
            size="sm"
            rightIcon={<ChevronRightIcon fontSize="25px" />}
            onClick={onSeeAllClick}
            {...seeAllProps}
          >
            {seeAllText || t('See all')}
          </Button>
        )}
      </HStack>
      {children}
    </VStack>
  )
}
