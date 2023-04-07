import { Box, Link, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useTheme } from '@chakra-ui/react'

import { CardLayout } from '../../components/layouts'
import { AppFooter } from '../../components/molecules'
import { H2, H3 } from '../../components/typography'
import { getPath } from '../../constants'
import { useAnimatedClipboard } from '../../hooks/useAnimatedClipboard'
import { colors, fonts } from '../../styles'
import { Grant } from '../../types'
import { getShortAmountLabel, useMobileMode } from '../../utils'
import { CustomGrantCard } from './components/CustomGrantCard'
import { GrantsContributeModal } from './components/GrantsContributeModal'
import { ListText } from './components/ListText'
import { MoreInfo } from './components/MoreInfo'
import { CONTRIBUTION_ADDRESS } from './constants'
import { useGrants } from './hooks/useGrants'

export const GrantsLandingPage = () => {
  const isMobile = useMobileMode()

  const theme = useTheme()

  const { grants, activeGrant, inactiveGrants } = useGrants()

  if (!grants || !grants.length) {
    return null
  }

  return (
    <VStack
      paddingTop={{ base: '10px', md: '20px' }}
      bg={theme.colors.brand.bgGrey4}
      minHeight="100%"
      width="100%"
      alignItems="center"
    >
      <VStack
        my={{ base: 0, md: 5 }}
        px={{ base: '10px', md: '0px' }}
        spacing="20px"
        width={isMobile ? '100%' : '909px'}
      >
        <VStack spacing="10px">
          <Text
            fontSize={isMobile ? '4xl' : '44px'}
            fontWeight="medium"
            textAlign="center"
          >
            🥳
          </Text>
          <Text
            fontSize={'25px'}
            fontWeight="bold"
            textAlign="center"
            fontFamily={fonts.header}
            textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
            color={'brand.primary500'}
          >
            GEYSER GRANTS
          </Text>
          <H2
            textAlign="center"
            paddingY="5px"
            fontSize="44px"
            fontWeight="700"
          >
            Empowering bitcoin creators
          </H2>
          <H3 textAlign="center" color={'brand.neutral600'}>
            Funding educators, creatives and builders doing Bitcoin-only
            projects on Geyser. <br /> Funded by bitcoiners who want to change
            the world.
          </H3>
        </VStack>

        <GrantsContributeCard grants={grants} />

        <VStack w="full" justifyContent={'center'} alignItems="center">
          {activeGrant && (
            <VStack w="full" alignItems="start" spacing="10px">
              <Text
                fontWeight={'bold'}
                fontSize="19px"
                mb={1}
                fontFamily={fonts.interBlack}
              >
                Latest Grant
              </Text>
              <CustomGrantCard
                grant={activeGrant}
                to={getPath('grants', activeGrant.id)}
                showBanner
              />
            </VStack>
          )}
          <VStack w="full" mt={7} alignItems="start" spacing="10px">
            <Text
              fontWeight={'bold'}
              fontSize="19px"
              mb={1}
              fontFamily={fonts.interBlack}
            >
              Previous Grants
            </Text>
            {inactiveGrants
              .sort((a, b) => {
                const grantASplit = a.name.split('-')
                const grantBSplit = b.name.split('-')
                const grantA = grantASplit[grantASplit.length - 1]
                const grantB = grantBSplit[grantBSplit.length - 1]
                return Number(grantB) - Number(grantA)
              })
              .map((grant) => (
                <CustomGrantCard
                  key={grant.id}
                  to={getPath('grants', grant.id)}
                  showBanner={false}
                  grant={grant}
                />
              ))}{' '}
          </VStack>
        </VStack>
        <MoreInfo />
      </VStack>
      <AppFooter />
    </VStack>
  )
}

export const GrantsContributeCard = ({ grants }: { grants: Grant[] }) => {
  const isMobile = useMobileMode()

  const [handleCopyAddress, hasCopied] =
    useAnimatedClipboard(CONTRIBUTION_ADDRESS)

  return (
    <CardLayout
      width="100%"
      maxWidth="909px"
      padding="20px"
      alignItems="center"
      spacing="20px"
    >
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        px={{ base: undefined, md: '25%' }}
        justifyContent="space-around"
      >
        <ListText
          titleProps={{ fontSize: '24px' }}
          subtitle="GRANT CONTRIBUTIONS"
          subtitleProps={{ fontSize: '10px' }}
          isSatLogo={true}
        >
          {getShortAmountLabel(
            grants.reduce((prev, curr) => prev + (curr?.balance || 0), 0),
          )}
        </ListText>
        <ListText
          titleProps={{ fontSize: '24px' }}
          subtitle="GRANTS DISTRIBUTED"
          subtitleProps={{ fontSize: '10px' }}
          isSatLogo={true}
        >
          {getShortAmountLabel(
            grants.reduce(
              (p, c) =>
                p +
                (c.applicants
                  ? c.applicants.reduce(
                      (prev, curr) =>
                        prev + (curr?.funding.grantAmountDistributed || 0),
                      0,
                    )
                  : 0),
              0,
            ),
          )}
        </ListText>
      </Box>
      <Stack
        display="flex"
        mt="6"
        direction={{ base: 'column', md: 'row' }}
        justify="center"
      >
        <GrantsContributeModal />
        {isMobile ? (
          <Text
            fontSize={'14px'}
            fontWeight="500"
            mt={3}
            color="brand.neutral600"
          >
            Contribute to the Bitcoin ecosystem by becoming a Geyser Grants
            sponsor. You can also easily contribute by sending or streaming
            recurring payments to{' '}
            <Link
              textColor={hasCopied ? undefined : colors.primary500}
              href="#"
              onClick={() => handleCopyAddress()}
            >
              {CONTRIBUTION_ADDRESS}
            </Link>
          </Text>
        ) : (
          <Box display="flex" alignItems={'center'}>
            <Text fontWeight="500" mr={1} color="brand.neutral600">
              Or sending SATs to our lightning address:{' '}
              <Tooltip label="Copied to clipboard!" isOpen={hasCopied}>
                <Link
                  textColor={hasCopied ? undefined : colors.primary500}
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
