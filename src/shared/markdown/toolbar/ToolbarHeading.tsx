import { ButtonGroup } from '@chakra-ui/react'
import { PiTextHOne, PiTextHThree, PiTextHTwo } from 'react-icons/pi'

import { ToolbarCommandButton } from '../commands/ToolbarCommandButton'
import { useToolbarCommand } from '../commands/useToolbarCommand'

const headingsArray = [
  { level: 1, Icon: PiTextHOne, name: 'H1' },
  { level: 2, Icon: PiTextHTwo, name: 'H2' },
  { level: 3, Icon: PiTextHThree, name: 'H3' },
]

export const ToolbarHeading = ({ isDisabled }: { isDisabled?: boolean }) => {
  const { runCommand, isDisabled: hasBeenDisabled, isActive } = useToolbarCommand('heading', 'toggleHeading')

  return (
    <ButtonGroup padding={0} spacing={1}>
      {headingsArray.map(({ level, name, Icon }) => (
        <ToolbarCommandButton
          isDisabled={isDisabled || hasBeenDisabled()}
          isActive={isActive({ level })}
          name={name}
          label={name}
          key={level}
          onClick={() => runCommand({ level })}
        >
          <Icon fontSize={'16px'} />
        </ToolbarCommandButton>
      ))}
    </ButtonGroup>
  )
}
