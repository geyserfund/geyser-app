import { ButtonGroup } from '@chakra-ui/react'
import { BiBold, BiItalic } from 'react-icons/bi'

import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarCommon = () => {
  return (
    <ButtonGroup isAttached py={1}>
      <ToolbarCommand cmd="toggleBold" name="bold" label="Bold" Icon={BiBold} />
      <ToolbarCommand
        cmd="toggleItalic"
        name="italic"
        label="Italic"
        Icon={BiItalic}
      />
    </ButtonGroup>
  )
}
