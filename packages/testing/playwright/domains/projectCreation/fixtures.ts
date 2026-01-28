/** Project creation fixtures for Playwright tests */

import { test as base, Page } from '@playwright/test'

import { loginWithRealNostr, setupRealAuth } from '../auth/realAuth'
import { navigateToLandingPage } from './actions'
import { DEFAULT_AON_GOAL, DEFAULT_PROJECT_DETAILS, TEST_IMAGE_PATHS } from './constants'
import { createAONProject } from './flows'
import { CreatedProject } from './types'

/** Extended test with AON project fixture */
export const test = base.extend<{
  /** Page with AON project created and ready to use */
  aonProject: CreatedProject
}>({
  /** Fixture that creates an AON project before test */
  aonProject: async ({ page }, use) => {
    // Setup real authentication BEFORE page.goto()
    await setupRealAuth(page)
    
    // Navigate to landing page
    await navigateToLandingPage(page)
    
    // Login with real Nostr authentication
    await loginWithRealNostr(page)
    
    // Create AON project using default values
    const project = await createAONProject(
      page,
      {
        ...DEFAULT_PROJECT_DETAILS,
        // Use unique name with timestamp
        name: `test-aon-${Date.now()}`,
        thumbnailImage: TEST_IMAGE_PATHS.thumbnail,
        headerImages: [TEST_IMAGE_PATHS.header],
      },
      DEFAULT_AON_GOAL,
    )
    
    // Provide the created project to the test
    await use(project)
    
    // Cleanup: Project cleanup can be handled separately if needed
    // For now, we leave projects created for potential reuse
  },
})

/** Export expect from base test for convenience */
export { expect } from '@playwright/test'
