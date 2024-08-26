import { Button, HStack, ModalProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useFilterContext } from '@/context/filter'
import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { standardPadding } from '@/shared/styles'

import { FilterByRegion } from './region'
import { FilterByStatus } from './status'
import { FilterByTags } from './tag'

enum FilterType {
  Region = 'Region',
  Tags = 'Tags',
  Type = 'Type',
}

export const FilterModal = (props: Omit<ModalProps, 'children'>) => {
  const { clearFilter } = useFilterContext()

  const items: AnimatedNavBarItem[] = [
    {
      name: 'Region',
      key: FilterType.Region,
      render: () => <FilterByRegion />,
    },
    {
      name: 'Tags',
      key: FilterType.Tags,
      render: () => <FilterByTags />,
    },
    {
      name: 'Type',
      key: FilterType.Type,
      render: () => <FilterByStatus />,
    },
  ]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: FilterType.Region })

  return (
    <Modal title={`${t('Filter by')}:`} {...props} bodyProps={{ paddingX: 0 }}>
      <HStack paddingX={standardPadding} paddingBottom={4}>
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </HStack>
      <VStack height="400px" overflowY="auto">
        {render && render()}
      </VStack>
      <HStack w="full" paddingX={standardPadding} paddingTop={4}>
        <Button flex={1} variant="soft" colorScheme="neutral1" onClick={clearFilter}>
          {t('Reset filters')}
        </Button>
        <Button flex={1} variant="solid" colorScheme="primary1" onClick={props.onClose}>
          {t('View results')}
        </Button>
      </HStack>
    </Modal>
  )
}
