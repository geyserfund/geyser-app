import React from 'react';
import { Box, Text, Avatar, Link } from '@chakra-ui/react';
import {
  bradUrl,
  conorUrl,
  cryptoUrl,
  desUrl,
  lucasUrl,
  princeUrl,
  zuccoUrl,
} from '../../../constants';

interface BoardMemberProps {
  image: string;
  name: string;
  link: string;
  handle: string;
}

const BoardMember = ({ image, name, link, handle }: BoardMemberProps) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    p={2}
    mx={2}
    mt={4}
    width="200px"
    height="200px"
    rounded="md"
    _hover={{
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
    }}
    boxShadow="rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px"
    transition="box-shadow 0.3s ease-in-out"
  >
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Avatar size="xl" src={image} />
      </Box>
      <Text mt={4} mb={1} fontSize="lg" fontWeight="bold" textAlign="center">
        {name}
      </Text>
      <Box display="flex" justifyContent="center">
        <Link
          _hover={{ textDecoration: 'none' }}
          isExternal
          href={link}
          color="#4C9AF4"
        >
          @{handle}
        </Link>
      </Box>
    </Box>
  </Box>
);

const boardMembers = [
  {
    name: 'Brad Mills',
    handle: 'bradmillscan',
    link: 'https://twitter.com/bradmillscan',
    image: bradUrl,
  },
  {
    name: 'Giacomo von Zucco',
    handle: 'giacomozucco',
    link: 'https://twitter.com/giacomozucco',
    image: zuccoUrl,
  },
  {
    name: 'Lucas Ferreira',
    handle: 'lucasdcf',
    link: 'https://twitter.com/lucasdcf',
    image: lucasUrl,
  },
  {
    name: 'Conor Okus',
    handle: 'ConorOkus',
    link: 'https://twitter.com/ConorOkus',
    image: conorUrl,
  },
  {
    name: 'Desiree Dickerson',
    handle: 'dickerson_des',
    link: 'https://twitter.com/dickerson_des',
    image: desUrl,
  },
  {
    name: 'Daniel Prince',
    handle: 'PrinceySOV',
    link: 'https://twitter.com/PrinceySOV',
    image: princeUrl,
  },
  {
    name: 'cryptograffiti',
    handle: 'cryptograffiti',
    link: 'https://twitter.com/cryptograffiti',
    image: cryptoUrl,
  },
];

export const Board = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexWrap="wrap"
  >
    {boardMembers.map((member: BoardMemberProps) => (
      <BoardMember
        key={member.handle}
        image={member.image}
        name={member.name}
        link={member.link}
        handle={member.handle}
      />
    ))}

    {/*	<Box display="flex" justifyContent="center" alignItems="center" p={2} mx={2} mt={4} width="200px" height="200px" rounded="md" _hover={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px'}} boxShadow="rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px" transition="box-shadow 0.3s ease-in-out">
			<Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Avatar size="xl" src="" bg="brand.bgGrey3" />
				</Box>
				<Box mt={4} mb={1} h="43px" w="111px" bg="brand.bgGrey3" borderRadius="md" />
			</Box>
		</Box> */}
  </Box>
);
