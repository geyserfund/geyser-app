import { IconProps } from '@chakra-ui/react'

import { useFilterContext } from '@/context/filter'

import { ProjectNavIcon, RewardGiftIcon } from '../../../../components/icons'
import { ProjectStatus, ProjectType } from '../../../../types'
import { StatusFilterBody } from './StatusFilterBody'

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

  return (
    <>
      <StatusFilterBody button={button} />
    </>
  )
}

export type StatusTypeButton = {
  icon: (props: IconProps) => JSX.Element
  text: string
  color: string
}

export const getStatusTypeButtonContent = ({ status, type }: StatusAndType): StatusTypeButton => {
  if (type && type === ProjectType.Reward) {
    return {
      icon: RewardGiftIcon,
      text: 'Projects with perks',
      color: 'neutral1.11',
    }
  }

  switch (status) {
    case ProjectStatus.Inactive:
      return {
        icon: ProjectNavIcon,
        text: 'Inactive Projects',
        color: 'neutral1.11',
      }
    default:
      return {
        icon: ProjectNavIcon,
        text: 'Active Projects',
        color: 'primary1.11',
      }
  }
}
