/** Project creation test constants */

import { join } from 'path'

/** Default test project values */
export const DEFAULT_PROJECT_DETAILS = {
  title: 'Test AON Project',
  name: `test-aon-project-${Date.now()}`, // Unique name using timestamp
  shortDescription: 'This is a test project created by Playwright E2E tests for All-or-Nothing funding strategy.',
  description:
    'This is a comprehensive test project description that meets the minimum length requirement of 210 characters. It describes the purpose of this test project which is to validate the AON project creation flow in our E2E test suite. This project will be used to test various funding scenarios and ensure the platform works correctly.',
  category: 'Tool',
  subCategory: 'App',
  location: 'United States', // Country name as shown in UI
  links: [] as string[],
  tags: [] as number[],
} as const

/** Minimum AON goal amount in satoshis (includes 5% Geyser fees) */
export const MIN_AON_GOAL_AMOUNT = 210000

/** Default AON goal values */
export const DEFAULT_AON_GOAL = {
  amountSats: 500000, // 500k sats
  duration: 30, // 30 days
} as const

/** Valid category/subcategory combinations for testing */
export const VALID_CATEGORY_COMBINATIONS = [
  { category: 'Tool', subCategory: 'App' },
  { category: 'Education', subCategory: 'Course' },
  { category: 'Community', subCategory: 'Event' },
  { category: 'Culture', subCategory: 'Art' },
] as const

/** Test image paths (relative to project root) */
export const TEST_IMAGE_PATHS = {
  thumbnail: join(__dirname, '../../assets/1.png'),
  header: join(__dirname, '../../assets/2.png'),
} as const

/** Project validation limits */
export const PROJECT_VALIDATIONS = {
  name: {
    minLength: 3,
    maxLength: 280,
  },
  title: {
    maxLength: 60,
  },
  description: {
    minLength: 210,
    maxLength: 8000,
  },
  shortDescription: {
    maxLength: 160,
  },
  goal: {
    minAmount: MIN_AON_GOAL_AMOUNT,
    minDuration: 1,
    maxDuration: 60,
  },
} as const
