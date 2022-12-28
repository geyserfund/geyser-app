import {
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router';

import SatoshiPng from '../../../assets/satoshi.png';
import { getPath, fonts, colors } from '../../../constants';
import { Project } from '../../../types/generated/graphql';
import { ICard } from '../../ui';
import { ProjectImageListItemPlaceholder } from './ProjectImageListItemPlaceholder';
import { getShortAmountLabel } from '../../../utils';
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
      _hover={{
        borderColor: 'brand.neutral500',
        cursor: 'pointer',
      }}
      transition="border-color 0.3s ease-in-out"
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
          onRight
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
                <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
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

            <VStack {...rest}>
              <BsFillCheckCircleFill
                color={colors.primary500}
                fontSize="24px"
              />
              <Text
                fontSize="12px"
                fontFamily={fonts.mono}
                color="brand.primary500"
                textTransform="uppercase"
              >
                RUNNING
              </Text>
            </VStack>
          </Box>

          <Text noOfLines={5} mt={2} textAlign="justify" size="sm">
            {project.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
