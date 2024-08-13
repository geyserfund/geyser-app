import { BoxProps, HStack, Image, Link, Wrap, WrapItem } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { Body } from '@/shared/components/typography'

import { Maybe, Sponsor } from '../../../types'

interface Props {
  sponsors?: Array<Maybe<Sponsor>>
  titleProps?: BoxProps
}

export const Sponsors = ({ sponsors = [], titleProps, children, ...props }: PropsWithChildren<Props & BoxProps>) => {
  if (!sponsors.length) return null

  return (
    <HStack alignItems="center" justifyContent="flex-start" {...props}>
      <Body color="neutralAlpha.11" fontSize="12px" medium>
        Sponsors:
      </Body>
      <Wrap justify={'center'} spacing={4}>
        {sponsors.map((item) =>
          item && item.image ? (
            <WrapItem display="flex" key={item.id} background={'white'} borderRadius={'20px'} alignItems={'center'}>
              <Link target="_blank" href={item.url || '#'}>
                <Image src={item.image} alt="sponsor logo" height="15px" />
              </Link>
            </WrapItem>
          ) : null,
        )}
      </Wrap>
    </HStack>
  )
}
