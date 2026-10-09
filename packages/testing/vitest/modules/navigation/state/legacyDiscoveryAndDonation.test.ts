import { ChakraProvider } from '@chakra-ui/react'
import { createElement, useState, act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, useLocation } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  pagination: vi.fn(),
  leaderboard: vi.fn(),
  filters: {} as Record<string, unknown>,
  socialAccounts: [{ accountType: 'nostr' }],
}))

vi.mock('@/config/Head.tsx', () => ({ Head: () => null }))
vi.mock('@/context/filter.tsx', () => ({ useFilterContext: () => ({ filters: mocks.filters }) }))
vi.mock('@/modules/discovery/graphql/queries/projectsQuery.ts', () => ({ QUERY_PROJECTS_FOR_LANDING_PAGE: {} }))
vi.mock('@/shared/constants/index.ts', () => ({
  CampaignsSeoImageUrl: '',
  FundraisersSeoImageUrl: '',
  GeyserMainSeoImageUrl: '',
  PathName: {
    campaigns: 'campaigns',
    fundraisers: 'fundraisers',
    circularGrants: 'circular-grants',
    category: 'category',
    subCategory: 'subcategory',
  },
  getPath: (key: string) =>
    ({
      discoveryProjects: '/projects',
      discoveryCircularGrantProjects: '/circular-grants',
      discoveryCampaigns: '/campaigns',
      discoveryFundraisers: '/fundraisers',
      launchFundingStrategy: '/launch/new/strategy',
    }[key] ?? `/${key}`),
}))
vi.mock('@/shared/hooks/useQueryWithPagination.tsx', () => ({
  useQueryWithPagination: (options: unknown) => {
    mocks.pagination(options)
    return { data: [], isLoading: false, refetch: vi.fn() }
  },
}))
vi.mock('@/shared/utils/hooks/useProjectToolKit.ts', () => ({ getIsAonActive: () => true }))
vi.mock('@/utils/validations/project.ts', () => ({ isActive: () => true }))
vi.mock('@/modules/discovery/pages/landing/views/ProjectsRegionCountryFilter.tsx', () => ({
  ProjectsRegionCountryFilter: () => null,
}))
vi.mock('@/modules/discovery/pages/landing/views/navView/components/RenderProjectList.tsx', () => ({
  RenderProjectList: () => null,
}))
vi.mock('@/types/index.ts', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useGetUserIpCountryQuery: () => ({ loading: false }),
  useLeaderboardGlobalProjectsQuery: (options: unknown) => {
    mocks.leaderboard(options)
    return { loading: false, data: undefined }
  },
}))
vi.mock('i18next', () => ({ t: (key: string) => key }))
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
vi.mock('@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx', () => ({
  useImpactFundsDonateModal: () => {
    const [isOpen, setIsOpen] = useState(false)
    return {
      openDonateModal: () => setIsOpen(true),
      donateModalElement: isOpen ? createElement('div', { role: 'dialog' }, 'Donate to the Geyser Impact Fund') : null,
    }
  },
}))

vi.mock('@/api/airtable.ts', () => ({ postImpactFundDonationPreference: vi.fn() }))
vi.mock('@/utils', () => ({ useNotification: () => ({ error: vi.fn() }) }))
vi.mock('@/shared/components/layouts/Modal.tsx', () => ({
  Modal: ({ isOpen, children, onClose }: { isOpen: boolean; children: React.ReactNode; onClose: () => void }) =>
    isOpen
      ? createElement('div', { role: 'dialog' }, children, createElement('button', { onClick: onClose }, 'Close'))
      : null,
}))

vi.mock('@/context/auth.tsx', () => ({
  useAuthContext: () => ({ isLoggedIn: true, user: { externalAccounts: mocks.socialAccounts } }),
}))
vi.mock('@/components/molecules/AuthModal.tsx', () => ({
  AuthModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? createElement('div', { role: 'dialog' }, 'Connect a social account') : null,
}))

import { ApplicationProjectChoiceModal } from '@/modules/impactFunds/components/ApplicationProjectChoiceModal.tsx'
import { useLaunchNow } from '@/modules/project/pages/projectCreation/hooks/useLaunchNow.tsx'
import { ImpactFundsDonatePreferencesModal } from '@/modules/impactFunds/components/mainPage/ImpactFundsDonatePreferencesModal.tsx'
import { Projects } from '@/modules/discovery/pages/landing/views/Projects.tsx'
import { NavigationDonateProvider } from '@/modules/navigation/components/NavigationDonateProvider.tsx'
import { DonateNavMenuContent } from '@/modules/navigation/components/navDropdown/DonateNavMenuContent.tsx'

const roots: ReturnType<typeof createRoot>[] = []
const render = (element: ReturnType<typeof createElement>) => {
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  roots.push(root)
  act(() => root.render(createElement(ChakraProvider, null, element)))
  return container
}

afterEach(() => {
  act(() => roots.splice(0).forEach((root) => root.unmount()))
  document.body.replaceChildren()
  vi.clearAllMocks()
  mocks.filters = {}
  mocks.socialAccounts = [{ accountType: 'nostr' }]
})

describe('legacy project discovery', () => {
  it.each(['/projects', '/projects?sort=most_funded_this_month'])('uses the full legacy list at %s', (route) => {
    render(createElement(MemoryRouter, { initialEntries: [route] }, createElement(Projects)))
    const options = mocks.pagination.mock.lastCall?.[0]
    expect(options.where).toMatchObject({ isCircularGrant: false, status: 'active' })
    expect(options.options.skip).toBe(false)
    expect(options.orderBy[0]).toEqual({ field: 'balance', direction: 'desc' })
    expect(mocks.leaderboard.mock.lastCall?.[0].skip).toBe(true)
  })

  it('retains legacy scope with country, category, search, and recent sorting', () => {
    mocks.filters = { countryCode: 'KE', category: 'community', search: 'bitcoin' }
    render(createElement(MemoryRouter, { initialEntries: ['/projects?sort=most_recent'] }, createElement(Projects)))
    expect(mocks.pagination.mock.lastCall?.[0].where).toMatchObject({ ...mocks.filters, isCircularGrant: false })
    expect(mocks.pagination.mock.lastCall?.[0].orderBy[0].field).toBe('launchedAt')
  })

  it('keeps circular grant discovery scoped to circular grants', () => {
    render(createElement(MemoryRouter, { initialEntries: ['/circular-grants'] }, createElement(Projects)))
    expect(mocks.pagination.mock.lastCall?.[0].where.isCircularGrant).toBe(true)
  })
})

describe('navigation donation', () => {
  it.each([false, true])('opens the shared modal after the menu closes (compact=%s)', (compact) => {
    const Menu = () => {
      const [visible, setVisible] = useState(true)
      return visible ? createElement(DonateNavMenuContent, { compact, onNavigate: () => setVisible(false) }) : null
    }
    const container = render(
      createElement(MemoryRouter, null, createElement(NavigationDonateProvider, { children: createElement(Menu) })),
    )
    expect(container.textContent).toContain('Geyser Impact Fund')
    expect(container.textContent).not.toContain('Support Geyser')
    const donateButton = [...container.querySelectorAll('button')].find((button) => button.textContent === 'Donate')!
    expect(donateButton.getAttribute('href')).toBeNull()
    act(() => donateButton.click())
    expect(container.querySelector('[role="dialog"]')?.textContent).toBe('Donate to the Geyser Impact Fund')
    expect(container.querySelector('button')).toBeNull()
  })
})

describe('Impact Fund preferences', () => {
  it('preserves choices while open and resets them when reopened without category presets', () => {
    const Donation = () => {
      const [isOpen, setIsOpen] = useState(true)
      return createElement(
        'div',
        null,
        createElement('button', { onClick: () => setIsOpen(true) }, 'Open'),
        createElement(ImpactFundsDonatePreferencesModal, { isOpen, onClose: () => setIsOpen(false), impactFunds: [] }),
      )
    }
    const container = render(createElement(MemoryRouter, null, createElement(Donation)))
    const findButton = (label: string) =>
      [...container.querySelectorAll('button')].find((button) => button.textContent?.startsWith(label))!
    act(() => findButton('Grow Circular Grants').click())
    expect(findButton('Grow Circular Grants').getAttribute('aria-pressed')).toBe('true')
    act(() => findButton('Close').click())
    act(() => findButton('Open').click())
    expect(findButton('Grow Circular Grants').getAttribute('aria-pressed')).toBe('false')
  })
})

describe('application project choice', () => {
  it('continues to the existing-project application form', () => {
    const onExistingProject = vi.fn()
    const onNewProject = vi.fn()
    const container = render(
      createElement(ApplicationProjectChoiceModal, {
        isOpen: true,
        onClose: vi.fn(),
        hasAvailableProjects: true,
        hasOwnedProjects: true,
        onExistingProject,
        onNewProject,
      }),
    )
    act(() =>
      [...container.querySelectorAll('button')].find((button) => button.textContent === 'Existing project')!.click(),
    )
    expect(onExistingProject).toHaveBeenCalledOnce()
    expect(onNewProject).not.toHaveBeenCalled()
  })

  it.each([false, true])(
    'offers new-project creation when no existing projects are eligible (hasOwnedProjects=%s)',
    (hasOwnedProjects) => {
      const Entry = () => {
        const [isOpen, setIsOpen] = useState(true)
        const { handleLauchNowClick, renderModal } = useLaunchNow()
        const location = useLocation()
        return createElement(
          'div',
          null,
          location.pathname,
          createElement(ApplicationProjectChoiceModal, {
            isOpen,
            onClose: () => setIsOpen(false),
            hasAvailableProjects: false,
            hasOwnedProjects,
            onExistingProject: vi.fn(),
            onNewProject: () => {
              setIsOpen(false)
              handleLauchNowClick()
            },
          }),
          renderModal(),
        )
      }
      const container = render(createElement(MemoryRouter, null, createElement(Entry)))
      const buttons = [...container.querySelectorAll('button')]
      expect(buttons.find((button) => button.textContent === 'Existing project')!.disabled).toBe(true)
      act(() => buttons.find((button) => button.textContent === 'New project')!.click())
      expect(container.textContent).toBe('/launch/new/strategy')
      expect(container.querySelector('[role="dialog"]')).toBeNull()
    },
  )

  it('retains the creation flow social-account requirement', () => {
    mocks.socialAccounts = []
    const Entry = () => {
      const { handleLauchNowClick, renderModal } = useLaunchNow()
      return createElement(
        'div',
        null,
        createElement(ApplicationProjectChoiceModal, {
          isOpen: true,
          onClose: vi.fn(),
          hasAvailableProjects: false,
          hasOwnedProjects: false,
          onExistingProject: vi.fn(),
          onNewProject: handleLauchNowClick,
        }),
        renderModal(),
      )
    }
    const container = render(createElement(MemoryRouter, null, createElement(Entry)))
    act(() => [...container.querySelectorAll('button')].find((button) => button.textContent === 'New project')!.click())
    expect(container.textContent).toContain('Connect a social account')
  })
})
