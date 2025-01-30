import { Badge, HStack, IconButton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import {
  ProjectSubCategory,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
} from '@/shared/constants/platform/projectCategory.ts'

export const SubCategoriesBar = () => {
  const { updateFilter } = useFilterContext()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  const handleSubCategoryClick = (subCategory: ProjectSubCategory) => {
    updateFilter({ subCategory })
  }

  const checkScroll = () => {
    if (scrollContainerRef.current === null) return null

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current === null) return null

    const scrollAmount = 200 // Adjust this value to change scroll distance
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <HStack w="full" position="relative" paddingLeft={showLeftButton ? 10 : 0} paddingRight={showRightButton ? 10 : 0}>
      {showLeftButton && (
        <IconButton
          aria-label="scroll-left"
          variant="soft"
          colorScheme="neutral1"
          onClick={() => scroll('left')}
          icon={<PiCaretLeft />}
          position="absolute"
          left={0}
        />
      )}
      <HStack
        ref={scrollContainerRef}
        width="full"
        onScroll={checkScroll}
        overflowY={'auto'}
        sx={{
          '::-webkit-scrollbar': {
            height: 0,
          },
        }}
      >
        {ProjectSubCategoryList.map((subCategory) => {
          return (
            <Badge
              key={subCategory}
              size="lg"
              variant="soft"
              colorScheme="neutral1"
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleSubCategoryClick(subCategory)}
              height="32px"
              textTransform="lowercase"
            >
              {ProjectSubCategoryLabel[subCategory]}
            </Badge>
          )
        })}
      </HStack>
      {showRightButton && (
        <IconButton
          aria-label="scroll-right"
          variant="soft"
          colorScheme="neutral1"
          onClick={() => scroll('right')}
          icon={<PiCaretRight />}
          position="absolute"
          right={0}
        />
      )}
    </HStack>
  )
}
