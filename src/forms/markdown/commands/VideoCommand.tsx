import { useCommands } from '@remirror/react'
import { BsYoutube } from 'react-icons/bs'

import {
  InsertVideoModal,
  MarkdownVideo,
  useInsertVideoModal,
} from '../modals/InsertVideoModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const VideoCommand = () => {
  const commands = useCommands()

  const modal = useInsertVideoModal(({ url }: MarkdownVideo) => {
    commands.addYouTubeVideo({ video: url })
    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton
        name="video"
        label="Insert video"
        onClick={() => modal.onOpen()}
      >
        <BsYoutube />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertVideoModal {...modal} /> : null}
    </>
  )
}
