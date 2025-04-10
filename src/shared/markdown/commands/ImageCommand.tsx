import { useCommands } from '@remirror/react'
import { PiImage } from 'react-icons/pi'

import { InsertImageModal, MarkdownImage } from '../modals/InsertImageModal'
import { useInsertLinkModal } from '../modals/InsertLinkModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const ImageCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()

  const modal = useInsertLinkModal(({ url, label }: MarkdownImage) => {
    if (!commands.insertImage) return
    commands.insertHardBreak()
    commands.insertImage({
      src: url,
      alt: label || 'image',
    })

    commands.insertHardBreak()

    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton name="image" label="Insert image" onClick={() => modal.onOpen()} isDisabled={isDisabled}>
        <PiImage fontSize="16px" />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertImageModal {...modal} /> : null}
    </>
  )
}
