import { Stack, StackProps } from '@chakra-ui/react'

export interface CardLayoutProps extends StackProps {
  noborder?: boolean
  hover?: boolean
  click?: boolean
  to?: string
  href?: string
}

export const CardLayout = ({
  children,
  noborder,
  click,
  hover,
  ...rest
}: CardLayoutProps) => {
  return (
    <Stack
      tabIndex={-1}
      overflow={'hidden'}
      backgroundColor="white"
      border="2px solid"
      borderColor={noborder ? 'transparent' : 'brand.neutral200'}
      borderRadius="8px"
      boxShadow="none"
      padding="24px"
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
}
