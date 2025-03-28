import { Box } from '@chakra-ui/react'
import { useCommands } from '@remirror/react'
import { useTranslation } from 'react-i18next'
import { PiXLogo } from 'react-icons/pi'

import { useDarkMode, useNotification } from '../../../utils'
import { InsertTwitterModal, MarkdownTwitter, useInsertTwitterModal } from '../modals/InsertTwitterModal'
import { TwitterRegex } from '../validations/twitter'
import { ToolbarCommandButton } from './ToolbarCommandButton'

export const TweetCommand = ({ isDisabled }: { isDisabled?: boolean }) => {
  const { t } = useTranslation()
  const commands = useCommands()
  const isDarkMode = useDarkMode()
  const { toast } = useNotification()

  const modal = useInsertTwitterModal(async ({ url }: MarkdownTwitter) => {
    commands.insertHardBreak()

    const tweetId = getTweetIdFromUrl(url)

    if (!tweetId) {
      toast({
        status: 'error',
        title: t('Invalid tweet URL'),
        description: t('Please try again'),
      })
      return
    }

    try {
      const value = await twttr.widgets.createTweet(tweetId, document.getElementById('tweet-container'), {
        width: '350px',
        theme: isDarkMode ? 'dark' : 'light',
      })

      commands.insertHtml(value.innerHTML, {})
      commands.insertHardBreak()

      const element = document.getElementById('tweet-container')
      if (element) {
        element.innerHTML = ''
      }
    } catch {
      toast({
        status: 'error',
        title: t('Failed to insert tweet'),
        description: t('Please try again'),
      })
    }

    modal.onClose()
  })

  return (
    <>
      <ToolbarCommandButton
        name="video"
        label={t('Insert tweet')}
        onClick={() => modal.onOpen()}
        isDisabled={isDisabled}
      >
        <PiXLogo fontSize="16px" />
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

const getTweetIdFromUrl = (url: string) => {
  const match = url.match(TwitterRegex)

  if (match && match.length >= 3) {
    const tweetId = match[2]
    return tweetId
  }

  return ''
}
