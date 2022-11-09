import {
  Checkbox,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ButtonComponent, TextArea, TextBox } from '../../../../components/ui';
import { VoltageNodeConnectionDemoURL } from '../../../../constants';
import { isMobileMode } from '../../../../utils';
import { checkMacaroonPermissions } from '../../../../utils/checkMacaroonPermissions';
import { isSecp256k1Compressed } from '../../../../utils/isSecp256k1Compressed';
import { isTorV3Address } from '../../../../utils/isTorV3Address';
import { TNodeInput } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (_: TNodeInput) => void;
  node?: TNodeInput;
};

export const defaultNode = {
  name: '',
  isVoltage: false,
  hostname: '',
  publicKey: '',
  invoiceMacaroon: '',
  tlsCert: '',
  grpc: '',
};

export const NodeAdditionModal = ({
  isOpen,
  onClose,
  node,
  onSubmit,
}: Props) => {
  const isMobile = isMobileMode();

  const [isVoltage, setIsVoltage] = useState(false);
  const [form, setForm] = useState<TNodeInput>(node || defaultNode);
  const [formError, setFormError] = useState<any>({});

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormError({});

    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleVoltageNodeToggled = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormError({});

    const isVoltageNode = event.target.checked;

    setIsVoltage(isVoltageNode);
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      onSubmit({ ...form, isVoltage });
      onClose();
    }
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    const additionalText = ' is a required field';

    if (!form.name) {
      errors.name = 'Node name' + additionalText;
      isValid = false;
    } else if (form.name.length > 60) {
      errors.name = 'Node name cannot be longer than 60 characters';
      isValid = false;
    }

    if (!form.hostname) {
      errors.hostname = 'Host name' + additionalText;
      isValid = false;
    } else if (form.hostname.length > 80) {
      errors.hostname = 'Host name cannot be longer than 80 characters';
      isValid = false;
    } else {
      const val = isTorV3Address(form.hostname);
      if (val) {
        errors.hostname = 'Tor addresses are currently not supported';
        isValid = false;
      }
    }

    if (!form.publicKey) {
      errors.publicKey = 'Public Key' + additionalText;
      isValid = false;
    } else if (form.publicKey.length > 66) {
      errors.publicKey = 'Host name cannot be longer than 66 characters';
      isValid = false;
    } else {
      const val = isSecp256k1Compressed(form.publicKey);
      if (!val) {
        errors.publicKey = 'The pubkey is wrongly formatted';
        isValid = false;
      }
    }

    if (!form.invoiceMacaroon) {
      errors.invoiceMacaroon = 'Invoice Macaroon' + additionalText;
      isValid = false;
    } else if (form.invoiceMacaroon.length > 280) {
      errors.invoiceMacaroon = 'Host name cannot be longer than 280 characters';
      isValid = false;
    } else {
      const val = checkMacaroonPermissions(form.invoiceMacaroon);
      if (val) {
        errors.invoiceMacaroon = val;
        isValid = false;
      }
    }

    if (!isVoltage) {
      if (!form.tlsCert) {
        errors.tlsCert = 'TLS certificate' + additionalText;
        isValid = false;
      } else if (form.invoiceMacaroon.length > 280) {
        errors.hostname =
          'TLS certificate cannot be longer than 280 characters';
        isValid = false;
      }
    }

    if (!isVoltage && !form.grpc) {
      errors.grpc = 'gRPC port' + additionalText;
      isValid = false;
    }

    if (!isValid) {
      setFormError(errors);
    }

    return isValid;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? 'sm' : 'md'}
      isCentered
    >
      <ModalOverlay />

      <ModalContent
        display="flex"
        alignItems="flex-start"
        paddingY="20px"
        paddingX="0px"
      >
        <ModalHeader paddingX="20px">
          <VStack spacing={2} alignItems="flex-start">
            <Text fontSize="18px" fontWeight={600}>
              Add a Node
            </Text>

            <Text fontSize={'14px'} fontWeight="medium">
              We currently support non-Tor nodes. So Tor nodes (including
              Umbrel) will not work at this time.
            </Text>
          </VStack>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody width="100%" paddingX="0px">
          <VStack
            width="100%"
            paddingBottom="20px"
            marginBottom="20px"
            maxHeight="600px"
            overflowY="auto"
            spacing="15px"
            paddingX="20px"
          >
            <VStack width="100%" alignItems="flex-start">
              <Text>Node Name</Text>
              <TextBox
                name="name"
                onChange={handleTextChange}
                value={form.name}
                error={formError.name}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Checkbox
                size="lg"
                colorScheme="green"
                isChecked={isVoltage}
                onChange={handleVoltageNodeToggled}
              >
                <Text>This is a Voltage Node</Text>
              </Checkbox>

              {isVoltage ? (
                <Link isExternal href={VoltageNodeConnectionDemoURL}>
                  Find our demo here on how to load a Voltage node.
                </Link>
              ) : null}
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Hostname or IP Address (API endpoint)</Text>

              <TextBox
                name="hostname"
                onChange={handleTextChange}
                placeholder={isVoltage ? 'nodename.m.voltageapp.io' : ''}
                value={form.hostname}
                error={formError.hostname}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Public Key (Identity Pubkey)</Text>
              <TextArea
                minHeight={'6em'}
                name="publicKey"
                placeholder="0330ba2ac70aa1566d3d07524248ee8a7861aaebdc6d46c8ccd016bfe20b76c995"
                onChange={handleTextChange}
                value={form.publicKey}
                error={formError.publicKey}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Invoice Macaroon (base64)</Text>
              <TextArea
                minHeight={'10em'}
                name="invoiceMacaroon"
                placeholder="cml0ZRoKCGbG5kAlgRChAGp+sQl/hVmpZQVWvphmk/EgEwGhYKB2FkZHJlc3MSBHJlYWWSBXdyaXRlGhcrudm9pY2VzEgRyZZFkEgV3PCgdvbmNoYWluEgRyZWFkAAAGIK8pI70yQT8GuVhykez0PMpNt5kEeYsmuvwdnLe4JfFMAgEE"
                onChange={handleTextChange}
                value={form.invoiceMacaroon}
                error={formError.invoiceMacaroon}
              />
            </VStack>

            {isVoltage === false ? (
              <>
                <VStack width="100%" alignItems="flex-start">
                  <Text>TLS Certificate (base64)</Text>
                  <TextArea
                    minHeight={'6em'}
                    name="tlsCert"
                    placeholder="LS0tLS1CRUdJTiBDRVJU.....zeUZrYWFNTzdCWU51SVRxSRVJUSUZJQ0FURS0tLS0tCg=="
                    onChange={handleTextChange}
                    value={form.tlsCert}
                    error={formError.tlsCert}
                  />
                </VStack>
                <VStack width="100%" alignItems="flex-start">
                  <Text>gRPC port</Text>
                  <TextBox
                    name="grpc"
                    type="number"
                    placeholder="10009"
                    onChange={handleTextChange}
                    value={form.grpc}
                    error={formError.grpc}
                  />
                </VStack>
              </>
            ) : null}
          </VStack>

          <VStack spacing="10px" paddingX="20px">
            <ButtonComponent isFullWidth primary onClick={handleSubmit}>
              Confirm
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
