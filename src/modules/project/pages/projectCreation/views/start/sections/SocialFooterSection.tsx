import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import { SocialLinks } from '../components/SocialLinks.tsx'

/** Social media footer section with icons and email input */
export const SocialFooterSection = () => {
  return (
    <CreationLayoutCard>
      <Body size="md" textAlign="center" maxWidth={dimensions.creation.start.maxWidth}>
        {t(
          'Follow Geyser on socials and subscribe to our newsletter for the latest tips, stories, and project updates.',
        )}
      </Body>

      <SocialLinks />

      <SubscribeForm
        maxWidth={'400px'}
        buttonProps={{
          children: t('Get Started'),
          variant: 'solid',
          colorScheme: 'primary1',
        }}
        flexDirection="column"
        alignItems="center"
        spacing={4}
      />
    </CreationLayoutCard>
  )
}
