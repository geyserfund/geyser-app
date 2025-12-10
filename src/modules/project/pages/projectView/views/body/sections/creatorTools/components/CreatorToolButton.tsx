import { Box, ChakraComponent, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { useMobileMode } from '@/utils/index.ts'

export const CreatorToolButton: ChakraComponent<
  'div',
  {
    emoji: string
    label: string
    mobileLabel?: string
    to?: string
    href?: string
  }
> = ({ emoji, label, mobileLabel, ...rest }) => {
  const isMobile = useMobileMode()

  const buttonContent = (
    <VStack spacing={0}>
      <Image src={emoji} alt={label} height={{ base: '30px', lg: '50px' }} width={{ base: '30px', lg: '50px' }} />
      <Body size={{ base: 'sm', lg: 'md' }} medium>
        {isMobile ? mobileLabel || label : label}
      </Body>
    </VStack>
  )

  return (
    <Box
      flex={1}
      p={{ base: 1, lg: 2 }}
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral1.6"
      bg="utils.pbg"
      cursor="pointer"
      _hover={{ borderColor: 'primary1.9', shadow: 'lg' }}
      transition="border-color 0.2s"
      textAlign="center"
      as={rest.to ? RouterLink : rest.href ? ChakraLink : undefined}
      {...rest}
    >
      {buttonContent}
    </Box>
  )
}
