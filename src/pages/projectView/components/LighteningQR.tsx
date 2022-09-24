import {
  Button,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { BoltIcon, QrIcon, ShareIcon } from '../../../components/icons';
import { QRModal } from './QRModal';
import { IProject } from '../../../interfaces';

interface ILighteningQR {
  project: IProject;
}

export const LighteningQR = ({ project }: ILighteningQR) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [copy, setCopy] = useState(false);
  const [imageDownload, setImageDownload] = useState('');

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(`${name}@geyser.fund`);
    setCopy(true);
  };

  const capture = () => {
    if (document.getElementById('lnaddress-qr')) {
      html2canvas(document.getElementById('lnaddress-qr')!, {
        useCORS: true,
      }).then((canvas) => {
        setImageDownload(canvas.toDataURL('image/png', 1.0));
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://geyser.fund/project/${name}`);
    setCopy(true);
  };

  return (
    <>
      <HStack
        flexWrap="wrap"
        justifyContent="start"
        alignItems="center"
        spacing="4px"
      >
        <Tooltip
          label={copy ? 'Copied!' : 'Copy Lightning Address'}
          placement="top"
          closeOnClick={false}
        >
          <Button
            size="sm"
            leftIcon={<BoltIcon scale={0.8} />}
            _hover={{ backgroundColor: 'none', border: '1px solid #20ECC7' }}
            _active={{ backgroundColor: 'brand.primary' }}
            bg="none"
            fontWeight="medium"
            onClick={handleAddressCopy}
            color="#2F423E"
            id="lightning-address"
          >
            {name}@geyser.fund
          </Button>
        </Tooltip>

        <Tooltip label="View Project QR Code" placement="top">
          <IconButton
            _hover={{ backgroundColor: 'none', border: '1px solid #20ECC7' }}
            _active={{ backgroundColor: 'brand.primary' }}
            bg="none"
            icon={<QrIcon />}
            aria-label="qr"
            onClick={() => {
              setCopy(false);
              onOpen();
              if (imageDownload.length === 0) {
                setTimeout(() => {
                  capture();
                }, 2100);
              }
            }}
          />
        </Tooltip>

        <Tooltip
          label={copy ? 'Copied!' : 'Share Project'}
          placement="top"
          closeOnClick={false}
        >
          <IconButton
            _hover={{ backgroundColor: 'none', border: '1px solid #20ECC7' }}
            _active={{ backgroundColor: 'brand.primary' }}
            bg="none"
            icon={<ShareIcon />}
            aria-label="share"
            onClick={handleShare}
          />
        </Tooltip>
      </HStack>
      <QRModal
        isOpen={isOpen}
        onClose={onClose}
        setCopy={setCopy}
        images={project.media}
        projectId={project.id}
        title={project.title}
        imageDownload={imageDownload}
      />
    </>
  );
};
