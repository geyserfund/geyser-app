import { Button, ButtonProps, Image, Link as ChakraLink, UseModalProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'
import Tilt from 'react-parallax-tilt'
import { Link } from 'react-router'

import { isWidgetAtom } from '@/modules/project/state/widgetAtom.ts'
import { getPath } from '@/shared/constants'
import { guardianNostrCards, guardianText } from '@/shared/constants/assets/guardianAssets.tsx'
import { GradientBorder } from '@/shared/molecules/GradientBorder'
import { GuardiansButtonBackgroundGradient, GuardiansButtonBackgroundGradientBright } from '@/shared/styles/custom'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { GuardianType } from '@/types'

import { Modal } from '../layouts'
import { Body } from '../typography'

export type GuardianCardProps = {
  guardianType?: GuardianType | null
  userName: string
}

type GuardianCardModalProps = GuardianCardProps & UseModalProps

export const GuardianCardModal = ({ guardianType, userName, ...guardianModal }: GuardianCardModalProps) => {
  const isWidget = useAtomValue(isWidgetAtom)

  if (!guardianType) return null

  const text = guardianText[guardianType]
  const guardianAsset = guardianNostrCards[guardianType]

  return (
    <Modal title={`${text} Nostr Card`} {...guardianModal} bodyProps={{ as: VStack, backgroundColor: 'utils.pbg' }}>
      <Body>
        <Trans
          i18nKey={
            '<0>{{user}}</0> has chosen to become a Geyser Guardian to support our platform and help push Bitcoin adoption.'
          }
          values={{ user: userName }}
        >
          <Body as="span" medium>
            {'{{user}}'}
          </Body>
          {` has chosen to become a Geyser Guardian to support our platform and help push Bitcoin adoption.`}
        </Trans>
      </Body>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
        <Image
          src={guardianAsset}
          alt={`${guardianType} guardian asset`}
          height="400px"
          width="auto"
          objectFit="cover"
        />
      </Tilt>
      <GradientBorder enable gradientColor={GuardiansButtonBackgroundGradientBright}>
        <Button
          w="full"
          size="lg"
          variant="outline"
          borderWidth="0px"
          {...(isWidget
            ? ({
                as: ChakraLink,
                href: getFullDomainUrl(getPath('guardians')),
                isExternal: true,
              } as ButtonProps)
            : {
                as: Link,
                to: getPath('guardians'),
              })}
          background={GuardiansButtonBackgroundGradient}
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          {t('Explore Guardians')}
        </Button>
      </GradientBorder>
    </Modal>
  )
}
