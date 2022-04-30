import { Box, Text, HStack, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';

export const Badge = ({ badge }: { badge: string }) => {
	const [hover, setHover] = useState(false);
	return (
		<Box position="relative" as="span" backgroundColor="brand.bgGold" padding="0px 8px" borderRadius="20px" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			{hover
&& <>
	<Box position="absolute" top="-85px" left="-93px" p={2} zIndex={2} bg="#5B5B5B" rounded="lg">
		<Text color="white" fontWeight="bold" fontSize="10px">Emoji badges</Text>
		<HStack mt={1}>
			<VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
				<Box>
					🏅
				</Box>
				<Text color="white" fontSize="8px">$10</Text>
			</VStack>
			<VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
				<Box>
					🏆
				</Box>
				<Text color="white" fontSize="8px">$100</Text>
			</VStack>
			<VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
				<Box>
					👑
				</Box>
				<Text color="white" fontSize="8px">$300</Text>
			</VStack>
			<VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
				<Box>
					⭐
				</Box>
				<Text color="white" fontSize="8px">$500</Text>
			</VStack>
		</HStack>
	</Box>
	<Box position="absolute" top="-24px" left="-5px" zIndex={1} borderLeft="20px solid transparent" borderRight="20px solid transparent" borderTop="20px solid #5B5B5B"/>
</>
			}
			<Text fontSize="10px">{badge}</Text>
		</Box>
	);
};

export default Badge;
