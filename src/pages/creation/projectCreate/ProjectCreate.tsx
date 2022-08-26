import { Box, HStack, Input, Progress, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FileUpload } from '../../../components/molecules';
import { ButtonComponent, TextArea, TextBox } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import {AiOutlineUpload} from 'react-icons/ai';

export const ProjectCreate = () => {
	const isMobile = isMobileMode();
	console.log('checking somehting');
	return (
		<VStack
			background={'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="400px"
				padding={isMobile ? '0px 10px' : '20px 40px'}
				marginBottom="40px"
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<Box>
					<Text color="#5B5B5B" fontSize="30px" fontWeight={700}> Create a new Project</Text>

				</Box>
				<VStack width="100%">
					<VStack width="100%" alignItems="flex-start">
						<Text color="#5B5B5B">1. Project details</Text>
						<Progress size="sm" colorScheme="green" value={33}/>
						<VStack width="100%" alignItems="flex-start">
							<Text>Project Title</Text>
							<TextBox />
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>Lightening Address Preview</Text>
							<Text>bitcoinracing@geyser.fund</Text>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>Project Image</Text>
							<FileUpload onUploadComplete={() => {}} >
								<HStack backgroundColor="brand.bgGrey" width="100%" height="70px" justifyContent="center" alignItems="center">
									<AiOutlineUpload />
									<Text>Select a header image</Text>
								</HStack>
							</FileUpload>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>Main Objective</Text>
							<TextArea />
						</VStack>

						<VStack width="100%" alignItems="flex-start">
							<Text>Project E-mail</Text>
							<TextBox />
						</VStack>
						<ButtonComponent primary isFullWidth>Next</ButtonComponent>
					</VStack>
				</VStack>

			</VStack>

		</VStack>
	);
};
