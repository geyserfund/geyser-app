import { SimpleGrid } from '@chakra-ui/react'

import { ProjectCategory, ProjectSubCategory } from '@/types/index.ts'

import { LaunchpadProjectsByCategory } from './LaunchpadProjectsByCategory.tsx'

const listOfItemsToShow = [
  {
    subCategory: ProjectSubCategory.CircularEconomy,
  },
  {
    category: ProjectCategory.Tool,
  },
  {
    category: ProjectCategory.Education,
  },
  {
    category: ProjectCategory.Culture,
  },
  {
    category: ProjectCategory.Community,
  },
  {
    category: ProjectCategory.Advocacy,
  },
  {
    category: ProjectCategory.Cause,
  },
  {
    category: ProjectCategory.Other,
  },
]

export const LaunchpadProjects = () => {
  return (
    <SimpleGrid w="full" columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }} spacingX="20px" spacingY="20px">
      {listOfItemsToShow.map((item, index) => {
        return <LaunchpadProjectsByCategory key={index} category={item.category} subCategory={item.subCategory} />
      })}
    </SimpleGrid>
  )
}
