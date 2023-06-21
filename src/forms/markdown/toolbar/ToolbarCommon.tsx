import { ButtonGroup } from '@chakra-ui/react'
import { BiBold, BiCode, BiItalic, BiListOl, BiListUl } from 'react-icons/bi'
import { BsQuote } from 'react-icons/bs'

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
      {/* <ToolbarCommand
      cmd="toggleCodeBlock"
      name="codeBlock"
      label="Code Block"
      Icon={BiCodeCurly}
    /> */}
    </ButtonGroup>
  )
}
