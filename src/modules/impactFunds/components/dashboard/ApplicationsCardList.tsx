import { Box, Button, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Portal, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretDownBold } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter'
import {
  type ImpactFundDashboardApplicationsQuery,
  ImpactFundDashboardApplicationsSort,
  ProjectFundingStrategy,
} from '@/types'

import { type DashboardAction, ApplicationActionsMenu } from './ApplicationActionsMenu'
import { ApplicationStatusTag } from './ApplicationStatusTag'
import { NOT_PROVIDED_PLACEHOLDER, sortLabels } from './dashboardConstants'
import { formatDate, formatEnumLabel, formatSatsCompact, toFiniteNumber } from './dashboardFormatters'
import { FundingModelTag } from './FundingModelTag'
import { IdentityVerifiedBadge } from './IdentityVerifiedBadge'

type DashboardApplication =
  ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']['applications'][number]

type ApplicationsCardListProps = {
  applications: DashboardApplication[]
  sort: ImpactFundDashboardApplicationsSort
  onSortChange: (sort: ImpactFundDashboardApplicationsSort) => void
  onOpenApplication: (applicationId: string) => void
  onAction: (action: DashboardAction, application: DashboardApplication) => void
  selectedApplicationId?: string | null
}

export function ApplicationsCardList({
  applications,
  sort,
  onSortChange,
  onOpenApplication,
  onAction,
  selectedApplicationId,
}: ApplicationsCardListProps) {
  return (
    <VStack align="stretch" spacing={3}>
      <HStack justify="space-between" align="center">
        <Body size="xs" color="neutral1.9">
          {t('{{count}} applications', { count: applications.length })}
        </Body>
        <Menu placement="bottom-end">
          <MenuButton as={Button} size="xs" variant="ghost" rightIcon={<PiCaretDownBold />}>
            {t(sortLabels[sort])}
          </MenuButton>
          <Portal>
            <MenuList>
              {(Object.entries(sortLabels) as [ImpactFundDashboardApplicationsSort, string][]).map(([value, label]) => (
                <MenuItem key={value} onClick={() => onSortChange(value)} fontWeight={value === sort ? 600 : 400}>
                  {t(label)}
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </Menu>
      </HStack>
      {applications.map((application) => (
        <ApplicationCard
          key={application.applicationId}
          application={application}
          onOpenApplication={onOpenApplication}
          onAction={onAction}
          isSelected={String(application.applicationId) === selectedApplicationId}
        />
      ))}
    </VStack>
  )
}

type ApplicationCardProps = {
  application: DashboardApplication
  onOpenApplication: (applicationId: string) => void
  onAction: (action: DashboardAction, application: DashboardApplication) => void
  isSelected: boolean
}

function ApplicationCard({ application, onOpenApplication, onAction, isSelected }: ApplicationCardProps) {
  const { formatUsdAmount } = useCurrencyFormatter()
  const aonTarget =
    application.project.fundingStrategy === ProjectFundingStrategy.AllOrNothing
      ? formatSatsCompact(application.project.aonGoalAmount)
      : null
  const amountAwardedNumber = toFiniteNumber(application.amountAwardedInSats)

  return (
    <Box
      role="button"
      tabIndex={0}
      borderWidth="1px"
      borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
      bg={isSelected ? 'primary1.2' : 'utils.pbg'}
      borderRadius="md"
      p={3}
      _hover={{ borderColor: 'primary1.9' }}
      onClick={() => onOpenApplication(String(application.applicationId))}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenApplication(String(application.applicationId))
        }
      }}
      aria-label={t('Open application for {{title}}', { title: application.project.title })}
    >
      <HStack align="start" spacing={3}>
        <Box w="48px" h="48px" borderRadius="md" overflow="hidden" bg="neutral1.3" flexShrink={0}>
          {application.project.thumbnailImage ? (
            <Image src={application.project.thumbnailImage} alt="" w="full" h="full" objectFit="cover" loading="lazy" />
          ) : null}
        </Box>
        <VStack align="stretch" spacing={1.5} flex={1} minW={0}>
          <HStack justify="space-between" align="start" spacing={2}>
            <VStack align="start" spacing={0} minW={0} flex={1}>
              <Body size="sm" bold noOfLines={1}>
                {application.project.title}
              </Body>
              <Body size="xs" color="neutral1.9" noOfLines={1}>
                {application.project.country ? `${application.project.country}` : NOT_PROVIDED_PLACEHOLDER}
                {application.project.category ? ` · ${t(formatEnumLabel(application.project.category))}` : ''}
                {aonTarget ? ` · ${aonTarget}` : ''}
              </Body>
            </VStack>
            <Box
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.stopPropagation()
                }
              }}
            >
              <ApplicationActionsMenu
                onAction={(action) => onAction(action, application)}
                projectPath={application.projectPath}
              />
            </Box>
          </HStack>
          <HStack spacing={2} flexWrap="wrap">
            <ApplicationStatusTag status={application.status} />
            <FundingModelTag fundingModel={application.fundingModel} />
          </HStack>
          <HStack justify="space-between" align="center">
            <HStack spacing={1} minW={0}>
              <Body size="xs" color="neutral1.9">
                {application.creator?.username || t('Unknown')}
              </Body>
              {application.creator ? (
                <IdentityVerifiedBadge isVerified={application.creator.isIdentityVerified} />
              ) : null}
              <Body size="xs" color="neutral1.9">
                · {formatDate(application.createdAt)}
              </Body>
            </HStack>
            {application.amountAwardedInSats !== null && application.amountAwardedInSats !== undefined ? (
              <VStack align="end" spacing={0}>
                <Body size="xs" bold>
                  {formatSatsCompact(application.amountAwardedInSats)}
                </Body>
                <Body size="xs" color="neutral1.9">
                  {amountAwardedNumber !== null ? formatUsdAmount(amountAwardedNumber) : NOT_PROVIDED_PLACEHOLDER}
                </Body>
              </VStack>
            ) : null}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}
