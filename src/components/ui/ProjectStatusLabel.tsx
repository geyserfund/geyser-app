import { Stack, StackDirection, Text, Tooltip } from '@chakra-ui/react'
import { HTMLChakraProps } from '@chakra-ui/system'
import { useEffect, useState } from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { colors } from '../../styles'
import { ProjectFragment, WalletStatus } from '../../types/generated/graphql'
import { isActive, isDraft } from '../../utils'

interface IProjectStatusLabel extends HTMLChakraProps<'div'> {
  project: ProjectFragment
  fontSize?: string
  iconSize?: string
  fontFamily?: string
  direction?: StackDirection
}

export enum ProjectStatusLabels {
  UNSTABLE_WALLET = 'UNSTABLE WALLET',
  INACTIVE_WALLET = 'INACTIVE WALLET',
  RUNNING = 'RUNNING',
  DRAFT = 'DRAFT',
  INACTIVE = 'INACTIVE',
}

export const ProjectStatusColors = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: colors.secondaryRed,
  [ProjectStatusLabels.INACTIVE_WALLET]: colors.secondaryGold,
  [ProjectStatusLabels.RUNNING]: colors.primary500,
  [ProjectStatusLabels.DRAFT]: colors.neutral500,
  [ProjectStatusLabels.INACTIVE]: colors.neutral500,
}

export const ProjectStatusIcons = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: BsFillXCircleFill,
  [ProjectStatusLabels.INACTIVE_WALLET]: BsFillXCircleFill,
  [ProjectStatusLabels.RUNNING]: BsFillCheckCircleFill,
  [ProjectStatusLabels.DRAFT]: BsFillXCircleFill,
  [ProjectStatusLabels.INACTIVE]: BsFillXCircleFill,
}

export const ProjectStatusTooltip = {
  [ProjectStatusLabels.UNSTABLE_WALLET]:
    'The last time someone tried to send funds to this wallet, there was a liquidity issue. ',
  [ProjectStatusLabels.INACTIVE_WALLET]:
    'The last time someone tried to make a transaction to this project, the invoice generation failed. ',
  [ProjectStatusLabels.RUNNING]:
    'This project is live and wallet running smoothly. ',
  [ProjectStatusLabels.DRAFT]:
    'This project has not been launched yet and is only visible to the project creator ',
  [ProjectStatusLabels.INACTIVE]:
    'This project has been deactivated by the project creator.',
}

export const ProjectStatusLabel = ({
  project,
  fontSize,
  fontFamily,
  iconSize = '16px',
  direction = 'row',
}: IProjectStatusLabel) => {
  const commonStyles = {
    fontWeight: 'semibold',
    fontFamily,
    fontSize: fontSize || '12px',
  }

  const [status, setStatus] = useState<ProjectStatusLabels>(
    ProjectStatusLabels.DRAFT,
  )

  useEffect(() => {
    if (!project) {
      return
    }

    const getStatus = () => {
      if (
        project?.wallets[0] &&
        project.wallets[0].state.status === WalletStatus.Inactive
      ) {
        return ProjectStatusLabels.INACTIVE_WALLET
      }

      if (
        project?.wallets[0] &&
        project.wallets[0].state.status === WalletStatus.Unstable
      ) {
        return ProjectStatusLabels.UNSTABLE_WALLET
      }

      if (isActive(project.status)) {
        return ProjectStatusLabels.RUNNING
      }

      if (isDraft(project.status)) {
        return ProjectStatusLabels.DRAFT
      }

      return ProjectStatusLabels.INACTIVE
    }

    const currentStatus = getStatus()
    setStatus(currentStatus)
  }, [project])

  const Icon = ProjectStatusIcons[status]
  const color = ProjectStatusColors[status]
  const tooltip = ProjectStatusTooltip[status]
  return (
    <Tooltip label={tooltip} placement="top" size="sm">
      <Stack direction={direction} alignItems="center">
        <Icon fontSize={iconSize} color={color} />
        <Text color={color} {...commonStyles}>
          {status}
        </Text>
      </Stack>
    </Tooltip>
  )
}
