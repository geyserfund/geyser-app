import { useMutation } from '@apollo/client';
import {
  HStack,
  Text,
  useDisclosure,
  VStack,
  GridItem,
  Image,
  Link,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import VoltageLogoSmall from '../../assets/voltage-logo-small.svg';
import { BiPencil } from 'react-icons/bi';
import { ButtonComponent, IconButtonComponent } from '../../components/ui';
import { colors } from '../../constants';
import { MUTATION_CREATE_WALLET } from '../../graphql/mutations';
import { IProject } from '../../interfaces';
import { useNotification } from '../../utils';
import { TNodeInput } from '../creation/projectCreate/types';
import { NodeAdditionModal } from '../creation/projectCreate/components/NodeAdditionModal';
import {
  LightningAddressConnectionDetails,
  Wallet,
} from '../../types/generated/graphql';
import { ProjectFundingSettingsLightningAddressView } from './ProjectFundingSettingsLightningAddressView';

export const ProjectFundingSettings = ({ project }: { project: IProject }) => {
  const { toast } = useNotification();
  const [nodeData, setNodeData] = useState<TNodeInput>();

  const {
    isOpen: isWalletOpen,
    onClose: onWalletClose,
    onOpen: openWallet,
  } = useDisclosure();

  const [createWallet, { loading: createWalletLoading }] = useMutation(
    MUTATION_CREATE_WALLET,
  );

  const handleNext = async () => {
    try {
      const createWalletInput = {
        resourceInput: {
          resourceId: project.id,
          resourceType: 'project',
        },
        lndConnectionDetailsInput: {
          macaroon: nodeData?.invoiceMacaroon,
          tlsCertificate: nodeData?.tlsCert,
          hostname: nodeData?.hostname,
          grpcPort: nodeData?.isVoltage
            ? 10009
            : nodeData?.grpc
            ? parseInt(nodeData.grpc, 10)
            : '',
          lndNodeType: nodeData?.isVoltage ? 'voltage' : 'custom',
          pubkey: nodeData?.publicKey,
        },
      };

      await createWallet({ variables: { input: createWalletInput } });
      toast({
        title: 'Successfully update node information.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      });
    }
  };

  // const node = project.wallets && project.wallets[0];

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project.wallets && project.wallets[0];
  }, [project.wallets]);

  const projectLightningAddress: string | undefined = useMemo(() => {
    project.wallets?.forEach((wallet: Wallet) => {
      if (wallet.connectionDetails as LightningAddressConnectionDetails) {
        return (wallet.connectionDetails as LightningAddressConnectionDetails)
          .lightningAddress;
      }
    });

    return undefined;
  }, [project.wallets]);

  if (projectLightningAddress) {
    return (
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <ProjectFundingSettingsLightningAddressView
          lightningAddress={projectLightningAddress}
        />
      </GridItem>
    );
  }

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="400px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack w="100%" spacing="40px">
            {!projectWallet && (
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
                    "Connect your Lightning node if you have one, and the funds will be sent directly to your account at no charge. Don't have one? No problem, you can create one in 2 minutes using Voltage.cloud."
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
                <ButtonComponent
                  primary
                  isFullWidth
                  onClick={handleNext}
                  isLoading={createWalletLoading}
                >
                  Save
                </ButtonComponent>
              </VStack>
            )}
            {nodeData && (
              <VStack
                justifyContent="flex-start"
                alignItems="flex-start"
                maxWidth="370px"
                width="100%"
                spacing="10px"
                paddingY="80px"
              >
                {projectWallet && projectWallet.name && (
                  <VStack
                    width="100%"
                    border="1px solid"
                    borderColor={colors.gray300}
                    borderRadius="4px"
                    alignItems="flex-start"
                    padding="10px"
                  >
                    <HStack width="100%" justifyContent="space-between">
                      <Text fontWeight={500}>{projectWallet?.name}</Text>
                      <IconButtonComponent
                        aria-label="edit-node"
                        icon={<BiPencil />}
                        onClick={openWallet}
                      />
                    </HStack>

                    <VStack width="100%" alignItems="flex-start">
                      <Text color="brand.textGray">Hostname or IP address</Text>
                      <Text>{nodeData?.hostname}</Text>
                    </VStack>
                  </VStack>
                )}
              </VStack>
            )}
            {projectWallet && projectWallet.name && (
              <>
                <VStack
                  width="100%"
                  border="1px solid"
                  borderColor={colors.gray300}
                  borderRadius="4px"
                  alignItems="flex-start"
                  padding="10px"
                >
                  <HStack width="100%" justifyContent="space-between">
                    <Text fontWeight={500}>{projectWallet?.name}</Text>
                  </HStack>

                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">Hostname or IP address</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {projectWallet?.connectionDetails.hostname}
                    </Text>
                  </VStack>

                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">Public key</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {projectWallet?.connectionDetails.pubkey}
                    </Text>
                  </VStack>
                  <VStack width="100%" alignItems="flex-start" flexWrap="wrap">
                    <Text color="brand.neutral700">Invoice Macaroon</Text>
                    <Text wordBreak="break-all">
                      {projectWallet?.connectionDetails.macaroon}
                    </Text>
                  </VStack>
                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">TLS certificate</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {projectWallet?.connectionDetails.tlsCertificate}
                    </Text>
                  </VStack>
                  <VStack width="100%" alignItems="flex-start">
                    <Text color="brand.neutral700">gRPC port</Text>
                    <Text
                      wordBreak="break-all"
                      color="brand.neutral700"
                      fontSize="12px"
                    >
                      {projectWallet?.connectionDetails.grpcPort}
                    </Text>
                  </VStack>
                </VStack>
                <Text color="brand.neutral700" fontSize="10px">
                  If you want to change your node reach out to hello@geyser.fund
                </Text>
              </>
            )}
          </VStack>
        </VStack>
      </GridItem>

      <NodeAdditionModal
        isOpen={isWalletOpen}
        onClose={onWalletClose}
        node={nodeData}
        onSubmit={setNodeData}
      />
    </>
  );
};
