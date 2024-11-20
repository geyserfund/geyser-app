import { Button, ButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { PiIdentificationBadge } from 'react-icons/pi'

import { useProfileSideNavAtom } from '@/modules/navigation/platformNavBar/profileNav/profileSideNavAtom'
import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'
import { HeroButtonBorderColor, HeroButtonGradient } from '@/shared/styles/custom'
import { UserForProfilePageFragment, UserHeroStats } from '@/types'

import { HeroCardModal } from './HeroCardModal'

type HeroCardButtonProps = {
  user: UserForProfilePageFragment
  stats: UserHeroStats
} & ButtonProps

export const HeroCardButton = ({ user, stats, ...rest }: HeroCardButtonProps) => {
  const [_, changeProjectSideNavOpen] = useProfileSideNavAtom()

  const setHeroCard = useSetAtom(heroCardAtom)

  const handleHeroCardClick = () => {
    changeProjectSideNavOpen(false)
    setHeroCard({
      user,
      stats,
      isOpen: true,
    })
  }

  return (
    <>
      <Button
        variant="ghost"
        w="full"
        leftIcon={<PiIdentificationBadge fontSize={'16px'} />}
        alignContent="center"
        height="32px"
        onClick={handleHeroCardClick}
        borderColor={HeroButtonBorderColor}
        background={HeroButtonGradient}
        {...rest}
      >
        {t('Hero Card')}
      </Button>

      <HeroCardModal />
    </>
  )
}
