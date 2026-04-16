import { ButtonGroup } from '@chakra-ui/react'
import { PiTextAlignCenter, PiTextAlignLeft, PiTextAlignRight } from 'react-icons/pi'

import { TableCommand } from '../commands/TableCommand'
import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarTable = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup padding={0} spacing={1}>
      <TableCommand isDisabled={isDisabled} />
      <ToolbarCommand
        cmd="leftAlign"
        name="leftAlign"
        label="align right"
        Icon={PiTextAlignLeft}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="centerAlign"
        name="centerAlign"
        label="align center"
        Icon={PiTextAlignCenter}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="rightAlign"
        name="rightAlign"
        label="align right"
        Icon={PiTextAlignRight}
        isDisabled={isDisabled}
      />
    </ButtonGroup>
  )
}
