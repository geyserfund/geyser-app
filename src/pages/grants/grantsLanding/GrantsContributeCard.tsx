import { useQuery } from '@apollo/client'
import { Box, Link, Stack, Text, Tooltip } from '@chakra-ui/react'

import {
  CardLayout,
  CardLayoutProps,
  SkeletonLayout,
} from '../../../components/layouts'
import { QUERY_GRANT_STATISTICS } from '../../../graphql/queries/grant'
import { useAnimatedClipboard } from '../../../hooks/useAnimatedClipboard'
import { GrantStatistics } from '../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../utils'
import { GrantsContributeModal } from '../components/GrantsContributeModal'
import { ListText } from '../components/ListText'
import { CONTRIBUTION_ADDRESS } from '../constants'

export const GrantsContributeCard = (props: CardLayoutProps) => {
  const isMobile = useMobileMode()

  const [handleCopyAddress, hasCopied] =
    useAnimatedClipboard(CONTRIBUTION_ADDRESS)

  const { data, loading } = useQuery<{ grantStatistics: GrantStatistics }>(
    QUERY_GRANT_STATISTICS,
  )

  const grantContributions = data?.grantStatistics.grants?.amountFunded || 0
  const grantDistributed = data?.grantStatistics.grants?.amountGranted || 0

  return (
    <CardLayout
      width="100%"
      maxWidth="909px"
      padding="20px"
      alignItems="center"
      spacing="20px"
      {...props}
    >
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        px={{ base: undefined, lg: '25%' }}
        justifyContent="space-around"
      >
        <ListText
          titleProps={{ fontSize: '24px' }}
          subtitle="GRANT CONTRIBUTIONS"
          subtitleProps={{ fontSize: '10px' }}
          isSatLogo={true}
        >
          {loading ? (
            <SkeletonLayout h="36px" w="40px" />
          ) : (
            getShortAmountLabel(grantContributions)
          )}
        </ListText>
        <ListText
          titleProps={{ fontSize: '24px' }}
          subtitle="GRANTS DISTRIBUTED"
          subtitleProps={{ fontSize: '10px' }}
          isSatLogo={true}
        >
          {loading ? (
            <SkeletonLayout h="36px" w="40px" />
          ) : (
            getShortAmountLabel(grantDistributed)
          )}
        </ListText>
      </Box>
      <Stack
        display="flex"
        mt="6"
        direction={{ base: 'column', lg: 'row' }}
        justify="center"
      >
        <GrantsContributeModal />
        {isMobile ? (
          <Text fontSize={'14px'} fontWeight="500" mt={3} color="neutral.600">
            Contribute to the Bitcoin ecosystem by becoming a Geyser Grants
            sponsor. You can also easily contribute by sending or streaming
            recurring payments to{' '}
            <Link
              textColor={hasCopied ? undefined : 'primary.500'}
              href="#"
              onClick={() => handleCopyAddress()}
            >
              {CONTRIBUTION_ADDRESS}
            </Link>
          </Text>
        ) : (
          <Box display="flex" alignItems={'center'}>
            <Text fontWeight="500" mr={1} color="neutral.600">
              Or sending SATs to our lightning address:{' '}
              <Tooltip label="Copied to clipboard!" isOpen={hasCopied}>
                <Link
                  textColor={hasCopied ? undefined : 'primary.500'}
                  href="#"
                  onClick={() => handleCopyAddress()}
                >
                  {CONTRIBUTION_ADDRESS}
                </Link>
              </Tooltip>
            </Text>
          </Box>
        )}
      </Stack>
    </CardLayout>
  )
}
