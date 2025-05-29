import { BoxProps, HStack, Image, Link, Wrap, WrapItem } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { Maybe, Sponsor } from '../../../../../types'

interface Props {
  sponsors?: Array<Maybe<Sponsor>>
  titleProps?: BoxProps
}

export const Sponsors = ({ sponsors = [], titleProps, children, ...props }: PropsWithChildren<Props & BoxProps>) => {
  const { t } = useTranslation()

  if (!sponsors.length) return null

  return (
    <HStack alignItems="center" justifyContent="flex-start" {...props}>
      <Body size="sm" light>
        {t('Sponsors')}:
      </Body>
      <Wrap justify={'center'} spacing={4}>
        {sponsors.map((item) =>
          item && item.image ? (
            <WrapItem display="flex" key={item.id} background={'white'} borderRadius={'lg'} alignItems={'center'} p={2}>
              <Link target="_blank" href={item.url || '#'}>
                <Image src={item.image} alt="sponsor logo" height="24px" />
              </Link>
            </WrapItem>
          ) : null,
        )}
      </Wrap>
    </HStack>
  )
}
