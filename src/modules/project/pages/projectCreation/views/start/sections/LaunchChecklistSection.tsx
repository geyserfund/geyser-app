import { Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCheckCircle } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Launch checklist section shown in place of launch plan cards. */
export const LaunchChecklistSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const iconBackground = 'primary1.9'
  const primaryContentColor = 'utils.blackContrast'
  const checklistItemBg = useColorModeValue('neutral1.2', 'neutral1.4')

  const checklistItems = useMemo(
    () => [
      t('Project story complete'),
      t('Fundraiser type selected'),
      t('Wallet configured'),
      t('Goals and rewards added'),
      t('Launch announcement drafted'),
    ],
    [],
  )

  return (
    <>
      <StartPageSectionShell id="launch-plans" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
        <VStack alignItems="flex-start" spacing={3}>
          <H2 bold>{t('Launch Checklist')}</H2>
          <Body size="lg" maxWidth="850px" light>
            {t('Use this quick checklist before you launch so your page is ready to convert support with confidence.')}
          </Body>
        </VStack>

        <PlaybookCard maxWidth="720px" width="100%">
          <VStack alignItems="stretch" spacing={5}>
            <HStack spacing={3} alignItems="center">
              <Box
                width="48px"
                height="48px"
                borderRadius="12px"
                backgroundColor={iconBackground}
                color={primaryContentColor}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <PiCheckCircle size={24} />
              </Box>
              <VStack alignItems="flex-start" spacing={0}>
                <H3 size="lg" bold>
                  {t('Ready to go live')}
                </H3>
                <Body size="sm" light>
                  {t('Confirm each item before publishing')}
                </Body>
              </VStack>
            </HStack>

            <VStack alignItems="stretch" spacing={3}>
              {checklistItems.map((item) => (
                <HStack
                  key={item}
                  spacing={3}
                  alignItems="center"
                  backgroundColor={checklistItemBg}
                  borderRadius="10px"
                  paddingX={3}
                  paddingY={2}
                >
                  <PiCheckCircle />
                  <Body size="sm">{item}</Body>
                </HStack>
              ))}
            </VStack>

            <Button colorScheme="primary1" onClick={handleLauchNowClick} alignSelf="flex-start">
              {t('Start your project')}
            </Button>
          </VStack>
        </PlaybookCard>
      </StartPageSectionShell>

      {renderModal()}
    </>
  )
}
