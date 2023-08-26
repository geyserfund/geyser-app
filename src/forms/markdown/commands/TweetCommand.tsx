import { Box } from '@chakra-ui/react'
import { useCommands } from '@remirror/react'
import { BsTwitter } from 'react-icons/bs'

import { useDarkMode, useNotification } from '../../../utils'
import {
  InsertTwitterModal,
  MarkdownTwitter,
  useInsertTwitterModal,
} from '../modals/InsertTwitterModal'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const TweetCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const commands = useCommands()
  const isDarkMode = useDarkMode()
  const { toast } = useNotification()

  const modal = useInsertTwitterModal(async ({ url }: MarkdownTwitter) => {
    commands.insertHardBreak()

    const UrlSplit = url.split('/').filter((val) => val && val !== '/')

    const tweetId = UrlSplit[UrlSplit.length - 1]

    if (!tweetId) return

    try {
      const value = await twttr.widgets.createTweet(
        tweetId,
        document.getElementById('tweet-container'),
        {
          width: '350px',
          theme: isDarkMode ? 'dark' : 'light',
        },
      )

      commands.insertHtml(value.innerHTML, {})
      commands.insertHardBreak()

      const element = document.getElementById('tweet-container')
      if (element) {
        element.innerHTML = ''
      }
    } catch {
      toast({
        status: 'error',
        title: 'Failed to insert tweet',
        description: 'Please try again',
      })
    }

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
        <BsTwitter />
      </ToolbarCommandButton>
      {modal.isOpen ? <InsertTwitterModal {...modal} /> : null}
      <Box
        display="fixed !important"
        left={-10000}
        id="tweet-container"
        borderRadius="12px"
        overflow="hidden"
        sx={{
          '& .twitter-tweet': {
            margin: '0 auto !important',
          },
        }}
      ></Box>
    </>
  )
}
