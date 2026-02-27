import { Box, HStack, IconButton, Stack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PiX } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'

export type NotificationVariant = 'info' | 'warning' | 'success' | 'error'

interface ControlPanelNotificationProps {
  icon: ReactNode
  title: string
  description: string | ReactNode
  actionButton: ReactNode
  onClose?: () => void
  variant?: NotificationVariant
}

const variantStyles: Record<NotificationVariant, { bg: string; color: string }> = {
  info: { bg: 'neutral1.2', color: 'neutral1.11' },
  warning: { bg: 'warning.1', color: 'warning.11' },
  success: { bg: 'success.1', color: 'success.11' },
  error: { bg: 'error.1', color: 'error.11' },
}

export const ControlPanelNotification = ({
  icon,
  title,
  description,
  actionButton,
  onClose,
  variant = 'info',
}: ControlPanelNotificationProps) => {
  const styles = variantStyles[variant]

  return (
    <Box w="full" bg={styles.bg} borderRadius="6px" padding={3} position="relative">
      <HStack w="full" spacing={3} alignItems="start">
        {icon}
        <VStack flex={1} spacing={2} alignItems="start">
          <Body size="sm" bold color={styles.color}>
            {title}
          </Body>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ base: 'stretch', md: 'center' }}
            w="full"
          >
            {typeof description === 'string' ? (
              <Body size="sm" color={styles.color} flex="1">
                {description}
              </Body>
            ) : (
              <Box color={styles.color} flex="1" fontSize="sm">
                {description}
              </Box>
            )}
            <Box flexShrink={0} w={{ base: 'full', md: 'auto' }}>
              {actionButton}
            </Box>
          </Stack>
        </VStack>
      </HStack>
      {onClose && (
        <IconButton
          variant="ghost"
          colorScheme="error"
          position="absolute"
          right="5px"
          top="5px"
          size="sm"
          icon={<PiX />}
          aria-label="close"
          onClick={onClose}
        />
      )}
    </Box>
  )
}
