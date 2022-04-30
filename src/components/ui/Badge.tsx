import { Box, Text, HStack, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';

export const Badge = ({ badge }: { badge: string }) => {
	const [hover, setHover] = useState(false);
	return (
		<Box position="relative" as="span" backgroundColor="brand.bgGold" padding="0px 8px" borderRadius="20px" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			{hover
&& <>
	<Box position="absolute" top="-160px" left="-164px" p={5} zIndex={2} bg="black" rounded="lg">
		<Text color="white" textAlign="center" fontWeight="bold" fontSize="lg">Emoji badges</Text>
		<HStack mt={3}>
			<VStack rounded="lg" bg="#131313" py={1} px={6}>
				<Box>
					🏅
				</Box>
				<Text color="white" fontWeight="bold">$10</Text>
			</VStack>
			<VStack rounded="lg" bg="#131313" py={1} px={5}>
				<Box>
					🏆
				</Box>
				<Text color="white" fontWeight="bold">$100</Text>
			</VStack>
			<VStack rounded="lg" bg="#131313" py={1} px={5}>
				<Box>
					👑
				</Box>
				<Text color="white" fontWeight="bold">$300</Text>
			</VStack>
			<VStack rounded="lg" bg="#131313" py={1} px={5}>
				<Box>
					⭐
				</Box>
				<Text color="white" fontWeight="bold">$500</Text>
			</VStack>
		</HStack>
	</Box>
	<Box position="absolute" top="-25px" left="-5px" zIndex={2} borderLeft="20px solid transparent" borderRight="20px solid transparent" borderTop="20px solid black"/>
</>
			}
			<Text fontSize="10px">{badge}</Text>
		</Box>
	);
};

export default Badge;
