import { Accordion, Link, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { AccordionButton } from './AccordionButton'
import { AccordionItem } from './AccordionItem'
import { AccordionPanel } from './AccordionPanel'

export const BadgesFAQ = () => {
  const { t } = useTranslation()
  return (
    <CardLayout width="100%">
      <Text variant="h3">FAQ</Text>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>{t('What are Geyser badges')}</AccordionButton>
          <AccordionPanel>
            {t(
              'Geyser badges are digital recognitions with an image, title, and description that celebrate meaningful contributions and achievements.',
            )}{' '}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('How do I earn a Geyser badge?')}</AccordionButton>
          <AccordionPanel>
            {t('Badges are awarded automatically when you reach the associated milestone or recognition criteria.')}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('Where can I see my Geyser badges?')}</AccordionButton>
          <AccordionPanel>
            {t('You can see your Geyser badges on your profile and in the achievements section.')}{' '}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('Who can edit and update Geyser badges?')}</AccordionButton>
          <AccordionPanel>{t('Geyser manages badge information and may update it when needed.')}</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('Will there be more badges?')}</AccordionButton>
          <AccordionPanel>
            {t(
              'Yes! We intend to create more badges when there is a particular reason to recognize hard work or important achievements.',
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('Hey, I should have that badge!')}</AccordionButton>
          <AccordionPanel>
            <Trans
              i18nKey={
                'If you think you should have access to a badge reach out to us at <1>hello@geyser.fund</1> and we can review your badge privilege!'
              }
            >
              If you think you should have access to a badge reach out to us at
              <Link href="mailto:hello@geyser.fund">hello@geyser.fund</Link> and we can review your badge privilege!
            </Trans>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </CardLayout>
  )
}
