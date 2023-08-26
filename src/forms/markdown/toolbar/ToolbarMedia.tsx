import { ButtonGroup } from '@chakra-ui/react'

import { ImageCommand } from '../commands/ImageCommand'
import { LinkCommand } from '../commands/LinkCommand'
import { TweetCommand } from '../commands/TweetCommand'
import { VideoCommand } from '../commands/VideoCommand'

export const ToolbarMedia = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <ButtonGroup isAttached py={1}>
      <LinkCommand isDisabled={isDisabled} />
      <ImageCommand isDisabled={isDisabled} />
      <VideoCommand isDisabled={isDisabled} />
      <TweetCommand isDisabled={isDisabled} />
    </ButtonGroup>
  )
}
