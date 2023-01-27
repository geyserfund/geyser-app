import { Box, Divider, HTMLChakraProps, VStack } from '@chakra-ui/react'

import { StickToTop } from '../../../components/layouts'
import { H3 } from '../../../components/typography'
import { LandingPageContributionsList } from './LandingPageContributionsList'

type Props = HTMLChakraProps<'div'>

export const ActivityView = ({ ...rest }: Props) => {
  return (
    <Box {...rest}>
      <VStack height="full" width="full" alignItems="flex-start">
        <StickToTop
          id="landing-page-contributionTitle"
          width="100%"
          _onStick={{ width: 'calc(100% - 20px)' }}
        >
          <VStack
            alignItems="flex-start"
            paddingTop="10px"
            backgroundColor="bgWhite"
          >
            <H3 paddingY="5px">Contributions</H3>
            <Divider borderWidth={'1px'} zIndex={-1} borderRadius="full" />
          </VStack>
        </StickToTop>

        <LandingPageContributionsList />
      </VStack>
    </Box>
  )
}
