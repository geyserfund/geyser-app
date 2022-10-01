import React, { useEffect } from 'react';
import {
  HStack,
  Text,
  VStack,
  Skeleton,
  Divider,
  Avatar,
  Link,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useNotification } from '../../../utils';
import { QUERY_PROJECTS } from '../../../graphql';
import { BsArrowRight } from 'react-icons/bs';

export const ProjectsList = () => {
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
        <Heading as="h5" size="sm">
          Top Projects
        </Heading>

        <Link
          href={'/project-discovery'}
          display="flex"
          flexDirection={'row'}
          alignItems="center"
          color={'brand.neutral600'}
          fontSize="12px"
        >
          <Text size="sm">See All Projects</Text>

          <Icon as={BsArrowRight} marginLeft={1} />
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
