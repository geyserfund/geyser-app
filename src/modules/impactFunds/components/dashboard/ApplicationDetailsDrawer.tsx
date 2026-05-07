import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo } from 'react'
import { PiArrowLeftBold, PiArrowRightBold, PiArrowSquareOutBold, PiCopyBold } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { UserAvatar } from '@/shared/molecules/UserAvatar'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter'
import { type ImpactFundDashboardApplicationsQuery, ProjectFundingStrategy } from '@/types'
import { useNotification } from '@/utils'
import { copyTextToClipboard } from '@/utils/tools/copyToClipboard'

import { type DashboardAction, ApplicationActionsMenu } from './ApplicationActionsMenu'
import { ApplicationNotes } from './ApplicationNotes'
import { ApplicationStatusTag } from './ApplicationStatusTag'
import { NOT_PROVIDED_PLACEHOLDER, projectFundingStrategyLabels } from './dashboardConstants'
import { formatDate, formatEnumLabel, formatSats, toFiniteNumber, truncateUuid } from './dashboardFormatters'
import { DashboardTooltip as Tooltip } from './DashboardTooltip'
import { FundingModelTag } from './FundingModelTag'
import { IdentityVerifiedBadge } from './IdentityVerifiedBadge'

type DashboardApplication =
  ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']['applications'][number]

type ApplicationDetailsDrawerProps = {
  application: DashboardApplication | null
  applications: DashboardApplication[]
  onClose: () => void
  onNavigate: (applicationId: string) => void
  onAction: (action: DashboardAction, application: DashboardApplication) => void
  onRefetch: () => Promise<unknown> | void
}

export function ApplicationDetailsDrawer({
  application,
  applications,
  onClose,
  onNavigate,
  onAction,
  onRefetch,
}: ApplicationDetailsDrawerProps) {
  const isOpen = Boolean(application)

  const { previous, next, position, total } = useMemo<{
    previous: DashboardApplication | null
    next: DashboardApplication | null
    position: number
    total: number
  }>(() => {
    if (!application) return { previous: null, next: null, position: 0, total: applications.length }
    const idx = applications.findIndex((a) => a.applicationId === application.applicationId)
    return {
      previous: idx > 0 ? applications[idx - 1] ?? null : null,
      next: idx >= 0 && idx < applications.length - 1 ? applications[idx + 1] ?? null : null,
      position: idx >= 0 ? idx + 1 : 0,
      total: applications.length,
    }
  }, [application, applications])

  // Keyboard shortcuts: J/K to navigate, Esc handled by Drawer
  useEffect(() => {
    if (!isOpen) return
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }

      if (event.key === 'j' && next) {
        event.preventDefault()
        onNavigate(String(next.applicationId))
      }

      if (event.key === 'k' && previous) {
        event.preventDefault()
        onNavigate(String(previous.applicationId))
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, next, previous, onNavigate])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'lg', xl: 'xl' }} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        {application ? (
          <>
            <DrawerHeader
              application={application}
              onAction={(action) => onAction(action, application)}
              previous={previous}
              next={next}
              position={position}
              total={total}
              onNavigate={onNavigate}
            />
            <DrawerCloseButton top={2} right={2} />
            <DrawerBody px={{ base: 4, md: 6 }} py={4}>
              <DrawerContents application={application} onRefetch={onRefetch} />
            </DrawerBody>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}

type DrawerHeaderProps = {
  application: DashboardApplication
  onAction: (action: DashboardAction) => void
  previous: DashboardApplication | null
  next: DashboardApplication | null
  position: number
  total: number
  onNavigate: (applicationId: string) => void
}

function DrawerHeader({ application, onAction, previous, next, position, total, onNavigate }: DrawerHeaderProps) {
  return (
    <Box px={{ base: 4, md: 6 }} pt={4} pb={3} borderBottomWidth="1px" borderColor="neutral1.6" bg="utils.pbg">
      <HStack justify="space-between" align="center" pr={10}>
        <HStack spacing={2}>
          <Tooltip content={t('Previous (k)')}>
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="neutral1"
              icon={<PiArrowLeftBold />}
              aria-label={t('Previous application')}
              isDisabled={!previous}
              onClick={() => previous && onNavigate(String(previous.applicationId))}
            />
          </Tooltip>
          <Tooltip content={t('Next (j)')}>
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="neutral1"
              icon={<PiArrowRightBold />}
              aria-label={t('Next application')}
              isDisabled={!next}
              onClick={() => next && onNavigate(String(next.applicationId))}
            />
          </Tooltip>
          <Body size="xs" color="neutral1.9">
            {t('{{position}} of {{total}}', { position, total })}
          </Body>
        </HStack>
        <ApplicationActionsMenu onAction={onAction} projectPath={application.projectPath} />
      </HStack>

      <HStack spacing={3} align="start" pt={3}>
        <Box w="56px" h="56px" borderRadius="md" overflow="hidden" bg="neutral1.3" flexShrink={0}>
          {application.project.thumbnailImage ? (
            <Image
              src={application.project.thumbnailImage}
              alt={application.project.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          ) : null}
        </Box>
        <VStack align="start" spacing={1} minW={0} flex={1}>
          <H2 size="lg" bold noOfLines={2}>
            {application.project.title}
          </H2>
          <HStack spacing={2} flexWrap="wrap">
            <ApplicationStatusTag status={application.status} />
            <FundingModelTag fundingModel={application.fundingModel} />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}

type DrawerContentsProps = {
  application: DashboardApplication
  onRefetch: () => Promise<unknown> | void
}

function DrawerContents({ application, onRefetch }: DrawerContentsProps) {
  const { formatUsdAmount } = useCurrencyFormatter()
  const { success } = useNotification()
  const amountAwardedNumber = toFiniteNumber(application.amountAwardedInSats)

  return (
    <VStack align="stretch" spacing={6}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <DetailGroup title={t('Project')}>
          <DetailRow label="Country" value={application.project.country} />
          <DetailRow label="Category" value={t(formatEnumLabel(application.project.category))} />
          <DetailRow
            label="Funding strategy"
            value={t(
              projectFundingStrategyLabels[application.project.fundingStrategy] || application.project.fundingStrategy,
            )}
          />
          {application.project.fundingStrategy === ProjectFundingStrategy.AllOrNothing ? (
            <DetailRow label="AON target" value={formatSats(application.project.aonGoalAmount)} />
          ) : null}
          <Box pt={1}>
            <Button
              as={RouterLink}
              to={application.projectPath}
              size="sm"
              variant="outline"
              colorScheme="primary1"
              rightIcon={<PiArrowSquareOutBold />}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('View public project')}
            </Button>
          </Box>
        </DetailGroup>

        <DetailGroup title={t('Application')}>
          <DetailRow label="Applied at" value={formatDate(application.createdAt)} />
          <DetailRow
            label="Funded"
            value={
              application.amountAwardedInSats === null || application.amountAwardedInSats === undefined ? (
                NOT_PROVIDED_PLACEHOLDER
              ) : (
                <VStack align="start" spacing={0}>
                  <Body size="sm">{formatSats(application.amountAwardedInSats)}</Body>
                  {amountAwardedNumber && amountAwardedNumber > 0 ? (
                    <Body size="xs" color="neutral1.9">
                      {formatUsdAmount(amountAwardedNumber)}
                    </Body>
                  ) : null}
                </VStack>
              )
            }
          />
          <DetailRow label="Awarded at" value={formatDate(application.awardedAt)} />
          <DetailRow
            label="Contribution UUID"
            value={
              application.contributionUuid ? (
                <HStack spacing={1}>
                  <Body size="sm" fontFamily="mono">
                    {truncateUuid(application.contributionUuid)}
                  </Body>
                  <Tooltip content={application.contributionUuid}>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      colorScheme="neutral1"
                      aria-label={t('Copy contribution UUID')}
                      icon={<Icon as={PiCopyBold} />}
                      onClick={() => {
                        copyTextToClipboard(application.contributionUuid as string)
                        success({ title: t('Copied to clipboard') })
                      }}
                    />
                  </Tooltip>
                </HStack>
              ) : (
                NOT_PROVIDED_PLACEHOLDER
              )
            }
          />
        </DetailGroup>
      </SimpleGrid>

      <DetailGroup title={t('Creator')}>
        {application.creator ? (
          <HStack spacing={3} align="center">
            <UserAvatar
              id={application.creator.id as unknown as string}
              user={application.creator as never}
              height="40px"
              width="40px"
            />
            <VStack align="start" spacing={0} flex={1} minW={0}>
              <HStack spacing={2}>
                <Body size="sm" bold>
                  {application.creator.username}
                </Body>
                <IdentityVerifiedBadge isVerified={application.creator.isIdentityVerified} />
              </HStack>
              {application.creator.email ? (
                <HStack spacing={1}>
                  <Body size="xs" color="neutral1.9">
                    {application.creator.email}
                  </Body>
                  <Tooltip content={t('Copy email')}>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      colorScheme="neutral1"
                      aria-label={t('Copy email')}
                      icon={<Icon as={PiCopyBold} />}
                      onClick={() => {
                        copyTextToClipboard(application.creator?.email as string)
                        success({ title: t('Copied to clipboard') })
                      }}
                    />
                  </Tooltip>
                </HStack>
              ) : null}
            </VStack>
          </HStack>
        ) : (
          <Body size="sm" color="neutral1.9">
            {t('Creator information unavailable')}
          </Body>
        )}
      </DetailGroup>

      {application.project.shortDescription ? (
        <DetailGroup title={t('Short description')}>
          <Body size="sm">{application.project.shortDescription}</Body>
        </DetailGroup>
      ) : null}

      {application.project.description ? (
        <DetailGroup title={t('Project description')}>
          <Body size="sm" whiteSpace="pre-wrap" color="neutral1.11">
            {application.project.description}
          </Body>
        </DetailGroup>
      ) : null}

      <Divider />

      <ApplicationNotes application={application} onChange={onRefetch} />
    </VStack>
  )
}

function DetailGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box p={4} borderWidth="1px" borderColor="neutral1.6" borderRadius="md" bg="utils.pbg">
      <VStack align="stretch" spacing={3}>
        <Body size="xs" color="neutral1.9" bold textTransform="uppercase" letterSpacing="0.04em">
          {title}
        </Body>
        {children}
      </VStack>
    </Box>
  )
}

function DetailRow({ label, value }: { label: string; value?: React.ReactNode }) {
  const isEmpty = value === null || value === undefined || value === '' || value === NOT_PROVIDED_PLACEHOLDER
  return (
    <Grid templateColumns="120px 1fr" gap={3} alignItems="start">
      <GridItem>
        <Body size="xs" color="neutral1.9">
          {t(label)}
        </Body>
      </GridItem>
      <GridItem>
        {isEmpty ? (
          <Body size="sm" color="neutral1.9">
            {NOT_PROVIDED_PLACEHOLDER}
          </Body>
        ) : typeof value === 'string' || typeof value === 'number' ? (
          <Body size="sm">{value}</Body>
        ) : (
          value
        )}
      </GridItem>
    </Grid>
  )
}
