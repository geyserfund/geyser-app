import { Button, ButtonProps } from '@chakra-ui/react'

export const DashboardNavButton = (props: ButtonProps) => (
  <Button
    variant="transparent"
    textDecoration="none"
    width="100%"
    justifyContent="left"
    color="neutral.600"
    _hover={{
      bg: 'neutral.200',
    }}
    _active={{
      bg: 'neutral.100',
    }}
    {...props}
  >
    {props.children}
  </Button>
)
