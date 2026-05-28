import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { type ReactNode, useEffect, useState } from 'react'
import { PiCaretDownBold, PiFunnelBold, PiMagnifyingGlassBold, PiX } from 'react-icons/pi'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { ImpactFundApplicationFundingModel, ImpactFundApplicationStatus } from '@/types'

import { applicationStatusLabels, fundingModelLabels, fundingModelOptions, statusOptions } from './dashboardConstants'
import type { DashboardQuickView } from './useDashboardFilters'

type FilterChipColor = 'primary1' | 'info' | 'warning' | 'neutral1' | 'success' | 'error'

function FilterChip({
  color,
  children,
  onRemove,
}: {
  color: FilterChipColor
  children: ReactNode
  onRemove: () => void
}) {
  return (
    <Tag size="md" bg={`${color}.3`} color={`${color}.11`} borderWidth="1px" borderColor={`${color}.7`}>
      <TagLabel>{children}</TagLabel>
      <TagCloseButton onClick={onRemove} aria-label={t('Remove filter')} />
    </Tag>
  )
}

type DashboardToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  statuses: ImpactFundApplicationStatus[]
  onStatusesChange: (statuses: ImpactFundApplicationStatus[]) => void
  fundingModels: ImpactFundApplicationFundingModel[]
  onFundingModelsChange: (models: ImpactFundApplicationFundingModel[]) => void
  view: DashboardQuickView
  onViewChange: (view: DashboardQuickView) => void
  onClearAll: () => void
  hasAnyFilter: boolean
  totalCount: number
  loadedCount: number
}

const QUICK_VIEWS: { id: DashboardQuickView; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'needs-review', label: 'Needs review' },
  { id: 'funded', label: 'Funded' },
  { id: 'rejected', label: 'Rejected' },
]

export function DashboardToolbar({
  search,
  onSearchChange,
  statuses,
  onStatusesChange,
  fundingModels,
  onFundingModelsChange,
  view,
  onViewChange,
  onClearAll,
  hasAnyFilter,
  totalCount,
  loadedCount,
}: DashboardToolbarProps) {
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 250)
  const activeViewLabel = QUICK_VIEWS.find((v) => v.id === view)?.label ?? ''

  useEffect(() => {
    if (debouncedSearch !== search) {
      onSearchChange(debouncedSearch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  useEffect(() => {
    if (search !== searchInput) {
      setSearchInput(search)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <Flex direction="column" gap={3}>
      <Flex
        gap={3}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
      >
        <HStack flex={1} maxW={{ md: '480px' }}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <Icon as={PiMagnifyingGlassBold} color="neutral1.9" />
            </InputLeftElement>
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t('Search by project, creator, or country')}
              aria-label={t('Search applications')}
            />
            {searchInput ? (
              <InputRightElement>
                <IconButton
                  size="xs"
                  variant="ghost"
                  aria-label={t('Clear search')}
                  icon={<PiX />}
                  onClick={() => setSearchInput('')}
                />
              </InputRightElement>
            ) : null}
          </InputGroup>
        </HStack>
        <HStack spacing={2} flexWrap="wrap" justify={{ base: 'stretch', md: 'flex-end' }}>
          <ButtonGroup size="sm" isAttached variant="outline">
            {QUICK_VIEWS.map((entry) => (
              <Button
                key={entry.id}
                onClick={() => onViewChange(entry.id)}
                variant={view === entry.id ? 'solid' : 'outline'}
                colorScheme={view === entry.id ? 'primary1' : 'neutral1'}
              >
                {t(entry.label)}
              </Button>
            ))}
          </ButtonGroup>
          <Menu closeOnSelect={false} placement="bottom-end">
            <MenuButton
              as={Button}
              size="sm"
              variant="outline"
              leftIcon={<PiFunnelBold />}
              rightIcon={<PiCaretDownBold />}
            >
              {t('More filters')}
              {statuses.length + fundingModels.length > 0 ? (
                <Badge ml={2} size="sm" colorScheme="primary1" variant="solid">
                  {statuses.length + fundingModels.length}
                </Badge>
              ) : null}
            </MenuButton>
            <MenuList minW="280px" maxH="60vh" overflowY="auto">
              <MenuOptionGroup
                type="checkbox"
                value={statuses}
                onChange={(value) => onStatusesChange(value as ImpactFundApplicationStatus[])}
                title={t('Status')}
              >
                {statusOptions.map((status) => (
                  <MenuItemOption key={status} value={status}>
                    {t(applicationStatusLabels[status])}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
              <MenuOptionGroup
                type="checkbox"
                value={fundingModels}
                onChange={(value) => onFundingModelsChange(value as ImpactFundApplicationFundingModel[])}
                title={t('Funding modality')}
              >
                {fundingModelOptions.map((model) => (
                  <MenuItemOption key={model} value={model}>
                    {t(fundingModelLabels[model])}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {hasAnyFilter ? (
        <Wrap spacing={2} align="center">
          {view !== 'all' ? (
            <WrapItem>
              <FilterChip color="primary1" onRemove={() => onViewChange('all')}>
                {t('View: {{label}}', { label: t(activeViewLabel) })}
              </FilterChip>
            </WrapItem>
          ) : null}
          {statuses.map((status) => (
            <WrapItem key={`status-${status}`}>
              <FilterChip color="info" onRemove={() => onStatusesChange(statuses.filter((s) => s !== status))}>
                {t(applicationStatusLabels[status])}
              </FilterChip>
            </WrapItem>
          ))}
          {fundingModels.map((model) => (
            <WrapItem key={`fm-${model}`}>
              <FilterChip
                color="warning"
                onRemove={() => onFundingModelsChange(fundingModels.filter((m) => m !== model))}
              >
                {t(fundingModelLabels[model])}
              </FilterChip>
            </WrapItem>
          ))}
          {search ? (
            <WrapItem>
              <FilterChip color="neutral1" onRemove={() => onSearchChange('')}>
                {t('Search: “{{search}}”', { search })}
              </FilterChip>
            </WrapItem>
          ) : null}
          <WrapItem>
            <Button size="xs" variant="ghost" onClick={onClearAll} colorScheme="neutral1">
              {t('Clear all')}
            </Button>
          </WrapItem>
        </Wrap>
      ) : null}

      {totalCount > 0 ? (
        <Box aria-live="polite" role="status">
          {loadedCount >= totalCount ? (
            <Box as="span" color="neutral1.9" fontSize="sm">
              {t('Showing all {{count}} applications', { count: totalCount })}
            </Box>
          ) : (
            <Box as="span" color="neutral1.9" fontSize="sm">
              {t('Showing {{loaded}} of {{total}} applications', { loaded: loadedCount, total: totalCount })}
            </Box>
          )}
        </Box>
      ) : null}
    </Flex>
  )
}
