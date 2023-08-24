import { useCommands } from '@remirror/react'
import { BsYoutube } from 'react-icons/bs'

import {
  InsertVideoModal,
  MarkdownVideo,
  useInsertVideoModal,
} from '../modals/InsertVideoModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const VideoCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()

  const modal = useInsertVideoModal(({ url }: MarkdownVideo) => {
    if (!commands.addYouTubeVideo) return
    commands.addYouTubeVideo({ video: url })
    commands.insertHardBreak()
    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton
        name="video"
        label="Insert video"
        onClick={() => modal.onOpen()}
        isDisabled={isDisabled}
      >
        <BsYoutube />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertVideoModal {...modal} /> : null}
    </>
  )
}
