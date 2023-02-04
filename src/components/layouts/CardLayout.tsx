import { Stack, StackProps } from '@chakra-ui/react'

export interface CardLayoutProps extends StackProps {
  hover?: boolean
  click?: boolean
  to?: string
  href?: string
}

export const CardLayout = ({
  children,
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
      borderColor="brand.neutral200"
      borderRadius="8px"
      boxShadow="none"
      padding="24px"
      _hover={
        hover ? { cursor: 'pointer', borderColor: 'brand.neutral400' } : {}
      }
      _active={click ? { borderColor: 'brand.primary' } : {}}
      _focus={click ? { borderColor: 'brand.primary' } : {}}
      {...rest}
    >
      {children}
    </Stack>
  )
}
