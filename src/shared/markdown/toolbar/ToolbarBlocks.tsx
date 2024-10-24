import { ButtonGroup } from '@chakra-ui/react'
import { PiCode, PiListBullets, PiListNumbers, PiQuotes } from 'react-icons/pi'

import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarBlocks = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup padding={0} spacing={1}>
      <ToolbarCommand
        cmd="toggleBulletList"
        name="bulletList"
        label="Bullet List"
        Icon={PiListBullets}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="toggleOrderedList"
        name="orderedList"
        label="Ordered List"
        Icon={PiListNumbers}
        isDisabled={isDisabled}
      />
      <ToolbarCommand cmd="toggleCode" name="code" label="Code" Icon={PiCode} isDisabled={isDisabled} />
      <ToolbarCommand
        cmd="toggleBlockquote"
        name="blockquote"
        label="Block Quote"
        Icon={PiQuotes}
        isDisabled={isDisabled}
      />
    </ButtonGroup>
  )
}
