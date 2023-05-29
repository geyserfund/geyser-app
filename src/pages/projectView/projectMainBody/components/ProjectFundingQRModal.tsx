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

import { ButtonComponent } from '../../../../components/ui'
import { API_SERVICE_ENDPOINT } from '../../../../constants'
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
  const isMobile = useMobileMode()
  const [imageDownload, setImageDownload] = useState<string | undefined>()

  const { toast } = useNotification()

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
    `${API_SERVICE_ENDPOINT}/lnurl/pay?projectId=${projectId}`,
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? 'md' : '3xl'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="neutral.0">
        <ModalHeader>
          <Text fontSize="3xl">Share project on social media</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={5} fontWeight="medium">
            Lightning addresses and QR codes make it possible for anyone to fund
            projects from anywhere. Share one of the image and let the sats
            flow!
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
                <DownloadIcon mr={2} /> Download
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
                  <DownloadIcon mr={2} /> Download
                </ButtonComponent>
              </Link>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
