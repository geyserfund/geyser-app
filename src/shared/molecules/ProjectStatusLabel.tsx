import { HStack, Icon, SkeletonText, Stack, StackDirection, StackProps, Tooltip } from '@chakra-ui/react'
import { HTMLChakraProps } from '@chakra-ui/system'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCheckCircle, PiEyeglasses, PiMinusCircle, PiNoteBlank, PiWarning, PiXCircle } from 'react-icons/pi'

import { projectStatusAtom } from '@/modules/project/state/projectAtom'

import { ProjectStatus, Wallet, WalletStatus } from '../../types/generated/graphql'
import { isActive, isDraft, isInactive, isInReview } from '../../utils'
import { Body } from '../components/typography'
import { lightModeColors } from '../styles'

interface IProjectStatusLabel extends HTMLChakraProps<'div'> {
  project: { status?: ProjectStatus | null }
  wallet?: Pick<Wallet, 'state'> | null
  iconOnly?: boolean
  fontSize?: string
  iconSize?: string
  fontFamily?: string
  direction?: StackDirection
  isProjectOwner?: boolean
}

export enum ProjectStatusLabels {
  UNSTABLE_WALLET = 'Unstable Wallet',
  INACTIVE_WALLET = 'Inactive Wallet',
  RUNNING = 'Running',
  DRAFT = 'Draft',
  INACTIVE = 'Inactive Project',
  IN_REVIEW = 'In Review',
}

export enum ProjectStatusTooltipRoles {
  CONTRIBUTOR = 'contributor',
  CREATOR = 'creator',
}

export const ProjectStatusColorScheme = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: 'warning',
  [ProjectStatusLabels.INACTIVE_WALLET]: 'error',
  [ProjectStatusLabels.RUNNING]: 'primary1',
  [ProjectStatusLabels.DRAFT]: 'neutral1',
  [ProjectStatusLabels.INACTIVE]: 'neutral1',
  [ProjectStatusLabels.IN_REVIEW]: 'neutral1',
} as {
  [key in ProjectStatusLabels]: keyof typeof lightModeColors
}

export const ProjectStatusBackgroundColors = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: 'warning.9',
  [ProjectStatusLabels.INACTIVE_WALLET]: 'error.9',
  [ProjectStatusLabels.RUNNING]: 'primary1.9',
  [ProjectStatusLabels.DRAFT]: 'neutral1.12',
  [ProjectStatusLabels.INACTIVE]: 'neutral1.9',
  [ProjectStatusLabels.IN_REVIEW]: 'error.9',
}

export const ProjectStatusTextColors = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: 'utils.blackContrast',
  [ProjectStatusLabels.INACTIVE_WALLET]: 'utils.whiteContrast',
  [ProjectStatusLabels.RUNNING]: 'utils.blackContrast',
  [ProjectStatusLabels.DRAFT]: 'utils.whiteContrast',
  [ProjectStatusLabels.INACTIVE]: 'utils.whiteContrast',
  [ProjectStatusLabels.IN_REVIEW]: 'utils.whiteContrast',
}

export const ProjectStatusIcons = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: PiWarning,
  [ProjectStatusLabels.INACTIVE_WALLET]: PiMinusCircle,
  [ProjectStatusLabels.RUNNING]: PiCheckCircle,
  [ProjectStatusLabels.DRAFT]: PiNoteBlank,
  [ProjectStatusLabels.INACTIVE]: PiXCircle,
  [ProjectStatusLabels.IN_REVIEW]: PiEyeglasses,
}

export const ProjectStatusTooltip = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: t(
    'The last time someone tried to send funds to this wallet, there was a liquidity issue.',
  ),
  [ProjectStatusLabels.INACTIVE_WALLET]: t(
    'The last time someone tried to make a transaction to this project, the invoice generation failed.',
  ),
  [ProjectStatusLabels.RUNNING]: t('This project is live and wallet running smoothly.'),
  [ProjectStatusLabels.DRAFT]: t('This project has not been launched yet and is only visible to the project creator.'),
  [ProjectStatusLabels.INACTIVE]: t('This project has been deactivated by the project creator.'),
  [ProjectStatusLabels.IN_REVIEW]: t(
    'You project has been flagged for violating our Terms & Conditions. You should have received an email with further detail on how to proceed. Your project is currently not visible to the public.',
  ),
}

export const ProjectStatusBar = (props: StackProps) => {
  const projectStatus = useAtomValue(projectStatusAtom)

  const backgroundColor = ProjectStatusBackgroundColors[projectStatus]

  const statusIcon = ProjectStatusIcons[projectStatus]

  const tooltipLabel = ProjectStatusTooltip[projectStatus]

  const textColor = ProjectStatusTextColors[projectStatus]

  if (projectStatus === ProjectStatusLabels.RUNNING) {
    return null
  }

  return (
    <HStack w="full" spacing={2} paddingY={3} justifyContent="center" backgroundColor={backgroundColor} {...props}>
      <Tooltip label={tooltipLabel} placement="top" size="sm">
        <HStack alignItems="center">
          <Icon as={statusIcon} fontSize={'18px '} color={textColor} />

          <Body size="sm" color={textColor} medium>
            {t(projectStatus)}
          </Body>
        </HStack>
      </Tooltip>
    </HStack>
  )
}

export const ProjectStatusLabel = ({
  project,
  wallet,
  fontSize,
  fontFamily,
  iconSize = '16px',
  direction = 'row',
  iconOnly,
  isProjectOwner = false,
}: IProjectStatusLabel) => {
  const { t } = useTranslation()

  const [status, setStatus] = useState<ProjectStatusLabels | null>(null)

  useEffect(() => {
    if (!project) {
      return
    }

    const getStatus = () => {
      if (isDraft(project.status)) {
        return ProjectStatusLabels.DRAFT
      }

      if (isInactive(project.status)) {
        return ProjectStatusLabels.INACTIVE
      }

      if (isInReview(project.status)) {
        return ProjectStatusLabels.IN_REVIEW
      }

      if (wallet?.state.status === WalletStatus.Inactive) {
        return ProjectStatusLabels.INACTIVE_WALLET
      }

      if (wallet?.state.status === WalletStatus.Unstable) {
        return ProjectStatusLabels.UNSTABLE_WALLET
      }

      if (isActive(project.status)) {
        return ProjectStatusLabels.RUNNING
      }

      return null
    }

    const currentStatus = getStatus()
    setStatus(currentStatus)
  }, [project, wallet])

  if (!status) {
    if (!iconOnly) {
      return (
        <Stack direction={direction} alignItems="center">
          <SkeletonText width="80px" skeletonHeight={4} noOfLines={1} />
        </Stack>
      )
    }

    return null
  }

  const CurrentIcon = ProjectStatusIcons[status]
  const colorScheme = ProjectStatusColorScheme[status]
  const tooltip = ProjectStatusTooltip[status]

  return (
    <Tooltip label={t(tooltip)} placement="top" size="sm">
      <HStack
        h={8}
        w={8}
        alignItems="center"
        justifyContent="center"
        backgroundColor={`${colorScheme}.3`}
        borderRadius={'8px'}
      >
        <Icon as={CurrentIcon} fontSize={iconSize} color={`${colorScheme}.11`} />
      </HStack>
    </Tooltip>
  )
}
