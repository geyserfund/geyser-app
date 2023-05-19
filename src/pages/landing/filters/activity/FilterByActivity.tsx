import { Icon } from '@chakra-ui/react'
import { BsCardText } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

import {
  EntryEditIcon,
  ProjectNavIcon,
  RewardGiftIcon,
} from '../../../../components/icons'
import { useFilterContext } from '../../../../context'
import { ActivityResourceType } from '../../../../types'
import { StatusTypeButton } from '../status'
import { DesktopActivityFilter } from './DesktopActivityFilter'
import { MobileActivityFilter } from './MobileActivityFilter'

interface FilterByActivityProps {
  mobile?: boolean
}
export const FilterByActivity = ({ mobile }: FilterByActivityProps) => {
  const { filters } = useFilterContext()

  const button = getActivityButtonContent(filters.activity)

  if (mobile) {
    return <MobileActivityFilter {...{ button }} />
  }

  return (
    <>
      <DesktopActivityFilter {...{ button }} />
    </>
  )
}

export const getActivityButtonContent = (
  activityType?: ActivityResourceType,
): StatusTypeButton => {
  switch (activityType) {
    case ActivityResourceType.Project:
      return {
        icon: ProjectNavIcon,
        text: 'Projects',
        color: 'neutral.600',
      }
    case ActivityResourceType.FundingTx:
      return {
        icon: (props) => <Icon as={FaHeart} {...props} />,
        text: 'Contributions',
        color: 'neutral.600',
      }
    case ActivityResourceType.Entry:
      return {
        icon: EntryEditIcon,
        text: 'Entry',
        color: 'neutral.600',
      }
    case ActivityResourceType.ProjectReward:
      return {
        icon: RewardGiftIcon,
        text: 'Rewards',
        color: 'neutral.600',
      }

    default:
      return {
        icon: (props) => <Icon fontSize="20px" as={BsCardText} {...props} />,
        text: 'All activity',
        color: 'neutral.600',
      }
  }
}
