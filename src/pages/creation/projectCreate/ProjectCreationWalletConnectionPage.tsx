import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  ButtonComponent,
  IconButtonComponent,
  TextBox,
} from '../../../components/ui';
import { isMobileMode, useNotification } from '../../../utils';
import { AiOutlineSetting } from 'react-icons/ai';
import { TNodeInput } from './types';
import { BiLeftArrowAlt, BiPencil, BiRocket } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import {
  AlbyLightningAddressURL,
  BitNobLightningAddressURL,
  colors,
  getPath,
  GeyserTermsAndConditionsURL,
  VoltageExplainerPageForGeyserURL,
  WalletOfSatoshiLightningAddressURL,
} from '../../../constants';
import { useHistory, useParams } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { NodeAdditionModal } from './components/NodeAdditionModal';
import { useMutation, useQuery } from '@apollo/client';
import {
  MUTATION_CREATE_WALLET,
  MUTATION_UPDATE_PROJECT,
} from '../../../graphql/mutations';
import { QUERY_PROJECT_BY_NAME } from '../../../graphql';
import VoltageLogoSmall from '../../../assets/voltage-logo-small.svg';
import { WalletConnectionOptionInfoBox } from './components';

const useStyles = createUseStyles({
  backIcon: {
    fontSize: '25px',
  },
});

enum ConnectionOption {
  LIGHTNING_ADDRESS = 'LIGHTNING_ADDRESS',
  PERSONAL_NODE = 'PERSONAL_NODE',
}

export const ProjectCreationWalletConnectionPage = () => {
  const isMobile = isMobileMode();
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<{ projectId: string }>();

  const { toast } = useNotification();

  const [node, setNode] = useState<TNodeInput>();

  const [hasAcceptedTermsAndConditions, setHasAcceptedTermsAndConditions] =
    useBoolean(false);

  const [isUsingLightningAddress, setIsUsingLightningAddress] =
    useBoolean(false);

  const [isUsingPersonalNode, setIsUsingPersonalNode] = useBoolean(false);

  const [connectionOption, setConnectionOption] = useState<string>('');

  const {
    isOpen: isWalletOpen,
    onClose: onWalletClose,
    onOpen: openWallet,
  } = useDisclosure();

  const [createWallet, { loading: createWalletLoading }] = useMutation(
    MUTATION_CREATE_WALLET,
  );

  const [updateProject, { loading: updateProjectLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT,
    {
      onError(error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        });
      },
    },
  );

  const { loading, data: projectData } = useQuery(QUERY_PROJECT_BY_NAME, {
    variables: { where: { id: params.projectId } },
    onError() {
      toast({
        title: 'Error fetching project',
        status: 'error',
      });
    },
  });

  const handleBackButtonTapped = () => {
    history.push(
      getPath('launchProjectWithMilestonesAndRewards', params.projectId),
    );
  };

  const handleNextButtonTapped = async () => {
    if (node?.name) {
      try {
        const createWalletInput = {
          resourceInput: {
            resourceId: projectData?.project?.id,
            resourceType: 'project',
          },
          lndConnectionDetailsInput: {
            macaroon: node?.invoiceMacaroon,
            tlsCertificate: node?.tlsCert,
            hostname: node?.hostname,
            grpcPort: node?.isVoltage
              ? 10009
              : node?.grpc
              ? parseInt(node.grpc, 10)
              : '',
            lndNodeType: node?.isVoltage ? 'voltage' : 'custom',
            pubkey: node?.publicKey,
          },
        };

        await createWallet({ variables: { input: createWalletInput } });

        history.push(`/project/${projectData.project.name}`);
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        });
      }
    } else {
      try {
        await updateProject({
          variables: {
            input: {
              projectId: projectData?.project?.id,
              draft: false,
            },
          },
        });
        history.push(`/project/${projectData.project.name}`);
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        });
      }
    }
  };

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  return (
    <Box
      background={'brand.bgGrey4'}
      position="relative"
      paddingTop="60px"
      height="100%"
      justifyContent="space-between"
    >
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
                title="Connect wallet"
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
                    <Radio
                      size="lg"
                      colorScheme="green"
                      value={ConnectionOption.LIGHTNING_ADDRESS}
                    >
                      <Text>Lightning Address</Text>
                    </Radio>

                    {connectionOption === ConnectionOption.LIGHTNING_ADDRESS ? (
                      <TextBox name="lightning-address" type={'email'} />
                    ) : null}

                    <WalletConnectionOptionInfoBox
                      primaryText="Easy setup process for beginners, but you trust the wallets with your funds."
                      secondaryText="Lightning Addresses look like email addresses (mick@alby.com) but are for sending bitcoin. Most Lightning wallets provide lightning addresses. We recommend:"
                    >
                      <HStack width={'full'} justifyContent={'flex-start'}>
                        <Link isExternal href={AlbyLightningAddressURL}>
                          <HStack>
                            <Image
                              src={
                                '../../../assets/images/third-party-icons/alby.png'
                              }
                            />
                            <Text>Alby</Text>
                          </HStack>
                        </Link>

                        <Link
                          isExternal
                          href={WalletOfSatoshiLightningAddressURL}
                        >
                          <Image
                            src={
                              '../../../assets/images/third-party-icons/wallet-of-satoshi.png'
                            }
                          />
                        </Link>

                        <Link isExternal href={BitNobLightningAddressURL}>
                          <Image
                            src={
                              '../../../assets/images/third-party-icons/bitnob.png'
                            }
                          />
                        </Link>
                      </HStack>
                    </WalletConnectionOptionInfoBox>
                  </VStack>

                  <VStack width="100%" alignItems="flex-start" spacing={3}>
                    <Radio
                      size="lg"
                      colorScheme="green"
                      value={ConnectionOption.PERSONAL_NODE}
                    >
                      <Text>Connect Your Node</Text>
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

              {/* <VStack width="100%" alignItems="flex-start">
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  isChecked={isUsingLightningAddress}
                  onChange={setIsUsingLightningAddress.toggle}
                >
                  <Text>Lightning Address</Text>
                </Checkbox>

                {isUsingLightningAddress ? (
                  <TextBox
                    name="lightning-address"
                    type={'email'}
                    // onChange={handleTextChange}
                    // value={form.name}
                    // error={formError.name}
                  />
                ) : null}

                <WalletConnectionOptionInfoBox
                  primaryText="Easy setup process for beginners, but you trust the wallets with your funds."
                  secondaryText="Lightning Addresses look like email addresses (mick@alby.com) but are for sending bitcoin. Most Lightning wallets provide lightning addresses. We recommend:"
                >
                  <Text>Link 1</Text>
                  <Text>Link 2</Text>
                  <Text>Link 3</Text>
                </WalletConnectionOptionInfoBox>
              </VStack>

              <VStack width="100%" alignItems="flex-start">
                <Text>Connect Your Node</Text>

                <ButtonComponent isFullWidth onClick={openWallet}>
                  {' '}
                  <AiOutlineSetting
                    style={{ marginRight: '5px' }}
                    fontSize="20px"
                  />{' '}
                  Connect Your Node
                </ButtonComponent>

                <Text fontSize="14px">
                  {
                    "Connect your Lightning node if you have one, and the funds will be sent directly to your account at no charge. If you don't have one yet, don't worry, you can add this later in the Admin Dashboard."
                  }
                </Text>

                <HStack padding="10px" spacing="20px">
                  <Image src={VoltageLogoSmall} />
                  <Link
                    isExternal
                    href="https://voltage.cloud/geyser"
                    fontSize="12px"
                  >
                    Create a node quick and easy with Voltage.
                  </Link>
                </HStack>
              </VStack> */}

              <VStack width="100%" alignItems="flex-start">
                {node?.name && (
                  <Checkbox
                    checked={hasAcceptedTermsAndConditions}
                    onChange={setHasAcceptedTermsAndConditions.toggle}
                  >
                    I agree with geysers&apos;s{' '}
                    <Link
                      href={GeyserTermsAndConditionsURL}
                      isExternal
                      textDecoration="underline"
                    >
                      Terms & Conditions
                    </Link>
                  </Checkbox>
                )}

                <ButtonComponent
                  primary
                  isFullWidth
                  onClick={handleNextButtonTapped}
                  isLoading={createWalletLoading || updateProjectLoading}
                  disabled={
                    Boolean(node?.name) && !hasAcceptedTermsAndConditions
                  }
                >
                  {node?.name ? (
                    <>
                      <BiRocket style={{ marginRight: '10px' }} />
                      Launch Project
                    </>
                  ) : (
                    <>Skip for now</>
                  )}
                </ButtonComponent>
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
            {node && node.name && (
              <VStack
                width="100%"
                border="1px solid"
                borderColor={colors.gray300}
                borderRadius="4px"
                alignItems="flex-start"
                padding="10px"
              >
                <HStack width="100%" justifyContent="space-between">
                  <Text fontWeight={500}>{node?.name}</Text>
                  <IconButtonComponent
                    aria-label="edit-node"
                    icon={<BiPencil />}
                    onClick={openWallet}
                  />
                </HStack>

                <VStack width="100%" alignItems="flex-start">
                  <Text color="brand.textGray">Hostname or IP address</Text>
                  <Text>{node?.hostname}</Text>
                </VStack>
              </VStack>
            )}
          </VStack>
        </GridItem>
      </Grid>

      <NodeAdditionModal
        isOpen={isWalletOpen}
        onClose={onWalletClose}
        node={node}
        onSubmit={setNode}
      />
    </Box>
  );
};
