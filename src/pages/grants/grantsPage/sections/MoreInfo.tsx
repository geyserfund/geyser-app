import { Box, Link, Text, TextProps } from '@chakra-ui/react'

import { ShareIcon } from '../../../../assets'
import { GrantsFAQUrl } from '../../../../constants'
import { fonts } from '../../../../styles'

interface MoreInfoProps {
  titleProps?: TextProps
}

export const MoreInfo = ({ titleProps }: MoreInfoProps) => {
  return (
    <Box>
      <Text
        fontWeight={'bold'}
        fontSize="19px"
        fontFamily={fonts.interBlack}
        {...titleProps}
      >
        More Information
      </Text>
      <Text
        mt="5px"
        color="brand.neutral600"
        fontSize={'14px'}
        textAlign="justify"
      >
        {`Bitcoin is signal, everything else is noise.
          We created Geyser Grants to help broadcast more Bitcoin signal into the world.
          That is, to accelerate the growth of the Bitcoin ecosystem by increasing Bitcoin awareness, enabling Bitcoin culture, and supporting needed development.
          Through these grants we will be supporting Bitcoin educators, developers, entrepreneurs and creatives with the resources they need to bootstrap their initiatives.
          We accept Bitcoin contributions for each individual grant and don't charge any grant operations fees - Geyser charges no fee to node-running projects, 
          and 2% to projects that use a lightning address. For more information see this doc.`}
      </Text>
      <Box w={20} mt="4" mb={10}>
        <Link href={GrantsFAQUrl} isExternal _focus={{}}>
          <Box
            shadow="md"
            px="4"
            gap={4}
            py={'2'}
            alignItems="center"
            display="flex"
            borderRadius="4px"
            _hover={{ shadow: 'xl' }}
            transition="all ease-out 0.3s"
          >
            <Text fontWeight={'600'}>faq</Text>
            <img src={ShareIcon} alt="icon" />
          </Box>
        </Link>
      </Box>
    </Box>
  )
}
