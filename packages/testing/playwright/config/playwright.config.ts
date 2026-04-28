import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import * as path from 'path'

const playwrightEnvFiles = {
  staging: '.env.playwright.staging',
} as const

const playwrightEnv = process.env.PLAYWRIGHT_ENV
const isKnownPlaywrightEnv = (value: string | undefined): value is keyof typeof playwrightEnvFiles =>
  Boolean(value && value in playwrightEnvFiles)
const playwrightEnvFile = isKnownPlaywrightEnv(playwrightEnv) ? playwrightEnvFiles[playwrightEnv] : '.env.playwright'
const playwrightEnvPath = path.resolve(__dirname, '..', playwrightEnvFile)
const parsedPlaywrightEnv = process.env.CI ? {} : dotenv.config({ path: playwrightEnvPath }).parsed ?? {}

Object.entries(parsedPlaywrightEnv).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = value
  }
})

export default defineConfig({
  testDir: '../tests',

  /** Maximum time one test can run for */
  timeout: 60 * 1000,

  /** Keep suites deterministic for live-backend E2E scenarios */
  fullyParallel: false,

  /** Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /** Retry once locally and twice on CI for transient backend/network instability */
  retries: process.env.CI ? 2 : 1,

  /** Default to single worker for auth/payment stateful flows; override with PLAYWRIGHT_WORKERS */
  workers: Number(process.env.PLAYWRIGHT_WORKERS ?? '1'),

  /** Reporter to use */
  reporter: [['html', { outputFolder: '../playwright-report' }], ['list']],

  /** Shared settings for all the projects below */
  use: {
    /** Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.APP_URL || 'https://dev.geyser.fund',

    /** Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /** Screenshot on failure */
    screenshot: 'only-on-failure',

    /** Video on failure */
    video: 'retain-on-failure',

    /** Accept downloads */
    acceptDownloads: true,
* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /** Test against mobile viewports */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /** Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: '../test-results/',
})
