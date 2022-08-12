import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { MUTATION_UNLINK_ACCOUNT } from '../../graphql';
import { ExternalAccountComponent } from '../ui';
import { SiTwitter } from 'react-icons/si';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuthContext } from '../../context';
import { useNotification } from '../../utils';

interface IAccountConnection {
    id: number
  username: string,
  icon: any,
  manage?: boolean
}

const DisconnectAccount = ({ id, icon, username }: IAccountConnection) => {
	const { setUser } = useAuthContext();
	const { toast } = useNotification();
	const [unlinkAccount, {
		data, loading: unlinkLoading, error,
	}] = useMutation(MUTATION_UNLINK_ACCOUNT);

	const handleAccountDisconnect = async () => {
		try {
			await unlinkAccount({ variables: { id }});
		} catch (_) {
		}
	};

	useEffect(() => {
		if (error) {
			toast({
				title: 'Failed to unlink account',
				description: `${error.message}`,
				status: 'error',
			});
		}
	}, [error]);

	useEffect(() => {
		if (data && !unlinkLoading) {
			setUser(data.unlinkExternalAccount);
		}
	}, [data]);

	return (
		<HStack w="100%" spacing="25px" my={5} key={id} justifyContent="center" alignItems="center">
			<ExternalAccountComponent icon={icon} username={username} w="100%"/>
			<IconButton
				size="sm"
				background={'none'}
				aria-label="disconnect"
				icon={<SmallCloseIcon fontSize="20px"/>}
				onClick={handleAccountDisconnect}
			/>
		</HStack>
	);
};

export const DisconnectAccounts = () => {
	const { user } = useAuthContext();
	const twitterAccount = user.externalAccounts.find(account => account.type === 'twitter');
	const lnurlAccounts = user.externalAccounts.filter(account => account.type === 'lnurl');

	return (
		<Box justifyContent="center" alignItems="center">
			<Text fontSize="md" color="brand.textGrey2" fontWeight="bold" mt={4} mb={1}>Disconnect</Text>
			<Text color="brand.textGrey2">Disconnect accounts you&apos;re logged into.</Text>
			{lnurlAccounts.map(account => (
				<DisconnectAccount key={account.id} id={account.id} username={account.externalUsername} icon={BsLightningChargeFill}/>
			))}
			{ twitterAccount && <DisconnectAccount key={twitterAccount.id} id={twitterAccount.id} username={twitterAccount.externalUsername} icon={SiTwitter}/>}
		</Box>
	);
};
