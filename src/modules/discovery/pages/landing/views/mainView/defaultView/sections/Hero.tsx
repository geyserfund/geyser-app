import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { PhotoHero } from '@/shared/components/layouts/PhotoHero.tsx'

/** Renders the landing page hero section over the marketplace background image. */
export const Hero = (props: BoxProps): React.ReactNode => {
  return (
    <PhotoHero
      imageUrl="/images/landing-hero-market-portrait.webp"
      imagePosition={{ base: '85% center', lg: 'right 25%' }}
      noWrapTitle
      title={
        <Trans
          i18nKey="Back stronger local economies <italic>with Bitcoin</italic>"
          components={{ italic: <Box as="em" fontStyle="italic" display="block" /> }}
        />
      }
      lead={
        <Trans
          i18nKey="Every satoshi donated stays in the local economy <nowrap>through circular grants.</nowrap>"
          components={{ nowrap: <Box as="span" whiteSpace={{ base: 'normal', md: 'nowrap' }} /> }}
        />
      }
      {...props}
    />
  )
}
