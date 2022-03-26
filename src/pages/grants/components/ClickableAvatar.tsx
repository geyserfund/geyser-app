import React from 'react';
import { Link, Avatar } from '@chakra-ui/react';

export const ClickableAvatar = ({ url, imageUrl }: { url: string, imageUrl: string }) => (
	<Link href={url} isExternal p={1}>
		<Avatar w={['40px', '60px']} h={['40px', '60px']} src={imageUrl} />
	</Link>
);
