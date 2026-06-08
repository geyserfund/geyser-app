/** Atomic project creation actions for Playwright tests */
/* eslint-disable no-await-in-loop */

import { Page } from '@playwright/test'

import { ENV } from '../shared/constants'

const gotoWithRetries = async (page: Page, url: string, attempts = 3) => {
  let lastError: unknown

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
      return
    } catch (error) {
      lastError = error
      if (attempt < attempts) {
        await page.waitForTimeout(1500)
      }
    }
  }

  throw lastError
}

/** Navigate to landing page (home page) */
export const navigateToLandingPage = async (page: Page) => {
  await gotoWithRetries(page, ENV.APP_URL)
}

/** Navigate to launch start page */
export const navigateToLaunchStart = async (page: Page) => {
  await gotoWithRetries(page, `${ENV.APP_URL}/launch/start`)
}

/** Open profile dropdown menu */
export const openProfileMenu = async (page: Page) => {
  const dropdown = page.getByTestId('platform-dropdown-menu')
  await dropdown.waitFor({ state: 'visible', timeout: 10000 })
  await dropdown.click()
  await page.getByRole('menu').waitFor({ state: 'visible', timeout: 10000 })
}

/** Click "Create project" from profile menu */
export const clickCreateProjectFromProfileMenu = async (page: Page) => {
  const menu = page.getByRole('menu')
  await menu.waitFor({ state: 'visible', timeout: 10000 })
  const createProjectLink = menu.getByRole('link', { name: /Create project|Start your project/i }).first()
  const createProjectButton = menu.getByRole('button', { name: /Create project|Start your project/i }).first()

  if (await createProjectLink.isVisible().catch(() => false)) {
    await createProjectLink.click()
  } else {
    await createProjectButton.waitFor({ state: 'visible', timeout: 10000 })
    await createProjectButton.click()
  }

  // Wait for navigation to launch start page
  await page.waitForURL(/\/launch\/start/, { timeout: 10000 })
}

/** Click "Launch your project" button from HeroSection */
export const clickLaunchProjectButton = async (page: Page) => {
  // Launch start page CTA currently uses "Start your project".
  const launchButton = page.getByRole('button', { name: /Start your project|Launch your project/i }).first()
  await launchButton.waitFor({ state: 'visible', timeout: 10000 })
  await launchButton.click()

  // Wait for navigation to project details page (20s: CI can be slow to commit the new project)
  await page.waitForURL(/\/launch\/(new|\d+)\/details/, { timeout: 20000 })
}

/** Fill project title input */
export const fillProjectTitle = async (page: Page, title: string) => {
  // Title field uses TextInputBox with name="title"
  const titleInput = page.locator('input[name="title"]')
  await titleInput.waitFor({ state: 'visible' })
  await titleInput.clear()
  await titleInput.fill(title)
}

/** Fill project name (lightning address) input */
export const fillProjectName = async (page: Page, name: string) => {
  // Project name field uses TextInputBox with name="name"
  const nameInput = page.locator('input[name="name"]')
  await nameInput.waitFor({ state: 'visible' })
  await nameInput.clear()
  await nameInput.fill(name)
}

/** Fill project objective (short description) textarea */
export const fillShortDescription = async (page: Page, description: string) => {
  // Short description uses TextArea with name="shortDescription"
  const shortDescInput = page.locator('textarea[name="shortDescription"]')
  await shortDescInput.waitFor({ state: 'visible' })
  await shortDescInput.clear()
  await shortDescInput.fill(description)
}

/** Fill project description textarea */
export const fillDescription = async (page: Page, description: string) => {
  // Description field may be absent in the current launch form variant.
  const descInput = page.locator('textarea[name="description"]').first()
  const hasDescriptionField = await descInput
    .waitFor({ state: 'visible', timeout: 3000 })
    .then(() => true)
    .catch(() => false)

  if (!hasDescriptionField) {
    return
  }

  await descInput.clear()
  await descInput.fill(description)
}

/** Select category from dropdown */
export const selectCategory = async (page: Page, category: string) => {
  const categoryContainer = page.getByTestId('project-category-select')
  // React-select: click combobox inside the category field container
  const categorySelect = categoryContainer.getByRole('combobox')
  await categorySelect.scrollIntoViewIfNeeded()
  await categorySelect.waitFor({ state: 'visible' })
  await categorySelect.click()

  // Wait for options to appear and select by label
  await page.getByRole('option', { name: category }).waitFor({ state: 'visible' })
  await page.getByRole('option', { name: category }).click()
  await categoryContainer.getByText(new RegExp(category, 'i')).first().waitFor({ state: 'visible', timeout: 10000 })
}

/** Select subcategory from dropdown */
export const selectSubCategory = async (page: Page, subCategory: string) => {
  const subCategoryContainer = page.getByTestId('project-subcategory-select')
  // React-select: click combobox inside the sub-category field container
  const subCategorySelect = subCategoryContainer.getByRole('combobox')
  await subCategorySelect.scrollIntoViewIfNeeded()
  await subCategorySelect.waitFor({ state: 'visible' })
  await subCategorySelect.click()

  // Wait for options to appear and select by label
  await page.getByRole('option', { name: subCategory }).waitFor({ state: 'visible' })
  await page.getByRole('option', { name: subCategory }).click()
  await subCategoryContainer
    .getByText(new RegExp(subCategory, 'i'))
    .first()
    .waitFor({ state: 'visible', timeout: 10000 })
}

/** Select location (country) from dropdown */
export const selectLocation = async (page: Page, countryName: string) => {
  const countryContainer = page.getByTestId('project-country-select')
  // React-select: click combobox inside the country field container
  const locationSelect = countryContainer.getByRole('combobox')
  await locationSelect.scrollIntoViewIfNeeded()
  await locationSelect.waitFor({ state: 'visible' })
  await locationSelect.click()

  // React-select renders options in a portal; type to filter and press Enter to select.
  await page.getByRole('option').first().waitFor({ state: 'visible', timeout: 10000 })
  await page.keyboard.type(countryName)
  await page.keyboard.press('Enter')
  await countryContainer.getByText(new RegExp(countryName, 'i')).first().waitFor({ state: 'visible', timeout: 10000 })
}

/** Upload thumbnail image via file input */
export const uploadThumbnailImage = async (page: Page, imagePath: string) => {
  // Find the file input for thumbnail image upload
  // FileUpload component uses a hidden input with dropzone
  const fileInput = page.locator('input[type="file"]').first()
  await fileInput.waitFor({ state: 'attached' })
  await fileInput.setInputFiles(imagePath)

  // ImageCropperModal opens after selecting a file; confirm crop to start upload
  const cropModal = page.getByRole('dialog', { name: 'Upload image' })
  await cropModal.waitFor({ state: 'visible', timeout: 10000 })
  await cropModal.getByRole('button', { name: 'Save' }).click()
  await cropModal.waitFor({ state: 'hidden', timeout: 10000 })

  // Wait for upload to complete - thumbnail preview appears with alt="uploaded image"
  await page.locator('img[alt="uploaded image"]').first().waitFor({ state: 'visible', timeout: 15000 })
}

/** Upload header image via MediaControlWithReorder */
export const uploadHeaderImage = async (page: Page, imagePath: string) => {
  // Header images use MediaControlWithReorder component
  // Find the file input for header images (usually second file input)
  const fileInputs = page.locator('input[type="file"]')
  const headerInput = fileInputs.nth(1) // Second file input is typically for headers
  await headerInput.waitFor({ state: 'attached' })
  await headerInput.setInputFiles(imagePath)

  // ImageCropperModal opens after selecting a file; confirm crop to start upload
  const cropModal = page.getByRole('dialog', { name: 'Upload image' })
  await cropModal.waitFor({ state: 'visible', timeout: 10000 })
  await cropModal.getByRole('button', { name: 'Save' }).click()
  await cropModal.waitFor({ state: 'hidden', timeout: 10000 })

  // Wait for upload to complete - header preview appears with alt starting "Project header image-"
  await page.locator('img[alt^="Project header image-"]').first().waitFor({ state: 'visible', timeout: 15000 })
}

/** Click Continue button on project details page */
export const clickContinueFromProjectDetails = async (page: Page) => {
  const continueButton = page.getByRole('button', { name: 'Continue' }).first()
  const targetUrl = /\/launch\/\d+\/funding\/strategy/

  await continueButton.waitFor({ state: 'visible', timeout: 15000 })

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await continueButton.click()

    const didNavigate = await page
      .waitForURL(targetUrl, { timeout: 15000 })
      .then(() => true)
      .catch(() => false)

    if (didNavigate) {
      return
    }

    await page.waitForTimeout(1000)
  }

  throw new Error(`Failed to navigate to funding strategy page from project details. Current URL: ${page.url()}`)
}

/** Click "All-or-nothing (Beta)" funding strategy option */
export const selectAONFundingStrategy = async (page: Page) => {
  const aonHeading = page.getByRole('heading', { name: /All-or-nothing/i }).first()
  const aonCard = aonHeading.locator('xpath=..')
  const aonDetails = page
    .getByText(/Set a funding goal and choose a deadline|Prototypes or projects needing a minimum amount/i)
    .first()

  await aonHeading.waitFor({ state: 'visible', timeout: 10000 })

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await aonCard.click({ force: true })

    const selectedAon = await aonDetails
      .waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true)
      .catch(() => false)

    if (selectedAon) {
      return
    }

    await page.waitForTimeout(500)
  }

  throw new Error(`Failed to select AON funding strategy. Current URL: ${page.url()}`)
}

/** Click Continue button on funding strategy page */
export const clickContinueFromFundingStrategy = async (page: Page) => {
  const continueButton = page.getByRole('button', { name: 'Continue' }).first()
  const fundingGoalUrl = /\/launch\/\d+\/funding\/goal/

  await continueButton.waitFor({ state: 'visible', timeout: 15000 })

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await continueButton.click()

    const didNavigateToGoal = await page
      .waitForURL(fundingGoalUrl, { timeout: 15000 })
      .then(() => true)
      .catch(() => false)

    if (didNavigateToGoal) {
      return
    }

    if (/\/launch\/\d+\/rewards/.test(page.url())) {
      throw new Error(`Unexpected navigation to rewards step. AON strategy was expected. Current URL: ${page.url()}`)
    }

    await page.waitForTimeout(1000)
  }

  throw new Error(`Failed to navigate to funding goal page. Current URL: ${page.url()}`)
}

/** Fill AON goal amount (in satoshis) */
export const fillAONGoalAmount = async (page: Page, amountSats: number) => {
  const legacyAmountInput = page.getByTestId('donation-input').first()
  const hasLegacyAmountInput = await legacyAmountInput.isVisible().catch(() => false)

  if (hasLegacyAmountInput) {
    const legacyToggle = page.getByTestId('toggle-donation-input').first()
    const hasLegacyToggle = await legacyToggle.isVisible().catch(() => false)

    if (hasLegacyToggle) {
      const toggleText = (await legacyToggle.innerText()).toLowerCase()
      if (toggleText.includes('sats')) {
        await legacyToggle.click()
        await page.waitForTimeout(300)
      }
    }

    await legacyAmountInput.clear()
    await legacyAmountInput.fill(amountSats.toString())
    await legacyAmountInput.press('Tab')
    return
  }

  const addGoalButton = page.getByRole('button', { name: /Add a goal/i }).first()
  await addGoalButton.waitFor({ state: 'visible', timeout: 10000 })
  await addGoalButton.click()

  const goalModal = page
    .getByRole('dialog')
    .filter({ hasText: /Create goal|Edit goal/i })
    .first()
  await goalModal.waitFor({ state: 'visible', timeout: 10000 })

  const titleInput = goalModal.getByPlaceholder(/Episode 21 with Hal Finney/i).first()
  const amountInput = goalModal.locator('input[placeholder="0"]').first()
  const denominationSelect = goalModal.locator('select').first()

  await titleInput.waitFor({ state: 'visible', timeout: 10000 })
  await titleInput.clear()
  await titleInput.fill(`Test goal ${Date.now()}`)

  await denominationSelect.waitFor({ state: 'visible', timeout: 10000 })
  await denominationSelect.selectOption('BTCSAT')

  await amountInput.waitFor({ state: 'visible', timeout: 10000 })
  await amountInput.clear()
  await amountInput.fill(amountSats.toString())
  await amountInput.press('Tab')
}

/** Fill AON goal duration (in days) */
export const fillAONGoalDuration = async (page: Page, days: number) => {
  const legacyDurationInput = page.getByRole('spinbutton').first()
  const hasLegacyDurationInput = await legacyDurationInput.isVisible().catch(() => false)

  if (!hasLegacyDurationInput) {
    return
  }

  await legacyDurationInput.clear()
  await legacyDurationInput.fill(days.toString())
}

/** Set optional AON launch date */
export const setAONLaunchDate = async (page: Page, date: Date) => {
  // Launch date uses ReactDatePicker - click the date picker button
  const datePickerButton = page
    .getByRole('button', { name: /select date/i })
    .or(page.locator('button').filter({ hasText: /select date/i }))
    .first()
  await datePickerButton.waitFor({ state: 'visible' })
  await datePickerButton.click()

  // Wait for date picker to open and select date
  // This is complex - may need to use page.evaluate or find specific date picker elements
  // For now, we'll leave this as a placeholder that can be enhanced
  await page.waitForTimeout(1000)
}

/** Click Continue/Submit button on funding goal page */
export const clickContinueFromFundingGoal = async (page: Page) => {
  const goalModal = page
    .getByRole('dialog')
    .filter({ hasText: /Create goal|Edit goal/i })
    .first()
  const isGoalModalVisible = await goalModal.isVisible().catch(() => false)

  if (isGoalModalVisible) {
    const confirmButton = goalModal.getByRole('button', { name: /Confirm/i }).first()
    const amountInput = goalModal.locator('input[placeholder="0"]').first()
    await confirmButton.waitFor({ state: 'visible', timeout: 10000 })
    if (!(await confirmButton.isEnabled().catch(() => false))) {
      await amountInput.press('Tab').catch(() => undefined)
      await page.waitForTimeout(300)
    }

    const isConfirmEnabled = await confirmButton.isEnabled().catch(() => false)
    if (!isConfirmEnabled) {
      throw new Error('Goal modal confirm button remained disabled after filling required fields')
    }

    await confirmButton.click()
    await goalModal.waitFor({ state: 'hidden', timeout: 20000 })
  }

  const continueButton = page.getByRole('button', { name: /Continue|Skip for now/i }).first()
  await continueButton.waitFor({ state: 'visible', timeout: 10000 })
  await continueButton.click()

  // Wait for navigation to next page (rewards page)
  await page.waitForURL(/\/launch\/\d+\/rewards/, { timeout: 20000 })
}
