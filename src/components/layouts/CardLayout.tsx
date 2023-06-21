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
        ref={ref}
        as={rest.to ? Link : undefined}
        tabIndex={-1}
        overflow={'hidden'}
        backgroundColor="neutral.0"
        border="2px solid"
        borderColor={noborder ? 'transparent' : 'neutral.200'}
        borderRadius="8px"
        boxShadow="none"
        padding="24px"
        spacing="10px"
        _hover={hover ? { cursor: 'pointer', borderColor: 'neutral.400' } : {}}
        _active={click ? { borderColor: 'primary.400' } : {}}
        _focus={click ? { borderColor: 'primary.400' } : {}}
        transition="border-color 0.5s"
        {...rest}
      >
        {children}
      </Stack>
    )
  },
)
