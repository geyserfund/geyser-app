import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useRef } from 'react'
import { PiCopy, PiIdentificationBadge } from 'react-icons/pi'

import { useCreateAndCopyImage } from '@/modules/project/pages1/projectView/hooks'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { HeroButtonBorderColor, HeroButtonGradient } from '@/shared/styles/custom'
import { UserForProfilePageFragment, UserHeroStats } from '@/types'
import { useNotification } from '@/utils'

import { HeroCard } from './HeroCard'

type HeroSectionProps = {
  user: UserForProfilePageFragment
  stats: UserHeroStats
} & ButtonProps

export const HeroSection = ({ user, stats, ...rest }: HeroSectionProps) => {
  const heroCardModal = useModal()
  const toast = useNotification()

  const ref = useRef<HTMLDivElement>(null)

  const { handleGenerateAndCopy, copying } = useCreateAndCopyImage()

  const handleCopy = async () => {
    await handleGenerateAndCopy({
      element: ref.current,
      onSuccess() {
        toast.success({
          title: 'Copied!',
          description: 'Ready to paste into Social media posts',
        })
      },
      onError() {
        toast.error({
          title: 'Failed to download image',
          description: 'Please try again',
        })
      },
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
        onClick={heroCardModal.onOpen}
        borderColor={HeroButtonBorderColor}
        background={HeroButtonGradient}
        {...rest}
      >
        {t('Hero Card')}
      </Button>

      <Modal {...heroCardModal} title={'Hero Card'} isCentered>
        <VStack spacing={4}>
          <Body>
            {t('Hero cards are a summary of your activity in the Bitcoin space. You can share them with your friends!')}
          </Body>
          <HeroCard ref={ref} user={user} stats={stats} />
          <Button
            size="lg"
            variant="solid"
            colorScheme="primary1"
            w="100%"
            rightIcon={<PiCopy />}
            onClick={handleCopy}
            isLoading={copying}
          >
            {t('Copy card')}
          </Button>
        </VStack>
      </Modal>
    </>
  )
}
