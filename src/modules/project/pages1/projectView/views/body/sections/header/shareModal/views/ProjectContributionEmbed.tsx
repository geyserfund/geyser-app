import { Button, Icon, useClipboard, VStack } from '@chakra-ui/react'
import { SingleValue } from 'chakra-react-select'
import { t } from 'i18next'
import { useState } from 'react'
import { PiCheck, PiCode } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'

import { ContributionSummary } from '../../../contributionSummary/ContributionSummary.tsx'
import { LeaderboardSummary } from '../../../leaderboardSummary/LeaderboardSummary.tsx'

type EmbedType = 'compact' | 'full'

const options = [
  {
    label: 'Compact',
    value: 'compact',
  },
  {
    label: 'Full',
    value: 'full',
  },
]

const COMPACT_HEIGHT = '264px'
const FULL_HEIGHT = '620px'

const getEmbedCode = ({ projectName, embedType }: { projectName: string; embedType: EmbedType }) => {
  const minHeight = embedType === 'full' ? FULL_HEIGHT : COMPACT_HEIGHT
  return `
    <iframe 
        src="${getFullDomainUrl(`${getPath('contributionWidget', projectName)}?view=${embedType}&colorMode=light`)}"
        title="Geyser Project Contribution Widget"
        style={{ 
          width: '100vw', 
          minHeight: '${minHeight}', 
          border: 'none', 
          maxWidth: '400px',
          backgroundColor: 'transparent'
        }}
      />
  `
}

export const ProjectContributionEmbed = () => {
  const [selectedType, setSelectedType] = useState<EmbedType>('compact')

  const { project } = useProjectAtom()

  const { onCopy, hasCopied } = useClipboard(getEmbedCode({ projectName: project.name, embedType: selectedType }))

  const handleSelectChange = (value: SingleValue<{ label: string; value: string }>) => {
    setSelectedType(value?.value as EmbedType)
  }

  return (
    <VStack width="100%">
      <Body>{t('Embed the contribute and leaderboard section of this page on your website')}</Body>
      <CustomSelect
        isSearchable={false}
        width={'full'}
        options={options}
        value={options.find((option) => option.value === selectedType)}
        onChange={handleSelectChange}
        fontSize="sm"
      />
      <ProjectContributionWidget embedType={selectedType} />
      <Button
        size="lg"
        width="full"
        variant={hasCopied ? 'solid' : 'surface'}
        colorScheme={'primary1'}
        onClick={onCopy}
        rightIcon={<Icon as={hasCopied ? PiCheck : PiCode} />}
      >
        {hasCopied ? t('Copied') : t('Copy embed code')}
      </Button>
    </VStack>
  )
}

const ProjectContributionWidget = ({ embedType }: { embedType: EmbedType }) => {
  const isFull = embedType === 'full'
  return (
    <VStack
      width="full"
      maxWidth="400px"
      height={isFull ? FULL_HEIGHT : COMPACT_HEIGHT}
      overflow="auto"
      backgroundColor="transparent"
    >
      <ContributionSummary />
      {isFull && <LeaderboardSummary />}
    </VStack>
  )
}
