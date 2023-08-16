import { IconProps } from '@chakra-ui/icons'
import { FC } from 'react'
import { IconBaseProps } from 'react-icons'

import { ToolbarCommandButton } from './ToolbarCommandButton'
import { useToolbarCommand } from './useToolbarCommand'

export interface ToolbarCommandProps {
  name: string
  cmd: string
  label: string
  Icon: FC<IconProps> | FC<IconBaseProps>
  isDisabled?: boolean
}

export const ToolbarCommand = ({
  name,
  cmd,
  label,
  Icon,
  isDisabled,
}: ToolbarCommandProps) => {
  const {
    runCommand,
    isActive,
    isDisabled: hasBeenDisabled,
  } = useToolbarCommand(name, cmd)

  return (
    <ToolbarCommandButton
      isActive={isActive()}
      isDisabled={isDisabled || hasBeenDisabled()}
      name={name}
      label={label}
      onClick={() => runCommand()}
    >
      <Icon />
    </ToolbarCommandButton>
  )
}
