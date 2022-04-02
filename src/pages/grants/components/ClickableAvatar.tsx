import React from 'react';
import { Link, Avatar, Tooltip } from '@chakra-ui/react';

const ClickableAvatar = ({ comment, amount, url, imageUrl }: { url: string, imageUrl: string, amount: number | undefined, comment: string | undefined }) => {
	if (comment || amount) {
		let label = '';

		if (comment) {
			label += `"${comment}"`;
		}

		if (amount) {
			label += ` ${amount} sats`;
		}

		return (
			<Tooltip label={label} placement="top" bg="brand.bgGrey" color="black" borderRadius="full" hasArrow py={2}>
				<Link href={url} isExternal p={1}>
					<Avatar w={['40px', '60px']} h={['40px', '60px']} src={imageUrl} m={1} />
				</Link>
			</Tooltip>
		);
	}

	return (
		<Link href={url} isExternal p={1}>
			<Avatar w={['40px', '60px']} h={['40px', '60px']} src={imageUrl} m={1} />
		</Link>
	);
};

export const MemoizedClickableAvatar = React.memo(ClickableAvatar);
