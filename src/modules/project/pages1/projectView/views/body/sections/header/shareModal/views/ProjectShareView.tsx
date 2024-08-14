import { Button, HStack, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy } from 'react-icons/pi'

import { LogoDark } from '@/assets'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CampaignContent, useCreateAndCopyImage, useProjectShare } from '@/modules/project/pages1/projectView/hooks'
import { GeyserShareImageUrl } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectShareBanner } from '../components/ProjectShareBanner'

export const ProjectShareView = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

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

  const { getShareProjectUrl } = useProjectShare()

  const projectUrl = getShareProjectUrl({ clickedFrom: CampaignContent.projectShareQrBanner })

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
        qrCodeValue={projectUrl}
        qrCodeText={t('View project')}
        centerLogo={LogoDark}
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
