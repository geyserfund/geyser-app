import type { ChakraComponent } from '@chakra-ui/react'
import { Box, Icon, Link as ChakraLink, VStack } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { Link as RouterLink } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { useMobileMode } from '@/utils/index.ts'

/** Quick-action tile in the project control panel: a bare Phosphor icon above a label. */
export const ControlPanelButton: ChakraComponent<
  'div',
  {
    icon: IconType
    label: string
    mobileLabel?: string
    to?: string
    href?: string
  }
> = ({ icon, label, mobileLabel, ...rest }) => {
  const isMobile = useMobileMode()

  const buttonContent = (
    <VStack spacing={1}>
      <Icon as={icon} boxSize={{ base: '24px', lg: '28px' }} color="primary1.11" aria-hidden />
      <Body size={{ base: 'sm', lg: 'md' }} medium color="utils.text">
        {isMobile ? mobileLabel || label : label}
      </Body>
    </VStack>
  )

  return (
    <Box
      flex={1}
      p={{ base: 2, lg: 3 }}
      borderRadius="innerCard"
      border="1px solid"
      borderColor="neutral1.6"
      cursor="pointer"
      _hover={{ borderColor: 'primary1.8' }}
      transition="border-color 0.2s"
      textAlign="center"
      as={rest.to ? RouterLink : rest.href ? ChakraLink : undefined}
      {...rest}
    >
      {buttonContent}
    </Box>
  )
}
