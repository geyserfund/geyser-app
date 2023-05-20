import { Button, StackProps, VStack } from '@chakra-ui/react'

import { Body1 } from '../../../../components/typography'
import { useFilterContext } from '../../../../context'
import { colors } from '../../../../styles'
import {
  ActivityResourceType,
  ProjectStatus,
  ProjectType,
} from '../../../../types'
import { StatusTypeButton } from '../status'
import { getActivityButtonContent } from './FilterByActivity'

interface ActivityFilterBodyProps extends StackProps {
  onClose: () => void
  button: StatusTypeButton
}

export type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const ActivityFilterBody = ({
  onClose,
  button,
  ...rest
}: ActivityFilterBodyProps) => {
  const { filters, updateFilter } = useFilterContext()

  const handleClick = (activityType?: ActivityResourceType) => {
    updateFilter({ activity: activityType })
    onClose()
  }

  const options = [
    undefined,
    ActivityResourceType.Project,
    ActivityResourceType.FundingTx,
    ActivityResourceType.Entry,
    ActivityResourceType.ProjectReward,
  ]

  return (
    <VStack
      width="100%"
      alignItems="start"
      spacing="20px"
      paddingX="30px"
      {...rest}
    >
      {options.map((option, index) => {
        const isActive = filters.activity === option

        const { icon: Icon, text, color } = getActivityButtonContent(option)
        return (
          <Button
            key={index}
            background={isActive ? 'neutral.100' : 'neutral.0'}
            color="neutral.800"
            onClick={() => handleClick(option)}
            w="100%"
            display="flex"
            justifyContent="start"
          >
            <Icon color={color} />
            <Body1 ml="10px" color={colors.neutral900}>
              {text}
            </Body1>
          </Button>
        )
      })}
    </VStack>
  )
}
