import { ButtonGroup } from '@chakra-ui/react'
import { BiCode, BiListOl, BiListUl } from 'react-icons/bi'
import { BsQuote } from 'react-icons/bs'

import { ToolbarCommand } from '../commands/ToolbarCommand'

export const ToolbarBlocks = () => {
  return (
    <ButtonGroup isAttached py={1}>
      <ToolbarCommand
        cmd="toggleBulletList"
        name="bulletList"
        label="Bullet List"
        Icon={BiListUl}
      />
      <ToolbarCommand
        cmd="toggleOrderedList"
        name="orderedList"
        label="Ordered List"
        Icon={BiListOl}
      />
      <ToolbarCommand cmd="toggleCode" name="code" label="Code" Icon={BiCode} />
      <ToolbarCommand
        cmd="toggleBlockquote"
        name="blockquote"
        label="Block Quote"
        Icon={BsQuote}
      />
    </ButtonGroup>
  )
}
