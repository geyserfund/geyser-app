import { Button, HStack, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiArrowUpRight, PiCheckCircle } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { GuideUrl } from '@/shared/constants/index.ts'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getStoryChecklist } from '../utils/startPageContent.ts'

/** Story section for building a project page supporters understand quickly. */
export const StorySection = () => {
  const iconColor = useColorModeValue('primary1.9', 'primary1.7')
  const previewMuted = useColorModeValue('neutral1.2', 'neutral1.4')

  const checklist = useMemo(() => getStoryChecklist(t), [])

  return (
    <StartPageSectionShell id="story" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 8 }}>
        <VStack alignItems="flex-start" spacing={4}>
          <H2 bold>{t('Start with a project people understand right away')}</H2>
          <Body size="lg" muted>
            {t('If supporters can grasp your idea quickly, conversion becomes much easier.')}
          </Body>

          <VStack alignItems="flex-start" spacing={3} width="100%">
            {checklist.map((item) => (
              <HStack key={item} alignItems="flex-start" spacing={2}>
                <PiCheckCircle size={18} color={iconColor} style={{ marginTop: 2 }} />
                <Body size="sm">{item}</Body>
              </HStack>
            ))}
          </VStack>

          <Button
            as={ChakraLink}
            href={GuideUrl}
            isExternal
            variant="outline"
            colorScheme="neutral1"
            rightIcon={<PiArrowUpRight />}
          >
            {t('Read full guide')}
          </Button>
        </VStack>

        <PlaybookCard>
          <VStack alignItems="flex-start" spacing={4}>
            <VStack alignItems="stretch" spacing={3} width="100%">
              <VStack height="160px" borderRadius="12px" backgroundColor={previewMuted} />
              <VStack height="10px" width="70%" borderRadius="999px" backgroundColor={previewMuted} />
              <VStack height="8px" width="100%" borderRadius="999px" backgroundColor={previewMuted} />
              <VStack height="8px" width="90%" borderRadius="999px" backgroundColor={previewMuted} />
              <VStack height="8px" width="80%" borderRadius="999px" backgroundColor={previewMuted} />
            </VStack>
          </VStack>
        </PlaybookCard>
      </SimpleGrid>
    </StartPageSectionShell>
  )
}
