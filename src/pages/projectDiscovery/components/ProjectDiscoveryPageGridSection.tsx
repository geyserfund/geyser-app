import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Center,
  VStack,
} from '@chakra-ui/react';

import { useLazyQuery } from '@apollo/client';
import { AlertBox } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { dimensions } from '../../../constants';
import { QUERY_PROJECTS } from '../../../graphql';
import {
  Project,
  ProjectsGetQueryInput,
  ProjectsOrderByInput,
  OrderByOptions,
  PaginationInput,
} from '../../../types/generated/graphql';
import { RiSortDesc } from 'react-icons/ri';
import { ProjectDiscoveryPageGridItems } from './ProjectDiscoveryPageGridItems';
import { useListenerState } from '../../../hooks';
import { ScrollInvoke } from '../../../helpers';

type ResponseData = {
  projects: {
    projects: Project[];
  };
};

type QueryVariables = {
  input: ProjectsGetQueryInput;
};

const { topNavBar: topNavBarDimensions } = dimensions;

export const ProjectDiscoveryPageGridSection = () => {
  const pagingItemLimit = 12;

  const [orderByOption, setOrderByOption] = useState<ProjectsOrderByInput>({
    createdAt: OrderByOptions.Desc,
  });

  const handleOrderBySelectionChanged = async (
    newOption: ProjectsOrderByInput,
  ) => {
    setOrderByOption(newOption);

    await getProjects({
      variables: {
        input: {
          orderBy: [newOption],
        },
      },
      fetchPolicy: 'no-cache',
    });
  };

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false);
  const [isShowingAllProjects, setIsShowingAllProjects] =
    useListenerState(false);

  const [
    getProjects,
    { data: projectsResponseData, fetchMore, error, loading: isPageLoading },
  ] = useLazyQuery<ResponseData, QueryVariables>(QUERY_PROJECTS, {
    variables: {
      input: {
        pagination: {
          take: pagingItemLimit,
        },
        orderBy: [orderByOption],
      },
    },
  });

  const paginationInput: PaginationInput = useMemo(() => {
    const options: PaginationInput = {
      take: pagingItemLimit,
    };

    if ((projectsResponseData?.projects.projects ?? []).length > 0) {
      options.cursor = {
        id: Number(
          projectsResponseData?.projects.projects[
            (projectsResponseData?.projects.projects ?? []).length - 1
          ].id,
        ),
      };
    }

    return options;
  }, [projectsResponseData?.projects.projects, pagingItemLimit]);

  const projects: Project[] = useMemo(() => {
    return projectsResponseData?.projects.projects ?? [];
  }, [projectsResponseData?.projects.projects]);

  const handleLoadMoreButtonTapped = async () => {
    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: paginationInput,
          orderBy: [orderByOption],
        },
      },
      updateQuery: (_previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult.projects.projects.length < pagingItemLimit) {
          setIsShowingAllProjects(true);
        }

        // return all data and let our `InMemoryCache` type policies handle
        // the merging logic.
        return {
          projects: {
            projects: [...projects, ...fetchMoreResult.projects.projects],
          },
        };
      },
    });

    setIsLoadingMore(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const ErrorView = () => {
    return (
      <Container
        position="relative"
        paddingTop={`${topNavBarDimensions.desktop.height}px`}
        height="100%"
        display={'flex'}
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <AlertBox
            height="200px"
            status="error"
            title="An error occurred while attempting to fetch projects."
            message="Please try refreshing the page. You may also want to contact support if the problem persists."
          />
        </Center>
      </Container>
    );
  };

  const PageLoadingView = () => {
    return (
      <Container
        position="relative"
        paddingTop={`${topNavBarDimensions.desktop.height}px`}
        height="100%"
        display={'flex'}
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  };

  const EmptyStateView = () => {
    return (
      <Container
        position="relative"
        paddingTop={`${topNavBarDimensions.desktop.height}px`}
        height="100%"
        display={'flex'}
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <AlertBox
            height="200px"
            status="info"
            colorScheme={'gray'}
            title="There are currently no projects."
            message="Please try refreshing the page. You may also want to contact support if the problem persists."
          />
        </Center>
      </Container>
    );
  };

  return (
    <Box
      display={'flex'}
      justifyContent="center"
      flexDirection="row"
      paddingY={20}
    >
      <Center
        width={'full'}
        paddingX={{
          base: 4,
          md: 10,
        }}
      >
        <Grid
          templateAreas={`
            "header"
            "main"
          `}
          gridTemplateRows={'50px 1fr'}
          gridTemplateColumns={'1fr'}
          width="full"
          maxWidth="927px"
          minHeight="100%"
          height="auto"
          gap="1"
          justifyContent={'center'}
        >
          <GridItem area={'header'}>
            <HStack
              justifyContent={'space-between'}
              alignItems={['center', 'baseline']}
              spacing={0}
            >
              <Heading as={'h3'} size="md">
                All Geyser Projects
              </Heading>

              <Menu closeOnSelect placement="bottom-start">
                <MenuButton
                  as={IconButton}
                  fontSize={'1.5em'}
                  variant="ghost"
                  aria-label="Project Sorting"
                  icon={<RiSortDesc />}
                />

                <MenuList>
                  <Text padding={3} color="brand.gray500" fontWeight={'medium'}>
                    Sort By:
                  </Text>

                  <MenuItem
                    fontWeight={'semibold'}
                    onSelect={() => {
                      handleOrderBySelectionChanged({
                        createdAt: OrderByOptions.Desc,
                      });
                    }}
                    onClick={() => {
                      handleOrderBySelectionChanged({
                        createdAt: OrderByOptions.Desc,
                      });
                    }}
                  >
                    Newest Projects
                  </MenuItem>

                  <MenuItem
                    fontWeight={'semibold'}
                    onSelect={() => {
                      handleOrderBySelectionChanged({
                        createdAt: OrderByOptions.Asc,
                      });
                    }}
                    onClick={() => {
                      handleOrderBySelectionChanged({
                        createdAt: OrderByOptions.Asc,
                      });
                    }}
                  >
                    Oldest Projects
                  </MenuItem>

                  <MenuItem
                    fontWeight={'semibold'}
                    onSelect={() => {
                      handleOrderBySelectionChanged({
                        balance: OrderByOptions.Desc,
                      });
                    }}
                    onClick={() => {
                      handleOrderBySelectionChanged({
                        balance: OrderByOptions.Desc,
                      });
                    }}
                  >
                    Amount Funded
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </GridItem>

          <GridItem area={'main'}>
            <VStack spacing={16}>
              <Divider borderWidth="2px" />

              {isPageLoading ? (
                <PageLoadingView />
              ) : projects.length === 0 ? (
                <EmptyStateView />
              ) : error ? (
                <ErrorView />
              ) : (
                <ProjectDiscoveryPageGridItems projects={projects} />
              )}

              {isShowingAllProjects.current === false &&
              Boolean(error) === false &&
              projects.length > 0 ? (
                <>
                  {isLoadingMore.current === false ? (
                    <ScrollInvoke
                      elementId="app-route-content-root"
                      onScrollEnd={handleLoadMoreButtonTapped}
                      isLoading={isLoadingMore}
                      noMoreItems={isShowingAllProjects}
                    />
                  ) : (
                    <Loader />
                  )}
                </>
              ) : null}
            </VStack>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};
