import { CardLayout } from '../../../../components/layouts'
import { CopyText } from '../../../../components/molecules'
import { Body1, H3 } from '../../../../components/typography'
import { GrantsContributeModal } from '../../components/GrantsContributeModal'

export const GrantContribute = () => {
  return (
    <CardLayout w="full" p="20px" alignItems="center">
      <H3 alignSelf="start">Contribute</H3>
      <Body1>
        Contribute directly to Bitcoin Gaming Grant via QR code (lightning and
        onchain) or by sending SATs to our lightning address:{' '}
        <CopyText>bitcoingaminggrant@geyser.fund</CopyText> Grant funds will be
        distributed based on community votes.
      </Body1>
      <GrantsContributeModal />
    </CardLayout>
  )
}
