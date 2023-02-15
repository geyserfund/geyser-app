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
import html2canvas from 'html2canvas'
import { createRef, useEffect, useState } from 'react'

import { ButtonComponent } from '../../../../components/ui'
import { API_SERVICE_ENDPOINT } from '../../../../constants'
import { encodeLNURL, useMobileMode } from '../../../../utils'
import { ProjectFundingBanner } from './ProjectFundingBanner'

interface IQRModal {
  isOpen: boolean
  onClose: () => void
  name: string
  projectId: string
  title: string
  setCopy: any
}

export const ProjectFundingQRModal = ({
  isOpen,
  onClose,
  name,
  projectId,
  title,
  setCopy,
}: IQRModal) => {
  const isMobile = useMobileMode()
  const bannerRef = createRef<HTMLDivElement>()
  const [imageDownload, setImageDownload] = useState<string | undefined>()

  useEffect(() => {
    setTimeout(() => {
      if (bannerRef.current) {
        html2canvas(bannerRef.current, {
          useCORS: true,
        }).then((canvas) => {
          setImageDownload(canvas.toDataURL('image/png', 1.0))
        })
      }
    }, 1000)
  }, [bannerRef])

  const lnurlPayUrl = encodeLNURL(
    `${API_SERVICE_ENDPOINT}/lnurl/pay?projectId=${projectId}`,
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCopy(false)
        onClose()
      }}
      size={isMobile ? 'md' : '3xl'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
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
