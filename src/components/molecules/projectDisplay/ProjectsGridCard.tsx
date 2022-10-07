import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router';

import { IProject } from '../../../interfaces';
import { ICard, SatoshiAmount } from '../../ui';
import { ProjectImageListItemPlaceholder } from './ProjectImageListItemPlaceholder';

type Props = ICard & {
  project: IProject;
  onClick?: () => void;
};

// TODO: Figure out how this is supposed to differ from `ProjectCard`.
// (It's possible this could replace `ProjectCard`)

export const ProjectsGridCard = ({ project, onClick, ...rest }: Props) => {
  const history = useHistory();

  const handleClick =
    onClick ||
    (() => {
      history.push(`/project/${project.name}`);
    });

  return (
    <Box
      width={'full'}
      minWidth="284px"
      bg={useColorModeValue('white', 'gray.900')}
      borderWidth="3px"
      borderColor={'brand.neutral300'}
      rounded={'md'}
      overflow={'hidden'}
      onClick={handleClick}
      spacing={2.5}
      {...rest}
    >
      <Box
        height={'202px'}
        width="full"
        bg={'gray.100'}
        pos={'relative'}
        display="flex"
        justifyContent={'center'}
        alignItems="center"
      >
        <Image
          src={project.image}
          width="full"
          height="full"
          fallback={<ProjectImageListItemPlaceholder size="42%" />}
          objectFit="cover"
        />
      </Box>

      <Box paddingX={6} paddingY={4}>
        <VStack spacing={4} alignItems="flex-start">
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            noOfLines={1}
          >
            {project.title}
          </Heading>

          <HStack mt={6} direction={'row'} spacing={0} align={'center'}>
            <VStack spacing={0.25} align={'center'} paddingX={2}>
              <Text fontWeight={600}>{project.funders.length}</Text>

              <Text
                fontSize={'xs'}
                color={'brand.neutral600'}
                fontFamily={'mono'}
                textTransform="uppercase"
              >
                Contributors
              </Text>
            </VStack>

            <VStack spacing={0.25} align={'center'} paddingX={2}>
              <SatoshiAmount fontWeight={600}>{project.balance}</SatoshiAmount>

              <Text
                fontSize={'xs'}
                color={'brand.neutral600'}
                fontFamily={'mono'}
                textTransform="uppercase"
              >
                Funded
              </Text>
            </VStack>

            {project.active ? (
              // TODO: Make a "badge" component out of this
              // instead of duplicating the logic
              <HStack paddingX={2}>
                <Icon color="brand.primary500" as={BsFillCheckCircleFill} />

                <Text
                  fontSize="12px"
                  color="brand.primary800"
                  textTransform="uppercase"
                >
                  Running
                </Text>
              </HStack>
            ) : (
              <HStack paddingX={2}>
                <Icon color="brand.neutral500" as={BsXCircleFill} />

                <Text
                  fontSize="12px"
                  color="brand.neutral500"
                  textTransform="uppercase"
                >
                  Inactive
                </Text>
              </HStack>
            )}
          </HStack>

          <Text as={'caption'} noOfLines={5} textAlign="left">
            {project.description}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};
