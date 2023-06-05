import { ButtonGroup } from '@chakra-ui/react'

import { ImageCommand } from '../commands/ImageCommand'
import { LinkCommand } from '../commands/LinkCommand'
import { VideoCommand } from '../commands/VideoCommand'

export const ToolbarMedia = () => {
  return (
    <ButtonGroup isAttached py={1}>
      <LinkCommand />
      <ImageCommand />
      <VideoCommand />
    </ButtonGroup>
  )
}
