import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaCheck, FaClosedCaptioning } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import QRCode from 'react-qr-code';
import bitcircle from '../../../assets/bitcircle.svg';

export const ContributeModal = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = React.useState(null);
  const [email, setEmail] = React.useState();
  const [comment, setComment] = React.useState();
  const [link, setLink] = React.useState();
  const [name, setName] = React.useState();
  const [formC, setFormC] = React.useState(true);
  const [qrC, setQrC] = React.useState(false);
  const [sentC, setSentC] = React.useState(false);
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        variant={'solid'}
        fontSize="sm"
        px={10}
        mr="2"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        backgroundColor="brand.primary400"
      >
        Contribute
      </Button>

      <Modal isCentered isOpen={isOpen} size="sm">
        {overlay}

        <ModalContent bg="transparent" boxShadow={0}>
          <Button
            fontSize="sm"
            rounded={0}
            onClick={onClose}
            mb={2}
            gap={2}
            width="100px"
            backgroundColor="brand.bgWhite"
          >
            <MdClose fontSize={'18px'} /> Close
          </Button>
          <Box bg="brand.bgWhite" pb={3}>
            <ModalHeader pb={2}>Contribute</ModalHeader>
            {formC && (
              <ModalBody>
                <Text fontWeight={'500'} mb={2} fontSize="16px">
                  Contribute to Geyser Grants to support the Bitcoin ecosystem.
                  Donations are non-refundable and not tax deductible.
                </Text>
                <Box mb={3}>
                  <Text fontWeight={'700'} fontSize="14px">
                    Amount
                  </Text>
                  <Box display="flex" alignItems={'center'} gap={3}>
                    <Box
                      display="flex"
                      alignItems={'center'}
                      mt={1}
                      cursor="pointer"
                    >
                      <Box
                        px={4}
                        py={2}
                        border={
                          amount === 100
                            ? '2px solid #20ECC7'
                            : '2px solid #E9ECEF'
                        }
                        rounded="md"
                        fontWeight={'bold'}
                        onClick={() => setAmount(100)}
                      >
                        $100
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      alignItems={'center'}
                      mt={1}
                      cursor="pointer"
                    >
                      <Box
                        px={4}
                        py={2}
                        fontWeight="bold"
                        border={
                          amount === 1000
                            ? '2px solid #20ECC7'
                            : '2px solid #E9ECEF'
                        }
                        rounded="md"
                        onClick={() => setAmount(1000)}
                      >
                        $1,000
                      </Box>
                    </Box>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        // eslint-disable-next-line react/no-children-prop
                        children={<Text>$</Text>}
                      />
                      <Input
                        placeholder="12,120"
                        type={'number'}
                        _focus={{ borderColor: 'brand.primary' }}
                        value={amount}
                        _placeholder={{ fontWeight: 'bold' }}
                        onChange={(e) => setAmount(e.target.value)}
                        variant={'outline'}
                      />
                    </InputGroup>
                  </Box>
                </Box>

                <FormControl mb={3}>
                  <FormLabel fontWeight={'700'} fontSize="14px">
                    Name/ Nym (optional)
                  </FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Satoshi"
                    _placeholder={{ fontSize: '12px' }}
                    _focus={{ borderColor: 'brand.primary' }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel fontWeight={'700'} fontSize="14px">
                    Email/contact (optional)
                  </FormLabel>
                  <Input
                    ref={initialRef}
                    _placeholder={{ fontSize: '12px' }}
                    placeholder="satoshi@geyser.fund"
                    _focus={{ borderColor: 'brand.primary' }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel fontWeight={'700'} fontSize="14px">
                    Leave us comment (optional)
                  </FormLabel>
                  <Input
                    ref={initialRef}
                    _placeholder={{ fontSize: '12px' }}
                    _focus={{ borderColor: 'brand.primary' }}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="satoshi@geyser.fund"
                  />
                </FormControl>
                <Box>
                  <Text fontWeight={'700'} fontSize="14px">
                    Upload your logo or PFP link (optional)
                  </Text>
                  <Text fontWeight={'400'} fontSize="11px">
                    If you would like to featured your profile or business in
                    the Grant page drop the Image link in here and we will add
                    it to the list of sponsors on the Grant page and the landing
                    page
                  </Text>
                  <Textarea
                    mt={3}
                    onChange={(e) => setLink(e.target.value)}
                    size={'lg'}
                    _placeholder={{ fontSize: '12px' }}
                    _focus={{ borderColor: 'brand.primary' }}
                    placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAABvCAMAAACuGvu3AAAAe1BMVEX////60ij+9tb60SP60R36zwD61U..."
                  />
                </Box>
                <Box mt={4}>
                  <Button
                    bg="brand.primary"
                    onClick={() => {
                      setFormC(false);
                      setQrC(true);
                    }}
                    isFullWidth
                  >
                    Confirm
                  </Button>
                </Box>
              </ModalBody>
            )}
            {qrC && (
              <ModalBody>
                <Box display="flex" alignItems={'center'} gap={4}>
                  <img src={bitcircle} alt="bitcoinsymbol" width={'40px'} />
                  <Text fontWeight={'400'} fontSize="10px">
                    Scan this QR code to fund with Bitcoin on any wallet
                    (on-chain or lightning)
                  </Text>
                </Box>
                <Box
                  display="flex"
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <Box my={2}>
                    <QRCode
                      size={186}
                      value={
                        'orem ipsum dolor sit amet consectetur adipisicing elit. Sint tempore expedita ab quae nisi assumenda. Et reiciendis vero temporibus asperiores commodi non obcaecati tempore rerum inventore? Accusamus tempore ex dolores.'
                      }
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  alignItems={'center'}
                  justifyContent="center"
                  gap={2}
                >
                  <Button isLoading color="brand.primary" variant={'text'}>
                    load
                  </Button>
                  <Text fontWeight={'400'}>waiting for payment...</Text>
                </Box>
                <Box mt={4}>
                  <Button
                    bg="brand.primary"
                    onClick={() => {
                      setFormC(false);
                      setQrC(false);
                      setSentC(true);
                    }}
                    isFullWidth
                  >
                    Confirm
                  </Button>
                </Box>
              </ModalBody>
            )}
            {sentC && (
              <ModalBody>
                <Text fontWeight={'500'} fontSize="16px">
                  Contribute to this gramt to support the Bitcoin ecosystem.
                  Donations are non-refundable and not tax deductible.
                </Text>

                <Box display="flex" justifyContent={'center'} my={4}>
                  {' '}
                  <Box
                    height={'61px'}
                    width={'61px'}
                    rounded="full"
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                    bg="brand.primary"
                  >
                    <FaCheck />
                  </Box>
                </Box>
                <Text fontSize={'14px'}>
                  You contributed{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    200,000 Sats to Bitcoin Education in Emerging Markets.s
                  </span>
                </Text>
                <Text mt={4} fontSize={'14px'}>
                  Check out the{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      borderBottom: '1px solid black',
                    }}
                  >
                    block explorer
                  </span>
                </Text>
                <Box mt={4}>
                  <Button
                    bg="brand.primary"
                    onClick={() => {
                      setFormC(false);
                      setQrC(false);
                      setSentC(true);
                    }}
                    isFullWidth
                  >
                    Confirm
                  </Button>
                </Box>
              </ModalBody>
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
