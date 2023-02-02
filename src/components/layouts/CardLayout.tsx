import { Stack, StackProps } from '@chakra-ui/react'

interface CardLayoutProps extends StackProps {
  hover?: boolean
  to?: string
  href?: string
}

export const CardLayout = ({ children, hover, ...rest }: CardLayoutProps) => {
  return (
    <Stack
      overflow={'hidden'}
      backgroundColor="white"
      border="2px solid"
      borderColor="brand.neutral200"
      borderRadius="8px"
      boxShadow="none"
      padding="24px"
      _hover={hover ? { borderColor: 'brand.neutral400' } : {}}
      {...rest}
    >
      {children}
    </Stack>
  )
}
