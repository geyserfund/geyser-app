import { VStack } from '@chakra-ui/react'

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
    <VStack w="full" spacing={8}>
      {listOfItemsToShow.map((item, index) => {
        return <LaunchpadProjectsByCategory key={index} category={item.category} subCategory={item.subCategory} />
      })}
    </VStack>
  )
}
