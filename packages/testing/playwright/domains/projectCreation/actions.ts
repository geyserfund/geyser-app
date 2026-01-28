/** Atomic project creation actions for Playwright tests */

import { Page } from '@playwright/test'

import { ENV } from '../shared/constants'

/** Navigate to landing page (home page) */
export const navigateToLandingPage = async (page: Page) => {
  await page.goto(ENV.APP_URL)
}

/** Navigate to launch start page */
export const navigateToLaunchStart = async (page: Page) => {
  await page.goto(`${ENV.APP_URL}/launch/start`)
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
  const createProjectLink = menu.getByRole('link', { name: 'Create project' })
  await createProjectLink.waitFor({ state: 'visible', timeout: 10000 })
  await createProjectLink.click()

  // Wait for navigation to launch start page
  await page.waitForURL(/\/launch\/start/, { timeout: 10000 })
}

/** Click "Launch your project" button from HeroSection */
export const clickLaunchProjectButton = async (page: Page) => {
  // The button text is "Launch your project" in HeroSection
  const launchButton = page.getByRole('button', { name: /Launch your project/i })
  await launchButton.waitFor({ state: 'visible', timeout: 10000 })
  await launchButton.click()

  // Wait for navigation to project details page
  await page.waitForURL(/\/launch\/(new|\d+)\/details/, { timeout: 10000 })
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
  // Full description field - need to find by name or label
  const descInput = page.locator('textarea[name="description"]')
  await descInput.waitFor({ state: 'visible' })
  await descInput.clear()
  await descInput.fill(description)
}

/** Select category from dropdown */
export const selectCategory = async (page: Page, category: string) => {
  // React-select: click combobox inside the category field container
  const categorySelect = page.getByTestId('project-category-select').getByRole('combobox')
  await categorySelect.scrollIntoViewIfNeeded()
  await categorySelect.waitFor({ state: 'visible' })
  await categorySelect.click()

  // Wait for options to appear and select by label
  await page.getByRole('option', { name: category }).waitFor({ state: 'visible' })
  await page.getByRole('option', { name: category }).click()
}

/** Select subcategory from dropdown */
export const selectSubCategory = async (page: Page, subCategory: string) => {
  // React-select: click combobox inside the sub-category field container
  const subCategorySelect = page.getByTestId('project-subcategory-select').getByRole('combobox')
  await subCategorySelect.scrollIntoViewIfNeeded()
  await subCategorySelect.waitFor({ state: 'visible' })
  await subCategorySelect.click()

  // Wait for options to appear and select by label
  await page.getByRole('option', { name: subCategory }).waitFor({ state: 'visible' })
  await page.getByRole('option', { name: subCategory }).click()
}

/** Select location (country) from dropdown */
export const selectLocation = async (page: Page, countryName: string) => {
  // React-select: click combobox inside the country field container
  const locationSelect = page.getByTestId('project-country-select').getByRole('combobox')
  await locationSelect.scrollIntoViewIfNeeded()
  await locationSelect.waitFor({ state: 'visible' })
  await locationSelect.click()

  // React-select renders options in a portal; type to filter and press Enter to select.
  await page.getByRole('option').first().waitFor({ state: 'visible', timeout: 10000 })
  await page.keyboard.type(countryName)
  await page.keyboard.press('Enter')
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
  await page.getByAltText('uploaded image').waitFor({ state: 'visible', timeout: 15000 })
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
  await continueButton.waitFor({ state: 'visible' })
  await continueButton.click()

  // Wait for navigation to funding strategy page
  await page.waitForURL(/\/launch\/\d+\/funding\/strategy/, { timeout: 10000 })
}

/** Click "All-or-nothing (Beta)" funding strategy option */
export const selectAONFundingStrategy = async (page: Page) => {
  // The AON option is a clickable card/button with text "All-or-nothing"
  const aonOption = page.getByText(/All-or-nothing/i).first()
  await aonOption.waitFor({ state: 'visible' })
  await aonOption.click()
}

/** Click Continue button on funding strategy page */
export const clickContinueFromFundingStrategy = async (page: Page) => {
  const continueButton = page.getByRole('button', { name: 'Continue' }).first()
  await continueButton.waitFor({ state: 'visible' })
  await continueButton.click()

  // Wait for navigation to funding goal page
  await page.waitForURL(/\/launch\/\d+\/funding\/goal/, { timeout: 10000 })
}

/** Fill AON goal amount (in satoshis) */
export const fillAONGoalAmount = async (page: Page, amountSats: number) => {
  // AON goal uses AmountInput component (same as funding)
  // Toggle to sats mode if needed, then fill amount
  const amountInput = page.getByTestId('donation-input')
  await amountInput.waitFor({ state: 'visible' })

  // Check if we need to toggle to sats mode (button shows "sats" when in USD mode)
  const toggle = page.getByTestId('toggle-donation-input')
  const toggleText = (await toggle.innerText()).toLowerCase()
  if (toggleText.includes('sats')) {
    await toggle.click()
    await page.waitForTimeout(500)
  }

  await amountInput.clear()
  await amountInput.fill(amountSats.toString())
}

/** Fill AON goal duration (in days) */
export const fillAONGoalDuration = async (page: Page, days: number) => {
  // Duration input field
  const durationInput = page.locator('input[type="number"]').first()
  await durationInput.waitFor({ state: 'visible' })
  await durationInput.clear()
  await durationInput.fill(days.toString())
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
  const continueButton = page.getByRole('button', { name: 'Continue' }).first()
  await continueButton.waitFor({ state: 'visible' })
  await continueButton.click()

  // Wait for navigation to next page (rewards page)
  await page.waitForURL(/\/launch\/\d+\/rewards/, { timeout: 10000 })
}
