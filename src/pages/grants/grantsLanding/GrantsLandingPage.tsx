import { Text, VStack } from '@chakra-ui/react'
import { useTheme } from '@chakra-ui/react'

import { AppFooter } from '../../../components/molecules'
import { H2, H3 } from '../../../components/typography'
import { getPath } from '../../../constants'
import { fonts } from '../../../styles'
import { useMobileMode } from '../../../utils'
import { CustomGrantCard } from '../components/CustomGrantCard'
import { MoreInfo } from '../components/MoreInfo'
import { useGrants } from '../hooks/useGrants'
import { GrantsContributeCard } from './GrantsContributeCard'

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

        <GrantsContributeCard />

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
          <VStack w="full" alignItems="start" spacing="10px">
            <Text
              fontWeight={'bold'}
              fontSize="19px"
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
