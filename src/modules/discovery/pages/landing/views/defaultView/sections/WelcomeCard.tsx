import { Button, IconButton, Link } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { PiX } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1 } from '@/shared/components/typography'
import { GeyserAboutUrl } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'
import { BrandCreamGradient } from '@/shared/styles/custom'

const welcomeCardDismissedAtom = atomWithStorage('welcomeCardDismissedAtom', false)

export const WelcomeCard = () => {
  const { isLoggedIn } = useAuthContext()

  const [isWelcomeCardDismissed, setIsWelcomeCardDismissed] = useAtom(welcomeCardDismissedAtom)

  if (isLoggedIn || isWelcomeCardDismissed) return null

  return (
    <CardLayout w="full" position="relative" alignItems={'center'} spacing={4} background={BrandCreamGradient}>
      <IconButton
        aria-label="Dismiss-welcome-card"
        size="md"
        variant="ghost"
        colorScheme="neutral1"
        icon={<PiX />}
        onClick={() => setIsWelcomeCardDismissed(true)}
        position="absolute"
        top={2}
        right={2}
      />
      <H1 size={{ base: 'xl', xs: '2xl', sm: '3xl' }} bold color={lightModeColors.neutral1[11]}>
        {t('Welcome to Bitcoin crowdfunding!')}
        {'!!!!v12'}
      </H1>
      <Body size="lg" medium color={lightModeColors.neutral1[11]} textAlign={'center'}>
        {t(
          'Bring your Bitcoin ideas to life with Geyser. Rally your community and the Bitcoin community to fund projects that push Bitcoin adoption forward.',
        )}
      </Body>

      <Button variant="solid" width={'200px'} colorScheme="primary1" as={Link} href={GeyserAboutUrl} isExternal>
        {t('Learn more')}
      </Button>
    </CardLayout>
  )
}
