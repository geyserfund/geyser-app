import { Button, HStack, Spinner, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy } from 'react-icons/pi'

import { LightningIcon } from '@/assets'
import { getAppEndPoint } from '@/config/domain'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useCreateAndCopyImage } from '@/modules/project/pages1/projectView/hooks'
import { GeyserShareImageUrl } from '@/shared/constants'
import { validateImageUrl } from '@/shared/markdown/validations/image'
import { encodeLNURL, useNotification } from '@/utils'

import { ProjectShareBanner } from '../components/ProjectShareBanner'

export const ProjectShareContribute = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const toast = useNotification()

  const endPoint = getAppEndPoint()

  const ref = useRef<HTMLDivElement>(null)

  const [generating, setGenerating] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setGenerating(false)
    }, 5000)
  }, [])

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

  const lnurlPayUrl = encodeLNURL(`${endPoint}/lnurl/pay?projectId=${project.id}`)

  const isImage = validateImageUrl(project.images[0])

  return (
    <VStack
      w="100%"
      border="1px solid"
      borderColor="neutral1.6"
      background="neutral1.2"
      borderRadius={8}
      overflow={'hidden'}
      position="relative"
    >
      <ProjectShareBanner
        ref={ref}
        bannerImage={isImage && project.images[0] ? project.images[0] : project.thumbnailImage || GeyserShareImageUrl}
        qrCodeValue={lnurlPayUrl}
        qrCodeText={t('Contribute with lightning')}
        centerLogo={LightningIcon}
        banneText={project.title}
      />

      <HStack padding={3} width="100%">
        {generating ? (
          <Button variant="solid" colorScheme="neutral1" w="full" leftIcon={<Spinner size="sm" />}>
            {t('Generating banner...')}
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="primary1"
            w="full"
            rightIcon={<PiCopy />}
            isLoading={copying}
            onClick={handleCopy}
          >
            {t('Copy image')}
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
