/** Composed project creation flows for Playwright tests */

import { Page } from '@playwright/test'

import {
  clickContinueFromProjectDetails,
  clickLaunchProjectButton,
  fillDescription,
  fillProjectName,
  fillProjectTitle,
  fillShortDescription,
  navigateToLaunchStart,
  selectCategory,
  selectLocation,
  selectSubCategory,
  uploadHeaderImage,
  uploadThumbnailImage,
} from './actions'
import { expectFundingStrategyPage, expectLaunchStartPage, expectProjectDetailsPage } from './assertions'
import { ProjectDetailsOptions } from './types'

/** Navigate from landing page to project details page */
export const navigateToProjectCreation = async (page: Page) => {
  await navigateToLaunchStart(page)
  await expectLaunchStartPage(page)
  await clickLaunchProjectButton(page)
  await expectProjectDetailsPage(page)
}

/** Complete the project details form and open the managed funding strategy step. */
export const completeProjectDetails = async (page: Page, options: ProjectDetailsOptions) => {
  await fillProjectTitle(page, options.title)
  await fillProjectName(page, options.name)
  await fillShortDescription(page, options.shortDescription)
  await fillDescription(page, options.description)
  await selectCategory(page, options.category)
  await selectSubCategory(page, options.subCategory)
  await selectLocation(page, options.location)
  await uploadThumbnailImage(page, options.thumbnailImage)

  if (options.headerImages.length > 0) {
    const [firstImage, ...restImages] = options.headerImages
    await uploadHeaderImage(page, firstImage)
    await restImages.reduce((previous, image) => previous.then(() => uploadHeaderImage(page, image)), Promise.resolve())
  }

  await clickContinueFromProjectDetails(page)
  await expectFundingStrategyPage(page)
}
