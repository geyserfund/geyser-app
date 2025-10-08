import { HStack, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { useLastVisistedFollowedProjects } from '../../../../hooks/useLastVisited.ts'
import { FilterComponent } from './components/FilterComponent.tsx'
import { useFilterComponent } from './hooks/useFilterComponent.tsx'

export const Activity = () => {
  useLastVisistedFollowedProjects()

  const {
    filters,
    postTypeDropdown,
    categoryDropdown,
    setPostType,
    setCategory,
    setSubCategory,
    setFollowedProjects,
    togglePostTypeDropdown,
    toggleCategoryDropdown,
    closeAllDropdowns,
  } = useFilterComponent()

  return (
    <VStack
      h="full"
      paddingTop={{ base: `${dimensions.animatedNavBar.height.base}px`, lg: 0 }}
      width="full"
      alignItems="flex-start"
      spacing={4}
      borderTopRadius="xl"
      bg="neutralAlpha.1"
    >
      <HStack
        position={{ base: 'fixed', lg: 'sticky' }}
        paddingX={{ base: 3, lg: 0 }}
        top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: 0 }}
        justifyContent="center"
        alignItems="center"
        bg="utils.pbg"
        zIndex={2}
      >
        <FilterComponent
          filters={filters}
          postTypeDropdown={postTypeDropdown}
          categoryDropdown={categoryDropdown}
          onPostTypeChange={setPostType}
          onCategoryChange={setCategory}
          onSubCategoryChange={setSubCategory}
          onFollowedProjectsChange={setFollowedProjects}
          onTogglePostTypeDropdown={togglePostTypeDropdown}
          onToggleCategoryDropdown={toggleCategoryDropdown}
          onCloseAllDropdowns={closeAllDropdowns}
        />
      </HStack>
      <Outlet />
    </VStack>
  )
}
