import { Badge, HStack, Icon, IconButton } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { PiCaretLeft, PiCaretRight, PiScroll } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { PostType } from '@/types'

type PostTypeFilterBarProps = {
  availablePostTypes: any[]
  selectedPostType: PostType | null
  onFilterChange: (postType: PostType | null) => void
}

export const PostTypeFilterBar = ({ availablePostTypes, selectedPostType, onFilterChange }: PostTypeFilterBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  const isAllPostsSelected = selectedPostType === null

  const checkScroll = () => {
    if (scrollContainerRef.current === null) return null

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current === null) return null

    const scrollAmount = 200
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
        overflowX="auto"
        spacing={2}
        sx={{
          '::-webkit-scrollbar': {
            height: 0,
          },
        }}
      >
        <Badge
          size="sm"
          variant="soft"
          colorScheme={isAllPostsSelected ? 'primary' : 'neutral1'}
          color={isAllPostsSelected ? 'primaryAlpha.11' : 'inherit'}
          bg={isAllPostsSelected ? 'primaryAlpha.3' : 'neutralAlpha.3'}
          p={3}
          onClick={() => onFilterChange(null)}
          cursor="pointer"
        >
          <Icon as={PiScroll} />
          <Body size="sm" light pl={2} color={isAllPostsSelected ? 'primaryAlpha.11' : 'inherit'}>
            {t('All posts')}
          </Body>
        </Badge>

        {availablePostTypes.map((option) => (
          <PostTypeFilterTag
            key={option.value}
            label={option.label}
            icon={option.icon}
            isSelected={selectedPostType === option.value}
            onClick={() => onFilterChange(option.value)}
          />
        ))}
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

interface PostTypeFilterTagProps {
  label: string
  icon: IconType
  isSelected: boolean
  onClick: () => void
}

const PostTypeFilterTag = ({ label, icon, isSelected, onClick }: PostTypeFilterTagProps) => {
  return (
    <Badge
      size="sm"
      variant="soft"
      colorScheme={isSelected ? 'primary' : 'neutral1'}
      bg={isSelected ? 'primaryAlpha.3' : 'neutralAlpha.3'}
      p={3}
      cursor="pointer"
      onClick={onClick}
    >
      <Icon as={icon} />
      <Body size="sm" light pl={2} color={isSelected ? 'primaryAlpha.11' : 'inherit'}>
        {label}
      </Body>
    </Badge>
  )
}
