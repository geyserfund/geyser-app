import {
  Grid,
  GridItem,
  HStack,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import {
  ButtonComponent,
  IconButtonComponent,
  TextInputBox,
  UndecoratedLink,
} from '../../../components/ui';
import {
  isMobileMode,
  knownLNURLDomains,
  lightningAddressToEvaluationURL,
  validateEmail,
} from '../../../utils';
import { AiOutlineSetting } from 'react-icons/ai';
import { TNodeInput } from './types';
import { BiLeftArrowAlt, BiPencil, BiRocket } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import {
  AlbyLightningAddressURL,
  BitNobURL,
  colors,
  GeyserTermsAndConditionsURL,
  VoltageExplainerPageForGeyserURL,
  WalletOfSatoshiLightningAddressURL,
} from '../../../constants';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { NodeAdditionModal } from './components/NodeAdditionModal';
import VoltageLogoSmall from '../../../assets/voltage-logo-small.svg';
import AlbyPNG from '../../../assets/images/third-party-icons/alby@3x.png';
import WalletOfSatoshiPNG from '../../../assets/images/third-party-icons/wallet-of-satoshi@3x.png';
import BitNobPNG from '../../../assets/images/third-party-icons/bitnob@3x.png';
import {
  CreateWalletInput,
  FundingResourceType,
  LndNodeType,
  Project,
  ResourceInput,
} from '../../../types/generated/graphql';
import Loader from '../../../components/ui/Loader';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { WalletConnectionOptionInfoBox } from './components/WalletConnectionOptionInfoBox';

type Props = {
  project: Project;
  onProjectLaunchSelected: (input: CreateWalletInput) => void;
  onSaveAsDraftSelected: (input: CreateWalletInput) => void;
  onBackButtonTapped: () => void;
  isProcessingSubmission: boolean;
};

const useStyles = createUseStyles({
  backIcon: {
    fontSize: '25px',
  },
});

enum ConnectionOption {
  LIGHTNING_ADDRESS = 'LIGHTNING_ADDRESS',
  PERSONAL_NODE = 'PERSONAL_NODE',
}

enum LNAddressEvaluationState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

export const ProjectCreationWalletConnectionForm = ({
  project,
  onProjectLaunchSelected,
  onSaveAsDraftSelected,
  onBackButtonTapped,
  isProcessingSubmission,
}: Props) => {
  const isMobile = isMobileMode();
  const classes = useStyles();

  const [nodeInput, setNodeInput] = useState<TNodeInput | undefined>(undefined);

  const [lightningAddressFormValue, setLightningAddressFormValue] =
    useState('');

  const [lightningAddressFormError, setLightningAddressFormError] = useState<
    string | null
  >(null);

  const [lnAddressEvaluationState, setLnAddressEvaluationState] =
    useState<LNAddressEvaluationState>(LNAddressEvaluationState.IDLE);

  const [connectionOption, setConnectionOption] = useState<string>('');

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const {
    isOpen: isWalletOpen,
    onClose: onWalletClose,
    onOpen: openWallet,
  } = useDisclosure();

  const createWalletInput: CreateWalletInput | null = useMemo(() => {
    const resourceInput: ResourceInput = {
      resourceId: project.id,
      resourceType: FundingResourceType.Project,
    };

    if (connectionOption === ConnectionOption.PERSONAL_NODE) {
      if (Boolean(nodeInput) === false) {
        return null;
      }

      return {
        lndConnectionDetailsInput: {
          macaroon: nodeInput!.invoiceMacaroon,
          tlsCertificate: nodeInput!.tlsCert,
          hostname: nodeInput!.hostname,
          grpcPort: nodeInput!.isVoltage
            ? 10009
            : nodeInput!.grpc
            ? parseInt(nodeInput!.grpc, 10)
            : 0,
          lndNodeType: nodeInput!.isVoltage
            ? LndNodeType.Voltage
            : LndNodeType.Custom,
          pubkey: nodeInput!.publicKey,
        },
        name: nodeInput!.name,
        resourceInput,
      };
    }

    if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
      return {
        lightningAddressConnectionDetailsInput: {
          lightningAddress: lightningAddressFormValue,
        },
        resourceInput,
      };
    }

    return null;
  }, [project, nodeInput, connectionOption, lightningAddressFormValue]);

  const isSubmitEnabled = useMemo(() => {
    if (createWalletInput === null) {
      return false;
    }

    return (
      connectionOption === ConnectionOption.PERSONAL_NODE ||
      (connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
        Boolean(lightningAddressFormValue) === true)
    );
  }, [connectionOption, lightningAddressFormValue, createWalletInput]);

  const handleBackButtonTapped = () => {
    onBackButtonTapped();
  };

  const validateLightningAddress = async () => {
    await validateLightningAddressFormat(lightningAddressFormValue);

    if (lightningAddressFormError === null) {
      await evaluateLightningAddress(lightningAddressFormValue);
    }
  };

  const handleProjectLaunchSelected = async () => {
    await validateLightningAddress();

    onProjectLaunchSelected(createWalletInput!);
  };

  const evaluateLightningAddress = async (lightningAddress: string) => {
    if (lightningAddress.length === 0) {
      return;
    }

    setLnAddressEvaluationState(LNAddressEvaluationState.LOADING);

    const evaluationURL = lightningAddressToEvaluationURL(lightningAddress);

    try {
      const response = await fetch(evaluationURL);

      if (response.ok) {
        setLnAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED);
      } else {
        setLightningAddressFormError(
          'We could not validate this as a working Lightning Address.',
        );
        setLnAddressEvaluationState(LNAddressEvaluationState.FAILED);
      }
    } catch (_) {
      if (
        knownLNURLDomains.some((hostname) => {
          return lightningAddress.endsWith(hostname);
        })
      ) {
        setLnAddressEvaluationState(LNAddressEvaluationState.SUCCEEDED);
      } else {
        setLnAddressEvaluationState(LNAddressEvaluationState.FAILED);
        setLightningAddressFormError(
          'We could not validate this as a working Lightning Address.',
        );
      }
    }
  };

  const validateLightningAddressFormat = async (lightningAddress: string) => {
    if (lightningAddress.length === 0) {
      setLightningAddressFormError(`Lightning Address can't be empty.`);
    }

    if (lightningAddress.endsWith('@geyser.fund')) {
      setLightningAddressFormError(
        `Custom Lightning Addresses can't end with "@geyser.fund".`,
      );
    } else if (validateEmail(lightningAddress) === false) {
      setLightningAddressFormError(
        `Please use a valid email-formatted address for your Lightning Address.`,
      );
      setLightningAddressFormError(null);
    }
  };

  const renderRightElementContent = () => {
    switch (lnAddressEvaluationState) {
      case LNAddressEvaluationState.IDLE:
        return null;
      case LNAddressEvaluationState.LOADING:
        return <Loader size="md"></Loader>;
      case LNAddressEvaluationState.FAILED:
        return <BsFillXCircleFill fill={colors.error} size="24px" />;
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill fill={colors.primary500} size="24px" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(6, 1fr)'
            : isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)'
        }
        padding={isMobile ? '10px' : '40px 40px 20px 40px'}
      >
        <GridItem
          colSpan={isLargerThan1280 ? 2 : 1}
          display="flex"
          justifyContent="flex-start"
        >
          <ButtonComponent
            onClick={handleBackButtonTapped}
            leftIcon={<BiLeftArrowAlt className={classes.backIcon} />}
          >
            Back
          </ButtonComponent>
        </GridItem>

        <GridItem colSpan={2} display="flex" justifyContent="center">
          <VStack
            spacing="30px"
            width="100%"
            maxWidth="400px"
            minWidth="350px"
            marginBottom="40px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <VStack width="100%" spacing="40px" alignItems="flex-start">
              <Text color="brand.gray500" fontSize="30px" fontWeight={700}>
                {' '}
                Create A New Project
              </Text>
              <TitleWithProgressBar
                paddingBottom="20px"
                title="Connect Wallet"
                subTitle="Step 3 of 3"
                percentage={100}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start" spacing="40px">
              <RadioGroup
                onChange={setConnectionOption}
                value={connectionOption}
              >
                <VStack spacing={10}>
                  <VStack width="100%" alignItems="flex-start" spacing={3}>
                    <Radio size="lg" value={ConnectionOption.LIGHTNING_ADDRESS}>
                      Lightning Address
                    </Radio>

                    {connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? (
                      <InputGroup size={'md'}>
                        <TextInputBox
                          name="lightning-address"
                          type={'email'}
                          placeholder={'Enter your Lightning Address'}
                          value={lightningAddressFormValue}
                          onChange={(event) => {
                            setLightningAddressFormValue(event.target.value);
                            validateLightningAddressFormat(event.target.value);
                          }}
                          onBlur={validateLightningAddress}
                          isInvalid={Boolean(lightningAddressFormError)}
                          focusBorderColor={colors.neutral200}
                          _valid={{
                            focusBorderColor: colors.primary500,
                          }}
                          error={lightningAddressFormError}
                        />
                        <InputRightElement>
                          {renderRightElementContent()}
                        </InputRightElement>
                      </InputGroup>
                    ) : null}

                    <WalletConnectionOptionInfoBox
                      primaryText="Easy setup process for beginners, but you trust the wallets with your funds."
                      secondaryText="Lightning Addresses look like email addresses (mick@alby.com) but are for sending bitcoin. Most Lightning wallets provide lightning addresses. We recommend:"
                    >
                      <HStack
                        width={'full'}
                        justifyContent={'flex-start'}
                        spacing={4}
                      >
                        <UndecoratedLink
                          isExternal
                          href={AlbyLightningAddressURL}
                        >
                          <HStack>
                            <Image src={AlbyPNG} height="24px" />
                            <Text fontSize={'12px'} fontWeight={'bold'}>
                              Alby
                            </Text>
                          </HStack>
                        </UndecoratedLink>

                        <Link
                          isExternal
                          href={WalletOfSatoshiLightningAddressURL}
                        >
                          <Image src={WalletOfSatoshiPNG} height="24px" />
                        </Link>

                        <Link isExternal href={BitNobURL}>
                          <Image src={BitNobPNG} height="24px" />
                        </Link>
                      </HStack>
                    </WalletConnectionOptionInfoBox>
                  </VStack>

                  <VStack width="100%" alignItems="flex-start" spacing={3}>
                    <Radio size="lg" value={ConnectionOption.PERSONAL_NODE}>
                      Connect Your Node
                    </Radio>

                    {connectionOption === ConnectionOption.PERSONAL_NODE ? (
                      <ButtonComponent isFullWidth onClick={openWallet}>
                        {' '}
                        <AiOutlineSetting
                          style={{ marginRight: '5px' }}
                          fontSize="20px"
                        />{' '}
                        Connect Your Node
                      </ButtonComponent>
                    ) : null}

                    <WalletConnectionOptionInfoBox
                      primaryText="More challenging to setup, but you own your funds."
                      secondaryText="Connect your Lightning node to receive incoming transactions directly. Don't have a node? You can create a node on the cloud using:"
                    >
                      <HStack width={'full'} justifyContent={'flex-start'}>
                        <Link
                          isExternal
                          href={VoltageExplainerPageForGeyserURL}
                        >
                          <Image src={VoltageLogoSmall} />
                        </Link>
                      </HStack>
                    </WalletConnectionOptionInfoBox>
                  </VStack>
                </VStack>
              </RadioGroup>

              <VStack width="100%" alignItems="flex-start">
                <ButtonComponent
                  primary
                  isFullWidth
                  onClick={handleProjectLaunchSelected}
                  isLoading={
                    isProcessingSubmission ||
                    lnAddressEvaluationState ===
                      LNAddressEvaluationState.LOADING
                  }
                  disabled={isSubmitEnabled === false}
                >
                  <>
                    <BiRocket style={{ marginRight: '10px' }} />
                    Launch Project
                  </>
                </ButtonComponent>

                <ButtonComponent
                  isFullWidth
                  onClick={() => onSaveAsDraftSelected(createWalletInput!)}
                  isLoading={
                    isProcessingSubmission ||
                    lnAddressEvaluationState ===
                      LNAddressEvaluationState.LOADING
                  }
                  disabled={isSubmitEnabled === false}
                >
                  Save As Draft
                </ButtonComponent>

                <HStack color={'brand.neutral600'} spacing={2} mt={2}>
                  <Text>By continuing, I agree with Geysers&apos;s</Text>
                  <Link
                    href={GeyserTermsAndConditionsURL}
                    isExternal
                    textDecoration="underline"
                  >
                    Terms & Conditions
                  </Link>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </GridItem>

        <GridItem colSpan={2} display="flex" justifyContent="center">
          <VStack
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="370px"
            width="100%"
            spacing="10px"
            paddingY="80px"
          >
            {nodeInput && nodeInput.name && (
              <VStack
                width="100%"
                border="1px solid"
                borderColor={colors.gray300}
                borderRadius="4px"
                alignItems="flex-start"
                padding="10px"
              >
                <HStack width="100%" justifyContent="space-between">
                  <Text fontWeight={500}>{nodeInput?.name}</Text>
                  <IconButtonComponent
                    aria-label="edit-node"
                    icon={<BiPencil />}
                    onClick={openWallet}
                  />
                </HStack>

                <VStack width="100%" alignItems="flex-start">
                  <Text color="brand.textGray">Hostname or IP address</Text>
                  <Text>{nodeInput?.hostname}</Text>
                </VStack>
              </VStack>
            )}
          </VStack>
        </GridItem>
      </Grid>

      <NodeAdditionModal
        isOpen={isWalletOpen}
        onClose={onWalletClose}
        nodeInput={nodeInput}
        onSubmit={setNodeInput}
      />
    </>
  );
};
