import { afterEach, describe, expect, it, vi } from 'vitest'

import { createTweetEmbedMarkdown, getTwitterWidgets } from '@/shared/markdown/MdxEditorEmbeds.tsx'

const setTwitterWidgets = (widgets?: unknown) => {
  Object.defineProperty(window, 'twttr', {
    configurable: true,
    value: widgets ? { widgets } : undefined,
  })
}

describe('twitter widgets helpers', () => {
  afterEach(() => {
    Reflect.deleteProperty(window, 'twttr')
  })

  it('returns undefined when the Twitter global is unavailable', () => {
    expect(getTwitterWidgets()).toBeUndefined()
  })

  it('returns null for tweet markdown when widgets are unavailable', async () => {
    await expect(createTweetEmbedMarkdown('https://x.com/geyserfund/status/1642478024699310080', false)).resolves.toBeNull()
  })

  it('creates tweet embed markdown when widgets return an element', async () => {
    const tweetElement = document.createElement('iframe')
    tweetElement.setAttribute('src', 'https://platform.twitter.com/embed/Tweet.html')
    const createTweet = vi.fn().mockResolvedValue(tweetElement)

    setTwitterWidgets({ createTweet })

    await expect(createTweetEmbedMarkdown('https://x.com/geyserfund/status/1642478024699310080', true)).resolves.toContain(
      'platform.twitter.com/embed/Tweet.html',
    )
    expect(createTweet).toHaveBeenCalledWith(
      '1642478024699310080',
      expect.any(HTMLElement),
      expect.objectContaining({ theme: 'dark' }),
    )
  })
})
