import { Box, Button, ButtonProps } from '@chakra-ui/react'

export const NavButton = (props: ButtonProps) => (
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

export const MobileNavButton = (props: ButtonProps) => (
  <NavButton p={6} borderRadius={0} {...props}>
    <Box as="span" flexGrow={1} textAlign="left">
      {props.children}
    </Box>
  </NavButton>
)
