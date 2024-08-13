import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import PlatformLayout from '@/components/ui/PlatformLayout'

import { AppFooter } from '../../../components/molecules'
import { H2, H3 } from '../../../components/typography'
import { getPath } from '../../../shared/constants'
import { fonts } from '../../../styles'
import { useMobileMode } from '../../../utils'
import { CustomGrantCard } from '../components/CustomGrantCard'
import { MoreInfo } from '../grantsPage/sections'
import { useGrants } from '../hooks/useGrants'
import { GrantsContributeCard } from './GrantsContributeCard'

export const GrantsLandingPage = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { grants, activeGrants, inactiveGrants } = useGrants()

  if (!grants || !grants.length) {
    return null
  }

  return (
    <PlatformLayout>
      <VStack spacing="10px">
        <Text fontSize={isMobile ? '4xl' : '44px'} fontWeight="medium" textAlign="center">
          🥳
        </Text>
        <Text
          fontSize={'25px'}
          fontWeight="bold"
          textAlign="center"
          fontFamily={fonts.header}
          textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
          color={'primary.500'}
          textTransform="uppercase"
        >
          {t('Geyser Grants')}
        </Text>
        <H2 textAlign="center" paddingY="5px" fontSize="44px" fontWeight="700">
          {t('Empowering bitcoin creators')}
        </H2>
        <H3 textAlign="center" color={'neutral.600'}>
          {t('Funding educators, creatives and builders doing Bitcoin-only projects on Geyser.')} <br />{' '}
          {t('Funded by bitcoiners who want to change the world.')}
        </H3>
      </VStack>

      <GrantsContributeCard />

      {activeGrants && activeGrants.length > 0 && (
        <VStack w="full" alignItems="start" spacing="10px">
          <Text fontWeight={'bold'} fontSize="19px" mb={1}>
            {t('Active Grants')}
          </Text>
          {activeGrants.map((activeGrant) => {
            return (
              <CustomGrantCard
                key={activeGrant.id}
                grant={activeGrant}
                to={getPath('grants', activeGrant.id)}
                showBanner
              />
            )
          })}
        </VStack>
      )}
      <VStack w="full" alignItems="start" spacing="10px">
        <Text fontWeight={'bold'} fontSize="19px">
          {t('Previous Grants')}
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
            <CustomGrantCard key={grant.id} to={getPath('grants', grant.id)} showBanner={false} grant={grant} />
          ))}
      </VStack>
      <MoreInfo />
      <AppFooter />
    </PlatformLayout>
  )
}

export default GrantsLandingPage
