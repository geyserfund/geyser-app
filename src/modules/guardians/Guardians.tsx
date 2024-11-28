import { Button, Input, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, H1 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { fonts } from '@/shared/styles'
import { toPx, useMobileMode } from '@/utils'

import { DesktopGuardiansIllustration } from './components/DesktopGuardiansIllustration'

export const Guardians = () => {
  const isMobile = useMobileMode()

  return (
    <VStack
      w="full"
      maxWidth={dimensions.guardians.maxWidth}
      spacing={4}
      fontFamily={fonts.mazius}
      fontStyle="normal"
      marginTop={{
        base: `-${toPx(dimensions.topNavBar.mobile.height)}`,
        lg: `-${toPx(dimensions.topNavBar.desktop.height)}`,
      }}
      h={'100vh'}
      backgroundColor={'guardians.background'}
    >
      <VStack zIndex={2} w="full" pt={{ base: 20, lg: 8 }} spacing={6}>
        <H1 fontWeight={400} fontSize={{ base: '32px', lg: '56px', xl: '72px' }}>
          {t('GEYSER GUARDIANS')}
        </H1>
        <VStack w="full" maxWidth="1448px" fontFamily={fonts.ptSerif} px={{ base: 3, lg: 6 }} spacing={8}>
          <Body fontSize={{ base: '16px', lg: '28px', xl: '32px' }} textAlign={'center'}>
            {t(
              'Geyser Guardians—enigmatic figures whose silhouettes and unique names hint at extraordinary abilities. While their true forms remain hidden for now, the anticipation is building. Stay tuned to uncover the secrets behind these mysterious protectors. Read full manifesto',
            )}
          </Body>
          <Stack direction={{ base: 'column', lg: 'row' }} w={'full'} maxWidth="816px" spacing="16px">
            <Input
              height={{ base: '40px', lg: '56px', xl: '64px' }}
              fontSize={{ base: '16px', lg: '20px', xl: '24px' }}
              placeholder="guardian@geyser.fund"
            />
            <Button
              height={{ base: '40px', lg: '56px', xl: '64px' }}
              paddingX={5}
              variant="solid"
              backgroundColor="gray.12"
              color="gray.1"
            >
              <Body size={{ base: '16px', lg: '20px', xl: '24px' }} fontFamily={fonts.ptSerif}>
                {t('Await reveal')}
              </Body>
            </Button>
          </Stack>
        </VStack>
      </VStack>
      {!isMobile && <DesktopGuardiansIllustration />}
    </VStack>
  )
}
