import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'

import { ProjectBannerView } from './ProjectBannerView.tsx'
import { ProjectShareContribute } from './ProjectShareContribute.tsx'

type BannerType = 'project' | 'lightning'

export const ProjectBanners = () => {
  const { isAon, isPrismEnabled } = useProjectAtom()
  const [selectedType, setSelectedType] = useState<BannerType>('project')
  const hideLightningBanner = isAon || isPrismEnabled

  const options = useMemo(
    () =>
      [
        {
          label: t('Go to Project'),
          value: 'project',
        },
        !hideLightningBanner && {
          label: t('Lightning QR code'),
          value: 'lightning',
        },
      ].filter(Boolean) as Array<{ label: string; value: BannerType }>,
    [hideLightningBanner],
  )

  useEffect(() => {
    if (hideLightningBanner && selectedType === 'lightning') {
      setSelectedType('project')
    }
  }, [hideLightningBanner, selectedType])

  const handleSelectChange = (value: SingleValue<{ label: string; value: BannerType }>) => {
    if (value?.value) {
      setSelectedType(value.value)
    }
  }

  const renderBanner = () => {
    if (selectedType === 'project') {
      return <ProjectBannerView />
    }

    return <ProjectShareContribute />
  }

  return (
    <VStack width="100%">
      <CustomSelect
        isSearchable={false}
        width={'100%'}
        options={options}
        value={options.find((option) => option.value === selectedType)}
        onChange={handleSelectChange}
        fontSize="sm"
      />
      {renderBanner()}
    </VStack>
  )
}
