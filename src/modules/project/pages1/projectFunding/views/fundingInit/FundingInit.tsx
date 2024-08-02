import { VStack } from '@chakra-ui/react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { FundingLayout } from '../../layouts/FundingLayout'
import { DonationInput } from './components/DonationInput'

export const FundingInit = () => {
  const { project } = useProjectAtom()

  const sideContent = () => {
    return (
      <CardLayout w="full" h="full">
        <Body>Side Content</Body>
      </CardLayout>
    )
  }

  return (
    <FundingLayout backPath={getPath('project', project.name)} sideContent={sideContent()} noMobileSideContent>
      <CardLayout w="full">
        <DonationInput name="donationAmount" onChange={(name, change) => console.log(name, change)} />
      </CardLayout>
    </FundingLayout>
  )
}
