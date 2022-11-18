import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { getPath } from '../../../constants';

import { Project } from '../../../types/generated/graphql';
import { ICard, ProjectStatusLabel, SatoshiAmount } from '../../ui';
import { ProjectImageListItemPlaceholder } from './ProjectImageListItemPlaceholder';
type Props = ICard & {
  project: Project;
  onClick?: () => void;
};

// TODO: Figure out how this is supposed to differ from `ProjectCard`.
// (It's possible this could replace `ProjectCard`)

export const ProjectsGridCard = ({ project, onClick, ...rest }: Props) => {
  const history = useHistory();

  const handleClick =
    onClick ||
    (() => {
      history.push(getPath('project', project.name));
    });

  return (
    <a
      href={getPath('project', project.name)}
      style={{ textDecoration: 'none' }}
    >
      <Box
        width={'full'}
        maxWidth={'284px'}
        bg={useColorModeValue('white', 'gray.900')}
        borderWidth="3px"
        cursor="pointer"
        borderColor={'brand.neutral300'}
        rounded={'md'}
        _hover={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)' }}
        overflow={'hidden'}
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
            src={project.image || ''}
            width="full"
            height="full"
            fallback={<ProjectImageListItemPlaceholder padding="3em" />}
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

            <HStack
              mt={6}
              direction={'row'}
              spacing={0}
              align={'center'}
              alignSelf="center"
            >
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
                <SatoshiAmount fontWeight={600}>
                  {project.balance}
                </SatoshiAmount>

                <Text
                  fontSize={'xs'}
                  color={'brand.neutral600'}
                  fontFamily={'mono'}
                  textTransform="uppercase"
                >
                  Funded
                </Text>
              </VStack>

              <ProjectStatusLabel project={project} paddingX={2} />
            </HStack>

            <Text noOfLines={5} textAlign="left" size="sm">
              {project.description}
            </Text>
          </VStack>
        </Box>
      </Box>
    </a>
  );
};
