import { Box, Button, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { type ComponentType } from 'react'
import { PiFunnelXBold, PiTrayBold, PiWarningCircleBold } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

type EmptyStateBaseProps = {
  icon: ComponentType<{ size?: number | string }>
  title: string
  description?: string
  primaryAction?: { label: string; onClick: () => void }
  iconColor?: string
}

function EmptyStateBase({ icon, title, description, primaryAction, iconColor = 'neutral1.9' }: EmptyStateBaseProps) {
  return (
    <Box
      p={{ base: 6, md: 10 }}
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="neutral1.6"
      borderRadius="md"
      textAlign="center"
    >
      <VStack spacing={3}>
        <Box color={iconColor}>
          <Icon as={icon} boxSize="40px" />
        </Box>
        <H2 size="md" bold>
          {t(title)}
        </H2>
        {description ? (
          <Body size="sm" color="neutral1.9" maxW="420px">
            {t(description)}
          </Body>
        ) : null}
        {primaryAction ? (
          <Button mt={2} colorScheme="primary1" onClick={primaryAction.onClick}>
            {t(primaryAction.label)}
          </Button>
        ) : null}
      </VStack>
    </Box>
  )
}

type EmptyApplicationsProps = {
  hasFiltersActive: boolean
  onClearFilters: () => void
}

export function EmptyApplications({ hasFiltersActive, onClearFilters }: EmptyApplicationsProps) {
  if (hasFiltersActive) {
    return (
      <EmptyStateBase
        icon={PiFunnelXBold}
        title="No applications match these filters"
        description="Try removing a filter or clearing the search to see more results."
        primaryAction={{ label: 'Clear filters', onClick: onClearFilters }}
      />
    )
  }

  return (
    <EmptyStateBase
      icon={PiTrayBold}
      title="No applications yet"
      description="When projects apply to this impact fund, they will appear here for moderator review."
    />
  )
}

type DashboardErrorStateProps = {
  onRetry: () => void
  message?: string
}

export function DashboardErrorState({ onRetry, message }: DashboardErrorStateProps) {
  return (
    <EmptyStateBase
      icon={PiWarningCircleBold}
      iconColor="error.9"
      title="Couldn't load this section"
      description={message ?? 'There was a network or server error. Please try again.'}
      primaryAction={{ label: 'Retry', onClick: onRetry }}
    />
  )
}

export function NoNotesYet() {
  return (
    <Box py={4} textAlign="center">
      <Body size="sm" color="neutral1.9">
        {t('No notes yet. Add the first review note to keep your team in the loop.')}
      </Body>
    </Box>
  )
}

type DashboardEmptyAndErrorBoundaryProps = {
  empty?: boolean
  hasFiltersActive?: boolean
  onClearFilters?: () => void
  onRetry?: () => void
  message?: string
}

/**
 * Convenience wrapper that renders either the error state (with retry) or the
 * filter-aware empty state. Lets the page-level component dispatch with one prop.
 */
export function DashboardEmptyAndErrorBoundary({
  empty,
  hasFiltersActive,
  onClearFilters,
  onRetry,
  message,
}: DashboardEmptyAndErrorBoundaryProps) {
  if (empty) {
    return (
      <EmptyApplications
        hasFiltersActive={Boolean(hasFiltersActive)}
        onClearFilters={onClearFilters ?? (() => undefined)}
      />
    )
  }

  return <DashboardErrorState onRetry={onRetry ?? (() => undefined)} message={message} />
}
