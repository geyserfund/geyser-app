import React from 'react';
import { Box, Text, Avatar, Link } from '@chakra-ui/react';
import Brad from '../../../assets/brad.png';
import Zucco from '../../../assets/zucco.jpg';
import Lucas from '../../../assets/lucas.jpg';

interface BoardMemberProps {
image: string,
name: string,
link: string,
handle: string,
}

const BoardMember = ({image, name, link, handle}:BoardMemberProps) => (
	<Box display="flex" justifyContent="center" alignItems="center" p={2} mx={2} mt={4} width="200px" height="200px" rounded="md" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" _hover={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)'}}>
		<Box>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Avatar size="xl" src={image}/>
			</Box>
			<Text mt={4} mb={1} fontSize="lg" fontWeight="bold" textAlign="center">{name}</Text>
			<Box display="flex" justifyContent="center">
				<Link _hover={{textDecoration: 'none'}} isExternal href={link} color="#4C9AF4">@{handle}</Link>
			</Box>
		</Box>
	</Box>
);

const boardMembers = [{name: 'Brad Mills', handle: 'bradmillscan', link: 'https://twitter.com/bradmillsca', image: Brad}, {name: 'Giacomo von Zucco', handle: 'giacomozucco', link: 'https://twitter.com/giacomozucco', image: Zucco}, {name: 'Lucas Ferreira', handle: 'lucasdcf', link: 'https://twitter.com/lucasdcf', image: Lucas}];

export const Board = () => (
	<Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">

		{boardMembers.map((member:BoardMemberProps) => <BoardMember key={member.handle} image={member.image} name={member.name} link={member.link} handle={member.handle}/>)}

		<Box display="flex" justifyContent="center" alignItems="center" p={2} mx={2} mt={4} width="200px" height="200px" rounded="md" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)" _hover={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)'}}>
			<Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Avatar size="xl" src="" bg="brand.bgGrey3" />
				</Box>
				<Box mt={4} mb={1} h="43px" w="111px" bg="brand.bgGrey3" borderRadius="md" />
			</Box>
		</Box>

	</Box>
);
