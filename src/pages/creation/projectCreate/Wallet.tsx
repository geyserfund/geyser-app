import { Box, Grid, GridItem, HStack, Image, Link, Text, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ButtonComponent, IconButtonComponent} from '../../../components/ui';
import { isMobileMode, useNotification } from '../../../utils';
import {AiOutlineSetting } from 'react-icons/ai';
import { TNodeInput } from './types';
import { BiLeftArrowAlt, BiPencil } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors, VoltageLogoUrl } from '../../../constants';
import { useHistory, useParams } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { AddNode } from './components/AddNode';
import { useMutation } from '@apollo/client';
import { MUTATION_CREATE_POST, MUTATION_CREATE_WALLET } from '../../../graphql/mutations';

const useStyles = createUseStyles({
	backIcon: {
		fontSize: '25px',
	},
});

export const Wallet = () => {
	const isMobile = isMobileMode();
	const classes = useStyles();
	const history = useHistory();
	const params = useParams<{projectId: string}>();

	const {toast} = useNotification();

	const [node, setNode] = useState<TNodeInput>();

	const {isOpen: isWalletOpen, onClose: onWalletClose, onOpen: openWallet} = useDisclosure();

	const [createWallet, {
		loading: createWalletLoading,
	}] = useMutation(MUTATION_CREATE_WALLET);

	const handleBack = () => {
		history.push('/');
	};

	const handleNext = async () => {
		try {
			const createWalletInput = {
				resourceInput: {
					resourceId: params.projectId,
					resourceType: 'project',
				},
				lndConnectionDetailsInput: {
					macaroon: node?.invoiceMacaroon,
					tlsCertificate: node?.tlsCert,
					hostname: node?.hostname,
					grpcPort: node?.grpc ? parseInt(node.grpc, 10) : undefined,
					lndNodeType: node?.isVoltage ? 'voltage' : 'custom',
				},
			};

			await createWallet({variables: {input: createWalletInput}});
		} catch (error) {
			toast({
				title: 'Something went wrong',
				description: `${error}`,
				status: 'error',
			});
		}
	};

	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

	console.log('checking form', node);

	return (
		<Box
			background={'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<Grid width="100%" templateColumns={isLargerThan1280 ? 'repeat(6, 1fr)' : isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)' } padding={isMobile ? '10px' : '40px 40px 20px 40px'} >
				<GridItem colSpan={isLargerThan1280 ? 2 : 1} display="flex" justifyContent="flex-start">
					<ButtonComponent leftIcon={<BiLeftArrowAlt className={classes.backIcon} onClick={handleBack} />}>Back</ButtonComponent>
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
							<Text color="brand.gray500" fontSize="30px" fontWeight={700}> Create a new Project</Text>
							<TitleWithProgressBar
								paddingBottom="20px"
								title="Connect wallet"
								subTitle="Step 3 of 3"
								percentage={100}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start" spacing="40px">
							<VStack width="100%" alignItems="flex-start">
								<Text>
								Connect your node
								</Text>
								<ButtonComponent isFullWidth onClick={openWallet}> <AiOutlineSetting style={{marginRight: '5px'}} fontSize="20px"/> Connect your Node</ButtonComponent>
								<Text fontSize="14px">
									{'Connect your Lightning node if you have one, and the funds will be sent directly to your account at no charge. Don\'t have one? No problem, you can create one in 2 minutes using Voltage.cloud.'}
								</Text>
								<HStack padding="10px" spacing="20px">
									<Image src={VoltageLogoUrl}/>
									<Link isExternal href="https://geyser.fund" fontSize="12px">Get 20% off of a Voltage node by using this referral link.</Link>
								</HStack>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Lightening Wallet</Text>
								<ButtonComponent isFullWidth disabled>Coming Soon</ButtonComponent>
							</VStack>

							<ButtonComponent primary isFullWidth onClick={handleNext} isLoading={createWalletLoading}>Next</ButtonComponent>
						</VStack>

					</VStack>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack justifyContent="flex-start" alignItems="flex-start" maxWidth="370px" width="100%" spacing="10px" paddingY="80px">
						{node && node.name && <VStack
							width="100%"
							border="1px solid"
							borderColor={colors.gray300}
							borderRadius="4px"
							alignItems="flex-start"
							padding="10px"
						>
							<HStack width="100%" justifyContent="space-between">
								<Text fontWeight={500}>{node?.name}</Text>
								<IconButtonComponent aria-label="edit-node" icon={<BiPencil />}/>
							</HStack>

							<VStack width="100%" alignItems="flex-start">
								<Text color="brand.textGray">Hostname or IP address</Text>
								<Text>{node?.hostname}</Text>
							</VStack>

						</VStack>}
					</VStack>
				</GridItem>
			</Grid>
			<AddNode isOpen={isWalletOpen} onClose={onWalletClose} node={node} onSubmit={setNode} />
		</Box>
	);
};
