import { Box, HStack, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { ReactNode } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'

export type PayoutProgressStepStatus = 'complete' | 'current' | 'upcoming'

export type PayoutProgressStep = {
  title: string
  description: string
  status: PayoutProgressStepStatus
}

type PayoutFlowLayoutProps = {
  /** Progress steps used to derive the "Step X of N" label and the heading. */
  progressSteps?: PayoutProgressStep[]
  /** Override the step heading. Defaults to the active step's title from `progressSteps`. */
  heading?: ReactNode
  /** Secondary line below the step heading (e.g. processed-state copy). */
  title?: ReactNode
  /** Supporting paragraph below the title. */
  description?: ReactNode
  /** Notice rendered above the main content (e.g. inline feedback). */
  notice?: ReactNode
  /** Main content (forms, illustrations, etc.). */
  content: ReactNode
  /** Action area pinned to the bottom of the left column (e.g. CTA button). */
  footer?: ReactNode
  /** Optional right-column content (typically a <PayoutSummaryPanel />). */
  summary?: ReactNode
  /** Minimum height to keep the modal body consistent across steps. */
  minBodyHeight?: string | number
}

/**
 * PayoutFlowLayout: Shared two-column layout used by the payout, refund, and
 * wallet withdrawal modals. Renders a "Step X of N" indicator, the active step
 * heading, supporting copy, the main content, and an optional right-side
 * summary separated by a vertical divider.
 */
export const PayoutFlowLayout: React.FC<PayoutFlowLayoutProps> = ({
  progressSteps,
  heading,
  title,
  description,
  notice,
  content,
  footer,
  summary,
  minBodyHeight = '520px',
}) => {
  const totalSteps = progressSteps?.length ?? 0
  const currentStepIndex = progressSteps ? progressSteps.findIndex((s) => s.status === 'current') + 1 : 0
  const showStepLabel = currentStepIndex > 0
  const stepLabel = showStepLabel
    ? t('Step {{current}} of {{total}}', { current: currentStepIndex, total: totalSteps })
    : null
  const activeStep = progressSteps?.find((s) => s.status === 'current')
  const resolvedHeading = heading ?? activeStep?.title

  return (
    <VStack spacing={0} align="stretch" w="full" minH={{ base: 'auto', lg: minBodyHeight }}>
      {summary && stepLabel && (
        <HStack spacing={0} display={{ base: 'none', lg: 'flex' }} mb={1}>
          <Box flex={3} pr={6}>
            <Body size="xs" color="neutral1.9">
              {stepLabel}
            </Body>
          </Box>
          <Box w="1px" />
          <Box flex={2} />
        </HStack>
      )}

      <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={0} align="stretch" flex={1}>
        <VStack flex={3} spacing={4} align="stretch" pr={{ lg: summary ? 6 : 0 }}>
          <VStack spacing={1} align="stretch">
            {stepLabel && (
              <Box display={summary ? { lg: 'none' } : undefined}>
                <Body size="xs" color="neutral1.9">
                  {stepLabel}
                </Body>
              </Box>
            )}
            {resolvedHeading && (
              <Body as="h2" size="xl" bold color="neutral1.12">
                {resolvedHeading}
              </Body>
            )}
            {title && (
              <Body size="sm" color="neutral1.10">
                {title}
              </Body>
            )}
            {description && (
              <Body size="sm" color="neutral1.10">
                {description}
              </Body>
            )}
          </VStack>
          {notice}
          <VStack flex={1} spacing={4} align="stretch">
            {content}
          </VStack>
          {footer}
        </VStack>

        {summary && (
          <>
            <Box display={{ base: 'none', lg: 'block' }} w="1px" bg="neutral1.6" alignSelf="stretch" />
            <VStack flex={2} spacing={4} align="stretch" pl={{ lg: 6 }}>
              {summary}
            </VStack>
          </>
        )}
      </Stack>
    </VStack>
  )
}
