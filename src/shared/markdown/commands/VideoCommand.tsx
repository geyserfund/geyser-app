import { useCommands } from '@remirror/react'
import getVideoId from 'get-video-id'
import { BsYoutube } from 'react-icons/bs'

import { InsertVideoModal, MarkdownVideo, useInsertVideoModal } from '../modals/InsertVideoModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const VideoCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()

  const modal = useInsertVideoModal(({ url }: MarkdownVideo) => {
    const video = getVideoId(url)
    if (!commands.addYouTubeVideo || !video.id) return
    commands.insertHardBreak()
    commands.addYouTubeVideo({ video: video.id })
    commands.insertHardBreak()
    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton name="video" label="Insert video" onClick={() => modal.onOpen()} isDisabled={isDisabled}>
        <BsYoutube />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertVideoModal {...modal} /> : null}
    </>
  )
}
