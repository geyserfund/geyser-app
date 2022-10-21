import React, { useMemo, useState } from 'react';
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
  SimpleGrid,
  Center,
  Button,
  VStack,
} from '@chakra-ui/react';
import { History } from 'history';
import { dimensions } from '../../constants';
import { AlertBox } from '../../components/ui';
import Loader from '../../components/ui/Loader';
import { useProjects } from '../../hooks';
import { ProjectsGridCard } from '../../components/molecules/projectDisplay/ProjectsGridCard';
import { RiSortDesc } from 'react-icons/ri';
import { TopBanner } from '../landing/components';
import { AppFooter } from '../../components/molecules';
import {
  OrderByOptions,
  PaginationInput,
  Project,
  ProjectsOrderByInput,
} from '../../types/generated/graphql';

type Props = {
  match: any;
  history: History;
};

const { topNavBar: topNavBarDimensions } = dimensions;

export const ProjectDiscoveryPage = ({
  match: _match,
  history: _history,
}: Props) => {
  const pagingItemLimit = 12;
  const [orderByOption, setOrderByOption] =
    React.useState<ProjectsOrderByInput>({ createdAt: OrderByOptions.Desc });

  const {
    isLoading,
    error,
    data: projects,
    fetchMore,
  } = useProjects({
    orderBy: [orderByOption],
    itemLimit: pagingItemLimit,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isShowingAllProjects, setIsShowingAllProjects] = useState(false);

  const paginationInput: PaginationInput = useMemo(() => {
    const options: PaginationInput = {};

    if (projects.length > 0) {
      options.cursor = {
        id: Number(projects[projects.length - 1].id),
      };
    }

    return options;
  }, [projects]);

  const handleLoadMoreButtonTapped = async () => {
    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        input: {
          pagination: paginationInput,
        },
      },
      updateQuery: (_previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult.projects.projects.length < pagingItemLimit) {
          setIsShowingAllProjects(true);
        }

        // return the result and let our `InMemoryCache` type policies handle
        // the merging logic.
        return {
          projects: {
            projects: fetchMoreResult.projects.projects,
          },
        };
      },
    });

    setIsLoadingMore(false);
  };

  if (error) {
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
  }

  if (isLoading) {
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
  }

  if (projects.length === 0) {
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
  }

  return (
    <Box
      position="relative"
      paddingTop={`${topNavBarDimensions.desktop.height}px`}
      width="full"
      height="full"
    >
      <TopBanner />

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
                    <Text
                      padding={3}
                      color="brand.gray500"
                      fontWeight={'medium'}
                    >
                      Sort By:
                    </Text>

                    <MenuItem
                      fontWeight={'semibold'}
                      onClick={() => {
                        setOrderByOption({ createdAt: OrderByOptions.Desc });
                      }}
                    >
                      Newest Projects
                    </MenuItem>

                    <MenuItem
                      fontWeight={'semibold'}
                      onClick={() => {
                        setOrderByOption({ createdAt: OrderByOptions.Asc });
                      }}
                    >
                      Oldest Projects
                    </MenuItem>

                    <MenuItem
                      fontWeight={'semibold'}
                      onClick={() => {
                        setOrderByOption({ balance: OrderByOptions.Desc });
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

                <SimpleGrid columns={3} spacingX={7} spacingY={8}>
                  {projects.map((project: Project) => (
                    <GridItem
                      key={project.id}
                      colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }}
                    >
                      <ProjectsGridCard project={project} height="100%" />
                    </GridItem>
                  ))}
                </SimpleGrid>

                {isShowingAllProjects === false ? (
                  <>
                    {isLoadingMore === false ? (
                      <Button onClick={handleLoadMoreButtonTapped}>
                        View More
                      </Button>
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

      <AppFooter />
    </Box>
  );
};
