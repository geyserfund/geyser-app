import { Button, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useFilterContext } from '@/context/filter'

import { ProjectStatus, ProjectType } from '../../../../types'
import { getStatusTypeButtonContent, StatusTypeButton } from '.'

interface StatusFilterBodyProps extends StackProps {
  onClose?: () => void
  button: StatusTypeButton
}

export type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const StatusFilterBody = ({ onClose, button, ...rest }: StatusFilterBodyProps) => {
  const { t } = useTranslation()
  const { filters, updateFilter } = useFilterContext()

  const handleClick = ({ status, type }: StatusAndType) => {
    if (type) {
      updateFilter({ status: undefined, type })
    } else {
      updateFilter({ status, type: undefined })
    }

    if (onClose) {
      onClose()
    }
  }

  const options = [{ type: ProjectType.Reward }, { status: ProjectStatus.Active }, { status: ProjectStatus.Inactive }]

  console.log('checking filters', filters)

  return (
    <VStack width="100%" alignItems="start" spacing="20px" paddingX="30px" {...rest}>
      {options.map((option, index) => {
        const isActive = filters.type === option.type && filters.status === option.status

        const { icon: Icon, text, color } = getStatusTypeButtonContent(option)
        return (
          <Button
            key={index}
            size="lg"
            variant={'surface'}
            colorScheme={isActive ? 'primary1' : 'neutral1'}
            onClick={() => handleClick(option)}
            w="100%"
            display="flex"
            justifyContent="start"
            leftIcon={<Icon color={color} />}
          >
            {t(text)}
          </Button>
        )
      })}
    </VStack>
  )
}
