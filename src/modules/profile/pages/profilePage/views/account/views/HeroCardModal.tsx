import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { PiCopy } from 'react-icons/pi'

import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'
import { useCreateAndCopyImage } from '@/modules/project/pages1/projectView/hooks'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useNotification } from '@/utils'

import { HeroCard } from './HeroCard'

export const HeroCardModal = () => {
  const toast = useNotification()

  const [heroCard, setHeroCard] = useAtom(heroCardAtom)

  const user = heroCard?.user
  const stats = heroCard?.stats
  const isOpen = heroCard?.isOpen

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

  if (!isOpen || !user || !stats) {
    return null
  }

  const onClose = () => setHeroCard({ ...heroCard, isOpen: false })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Hero Card'} isCentered>
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
  )
}
