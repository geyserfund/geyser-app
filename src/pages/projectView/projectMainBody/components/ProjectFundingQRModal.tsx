import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import * as htmlToImage from 'html-to-image'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonComponent } from '../../../../components/ui'
import { getAppEndPoint } from '../../../../config/domain'
import { encodeLNURL, useMobileMode, useNotification } from '../../../../utils'
import { ProjectFundingBanner } from './ProjectFundingBanner'

interface IQRModal {
  isOpen: boolean
  onClose: () => void
  name: string
  projectId: string
  title: string
}

export const ProjectFundingQRModal = ({
  isOpen,
  onClose,
  name,
  projectId,
  title,
}: IQRModal) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const [imageDownload, setImageDownload] = useState<string | undefined>()

  const { toast } = useNotification()
  const endPoint = getAppEndPoint()

  const bannerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return
    }

    htmlToImage
      .toPng(node, { style: { opacity: '1', position: 'static' } })
      .then((image) => {
        setImageDownload(image)
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: 'something went wrong rendering the html to image',
          description: `${error}`,
        })
      })
  }, [])

  const lnurlPayUrl = encodeLNURL(
    `${endPoint}/lnurl/pay?projectId=${projectId}`,
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? 'md' : '3xl'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="3xl">{t('Share project on social media')}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={5} fontWeight="medium">
            {t(
              'Lightning addresses and QR codes make it possible for anyone to fund projects from anywhere. Share one of the image and let the sats flow!',
            )}
          </Text>
          <ProjectFundingBanner
            banner={imageDownload}
            ref={bannerRef}
            lnurlPayUrl={lnurlPayUrl}
            title={title}
          />
        </ModalBody>
        <ModalFooter>
          <Box w="100%">
            {!imageDownload ? (
              <ButtonComponent
                disabled={true}
                isLoading={true}
                w="100%"
                primary
              >
                <DownloadIcon mr={2} /> {t('Download')}
              </ButtonComponent>
            ) : (
              <Link
                w="100%"
                h="100%"
                _hover={{ textDecoration: 'none' }}
                href={imageDownload}
                download={`${name}-lnaddress-qr.png`}
                isExternal
              >
                <ButtonComponent w="100%" primary>
                  <DownloadIcon mr={2} /> {t('Download')}
                </ButtonComponent>
              </Link>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
