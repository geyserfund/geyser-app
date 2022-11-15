import { DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Link,
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { ButtonComponent } from '../../../components/ui';
import { API_SERVICE_ENDPOINT } from '../../../constants';
import { encode, isMobileMode } from '../../../utils';
import LogoLight from '../../../assets/logo-dark-green.svg';

function ModalProjectImage({ image }: { image: string }) {
  return (
    <Box
      borderLeftRadius="lg"
      backgroundImage={image}
      w="50%"
      backgroundSize="cover"
      backgroundPosition="center"
      id="modal-image"
    />
  );
}

const ModalImage = React.memo(ModalProjectImage);

interface IQRModal {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  image?: string;
  projectId: string;
  title: string;
  setCopy: any;
  imageDownload: string;
}

export const ProjectFundingQRModal = ({
  isOpen,
  onClose,
  name,
  image,
  projectId,
  title,
  setCopy,
  imageDownload,
}: IQRModal) => {
  const isMobile = isMobileMode();

  const lnurlPayUrl = encode(
    `${API_SERVICE_ENDPOINT}/lnurl/pay?projectId=${projectId}`,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCopy(false);
        onClose();
      }}
      size={isMobile ? 'md' : 'xl'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="3xl">Project QR code</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={5} fontWeight="medium">
            Lightning addresses and QR codes make it possible for anyone to fund
            projects from anywhere.
          </Text>

          <Box display="flex" w="100%" id="lnaddress-qr">
            {image && <ModalImage image={image} />}

            <Box
              bg="brand.primary"
              w="50%"
              p={5}
              borderRightRadius="lg"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Text textAlign="center" fontWeight="bold" fontSize="1xl">
                  {title}
                </Text>
                <Text textAlign="center" fontSize={isMobile ? '6px' : '8px'}>
                  CONTRIBUTE TO THIS PROJECT WITH A LIGHTNING QR CODE OR
                  LIGHTNING ADDRESS
                </Text>

                <Box
                  display="flex"
                  justifyContent="center"
                  p={1}
                  bgColor="#fff"
                  borderRadius="lg"
                  marginTop={2}
                  marginBottom={2}
                >
                  <QRCode
                    qrStyle="dots"
                    logoImage={LogoLight}
                    eyeRadius={2}
                    logoHeight={30}
                    logoWidth={30}
                    removeQrCodeBehindLogo={true}
                    bgColor="#fff"
                    fgColor="#004236"
                    size={isMobile ? 121 : 165}
                    value={lnurlPayUrl}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingTop={1}
                >
                  <Text
                    id="lightning-address"
                    textAlign="center"
                    fontWeight="bold"
                    wordBreak="break-all"
                    fontSize={isMobile ? '8px' : '12px'}
                  >
                    {name}@geyser.fund
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box w="100%">
            {imageDownload.length === 0 ? (
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
  );
};
