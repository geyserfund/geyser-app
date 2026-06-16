import type { Event } from '@sentry/react'
import { describe, expect, it } from 'vitest'

import { shouldDropSentryEvent } from '@/config/sentry/sentryEventFilter.ts'

const createEvent = (overrides: Partial<Event>): Event => overrides as Event

describe('shouldDropSentryEvent', () => {
  it('drops Tawk third-party script errors', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'TypeError',
            value: 't.$_Tawk.i18next is not a function',
            stacktrace: {
              frames: [{ filename: '/_s/v4/app/6a27e7c604b/js/twk-chunk-common.js' }],
            },
          },
        ],
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(true)
  })

  it('drops service worker registration errors', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'TypeError',
            value:
              "Failed to register a ServiceWorker for scope ('https://geyser.fund/') with script ('https://geyser.fund/sw.js')",
          },
        ],
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(true)
  })

  it('drops Android WebView anonymous toLowerCase focus errors', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'TypeError',
            value: "Cannot read properties of undefined (reading 'toLowerCase')",
            stacktrace: {
              frames: [{ function: 'HTMLDocument.<anonymous>' }],
            },
          },
        ],
      },
      tags: {
        'browser.name': 'Chrome Mobile WebView',
      },
      extra: {
        arguments: [{ type: 'focusin' }],
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(true)
  })

  it('drops expected project lookup Apollo errors', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'ApolloError',
            value: 'You do not have permission to view this project.',
          },
        ],
      },
      request: {
        url: 'https://geyser.fund/project/bitcoineducationarchive',
      },
      tags: {
        'not-found': 'projectGet',
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(true)
  })

  it('keeps Stripe account errors visible', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'ApolloError',
            value:
              "The provided key 'sk_live_***' does not have access to account 'acct_123' or that account does not exist.",
          },
        ],
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(false)
  })

  it('keeps WebAssembly errors visible', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'CompileError',
            value: 'WebAssembly.instantiate(): BufferSource argument is empty',
          },
        ],
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(false)
  })

  it('keeps React removeChild errors visible for investigation', () => {
    const event = createEvent({
      exception: {
        values: [
          {
            type: 'NotFoundError',
            value: "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
          },
        ],
      },
      tags: {
        'Router-Boundary-Error': 'true',
      },
    })

    expect(shouldDropSentryEvent(event)).toBe(false)
  })
})
