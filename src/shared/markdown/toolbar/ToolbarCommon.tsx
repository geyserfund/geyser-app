import { ButtonGroup } from '@chakra-ui/react'
import { BiBold, BiItalic, BiUnderline } from 'react-icons/bi'

import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarCommon = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup isAttached py={1}>
      <ToolbarCommand cmd="toggleBold" name="bold" label="Bold" Icon={BiBold} isDisabled={isDisabled} />
      <ToolbarCommand cmd="toggleItalic" name="italic" label="Italic" Icon={BiItalic} isDisabled={isDisabled} />
      <ToolbarCommand
        cmd="toggleUnderline"
        name="underline"
        label="Underline"
        Icon={BiUnderline}
        isDisabled={isDisabled}
      />
    </ButtonGroup>
  )
}
