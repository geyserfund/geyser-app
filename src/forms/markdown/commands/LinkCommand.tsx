import { useCommands } from '@remirror/react'
import { BiLink } from 'react-icons/bi'

import {
  InsertLinkModal,
  MarkdownLink,
  useInsertLinkModal,
} from '../modals/InsertLinkModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const LinkCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()

  const modal = useInsertLinkModal(({ url, label }: MarkdownLink) => {
    commands.insertMarkdown(`[${label || url}](${url})`)
    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton
        name="link"
        label="Insert link"
        onClick={() => modal.onOpen()}
        isDisabled={isDisabled}
      >
        <BiLink />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertLinkModal {...modal} /> : null}
    </>
  )
}
