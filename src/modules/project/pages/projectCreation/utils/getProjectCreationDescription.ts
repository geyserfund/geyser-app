import { t } from 'i18next'

import { RecoverableGrantFundingOption } from '../states/fundingStrategyAtom.ts'
import type { ProjectCreationFundingOption } from '../states/fundingStrategyAtom.ts'

const RECOVERABLE_GRANT_STORY_TEMPLATE = `[Business name] is a [type of business] located in [area, city/country], run by [founder or owner’s name]. For [length of time], the business has been serving [customers or community] with [brief description of its value or offering].

## What we offer

[List the main products and/or services the business provides. Briefly highlight any distinctive or signature offering.]

## Best sellers

[Name the products or services that are most popular or generate the most demand.]

## Our challenge

[Explain the main constraint currently limiting the business, such as stock, equipment, space, capacity, or access to working capital. Describe how this affects sales, costs, customers, or growth.]

## How this grant helps

[Explain how the recoverable grant will be used. Mention the main purchases, improvements, or activities it will fund and how these will strengthen the business.]

## 12-month vision

[Describe what the business aims to achieve over the next year, including its intended growth, reach, capacity, or community impact.]

## Returning Funds plan

[Explain how the business expects to generate the funds for repayment, when repayments are expected to begin, and the intended repayment frequency.]`

/** Returns the initial Story description for the selected project funding option. */
export const getProjectCreationDescription = (
  fundingOption: ProjectCreationFundingOption,
  description: string,
): string => {
  if (fundingOption !== RecoverableGrantFundingOption) {
    return description
  }

  return (
    t(RECOVERABLE_GRANT_STORY_TEMPLATE, { defaultValue: RECOVERABLE_GRANT_STORY_TEMPLATE }) ||
    RECOVERABLE_GRANT_STORY_TEMPLATE
  )
}
