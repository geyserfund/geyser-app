import { ListItem, UnorderedList } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'

import { GrantItemTitle } from '../components/GrantItemTitle.tsx'

export const HowToApply = () => {
  return (
    <CardLayout w="full" alignItems="start" marginTop={10}>
      <GrantItemTitle>{t('How to Enter')}</GrantItemTitle>
      <UnorderedList spacing={4}>
        <ListItem> Open to all developers worldwide with no team size limit. </ListItem>

        <ListItem>
          Integrate the Breez SDK – Nodeless into an existing open-source project (see our UX recommendations here).
        </ListItem>

        <ListItem>
          The integration must be merged or accepted by the project maintainers before the judging deadline.
        </ListItem>

        <ListItem>
          Eligible open-source projects must have a FOSS license, an active community, and a real-world user base.
        </ListItem>

        <ListItem>
          Judges will evaluate each project to ensure it meets the standards to take part in the challenge.
        </ListItem>

        <ListItem> Projects with a strong GitHub following will be viewed favorably. </ListItem>

        <ListItem> Participants must be able to receive Bitcoin, as prizes will be awarded in BTC. </ListItem>
      </UnorderedList>
    </CardLayout>
  )
}
