import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { PiCopy, PiDownloadSimple } from 'react-icons/pi'

import { heroCardAtom } from '@/modules/profile/state/heroCardAtom'
import { useCreateAndCopyImage } from '@/modules/project/pages1/projectView/hooks'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useNotification } from '@/utils'

import { HeroCard } from './HeroCard'

export const HeroCardModal = () => {
  const toast = useNotification()

  const [heroCard, setHeroCard] = useAtom(heroCardAtom)

  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)

  const user = heroCard?.user
  const stats = heroCard?.stats
  const isOpen = heroCard?.isOpen

  const ref = useRef<HTMLDivElement>(null)

  const { handleGenerateAndCopy, copying, getObjectUrl } = useCreateAndCopyImage()

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

  useEffect(() => {
    setDownloadLoading(true)
    setTimeout(async () => {
      const url = await getObjectUrl({
        element: ref.current,
      })
      if (url) {
        setDownloadUrl(url)
      }

      setDownloadLoading(false)
    }, 1000)
  }, [])

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
          as={Link}
          download={'hero-card.png'}
          href={downloadUrl}
          size="lg"
          variant="outline"
          colorScheme="neutral1"
          w="100%"
          rightIcon={<PiDownloadSimple />}
          isLoading={downloadLoading}
          isDisabled={!downloadLoading && !downloadUrl}
        >
          {t('Download')}
        </Button>
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
