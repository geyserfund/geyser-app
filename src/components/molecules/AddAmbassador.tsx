import { Box, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ButtonComponent, UndecoratedLink } from '../ui';
import { AmbassadorUrl } from '../../constants';

interface IConnectTwitter {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const useStyles = createUseStyles({
  twitterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const AddAmbassador = ({ isOpen, onClose }: IConnectTwitter) => {
  const classes = useStyles();
  const useTitle = 'Become an ambassador';
  const useDescription =
    'Become an ambassador to increase the project’s visibility and trustfulness. Click continue to add your information and the project owner will get back in touch with you soon.\n';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 20px">
        <ModalHeader>
          <Text fontSize="16px" fontWeight="normal">
            {useTitle}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box className={classes.twitterContainer}>
            <Text>{useDescription}</Text>
            <UndecoratedLink href={AmbassadorUrl} isExternal>
              <ButtonComponent
                margin="10px"
                isFullWidth
                primary
                standard
                onClick={() => {}}
              >
                Continue
              </ButtonComponent>
            </UndecoratedLink>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
