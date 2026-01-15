import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import * as path from 'path'

/** Load environment variables from .env.playwright */
dotenv.config({ path: path.resolve(__dirname, '../.env.playwright') })

export default defineConfig({
  testDir: '../tests',
  
  /** Maximum time one test can run for */
  timeout: 60 * 1000,
  
  /** Run tests in files in parallel */
  fullyParallel: true,
  
  /** Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /** Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  
  /** Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /** Reporter to use */
  reporter: [
    ['html', { outputFolder: '../playwright-report' }],
    ['list'],
  ],
  
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
    
    /** Ignore HTTPS errors - needed for local dev with self-signed certs */
    ignoreHTTPSErrors: true,
  },

  /** Configure projects for major browsers */
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
