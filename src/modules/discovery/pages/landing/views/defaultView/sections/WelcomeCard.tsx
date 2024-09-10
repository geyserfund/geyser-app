import { Button, HStack, IconButton, Image, Link } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { PiX } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { CardLayout } from '@/shared/components/layouts'
import { Body, H1 } from '@/shared/components/typography'
import { DiscoveryHandWave, GeyserAboutUrl } from '@/shared/constants'

const welcomeCardDismissedAtom = atomWithStorage('welcomeCardDismissedAtom', false)

export const WelcomeCard = () => {
  const { isLoggedIn } = useAuthContext()

  const [isWelcomeCardDismissed, setIsWelcomeCardDismissed] = useAtom(welcomeCardDismissedAtom)

  if (isLoggedIn || isWelcomeCardDismissed) return null

  return (
    <CardLayout w="full" position="relative">
      <IconButton
        aria-label="Dismiss-welcome-card"
        size="sm"
        variant="outline"
        colorScheme="neutral1"
        icon={<PiX />}
        onClick={() => setIsWelcomeCardDismissed(true)}
        position="absolute"
        top={2}
        right={2}
      />
      <HStack paddingRight={4}>
        <Image src={DiscoveryHandWave} height="40px" width="40px" />
        <H1 size={{ base: 'xl', xs: '2xl', sm: '3xl' }} bold>
          {t('Welcome to Geyser!')}
        </H1>
      </HStack>
      <Body size="lg" medium>
        {t('Bring your ideas to life, whether it’s a creative project, social cause or innovative new product idea. ')}
      </Body>
      <Button variant="solid" maxWidth="200px" colorScheme="primary1" as={Link} href={GeyserAboutUrl} isExternal>
        {t('Learn more')}
      </Button>
    </CardLayout>
  )
}
