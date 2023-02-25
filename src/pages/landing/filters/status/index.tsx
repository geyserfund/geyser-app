import { IconProps } from '@chakra-ui/react'

import { ProjectNavIcon, RewardGiftIcon } from '../../../../components/icons'
import { projectTypes } from '../../../../constants'
import { useFilterContext } from '../../../../context'
import { ProjectStatus, ProjectType } from '../../../../types'
import { DesktopStatusFilter } from './DesktopStatusFilter'
import { MobileStatusFilter } from './MobileStatusFilter'

interface FilterByStatusProps {
  mobile?: boolean
}
type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const FilterByStatus = ({ mobile }: FilterByStatusProps) => {
  const { filters } = useFilterContext()

  const button = getStatusTypeButtonContent({
    status: filters.status,
    type: filters.type,
  })

  if (mobile) {
    return <MobileStatusFilter {...{ button }} />
  }

  return (
    <>
      <DesktopStatusFilter {...{ button }} />
    </>
  )
}

export type StatusTypeButton = {
  icon: (props: IconProps) => JSX.Element
  text: string
  color: string
}

export const getStatusTypeButtonContent = ({
  status,
  type,
}: StatusAndType): StatusTypeButton => {
  if (type && type === projectTypes.reward) {
    return {
      icon: RewardGiftIcon,
      text: 'Projects with perks',
      color: 'brand.neutral900',
    }
  }

  switch (status) {
    case ProjectStatus.Deleted:
      return {
        icon: ProjectNavIcon,
        text: 'Inactive Projects',
        color: 'brand.secondaryRed',
      }
    default:
      return {
        icon: ProjectNavIcon,
        text: 'Active projects',
        color: 'brand.primary500',
      }
  }
}
