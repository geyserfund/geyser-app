import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'

export const LaunchSummary = () => {
  const { project } = useProjectAtom()
  const { formatAmount } = useCurrencyFormatter()

  const navigate = useNavigate()

  /** Get formatted funding goal display */
  const getFundingGoalDisplay = () => {
    if (!project?.aonGoalInSats) return '0 sats'

    const satsAmount = formatAmount(project.aonGoalInSats, 'BTCSAT')
    // Simplified USD conversion for display - replace with proper conversion
    const usdAmount = Math.round(project.aonGoalInSats * 0.001) // Placeholder conversion
    return `${satsAmount} (or ${usdAmount.toLocaleString()} USD)`
  }

  /** Get formatted launch time */
  const getLaunchTimeDisplay = () => {
    if (!project?.launchScheduledAt) return null

    // Format the actual launch scheduled time
    const launchDate = DateTime.fromMillis(project.launchScheduledAt)
    return launchDate.toLocaleString(DateTime.DATETIME_MED)
  }

  /** Check if launch is scheduled or immediate */
  const isScheduledLaunch = Boolean(project?.launchScheduledAt)

  /** Get display name for funding strategy */
  const getFundingStrategyDisplay = () => {
    switch (project?.fundingStrategy) {
      case ProjectFundingStrategy.AllOrNothing:
        return t('All-or-Nothing')
      case ProjectFundingStrategy.TakeItAll:
        return t('Open-Funding')
      default:
        return t('All-or-Nothing') // Default fallback
    }
  }

  return (
    <VStack spacing={6} w="full" alignItems="start">
      {/* Funding Section */}
      <CardLayout noborder spacing={1} w="full" alignItems="start" backgroundColor="neutral1.3">
        <HStack w="full" justifyContent="space-between" alignItems="center" paddingBottom={2}>
          <H3 bold>{t('Launch Summary')}</H3>
          <Button
            variant="outline"
            colorScheme="neutral1"
            size="md"
            onClick={() => navigate(getPath('launchFundingStrategy', project?.id))}
          >
            {t('Edit')}
          </Button>
        </HStack>
        <HStack>
          <Body medium>{t('Funding Type')}: </Body>
          <Body bold>{getFundingStrategyDisplay()}</Body>
        </HStack>

        {/* Only show funding goal if aonGoalInSats exists */}
        {project?.aonGoalInSats && (
          <HStack>
            <Body medium>{t('Funding Goal')}: </Body>
            <Body bold>{getFundingGoalDisplay()}</Body>
          </HStack>
        )}

        {/* Only show funding duration if aonGoalDurationInDays exists */}
        {project?.aonGoalDurationInDays && (
          <HStack>
            <Body medium>{t('Funding duration')}: </Body>
            <Body bold>{`${project.aonGoalDurationInDays} ${t('days')}`}</Body>
          </HStack>
        )}

        <HStack>
          <Body medium>{t('Launch Type')}: </Body>
          <Body bold>{isScheduledLaunch ? t('Scheduled') : t('Immediate launch')}</Body>
        </HStack>

        {/* Only show launch time for scheduled launches */}
        {isScheduledLaunch && (
          <HStack flexWrap="wrap">
            <Body medium>{t('Launch Time')}: </Body>
            <Body bold>{getLaunchTimeDisplay()}</Body>
            <Body size="sm" bold muted>
              ( {t('You must launch manually at the set time.')} )
            </Body>
          </HStack>
        )}
      </CardLayout>
      <Body>
        {t(
          'You can come back to this flow to edit your project anytime before the launch. Once the project is launched, some of the project details will not be updatable anymore, such as the funding strategy, goal and duration.',
        )}
      </Body>
    </VStack>
  )
}
