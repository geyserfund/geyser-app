import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'

import { type MicroLendingFaqItem } from '../../utils/mainPageContent.ts'

import { MicroLendingSectionHeading } from './MicroLendingSectionHeading.tsx'

/** Expandable FAQ for the micro-loans landing page (bottom of main content). */
export function MicroLendingFaqSection({
  items,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
}: {
  items: readonly MicroLendingFaqItem[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
}): JSX.Element {
  const borderColor = useColorModeValue('neutral1.6', 'neutral1.5')

  return (
    <VStack id="micro-loans-faq" align="stretch" spacing={6} scrollMarginTop={{ base: '72px', md: '88px' }}>
      <MicroLendingSectionHeading>{t('FAQ')}</MicroLendingSectionHeading>
      <Accordion allowToggle>
        {items.map((item) => (
          <AccordionItem key={item.question} borderColor={borderColor}>
            <Box as="h3">
              <AccordionButton py={4}>
                <Box as="span" flex="1" textAlign="left">
                  <Body bold color={sectionPrimaryTextColor}>
                    {item.question}
                  </Body>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4}>
              <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                {item.answer}
              </Body>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  )
}
