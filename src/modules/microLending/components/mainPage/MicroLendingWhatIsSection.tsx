import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { MICRO_LENDING_WHAT_IS_SECTION_ID } from '../../utils/layoutConstants.ts'
import { MicroLendingSectionHeading } from './MicroLendingSectionHeading.tsx'

/** Editorial explainer for micro-loans; placed below the waitlist for readers who want depth before sharing the page. */
export function MicroLendingWhatIsSection({
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
}: {
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
}): JSX.Element {
  return (
    <VStack
      id={MICRO_LENDING_WHAT_IS_SECTION_ID}
      align="stretch"
      spacing={6}
      scrollMarginTop={{ base: '72px', md: '88px' }}
    >
      <MicroLendingSectionHeading>
        {t('What are micro-loans')}
        {'?'}
      </MicroLendingSectionHeading>

      <CardLayout noborder spacing={{ base: 5, md: 6 }} padding={{ base: 5, md: 8 }}>
        <VStack align="stretch" spacing={{ base: 6, md: 7 }} w="full">
          <VStack align="stretch" spacing={3}>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {t(
                'Micro-loans are a way to extend small amounts of credit to entrepreneurs and projects that traditional institutions often overlook. The goal is practical: unlock a concrete next step (like inventory, equipment, or working capital) without forcing borrowers to take on more than they need.',
              )}
            </Body>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {t(
                'On Geyser, we are designing micro-loans for Bitcoin-native communities: builders funding adoption, circular economies, and grassroots businesses where trust and transparent reporting matter alongside repayment.',
              )}
            </Body>
          </VStack>

          <VStack align="stretch" spacing={3}>
            <H3 bold color={sectionPrimaryTextColor}>
              {t('What micro usually means')}
            </H3>
            <UnorderedList spacing={2} pl={1} color={sectionSecondaryTextColor}>
              <ListItem>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {t(
                    'Smaller principals and clearer time horizons than many bank products, so the loan stays tied to a specific plan.',
                  )}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {t(
                    'Repayment in installments over a defined term, which helps borrowers budget and helps lenders track outcomes.',
                  )}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {t(
                    'Underwriting that can weigh the use of funds, community context, and accountability—not only a traditional credit score.',
                  )}
                </Body>
              </ListItem>
            </UnorderedList>
          </VStack>

          <VStack align="stretch" spacing={3}>
            <H3 bold color={sectionPrimaryTextColor}>
              {t('How it typically works')}
            </H3>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {t(
                'Borrowers describe the purpose of the funds and the plan to repay. Lenders review opportunities, fund in line with milestones, and follow repayments over time. A platform like Geyser can coordinate verification, disbursement, and reporting so the story behind the loan stays visible to everyone involved.',
              )}
            </Body>
          </VStack>

          <VStack align="stretch" spacing={3}>
            <H3 bold color={sectionPrimaryTextColor}>
              {t('Who micro-loans tend to serve')}
            </H3>
            <UnorderedList spacing={2} pl={1} color={sectionSecondaryTextColor}>
              <ListItem>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {t('Founders with a local, well-defined use of funds and a realistic repayment path.')}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {t('Teams building adoption where banking rails are thin, slow, or a poor fit for the project.')}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {t('Organizations that pair capital with coaching, milestones, or peer accountability.')}
                </Body>
              </ListItem>
            </UnorderedList>
          </VStack>

          <VStack align="stretch" spacing={3}>
            <H3 bold color={sectionPrimaryTextColor}>
              {t('Micro-loans and microfinance')}
            </H3>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {t(
                'Micro-loans (often called microcredit) are the loan slice of the puzzle. Microfinance is the wider umbrella: savings, payments, insurance, and other services that help people manage cash flow.',
              )}
            </Body>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {t(
                'Geyser starts from transparent crowdfunding; micro-loans extend that idea into structured, repeatable community capital with clearer repayment expectations and ongoing visibility into impact.',
              )}
            </Body>
          </VStack>
        </VStack>
      </CardLayout>
    </VStack>
  )
}
