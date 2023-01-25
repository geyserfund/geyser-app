import { Box, Wrap } from '@chakra-ui/react'

import { tachiraUrl, umarUrl } from '../../../constants'
import { useMobileMode } from '../../../utils'
import { BitcoinerCard } from './BitcoinerCard'

const members = [
  {
    name: 'Tachira Homestead',
    role: 'Artist',
    link: 'https://twitter.com/tachirahomestd',
    image: tachiraUrl,
  },

  {
    name: 'Umar Abubakar',
    role: 'Developer',

    link: 'https://twitter.com/umarabox',
    image: umarUrl,
  },
]

export const GrantDevelopers = () => {
  const isMobile = useMobileMode()
  return (
    <Box display={'flex'} justifyContent="center">
      <Box width={isMobile ? '100%' : '600px'}>
        <Wrap spacing="20px" align="center" justify={'center'}>
          {members.map((item, idx) => (
            <BitcoinerCard
              key={idx}
              name={item.name}
              role={item.role}
              link={item.link}
              image={item.image}
            />
          ))}
        </Wrap>
      </Box>
    </Box>
  )
}
