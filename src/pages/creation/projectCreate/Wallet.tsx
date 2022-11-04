import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ButtonComponent, IconButtonComponent } from '../../../components/ui';
import { isMobileMode, useNotification } from '../../../utils';
import { AiOutlineSetting } from 'react-icons/ai';
import { TNodeInput } from './types';
import { BiLeftArrowAlt, BiPencil, BiRocket } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors, GeyserTermsAndConditionsURL } from '../../../constants';
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
const useStyles = createUseStyles({
  backIcon: {
    fontSize: '25px',
  },
});

export const Wallet = () => {
  const isMobile = isMobileMode();
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<{ projectId: string }>();

  const { toast } = useNotification();

  const [node, setNode] = useState<TNodeInput>();
  const [tc, setTc] = useState(false);

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

  const handleBack = () => {
    history.push(`/launch/${params.projectId}/milestones`);
  };

  const handleNext = async () => {
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

  const handleTC = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setTc(event.target.checked);
    }
  };

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
            onClick={handleBack}
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
                Create a new Project
              </Text>
              <TitleWithProgressBar
                paddingBottom="20px"
                title="Connect wallet"
                subTitle="Step 3 of 3"
                percentage={100}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start" spacing="40px">
              <VStack width="100%" alignItems="flex-start">
                <Text>Connect your node</Text>
                <ButtonComponent isFullWidth onClick={openWallet}>
                  {' '}
                  <AiOutlineSetting
                    style={{ marginRight: '5px' }}
                    fontSize="20px"
                  />{' '}
                  Connect your Node
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
              </VStack>

              <VStack width="100%" alignItems="flex-start">
                <Text>Lightning Wallet</Text>
                <ButtonComponent isFullWidth disabled>
                  Coming Soon
                </ButtonComponent>
              </VStack>

              <VStack width="100%" alignItems="flex-start">
                {node?.name && (
                  <Checkbox checked={tc} onChange={handleTC}>
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
                  onClick={handleNext}
                  isLoading={createWalletLoading || updateProjectLoading}
                  disabled={Boolean(node?.name) && !tc}
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
