import { VStack } from '@chakra-ui/react'
import { SingleValue } from 'chakra-react-select'
import { t } from 'i18next'
import { useState } from 'react'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'

import { ProjectBannerView } from './ProjectBannerView.tsx'
import { ProjectShareContribute } from './ProjectShareContribute.tsx'

type BannerType = 'project' | 'lightning'

const options = [
  {
    label: t('Go to Project'),
    value: 'project',
  },
  {
    label: t('Lightning QR code'),
    value: 'lightning',
  },
]

export const ProjectBanners = () => {
  const [selectedType, setSelectedType] = useState<BannerType>('project')

  const handleSelectChange = (value: SingleValue<{ label: string; value: string }>) => {
    setSelectedType(value?.value as BannerType)
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
        width={'full'}
        options={options}
        value={options.find((option) => option.value === selectedType)}
        onChange={handleSelectChange}
        fontSize="sm"
      />
      {renderBanner()}
    </VStack>
  )
}
