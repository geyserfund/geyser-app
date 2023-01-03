import {
  Box,
  Heading,
  HStack,
  Image,
  Link as LinkChakra,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import SatoshiPng from '../../../assets/satoshi.png';
import { getPath, fonts } from '../../../constants';
import { Project } from '../../../types/generated/graphql';
import { ICard, ProjectStatusLabel } from '../../ui';
import { ProjectImageListItemPlaceholder } from './ProjectImageListItemPlaceholder';
import { getShortAmountLabel } from '../../../utils';
import { Link } from 'react-router-dom';
type Props = ICard & {
  project: Project;
  onClick?: () => void;
};

export const ProjectsGridCard = ({ project, onClick, ...rest }: Props) => {
  return (
    <Link
      to={getPath('project', project.name)}
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
        overflow={'hidden'}
        spacing={2.5}
        _hover={{
          borderColor: 'brand.neutral500',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
        }}
        transition="border-color 0.3s ease-in-out"
        {...rest}
      >
        <LinkChakra
          href={project.image || ''}
          isExternal
          onClick={(event) => event.stopPropagation()}
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
        </LinkChakra>
        <Box paddingX="18px" paddingY={'14px'}>
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
              width="100%"
              mt={6}
              direction={'row'}
              spacing={0}
              align={'flex-end'}
              justifyContent={'space-between'}
            >
              <VStack alignItems={'center'}>
                <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
                  {project.funders.length}
                </Text>

                <Text
                  fontSize="12px"
                  color={'brand.neutral600'}
                  fontFamily={fonts.mono}
                  textTransform="uppercase"
                >
                  funders
                </Text>
              </VStack>

              <VStack alignItems={'center'}>
                <HStack spacing="3px">
                  <Image src={SatoshiPng} height="20px" />
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    fontFamily={fonts.mono}
                  >
                    {getShortAmountLabel(project.balance)}
                  </Text>
                </HStack>
                <Text
                  fontSize="12px"
                  color={'brand.neutral600'}
                  fontFamily={fonts.mono}
                  textTransform="uppercase"
                >
                  Funded
                </Text>
              </VStack>

              <ProjectStatusLabel
                project={project}
                fontFamily={fonts.mono}
                iconSize="20px"
                direction="column"
              />
            </HStack>

            <Text noOfLines={5} textAlign="left" size="sm">
              {project.description}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Link>
  );
};
