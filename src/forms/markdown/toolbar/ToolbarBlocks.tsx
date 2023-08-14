import { ButtonGroup } from '@chakra-ui/react'
import { BiCode, BiListOl, BiListUl } from 'react-icons/bi'
import { BsQuote } from 'react-icons/bs'

import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarBlocks = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup isAttached py={1}>
      <ToolbarCommand
        cmd="toggleBulletList"
        name="bulletList"
        label="Bullet List"
        Icon={BiListUl}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="toggleOrderedList"
        name="orderedList"
        label="Ordered List"
        Icon={BiListOl}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="toggleCode"
        name="code"
        label="Code"
        Icon={BiCode}
        isDisabled={isDisabled}
      />
      <ToolbarCommand
        cmd="toggleBlockquote"
        name="blockquote"
        label="Block Quote"
        Icon={BsQuote}
        isDisabled={isDisabled}
      />
    </ButtonGroup>
  )
}
