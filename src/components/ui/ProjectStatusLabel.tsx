import { Stack, StackDirection, Text } from '@chakra-ui/react'
import { HTMLChakraProps } from '@chakra-ui/system'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { colors } from '../../styles'
import { Project, WalletStatus } from '../../types/generated/graphql'
import { isActive, isDraft } from '../../utils'

interface IProjectStatusLabel extends HTMLChakraProps<'div'> {
  project: Project
  fontSize?: string
  iconSize?: string
  fontFamily?: string
  direction?: StackDirection
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

  const getIcon = () => {
    if (
      project?.wallets[0] &&
      project.wallets[0]?.state?.status === WalletStatus.Inactive
    ) {
      return (
        <BsFillXCircleFill fontSize={iconSize} color={colors.secondaryRed} />
      )
    }

    if (
      project?.wallets[0] &&
      project.wallets[0].state.status === WalletStatus.Unstable
    ) {
      return (
        <BsFillXCircleFill fontSize={iconSize} color={colors.secondaryGold} />
      )
    }

    if (isActive(project.status)) {
      return (
        <BsFillCheckCircleFill fontSize={iconSize} color={colors.primary500} />
      )
    }

    if (isDraft(project.status)) {
      return <BsFillXCircleFill fontSize={iconSize} color={colors.neutral500} />
    }

    return <BsFillXCircleFill fontSize={iconSize} color={colors.neutral500} />
  }

  const getLabel = () => {
    if (
      project?.wallets[0] &&
      project.wallets[0].state.status === WalletStatus.Inactive
    ) {
      return (
        <Text color={colors.secondaryRed} {...commonStyles}>
          INACTIVE WALLET
        </Text>
      )
    }

    if (
      project?.wallets[0] &&
      project.wallets[0].state.status === WalletStatus.Unstable
    ) {
      return (
        <Text color={colors.secondaryGold} {...commonStyles}>
          UNSTABLE WALLET
        </Text>
      )
    }

    if (isActive(project.status)) {
      return (
        <Text color={colors.primary500} {...commonStyles}>
          RUNNING
        </Text>
      )
    }

    if (isDraft(project.status)) {
      return (
        <Text color={colors.neutral500} {...commonStyles}>
          DRAFT
        </Text>
      )
    }

    return (
      <Text color={colors.neutral500} {...commonStyles}>
        INACTIVE
      </Text>
    )
  }

  return (
    <Stack direction={direction} alignItems="center">
      {getIcon()}
      {getLabel()}
    </Stack>
  )
}
