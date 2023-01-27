import { Box, Wrap, WrapItem } from '@chakra-ui/react'

import {
  abubakarUrl,
  bradUrl,
  carlaUrl,
  danialUrl,
  desUrl,
  joeNakamotoUrl,
  lucasUrl,
  pacoUrl,
  zuccoUrl,
} from '../../../constants'
import { useMobileMode } from '../../../utils'
import { BitcoinerCard } from './BitcoinerCard'

const members = [
  {
    name: 'Brad Mills',
    handle: 'bradmillscan',
    link: 'https://twitter.com/bradmillscan',
    image: bradUrl,
  },

  {
    name: 'Lucas Ferreira',
    handle: 'lucasdcf',
    link: 'https://twitter.com/lucasdcf',
    image: lucasUrl,
  },
  {
    name: 'Daniel Prince',
    link: 'https://twitter.com/PrinceySOV',
    image: danialUrl,
  },
  {
    name: 'Abubakar',
    link: 'https://twitter.com/ihate1999',
    image: abubakarUrl,
  },
  {
    name: 'Des',
    link: 'https://twitter.com/dickerson_des',
    image: desUrl,
  },
  {
    name: 'Paco de la India',
    image: pacoUrl,
    link: 'https://twitter.com/RunwithBitcoin',
  },
  {
    name: 'Giacomo Zucco',
    image: zuccoUrl,
    link: 'https://twitter.com/giacomozucco',
  },
  {
    name: 'CARLA',
    image: carlaUrl,
    link: 'https://twitter.com/thecryptoc0up1e',
  },
  {
    name: 'Joe Nakamoto',
    image: joeNakamotoUrl,
    link: 'https://twitter.com/JoeNakamoto',
  },
]

export const BoardMembers = () => {
  const isMobile = useMobileMode()

  return (
    <Box display={'flex'} justifyContent="center">
      <Box width={isMobile ? '100%' : '600px'}>
        <Wrap spacing="20px" justify="center">
          {members.map((item, idx) => (
            <WrapItem key={idx}>
              <BitcoinerCard
                name={item.name}
                image={item.image}
                link={item.link}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  )
}
