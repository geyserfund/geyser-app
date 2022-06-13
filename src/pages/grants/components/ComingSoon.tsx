import React, { useState } from 'react';
import { Box, Text, Image, HStack, Skeleton } from '@chakra-ui/react';
import { isMobileMode } from '../../../utils';
import { SatoshiIcon } from '../../../components/icons';

interface ComingSoonProps {
image: string,
number: string,
title: string,
marginRight?: boolean,
}

export const ComingSoon = ({image, number, title, marginRight}:ComingSoonProps) => {
	const isMobile = isMobileMode();
	const [imageLoad, setImageLoad] = useState(false);
	return (

		<Box backgroundColor="white" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" rounded="md" my={10} mr={marginRight ? isMobile ? 10 : 20 : 0}>

			<Box w={isMobile ? '275px' : '400px'}>
				<Skeleton isLoaded={imageLoad}>
					<Image w={isMobile ? '275px' : '400px'} h={isMobile ? '275px' : '400px'} loading="eager" onLoad={() => setImageLoad(true)} objectFit="cover" opacity={0.5} src={image} alt="grant" />
					<Box p={2}>
						<Text fontWeight="bold" fontSize="3xl" opacity={0.5}>{title}</Text>
						<Text fontSize="xs" fontWeight="medium" color="#6E6E6E" opacity={0.5}>ROUND {number}: COMING SOON</Text>

						<HStack justifyContent="space-around" alignItems="center" my={3} opacity={0.5}>

							<Box>
								<HStack justifyContent="center">
									<SatoshiIcon scale={0.8} /><Text fontWeight="bold" fontSize="lg">{(0 / 1000000).toFixed(1)} M</Text>
								</HStack>
								<Text fontSize="sm" color="#5B5B5B" fontWeight="medium">CONTRIBUTED</Text>
							</Box>

							<Box>
								<HStack justifyContent="center">
									<SatoshiIcon scale={0.8} /><Text fontWeight="bold" fontSize="lg">{(0 / 1000000).toFixed(1)} M</Text>
								</HStack>
								<Text fontSize="sm" color="#5B5B5B" fontWeight="medium">DISTRIBUTED</Text>
							</Box>

						</HStack>

					</Box>
				</Skeleton>
			</Box>

		</Box>

	);
};
