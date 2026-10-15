import type { BoxProps, ResponsiveValue } from '@chakra-ui/react'
import { Box, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { InsetSection } from '@/shared/components/layouts/InsetSection.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { heroFieldColor, heroForestOverlayGradient } from '@/shared/styles/brandPalette.ts'
import { heroContentPadding, heroMarginY } from '@/shared/styles/reponsiveValues.ts'

/** Shared minimum height for photo heroes. */
export const HERO_MIN_HEIGHT = { base: '310px', lg: '470px' }

type PhotoHeroProps = Omit<BoxProps, 'title'> & {
  title: ReactNode
  lead: ReactNode
  imageUrl: string
  imagePosition: ResponsiveValue<string>
  /** Where the photo starts at desktop widths, as a CSS length from the left edge. Defaults to 28%. */
  imageLeft?: string
  /** Keeps the headline on the lines given by its own markup at desktop widths. */
  noWrapTitle?: boolean
}

/**
 * Inset photo hero: Deep Forest field on the left fading into a photograph on the right,
 * with a white display headline and lead paragraph.
 * @param imagePosition - CSS background-position that keeps the photo's subject clear of the text.
 */
export const PhotoHero = ({
  title,
  lead,
  imageUrl,
  imagePosition,
  imageLeft = '28%',
  noWrapTitle,
  ...props
}: PhotoHeroProps) => {
  return (
    <InsetSection my={heroMarginY} minHeight={HERO_MIN_HEIGHT} bg={heroFieldColor} {...props}>
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={{ base: 0, lg: imageLeft }}
        backgroundImage={`url('${imageUrl}')`}
        backgroundPosition={imagePosition}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <Box position="absolute" inset={0} background={heroForestOverlayGradient} />

      <Box
        position="relative"
        w="full"
        minHeight={HERO_MIN_HEIGHT}
        paddingX={heroContentPadding}
        paddingTop={{ base: 10, lg: 12 }}
        paddingBottom={{ base: 10, lg: 12 }}
        display="flex"
        alignItems="center"
      >
        <VStack
          w="full"
          maxWidth={{ base: 'full', lg: '62%' }}
          spacing={{ base: 4, lg: 5 }}
          textAlign="left"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <H1
            size={{ base: '3xl', md: '5xl', lg: '6xl' }}
            whiteSpace={noWrapTitle ? { base: 'normal', lg: 'nowrap' } : 'normal'}
            fontWeight={600}
            lineHeight={1.1}
            letterSpacing="-0.015em"
            color="utils.whiteContrast"
            w="full"
          >
            {title}
          </H1>
          <Body size={{ base: 'xl', lg: '2xl' }} medium color="utils.whiteContrast" lineHeight={1.5} w="full">
            {lead}
          </Body>
        </VStack>
      </Box>
    </InsetSection>
  )
}
