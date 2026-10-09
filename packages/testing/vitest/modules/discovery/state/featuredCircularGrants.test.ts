import { ChakraProvider } from '@chakra-ui/react'
// @vitest-environment jsdom
import { createElement, act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  query: vi.fn(),
  retry: vi.fn(),
  result: {} as {
    data?: { projectsGet: { projects: { name: string; fundingSummary: { percentageFunded: number | null } }[] } }
    loading?: boolean
    error?: Error
  },
}))
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
vi.mock('@/types/index.ts', async (original) => ({
  ...(await original<Record<string, unknown>>()),
  useLandingAboveFoldQuery: (options: unknown) => {
    mocks.query(options)
    return { ...mocks.result, refetch: mocks.retry }
  },
  useLandingAnnouncementsQuery: () => ({}),
  useLandingCircularGrantsByFilterLazyQuery: () => [vi.fn()],
}))
// An accidental return to Airtable curation fails immediately, without using a network key.
vi.mock('@/api/airtable.ts', () => ({}))
vi.mock('@apollo/client', async (original) => ({
  ...(await original<Record<string, unknown>>()),
  useQuery: () => ({}),
}))
vi.mock('@/config/Head.tsx', () => ({ Head: () => null }))
vi.mock('@/shared/constants/index.ts', () => ({
  getAiSeoPageContent: () => ({}),
  getPath: () => '/',
  GeyserMainSeoImageUrl: '',
}))
vi.mock('@/shared/utils/seo.ts', () => ({ buildCollectionPageJsonLd: () => '' }))
vi.mock('@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx', () => ({
  useImpactFundsDonateModal: () => ({ openDonateModal: vi.fn(), donateModalElement: null }),
}))
vi.mock('@/modules/discovery/pages/heroes/index.ts', () => ({ HeroesMainPage: () => null }))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/CircularGrantFilterBar.tsx', () => ({
  CircularGrantFilterBar: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/CircularGrantProjects.tsx', () => ({
  CircularGrantProjects: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/CircularGrantsMission.tsx', () => ({
  CircularGrantsFocus: () => null,
  FieldPartnerCaseStudy: () => null,
  FieldPartnersPanel: () => null,
  SupportMovementBand: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/GeyserNewsAndAnnouncements.tsx', () => ({
  GeyserNewsAndAnnouncements: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/LatamImpactFundApplication.tsx', () => ({
  LatamImpactFundApplication: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/NewsletterSignup.tsx', () => ({
  NewsletterSignup: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/mainView/defaultView/sections/CuratedProjects.tsx', () => ({
  CuratedProjects: ({
    featuredLoading,
    featuredError,
    featuredProjects,
    onRetryFeatured,
  }: {
    featuredLoading: boolean
    featuredError: boolean
    featuredProjects: { name: string }[]
    onRetryFeatured: () => void
  }) =>
    featuredLoading
      ? createElement('div', null, 'Loading')
      : featuredError
      ? createElement('button', { onClick: onRetryFeatured }, 'Retry')
      : createElement('div', null, featuredProjects.map((project) => project.name).join(',')),
}))

import { DefaultView } from '@/modules/discovery/pages/landing/views/mainView/defaultView/DefaultView.tsx'

let root: ReturnType<typeof createRoot>
let container: HTMLDivElement
beforeEach(() => {
  vi.clearAllMocks()
  mocks.result = {}
  container = document.createElement('div')
  root = createRoot(container)
})
afterEach(() => {
  act(() => root.unmount())
})
const render = () => act(() => root.render(createElement(ChakraProvider, null, createElement(DefaultView))))

describe('Homepage live Circular Grants', () => {
  it('requests ranked candidates and shows the top three projects below 100% funded', () => {
    mocks.result = {
      data: {
        projectsGet: {
          projects: [
            { name: 'already-over', fundingSummary: { percentageFunded: 117 } },
            { name: 'already-funded', fundingSummary: { percentageFunded: 100 } },
            { name: 'z-highest-open', fundingSummary: { percentageFunded: 80 } },
            { name: 'a-second-open', fundingSummary: { percentageFunded: 45 } },
            { name: 'm-third-open', fundingSummary: { percentageFunded: 0 } },
            { name: 'fourth-open', fundingSummary: { percentageFunded: 12 } },
          ],
        },
      },
    }
    render()
    expect(mocks.query).toHaveBeenCalledWith({
      variables: {
        input: {
          where: { isCircularGrant: true, status: 'active', goalReached: false },
          pagination: { take: 20 },
          orderBy: [
            { direction: 'desc', field: 'balance' },
            { direction: 'desc', field: 'launchedAt' },
          ],
        },
      },
    })
    expect(container.textContent).toBe('z-highest-open,a-second-open,m-third-open')
  })

  it('shows loading while the live projects query is pending', () => {
    mocks.result = { loading: true }
    render()
    expect(container.textContent).toBe('Loading')
  })

  it('retries the live query after an error without falling back to curated projects', () => {
    mocks.result = { error: new Error('Unavailable') }
    render()
    expect(container.textContent).toBe('Retry')
    act(() => container.querySelector('button')!.click())
    expect(mocks.retry).toHaveBeenCalledOnce()
  })
})
