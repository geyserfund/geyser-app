/** Funding test constants */

export const PROJECT_NAME = 'lndtestproject'

export const LIGHTNING_AMOUNT = 1000
export const ONCHAIN_AMOUNT = 60000

export const TEST_COMMENT = 'Test funding comment from Playwright'
export const TEST_EMAIL = 'playwright-test@geyser.fund'

export const DEFAULT_GEYSER_TIP_PERCENT = 3

export const ONCHAIN_AMOUNT_WITH_TIP = ONCHAIN_AMOUNT + ONCHAIN_AMOUNT * (DEFAULT_GEYSER_TIP_PERCENT / 100)
