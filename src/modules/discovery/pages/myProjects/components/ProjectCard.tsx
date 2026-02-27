import { Badge, Button, HStack, Icon, Image, Tooltip, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiArrowUpRight, PiHandHeart, PiInfo, PiNotePencil, PiRocketLaunch, PiStorefront } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { getProjectCreationRoute } from '@/modules/project/pages/projectCreation/components/ProjectCreationNavigation.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'
import { ProjectForMyProjectsFragment, ProjectFundingStrategy, ProjectReviewStatus, ProjectStatus } from '@/types'
import { useMobileMode } from '@/utils'

import { inDraftStatus } from '../hooks/useMyProjects.ts'
import { useProjectWithdrawalStatus } from '../hooks/useProjectWithdrawalStatus.ts'
import { ImpactFundNotification } from './ImpactFundNotification.tsx'
import { WalletConfigurationPrompt } from './WalletConfigurationPrompt.tsx'

interface ProjectCardProps {
  project: ProjectForMyProjectsFragment
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const isInReview = project.status === ProjectStatus.InReview
  const isDraft = project.status && inDraftStatus.includes(project.status) && !isInReview
  const isInactive = project.status === ProjectStatus.Inactive
  const isActive = project.status === ProjectStatus.Active

  const draftRedirectPath = getProjectCreationRoute(project.lastCreationStep, project.id)

  const { status: withdrawalStatus } = useProjectWithdrawalStatus({ project })

  /** Get latest review for status display */
  const latestReview =
    project.reviews && project.reviews.length > 0
      ? [...project.reviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0]
      : undefined

  const hasRevisionsRequested = latestReview?.status === ProjectReviewStatus.RevisionsRequested

  /** Get project type badge configuration */
  const getProjectTypeBadge = () => {
    if (project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
      return { label: t('Campaign'), colorScheme: 'success', icon: PiRocketLaunch }
    }

    if (project.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
      return { label: t('Fundraiser'), colorScheme: 'info', icon: PiHandHeart }
    }

    return { label: t('Shop'), colorScheme: 'neutral1', icon: PiStorefront }
  }

  const projectTypeBadge = getProjectTypeBadge()

  /** Get status badge configuration */
  const getStatusBadge = () => {
    if (isDraft) {
      if (project.status === ProjectStatus.Accepted) {
        return { label: t('Approved'), colorScheme: 'success' }
      }

      return { label: t('Draft'), colorScheme: 'neutral1' }
    }

    if (isInReview) {
      if (hasRevisionsRequested) {
        return { label: t('Updates Requested'), colorScheme: 'warning' }
      }

      return { label: t('Under Review'), colorScheme: 'info' }
    }

    if (isInactive) {
      return { label: t('Inactive'), colorScheme: 'neutral1' }
    }

    return null
  }

  const statusBadge = getStatusBadge()

  /** Format balance display */
  const balanceSats = project.balance || 0
  const balanceUsd = ((project.balanceUsdCent || 0) / 100).toFixed(2)

  /** Check if project needs wallet configuration */
  const needsWalletConfig = !project.rskEoa && project.fundingStrategy === ProjectFundingStrategy.TakeItAll

  /** Get context message or action */
  const renderContextContent = () => {
    // Check review status first
    if (isInReview) {
      if (hasRevisionsRequested) {
        return (
          <HStack
            w="full"
            spacing={2}
            px={3}
            py={2}
            bg="warning.1"
            borderRadius="6px"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack spacing={2} flex={1} alignItems="center">
              <Icon as={PiInfo} color="warning.11" boxSize="16px" flexShrink={0} />
              <Body size="sm" color="neutral1.11">
                <Body as="span" bold size="sm">
                  {t('Updates requested.')}
                </Body>{' '}
                {t('Review feedback and resubmit your project.')}
              </Body>
            </HStack>
          </HStack>
        )
      }

      return (
        <Body size="sm" color="neutral1.11">
          {t("Under review - you'll be notified once approved.")}
        </Body>
      )
    }

    if (isDraft) {
      return (
        <Body size="sm" color="neutral1.11">
          {project.status === ProjectStatus.Accepted
            ? t('Approved! Launch your project to start receiving contributions.')
            : t('Complete your project details to launch.')}
        </Body>
      )
    }

    if (isInactive) {
      return (
        <Body size="sm" color="neutral1.11">
          {t('Inactive - reactivate in project dashboard to receive contributions.')}
        </Body>
      )
    }

    // Active project - show withdrawal threshold message if below
    if (isActive && withdrawalStatus === 'below_threshold') {
      return (
        <Body size="sm" color="neutral1.11">
          {t('$10 minimum required to withdraw.')}
        </Body>
      )
    }

    return null
  }

  /** Get primary action button */
  const renderActionButton = () => {
    if (isDraft || hasRevisionsRequested) {
      return (
        <Button
          variant="soft"
          colorScheme="neutral1"
          as={RouterLink}
          to={hasRevisionsRequested ? getPath('launchFinalize', project.id) : draftRedirectPath}
          size="md"
          leftIcon={isMobile ? undefined : <PiNotePencil size={16} />}
        >
          {isMobile ? <PiNotePencil size={16} /> : t('Finalize')}
        </Button>
      )
    }

    // Show withdraw button for active projects with funds
    const canWithdraw = isActive && (withdrawalStatus === 'ready' || withdrawalStatus === 'below_threshold')
    const isWithdrawDisabled = withdrawalStatus === 'below_threshold'

    return (
      <HStack spacing={2}>
        {canWithdraw && (
          <Tooltip
            label={isWithdrawDisabled ? t('Minimum $10 required to withdraw') : ''}
            isDisabled={!isWithdrawDisabled}
            placement="top"
            hasArrow
          >
            <Button
              variant="solid"
              colorScheme="primary1"
              as={RouterLink}
              to={`${getPath('project', project.name)}?action=withdraw`}
              size="md"
              isDisabled={isWithdrawDisabled}
              pointerEvents={isWithdrawDisabled ? 'auto' : undefined}
            >
              {t('Withdraw Funds')}
            </Button>
          </Tooltip>
        )}
        <Button
          variant="soft"
          colorScheme="neutral1"
          as={RouterLink}
          to={getPath('project', project.name)}
          size="md"
          leftIcon={isMobile ? undefined : <PiArrowUpRight size={16} />}
        >
          {isMobile ? <PiArrowUpRight size={16} /> : t('Go to project')}
        </Button>
      </HStack>
    )
  }

  return (
    <CardLayout width="100%" py={4} px={6}>
      <VStack align="stretch" spacing={3}>
        {/* Row 1: Header with title and action button */}
        <HStack spacing={4} justifyContent="space-between" alignItems="start">
          <HStack as={RouterLink} to={getPath('project', project.name)} alignItems="center" flex={1} spacing={2}>
            {project.thumbnailImage && (
              <Image
                src={project.thumbnailImage}
                alt={project.title}
                boxSize="20px"
                borderRadius="md"
                objectFit="cover"
              />
            )}
            <Body size="lg" bold>
              {project.title}
            </Body>
            <Badge colorScheme={projectTypeBadge.colorScheme} variant="soft" size="sm">
              <HStack spacing={1}>
                <Icon as={projectTypeBadge.icon} boxSize="12px" />
                <span>{projectTypeBadge.label}</span>
              </HStack>
            </Badge>
            {statusBadge && (
              <Badge colorScheme={statusBadge.colorScheme} variant="soft" size="sm">
                {statusBadge.label}
              </Badge>
            )}
          </HStack>
          {renderActionButton()}
        </HStack>

        {/* Row 2: Balance or Wallet Configuration */}
        {needsWalletConfig ? (
          <WalletConfigurationPrompt projectId={project.id} compact />
        ) : (
          <Body size="sm" color="neutral1.11">
            {t('Amount in Wallet')}:{' '}
            <Body as="span" size="sm" bold color="neutral1.12">
              {commaFormatted(balanceSats)} {t('Sats')}
            </Body>{' '}
            <Body as="span" size="sm" color="neutral1.9">
              ${balanceUsd}
            </Body>
          </Body>
        )}

        {/* Row 3: Context message or action */}
        {!needsWalletConfig && renderContextContent()}

        {/* Impact Fund Notification */}
        {isActive && <ImpactFundNotification project={project} />}
      </VStack>
    </CardLayout>
  )
}
