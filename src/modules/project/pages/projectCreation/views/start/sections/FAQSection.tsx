import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Link,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { FAQUrl } from '@/shared/constants/index.ts'

import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** FAQ section for hesitation removal before final conversion. */
export const FAQSection = () => {
  const itemBorder = useColorModeValue('neutral1.4', 'neutral1.5')
  const itemBackground = useColorModeValue('white', 'neutral1.3')

  const faqs = useMemo(
    () => [
      {
        question: t('Which fundraiser type should I choose'),
        answer: t(
          'Choose Open Fundraiser if your project can start with any amount and grows over time. Choose All-or-Nothing if you need a minimum budget to deliver your project. Open is flexible and ongoing, while All-or-Nothing provides structure and supporter protection.',
        ),
      },
      {
        question: t('Do I need to configure my wallet before launch'),
        answer: t(
          "Yes, you'll need to set up your Bitcoin wallet before publishing your project. This ensures you can receive funds immediately when supporters contribute. The setup process is straightforward, and we provide clear guidance throughout.",
        ),
      },
      {
        question: t('Can supporters contribute in different ways'),
        answer: t(
          'Absolutely! Supporters can contribute via Lightning Network, on-chain Bitcoin, or familiar credit/debit card payments. We make it easy for anyone to back your project, regardless of their technical knowledge.',
        ),
      },
      {
        question: t('Do I need verification'),
        answer: t(
          'Verification is optional but highly recommended. It increases trust and can significantly improve your conversion rate. Verified projects show supporters that you are committed and credible.',
        ),
      },
      {
        question: t('Can I add goals or rewards later'),
        answer: t(
          'Yes! You can add and edit goals, rewards, and other project elements anytime. Many successful creators launch with a basic setup and add more features as they learn what their supporters want.',
        ),
      },
      {
        question: t('What if I want more visibility'),
        answer: t(
          'You can upgrade your launch plan at any time. Start with Starter Launch and upgrade to Growth or Pro Launch when you are ready for additional visibility and support.',
        ),
      },
      {
        question: t('Which launch plan is right for me'),
        answer: t(
          'Starter Launch ($25) is perfect for testing your idea. Growth Launch ($60) adds visibility through our newsletter and social channels. Pro Launch ($90) includes expert feedback and is chosen by 40% of our top projects. Geyser Partnership ($1,000+) provides hands-on support for ambitious teams.',
        ),
      },
      {
        question: t('What happens after I launch'),
        answer: t(
          'After launching, focus on your first 72 hours: engage with early supporters, share your launch announcement, and post regular updates. Use the Geyser dashboard to track performance, manage contributions, and communicate with your community.',
        ),
      },
    ],
    [],
  )

  return (
    <StartPageSectionShell id="faq">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Questions creators usually have')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t('Everything you need before launching your project on Geyser.')}
        </Body>
      </VStack>

      <Accordion allowToggle>
        <VStack alignItems="stretch" spacing={3}>
          {faqs.map((item) => (
            <AccordionItem
              key={item.question}
              border="1px solid"
              borderColor={itemBorder}
              borderRadius="12px"
              backgroundColor={itemBackground}
            >
              <h3>
                <AccordionButton paddingY={5}>
                  <Body size="md" bold textAlign="left" flex={1}>
                    {item.question}
                    {'?'}
                  </Body>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel paddingTop={0} paddingBottom={5}>
                <Body size="sm" muted>
                  {item.answer}
                </Body>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </VStack>
      </Accordion>

      <HStack spacing={3} alignItems="center" flexWrap="wrap">
        <Body size="sm" muted>
          {t('Still need help')}
          {'?'}
        </Body>
        <Link href={FAQUrl} isExternal>
          <Body size="sm" bold underline>
            {t('Visit Help Center')}
          </Body>
        </Link>
        <Body size="sm" muted>
          {'•'}
        </Body>
        <Link href="mailto:support@geyser.fund">
          <Body size="sm" bold underline>
            {t('Contact Support')}
          </Body>
        </Link>
      </HStack>
    </StartPageSectionShell>
  )
}
