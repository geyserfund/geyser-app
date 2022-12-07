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
  Select,
  Divider,
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { FaCheck, FaClosedCaptioning } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useAuthContext } from '../../../context';
import { createApplicantRecordRound2 } from '../../../api';
import bitcircle from '../../../assets/bitcircle.svg';
import { hasTwitterAccount } from '../../../utils';
import { TwitterConnect } from '../../../components/molecules';
import { AuthContext } from '../../../context';

interface Grant {
  applicant: number;
  title: string;
  subtitle: string;
  about: string;
  image: string;
  isClose: Boolean;
}

export const ApplyGrantModal = ({
  applicant,
  image,
  title,
  subtitle,
  isClose,
  about,
}: Grant) => {
  const {
    user,
    setUser,
    isLoggedIn,
    isAuthModalOpen: loginIsOpen,
  } = useAuthContext();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { loginOnClose } = useContext(AuthContext);
  const { onClose: onLoginAlertModalClose } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [area, setArea] = React.useState(null);
  const [email, setEmail] = React.useState();
  const [grantType, setGrantType] = React.useState();
  const [link, setLink] = React.useState();
  const [name, setName] = React.useState();
  const [formC, setFormC] = React.useState(false);
  const [grant, setGrant] = React.useState(true);
  const [sentC, setSentC] = React.useState(false);
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const finalRef = React.useRef(null);

  const { externalAccounts } = user;

  const submitForm = async () => {
    setLoading(true);
    const data = {
      fields: {
        'Project Name': name,
        Grant: grantType,
        'Project Link': link,
        Contact: email,
        Region: area,
        'Twitter ID': externalAccounts[0]?.externalUsername,
        Links: '',
      },
    };

    await createApplicantRecordRound2(data);
    setLoading(false);
    setFormC(false);
    setSentC(true);
  };

  return (
    <>
      {isClose ? (
        <Button
          bg="brand.primary400"
          mt={3}
          size="sm"
          minWidth={'100%'}
          fontSize="14px"
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
          backgroundColor="brand.primary400"
        >
          view
        </Button>
      ) : (
        <Button
          variant={'outline'}
          size="sm"
          isFullWidth
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
          style={{ border: 'solid 2px #20ECC7' }}
        >
          Closed
        </Button>
      )}

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
            {grant && (
              <>
                <Box
                  width={'100%'}
                  display={isClose ? 'block' : 'flex'}
                  justifyContent={'center'}
                >
                  <img src={image} width={isClose ? '100%' : '60%'} />
                </Box>

                <ModalBody>
                  <Text fontWeight={'600'} mb={2} fontSize="18px">
                    {title}
                  </Text>
                  <Text fontWeight={'500'} mb={2} fontSize="13px">
                    {subtitle}
                  </Text>
                  <Box my={4}>
                    <Box
                      display="flex"
                      justifyContent={'center'}
                      alignContent="center"
                      flexDirection={'column'}
                    >
                      <Text justify="center">{about}</Text>
                    </Box>
                  </Box>
                  <Box mt={4}>
                    {isClose ? (
                      <Button
                        bg="brand.primary"
                        onClick={() => {
                          setGrant(false);
                          setFormC(true);
                        }}
                        isFullWidth
                      >
                        Confirm
                      </Button>
                    ) : (
                      <Button isFullWidth disabled>
                        Apply
                      </Button>
                    )}
                  </Box>
                </ModalBody>
              </>
            )}
            {formC && (
              <>
                {hasTwitterAccount(user) ? (
                  <ModalBody>
                    <Text fontWeight={'700'} mb={2} mt={4} fontSize="22px">
                      Apply
                    </Text>

                    <FormControl mb={3}>
                      <FormLabel fontWeight={'500'} fontSize="12px">
                        Which Grant are you applying to?
                      </FormLabel>
                      <Select
                        ref={initialRef}
                        _placeholder={{ fontSize: '12px' }}
                        _focus={{ borderColor: 'brand.primary' }}
                        onChange={(e) => setGrantType(e.target.value)}
                      >
                        {' '}
                        <option value="Bitcoin Education">
                          Bitcoin Education
                        </option>
                        <option value="Bitcoin Culture">Bitcoin Culture</option>
                        <option value="Bitcoin Builders">
                          Bitcoin Builders
                        </option>
                      </Select>
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel fontWeight={'500'} fontSize="12px">
                        What’s your project name?
                      </FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Bitcoin for Fairness"
                        _placeholder={{ fontSize: '12px' }}
                        _focus={{ borderColor: 'brand.primary' }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <Box>
                      <Text fontWeight={'500'} fontSize="12px">
                        Drop your Geyser or Bolt.fun project or entry link with
                        an explainer of your project idea and intent
                      </Text>

                      <Textarea
                        mt={3}
                        onChange={(e) => setLink(e.target.value)}
                        size={'md'}
                        _placeholder={{ fontSize: '12px' }}
                        _focus={{ borderColor: 'brand.primary' }}
                        placeholder="https://geyser.fund/project/bitcoin-for-fairness"
                      />
                    </Box>
                    <FormControl mb={3} mt={3}>
                      <FormLabel fontWeight={'500'} fontSize="12px">
                        Which area of th world will you be focusing your efforts
                        on?
                      </FormLabel>
                      <Select
                        ref={initialRef}
                        _placeholder={{ fontSize: '12px' }}
                        _focus={{ borderColor: 'brand.primary' }}
                        onChange={(e) => setArea(e.target.value)}
                      >
                        {' '}
                        <option value="option1">Online</option>
                      </Select>
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel fontWeight={'700'} fontSize="12px">
                        Email
                      </FormLabel>
                      <Input
                        ref={initialRef}
                        _placeholder={{ fontSize: '12px' }}
                        placeholder="Yolo@protonmail.com"
                        _focus={{ borderColor: 'brand.primary' }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>

                    <Box mt={4}>
                      {loading ? (
                        <Button
                          isLoading
                          loadingText="Loading"
                          bg="brand.primary"
                          isFullWidth
                          isDisabled
                          spinnerPlacement="start"
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          bg="brand.primary"
                          onClick={submitForm}
                          isFullWidth
                        >
                          Submit
                        </Button>
                      )}
                    </Box>
                  </ModalBody>
                ) : (
                  <>
                    <Box width={'100%'}>
                      <img src={image} width={'100%'} />
                    </Box>
                    <ModalBody>
                      <Text fontWeight={'700'} mb={3} fontSize="22px">
                        Apply
                      </Text>
                      <Text fontWeight={'400'} mb={2} fontSize="15px">
                        You need to link your Twitter account to apply to a
                        Grant. This is to verify your identity and
                      </Text>

                      <Box mt={6}>
                        <TwitterConnect
                          onClose={() => {
                            loginOnClose();
                            onLoginAlertModalClose();
                          }}
                        />
                      </Box>
                    </ModalBody>
                  </>
                )}
              </>
            )}
            {sentC && (
              <ModalBody>
                <Text fontWeight={'700'} fontSize="22px">
                  Apply
                </Text>

                <Box display="flex" justifyContent={'center'} my={4}>
                  {' '}
                  <Box
                    height={'55px'}
                    width={'55px'}
                    rounded="full"
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                    bg="brand.primary"
                  >
                    <FaCheck />
                  </Box>
                </Box>
                <Text fontSize={'14px'} textAlign="center" fontWeight={'500'}>
                  Application Submitted
                </Text>

                <Box mt={4}>
                  <Button
                    bg="brand.primary"
                    onClick={() => {
                      setFormC(false);
                      setGrant(false);
                      setSentC(true);
                    }}
                    isFullWidth
                  >
                    Submit
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
