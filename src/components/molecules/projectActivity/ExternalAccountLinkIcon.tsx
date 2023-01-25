import { Button, Image, Link, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

import {
  BoostCLILogoUrl,
  BreezLogoUrl,
  CastamaticLogoUrl,
  CuriocasterLogoUrl,
  FountainLogoUrl,
  PodverseLogoUrl,
} from '../../../constants'
import { FundingTx } from '../../../types/generated/graphql'

type ExternalAccountLinkIconProps = {
  fundingTx: FundingTx
}

const sourceUrlMap: any = {
  Curiocaster: CuriocasterLogoUrl,
  Castamatic: CastamaticLogoUrl,
  BoostCLI: BoostCLILogoUrl,
  Breez: BreezLogoUrl,
  Podverse: PodverseLogoUrl,
  Fountain: FountainLogoUrl,
}

export const ExternalAccountLinkIcon = ({
  fundingTx,
}: ExternalAccountLinkIconProps) => {
  const { source, funder } = fundingTx

  const getExternalAccount = (type: string) => {
    return funder.user?.externalAccounts.find(
      (account) => account?.type === type,
    )?.externalUsername
  }

  const linkDestination: string = useMemo(() => {
    switch (source) {
      case 'Fountain':
        return `https://www.fountain.fm/${getExternalAccount('Fountain')}`
      default:
        return ''
    }
  }, [source])

  if (source === 'geyser') {
    return null
  }

  return (
    <>
      <Text fontSize="xs">from</Text>
      <Link href={linkDestination} isExternal>
        <Button size="xs" rounded="full" padding="0px" overflow="hidden">
          <Image
            width="24px"
            height="24px"
            src={sourceUrlMap[source]}
            alt={`contribution-source-${source}-logo`}
          />
        </Button>
      </Link>
    </>
  )
}
