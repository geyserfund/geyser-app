import { Button, StackProps, VStack } from '@chakra-ui/react'

import { Body1 } from '../../../../components/typography'
import { useFilterContext } from '../../../../context'
import { colors } from '../../../../styles'
import { ProjectStatus, ProjectType } from '../../../../types'
import { getStatusTypeButtonContent, StatusTypeButton } from '.'

interface StatusFilterBodyProps extends StackProps {
  onClose: () => void
  button: StatusTypeButton
}

export type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const StatusFilterBody = ({
  onClose,
  button,
  ...rest
}: StatusFilterBodyProps) => {
  const { filters, updateFilter } = useFilterContext()

  const handleClick = ({ status, type }: StatusAndType) => {
    if (type) {
      updateFilter({ status: undefined, type })
    } else {
      updateFilter({ status, type: undefined })
    }

    onClose()
  }

  const options = [
    { type: ProjectType.Reward },
    { status: ProjectStatus.Active },
    { status: ProjectStatus.Inactive },
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
        const isActive =
          filters.type === option.type && filters.status === option.status

        const { icon: Icon, text, color } = getStatusTypeButtonContent(option)
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
