import { Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import {
  FAQUrl,
  GeyserConfigureWalletGuideUrl,
  GeyserRewardsGuideLink,
  GuideStepByStepUrl,
  GuideUrl,
} from '@/shared/constants/index.ts'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getResources } from '../utils/startPageContent.ts'

/** Optional deeper resources section shown after core launch decisions. */
export const ResourcesSection = () => {
  const hoverBorder = useColorModeValue('primary1.3', 'primary1.7')

  const content = getResources(t)
  const resources = [
    { ...content[0], href: GuideUrl },
    { ...content[1], href: GuideStepByStepUrl },
    { ...content[2], href: GeyserConfigureWalletGuideUrl },
    { ...content[3], href: GeyserRewardsGuideLink },
    { ...content[4], href: FAQUrl },
  ]

  return (
    <StartPageSectionShell id="resources" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Go deeper when you are ready')}</H2>
        <Body size="lg" maxWidth="760px" light>
          {t('Keep moving with short guides for setup, launch, and optimization.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
        {resources.map((resource) => (
          <PlaybookCard
            key={resource.title}
            height="100%"
            transition="border-color 0.2s"
            _hover={{ borderColor: hoverBorder }}
          >
            <VStack alignItems="flex-start" spacing={3} height="100%">
              <H3 size="md" bold>
                <ChakraLink
                  href={resource.href}
                  isExternal
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  _hover={{ textDecoration: 'none' }}
                >
                  {resource.title}
                  <PiArrowUpRight aria-hidden />
                </ChakraLink>
              </H3>
            </VStack>
          </PlaybookCard>
        ))}
      </SimpleGrid>
    </StartPageSectionShell>
  )
}
