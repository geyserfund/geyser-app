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

export const ProjectsGridCard = ({ project, onClick, ...rest }: Props) => {
  const history = useHistory();

  const handleClick =
    onClick ||
    (() => {
      history.push(getPath('project', project.name));
    });

  return (
    <Box
      width={'full'}
      maxWidth={'284px'}
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
          src={project.image || ''}
          width="full"
          height="full"
          fallback={<ProjectImageListItemPlaceholder padding="3em" />}
          objectFit="cover"
        />
      </Box>

      <Box paddingX={'12px'} paddingY={4}>
        <Box>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'18px'}
            fontFamily={'body'}
            fontWeight={600}
            noOfLines={1}
          >
            {project.title}
          </Heading>

          <Box
            mt={6}
            display="flex"
            space="x-6"
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box display="flex" flexDirection={'column'} alignItems={'center'}>
              <Text fontWeight={600}>{project.funders.length}</Text>

              <Text
                fontSize={'xs'}
                color={'brand.neutral600'}
                fontFamily={'mono'}
                textTransform="uppercase"
              >
                Contributors
              </Text>
            </Box>

            <Box
              display="flex"
              flexDirection={'column'}
              alignItems={'center'}
              marginTop="-6px"
            >
              <SatoshiAmount fontWeight={600}>{project.balance}</SatoshiAmount>

              <Text
                fontSize={'xs'}
                color={'brand.neutral600'}
                fontFamily={'mono'}
                textTransform="uppercase"
              >
                Funded
              </Text>
            </Box>

            <ProjectStatusLabel project={project} marginTop="18px" />
          </Box>

          <Text noOfLines={5} mt={2} textAlign="justify" size="sm">
            {project.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
