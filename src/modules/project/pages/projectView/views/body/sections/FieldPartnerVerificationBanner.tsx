import { HStack, Image, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

type FieldPartnerVerificationBannerProject = ReturnType<typeof useProjectAtom>['project'] & {
  fieldPartner?: {
    id?: string | null
    username?: string | null
  } | null
}

/** Displays the Field Partner verification banner for standard project pages. */
export const FieldPartnerVerificationBanner = () => {
  const { project } = useProjectAtom()
  const { fieldPartner } = project as FieldPartnerVerificationBannerProject
  const fieldPartnerNetworkIconSrc = useColorModeValue(
    '/icons/field-partner-network-icon.png',
    '/icons/field-partner-network-icon-dark-mode.png',
  )

  if (!fieldPartner?.username) {
    return null
  }

  const fieldPartnerProfilePath = fieldPartner.id ? getPath('userProfile', fieldPartner.id) : undefined
  const impactFundPath = getPath('impactFunds')

  return (
    <CardLayout
      w="full"
      dense
      direction="row"
      alignItems="center"
      spacing={3}
      paddingX={{ base: 3, lg: 4 }}
      paddingY={{ base: 3, lg: 3 }}
    >
      <Image src={fieldPartnerNetworkIconSrc} alt="" boxSize="44px" objectFit="contain" flexShrink={0} />
      <HStack spacing={0} minW={0}>
        <Body size="md" sx={{ textWrap: 'pretty' }}>
          <Trans
            i18nKey="This project is verified and vouched by our field partner <partner>{{fieldPartnerName}}</partner>. Learn more about our Field Partner network <impactFundLink>here</impactFundLink>."
            values={{ fieldPartnerName: fieldPartner.username }}
            components={{
              partner: fieldPartnerProfilePath ? (
                <ChakraLink as={Link} to={fieldPartnerProfilePath} textDecoration="none" />
              ) : (
                <Body as="span" size="md" />
              ),
              impactFundLink: <ChakraLink as={Link} to={impactFundPath} textDecoration="underline" />,
            }}
          />
        </Body>
      </HStack>
    </CardLayout>
  )
}
