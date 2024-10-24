import { ButtonGroup } from '@chakra-ui/react'
import { PiTextB, PiTextItalic, PiTextUnderline } from 'react-icons/pi'

import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarCommon = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup spacing={1} padding={0}>
      <ToolbarCommand cmd="toggleBold" name="bold" label="Bold" Icon={PiTextB} isDisabled={isDisabled} />
      <ToolbarCommand cmd="toggleItalic" name="italic" label="Italic" Icon={PiTextItalic} isDisabled={isDisabled} />
      <ToolbarCommand
        cmd="toggleUnderline"
        name="underline"
        label="Underline"
        Icon={PiTextUnderline}
        isDisabled={isDisabled}
      />
    </ButtonGroup>
  )
}
