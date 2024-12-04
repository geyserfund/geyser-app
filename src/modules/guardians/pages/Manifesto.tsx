import { HStack, VStack } from '@chakra-ui/react'

import { Body, H1 } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'
import { fonts } from '@/shared/styles/fonts'

export const Manifesto = () => {
  return (
    <HStack w="full" justify={'center'} backgroundColor={'guardians.background'}>
      <VStack
        w="full"
        justifySelf={'center'}
        fontFamily={fonts.mazius}
        maxWidth={'1300px'}
        paddingX={standardPadding}
        alignItems={'center'}
        paddingBottom={10}
        spacing={6}
      >
        <H1 fontSize={'60px'}> GEYSER MANIFESTO </H1>
        <Body fontSize={'28px'}>
          In a world where nihilism and pessimism about the future prevail, Bitcoin brought us hope. Not just hope for a
          world built on sound money, but hope in the power of action to create meaningful change. The world is
          malleable, and individuals have the power to reshape it.
        </Body>
        <Body fontSize={'28px'}>
          The Cypherpunks understood this. They didn’t wait for permission—they built the tools of freedom. In 1993, the
          Cypherpunk Manifesto declared, “Cypherpunks write code.” In 2009, Satoshi Nakamoto released Bitcoin’s code.
          Bitcoin was born out of action and a will for change.
        </Body>
        <Body fontSize={'28px'}>
          The vision has always been to lay sound foundations for the digital era—moving away from the predetermined
          path of totalitarian control and censorship, and towards decentralization, openness, freedom, and
          self-sovereignty. To bring about unimaginable wealth and human flourishing.
        </Body>
        <Body fontSize={'28px'}>
          For Bitcoin’s sound principles to take hold in the world, change must happen at all layers of society.
          Developers, educators, writers, filmmakers, artists, and entire communities all have a role to play in
          building the Bitcoin world. No act is too small—small actions compound into global grassroots movements.
        </Body>
        <Body fontSize={'28px'}>
          Bitcoin is a peaceful revolution—but peaceful does not mean passive. It’s time to act. Are you a Bitcoiner?
          Then you are the protagonist of this story, and the tools are in your hands.
        </Body>
        <Body fontSize={'28px'}>What will you do to help bring about Bitcoin adoption?</Body>
      </VStack>
    </HStack>
  )
}
