import { Box, HStack, IconButton, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ReactNode } from 'react'
import { PiX } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'

export type NotificationVariant = 'info' | 'warning' | 'success' | 'error'

type ControlPanelNotificationProps = {
  icon: ReactNode
  title: string
  description: string | ReactNode
  actionButton?: ReactNode
  onClose?: () => void
  variant?: NotificationVariant
}

/** Tiles are unfilled with a hairline border; the variant shows in the border and title colour only. */
const variantStyles: Record<NotificationVariant, { borderColor: string; titleColor: string }> = {
  info: { borderColor: 'neutral1.6', titleColor: 'utils.text' },
  warning: { borderColor: 'warning.6', titleColor: 'warning.11' },
  success: { borderColor: 'success.6', titleColor: 'success.11' },
  error: { borderColor: 'error.6', titleColor: 'error.11' },
}

/** Inline notification banner used across the control panel and other project management surfaces. */
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
    <Box
      w="full"
      border="1px solid"
      borderColor={styles.borderColor}
      borderRadius="innerCard"
      padding={3}
      position="relative"
    >
      <HStack w="full" spacing={3} alignItems="start">
        {icon}
        <VStack flex={1} spacing={2} alignItems="start">
          <Body size="sm" bold color={styles.titleColor}>
            {title}
          </Body>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ base: 'stretch', md: 'center' }}
            w="full"
          >
            {typeof description === 'string' ? (
              <Body size="sm" color="neutral1.11" flex="1">
                {description}
              </Body>
            ) : (
              <Box color="neutral1.11" flex="1" fontSize="sm">
                {description}
              </Box>
            )}
            {actionButton && (
              <Box flexShrink={0} w={{ base: 'full', md: 'auto' }}>
                {actionButton}
              </Box>
            )}
          </Stack>
        </VStack>
      </HStack>
      {onClose && (
        <IconButton
          variant="ghost"
          colorScheme="neutral1"
          position="absolute"
          right="5px"
          top="5px"
          size="sm"
          icon={<PiX />}
          aria-label={t('Close')}
          onClick={onClose}
        />
      )}
    </Box>
  )
}
