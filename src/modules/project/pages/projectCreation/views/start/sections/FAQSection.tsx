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
import { getFaqItems } from '../utils/startPageContent.ts'

/** Lightweight FAQ section that removes final conversion friction. */
export const FAQSection = () => {
  const itemBorder = useColorModeValue('neutral1.4', 'neutral1.5')
  const itemBackground = useColorModeValue('white', 'neutral1.3')

  const faqs = useMemo(() => getFaqItems(t), [])

  return (
    <StartPageSectionShell id="faq">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Questions creators usually ask')}</H2>
        <Body size="lg" maxWidth="760px" muted>
          {t('Quick answers before you publish your project.')}
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
          {t('Need more help')}
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
