import { ButtonGroup } from '@chakra-ui/react'
import { RiH1, RiH2, RiH3 } from 'react-icons/ri'

import { ToolbarCommandButton } from '../commands/ToolbarCommandButton'
import { useToolbarCommand } from '../commands/useToolbarCommand'

const headingsArray = [
  { level: 1, Icon: RiH1, name: 'H1' },
  { level: 2, Icon: RiH2, name: 'H2' },
  { level: 3, Icon: RiH3, name: 'H3' },
]

export const ToolbarHeading = ({ isDisabled }: { isDisabled?: boolean }) => {
  const {
    runCommand,
    isDisabled: hasBeenDisabled,
    isActive,
  } = useToolbarCommand('heading', 'toggleHeading')

  return (
    <ButtonGroup isAttached py={1}>
      {headingsArray.map(({ level, name, Icon }) => (
        <ToolbarCommandButton
          isDisabled={isDisabled || hasBeenDisabled()}
          isActive={isActive({ level })}
          name={name}
          label={name}
          key={level}
          onClick={() => runCommand({ level })}
        >
          <Icon />
        </ToolbarCommandButton>
      ))}
    </ButtonGroup>
  )
}
