import { Button, HStack, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy } from 'react-icons/pi'

import { LightningIcon } from '@/assets'
import { getAppEndPoint } from '@/config/domain'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useCreateAndCopyImage } from '@/modules/project/pages1/projectView/hooks'
import { GeyserShareImageUrl } from '@/shared/constants'
import { encodeLNURL, useNotification } from '@/utils'

import { ProjectShareBanner } from '../components/ProjectShareBanner'

export const ProjectShareContribute = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const toast = useNotification()

  const endPoint = getAppEndPoint()

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

  const lnurlPayUrl = encodeLNURL(`${endPoint}/lnurl/pay?projectId=${project.id}`)

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
        bannerImage={project.image || project.thumbnailImage || GeyserShareImageUrl}
        qrCodeValue={lnurlPayUrl}
        qrCodeText={t('Contribute with lightning')}
        centerLogo={LightningIcon}
        banneText={project.title}
      />

      <HStack padding={3} width="100%">
        <Button
          variant="solid"
          colorScheme="primary1"
          w="full"
          rightIcon={<PiCopy />}
          onClick={handleCopy}
          isLoading={copying}
        >
          {t('Copy image')}
        </Button>
      </HStack>
    </VStack>
  )
}
