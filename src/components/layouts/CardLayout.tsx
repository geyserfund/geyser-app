import { Stack, StackProps } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface CardLayoutProps
  extends StackProps,
    Partial<Pick<LinkProps, 'to'>> {
  noborder?: boolean
  hover?: boolean
  click?: boolean
}

export const CardLayout = forwardRef<HTMLDivElement, CardLayoutProps>(
  ({ children, noborder, click, hover, ...rest }, ref) => {
    return (
      <Stack
        as={rest.to ? Link : undefined}
        tabIndex={-1}
        overflow={'hidden'}
        backgroundColor="neutral.0"
        border="2px solid"
        borderColor={noborder ? 'transparent' : 'brand.neutral200'}
        borderRadius="8px"
        boxShadow="none"
        padding="24px"
        spacing="10px"
        _hover={
          hover ? { cursor: 'pointer', borderColor: 'brand.neutral400' } : {}
        }
        _active={click ? { borderColor: 'brand.primary' } : {}}
        _focus={click ? { borderColor: 'brand.primary' } : {}}
        transition="border-color 0.5s"
        {...rest}
      >
        {children}
      </Stack>
    )
  },
)
