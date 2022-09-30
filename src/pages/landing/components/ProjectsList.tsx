import React, { useEffect } from 'react';
import {
  HStack,
  Text,
  VStack,
  Skeleton,
  Divider,
  Avatar,
  Box,
  Link,
  Heading,
} from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';
import { Link as ReactRouterLink } from 'react-router-dom';

import { colors } from '../../../constants';
import { isMobileMode, useNotification } from '../../../utils';
import { QUERY_PROJECTS } from '../../../graphql';

type RuleNames = string;

interface IStyleProps {
  isMobile?: boolean;
}

// const useStyles = createUseStyles<RuleNames, IStyleProps>({
//   titles: ({ isMobile }: IStyleProps) => ({
//     fontSize: isMobile ? '12px' : '14px',
//     fontWeight: 500,
//   }),
// });

export const ProjectsList = () => {
  // const classes = useStyles({ isMobile: isMobileMode() });
  const { toast } = useNotification();
  const { loading, error, data } = useQuery(QUERY_PROJECTS);

  const projects = (data && data.projects.projects) || [];

  useEffect(() => {
    if (error) {
      toast({
        title: 'Could not load projects',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [error]);

  return (
    <VStack alignItems="left" paddingLeft={30} paddingRight={30}>
      <HStack justify="space-between" align="center">
        <Heading as="h4" fontWeight={600} size="xl" lineHeight={'110%'}>
          Top Projects
        </Heading>

        <Link
          as={ReactRouterLink}
          // px={2}
          // py={1}
          // rounded={'md'}
          _hover={{
            textDecoration: 'none',
            // bg: useColorModeValue('gray.200', 'gray.700'),
          }}
          to={'/project-discovery'}
        >
          <Text>See All Projects</Text>
        </Link>
      </HStack>

      <Divider />

      {projects.length > 0 &&
        projects.map((project: any) => (
          <HStack key={project.id} spacing={10}>
            {/* <AvatarElement username={owner.user.username} image={owner.user.imageUrl}/> */}
            {loading ? (
              <HStack spacing={3}>
                <Skeleton w="2rem" h="2rem" />
                <Skeleton w="15rem" h="2rem" />
              </HStack>
            ) : (
              <Link
                to={`/projects/${project.name}`}
                style={{ textDecoration: 'none' }}
              >
                <HStack spacing={3}>
                  <Avatar size="sm" borderRadius="4px" src={project.image} />
                  <Text color="brand.neutral900">{project.title}</Text>
                </HStack>
              </Link>
            )}
          </HStack>
        ))}
    </VStack>
  );
};
