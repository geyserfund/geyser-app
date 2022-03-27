import React from 'react';
import { Link, Avatar, Tooltip } from '@chakra-ui/react';

export const ClickableAvatar = ({ url, imageUrl, amount, comment }: { url: string, imageUrl: string, amount: string, comment: string }) => (

	<Tooltip label={comment ? `Amount: ${amount} sat Comment: ${comment}` : `Amount: ${amount} sat`} placement="top" bg="brand.bgGrey" color="black" borderRadius="base" hasArrow py={2}>
		<Link href={url} isExternal p={1}>
			<Avatar w={['40px', '60px']} h={['40px', '60px']} src={imageUrl} />
		</Link>
	</Tooltip>
);
