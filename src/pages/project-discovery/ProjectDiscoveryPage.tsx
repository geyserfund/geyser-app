import React from 'react';
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
} from '@chakra-ui/react';
import { History } from 'history';
import { dimensions } from '../../constants';
import { AlertBox } from '../../components/ui';
import Loader from '../../components/ui/Loader';
import { OrderByOption, useProjects } from '../../hooks';
import { IProject } from '../../interfaces';
import { ProjectsGridCard } from '../../components/molecules/projectDisplay/ProjectsGridCard';
import { RiSortDesc } from 'react-icons/ri';
import { TopBanner } from '../landing/components';
import { AppFooter } from '../../components/molecules';

type Props = {
  match: any;
  history: History;
};

const { topNavBar: topNavBarDimensions } = dimensions;

export const ProjectDiscoveryPage = ({ match, history }: Props) => {
  const [orderByOption, setOrderByOption] =
    React.useState<OrderByOption>('Newest Projects');

  const {
    isLoading,
    error,
    data: projects,
  } = useProjects({
    orderBy: orderByOption,
  });

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
        <Center>
          <Grid
            templateAreas={`
            "header"
            "main"
          `}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'1fr'}
            maxWidth="927px"
            minWidth={['full', '927px']}
            minHeight="100%"
            height="auto"
            gap="1"
            justifyContent={'center'}
          >
            <GridItem area={'header'}>
              <HStack
                justifyContent={'space-between'}
                alignItems="baseline"
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
                        setOrderByOption('Newest Projects');
                      }}
                    >
                      Newest Projects
                    </MenuItem>

                    <MenuItem
                      fontWeight={'semibold'}
                      onClick={() => {
                        setOrderByOption('Oldest Projects');
                      }}
                    >
                      Oldest Projects
                    </MenuItem>

                    <MenuItem
                      fontWeight={'semibold'}
                      onClick={() => {
                        setOrderByOption('Amount Funded');
                      }}
                    >
                      Amount Funded
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </GridItem>

            <GridItem area={'main'}>
              <Divider marginBottom={8} borderWidth="2px" />

              <SimpleGrid columns={3} spacingX={7} spacingY={8}>
                {projects.map((project: IProject) => (
                  <GridItem key={project.id} colSpan={[3, 1]}>
                    <ProjectsGridCard project={project} height="100%" />
                  </GridItem>
                ))}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Center>
      </Box>

      <AppFooter />
    </Box>
  );
};
