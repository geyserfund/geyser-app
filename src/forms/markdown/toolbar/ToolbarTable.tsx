import { ButtonGroup } from '@chakra-ui/react'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from 'react-icons/bi'

import { TableCommand } from '../commands/TableCommand'
import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarTable = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup isAttached py={1}>
      <TableCommand isDisabled={isDisabled} />
      <ToolbarCommand
        cmd="leftAlign"
        name="leftAlign"
        label="align right"
        Icon={BiAlignLeft}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="centerAlign"
        name="centerAlign"
        label="align center"
        Icon={BiAlignMiddle}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="rightAlign"
        name="rightAlign"
        label="align right"
        Icon={BiAlignRight}
        isDisabled={isDisabled}
      />
    </ButtonGroup>
  )
}
