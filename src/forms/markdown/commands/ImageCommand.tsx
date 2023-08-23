import { useCommands } from '@remirror/react'
import { BiImageAdd } from 'react-icons/bi'

import { InsertImageModal, MarkdownImage } from '../modals/InsertImageModal'
import { useInsertLinkModal } from '../modals/InsertLinkModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const ImageCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()

  const modal = useInsertLinkModal(({ url, label }: MarkdownImage) => {
    if (!commands.insertImage) return
    commands.insertImage({
      src: url,
      alt: label || 'image',
    })

    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton
        name="image"
        label="Insert image"
        onClick={() => modal.onOpen()}
        isDisabled={isDisabled}
      >
        <BiImageAdd />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertImageModal {...modal} /> : null}
    </>
  )
}
