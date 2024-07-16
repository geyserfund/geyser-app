/* eslint-disable no-async-promise-executor */
import { Button, HStack, VStack } from '@chakra-ui/react'
import { toPng } from 'html-to-image'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy } from 'react-icons/pi'

import { LightningIcon } from '@/assets'
import { getAppEndPoint } from '@/config/domain'
import { GeyserShareImageUrl } from '@/constants'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { encodeLNURL, useNotification } from '@/utils'

import { ProjectShareBanner } from '../components/ProjectShareBanner'

export const ProjectShareContribute = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const { toast } = useNotification()

  const [copying, setCopying] = useState(false)

  const endPoint = getAppEndPoint()

  const ref = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    setCopying(true)
    try {
      const getBlob = async () => {
        const dataUrl = await getDataUrl()

        const base64Response = await fetch(dataUrl)

        return base64Response.blob()
      }

      const clipboardItem = new ClipboardItem({
        'image/png': getBlob().then((result) => {
          if (!result) {
            return new Promise(async (resolve) => {
              resolve('')
            })
          }

          return new Promise(async (resolve) => {
            resolve(result)
          })
        }),
      })

      await navigator.clipboard.write([clipboardItem])
      toast({
        status: 'success',
        title: 'Copied!',
        description: 'Ready to paste into Social media posts',
      })
    } catch (error) {
      console.log('checking error', error)
      toast({
        status: 'error',
        title: 'Failed to download image',
        description: 'Please try again',
      })
    }

    setCopying(false)
  }

  const getDataUrl = async () => {
    const element = ref.current
    if (element) {
      const dataUrl = await toPng(element)
      return dataUrl
    }

    return ''
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
        bannerImage={project.image || GeyserShareImageUrl}
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
