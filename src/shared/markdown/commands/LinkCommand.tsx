import { useCommands } from '@remirror/react'
import { PiLink } from 'react-icons/pi'

import { InsertLinkModal, MarkdownLink, useInsertLinkModal } from '../modals/InsertLinkModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const LinkCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()

  const modal = useInsertLinkModal(({ url, label }: MarkdownLink) => {
    if (!commands.insertMarkdown) return
    commands.insertMarkdown(`[${label || url}](${url})`)
    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton name="link" label="Insert link" onClick={() => modal.onOpen()} isDisabled={isDisabled}>
        <PiLink fontSize="16px" />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertLinkModal {...modal} /> : null}
    </>
  )
}
