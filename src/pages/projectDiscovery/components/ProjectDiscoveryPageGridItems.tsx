
import { GridItem, SimpleGrid } from '@chakra-ui/react';

import { Project } from '../../../types/generated/graphql';
import { ProjectsGridCard } from '../../../components/molecules/projectDisplay/ProjectsGridCard';

type Props = {
  projects: Project[];
};

export const ProjectDiscoveryPageGridItems = ({ projects }: Props) => {
  return (
    <SimpleGrid columns={3} spacingX={7} spacingY={8}>
      {projects.map((project: Project) => (
        <GridItem key={project.id} colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }}>
          <ProjectsGridCard project={project} height="100%" />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
