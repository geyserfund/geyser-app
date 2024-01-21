import {
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineCheck } from 'react-icons/hi'

import { Body2, H3 } from '../../../../../../components/typography'
import { useProjectContext } from '../../../../../../context'
import { fonts, lightModeColors } from '../../../../../../styles'
import { Badge, FundingTxFragment } from '../../../../../../types'
import { useCustomTheme } from '../../../../../../utils'
import { AvatarElement } from '../../../../projectMainBody/components'

export const SuccessImageComponent = ({
  currentBadge,
  fundingTx,
}: {
  currentBadge?: Badge
  fundingTx: FundingTxFragment
}) => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  const { colors } = useCustomTheme()

  const successComponent = useRef<HTMLDivElement>(null)

  if (!project) {
    return null
  }

  const {
    comment,
    funder: { user },
  } = fundingTx

  return (
    <VStack w="full" spacing="10px">
      <VStack
        id="successful-contribution-banner"
        ref={successComponent}
        spacing="20px"
        backgroundColor={colors.primary[400]}
        padding="10px 20px"
        w="full"
        mb={6}
      >
        {currentBadge ? (
          <VStack w="full" spacing="0px">
            <Image src={currentBadge.image} width="125px" />
            <Body2 color={lightModeColors.neutral[900]}>
              {t('You won a Nostr badge!')}
            </Body2>
          </VStack>
        ) : (
          <Center
            boxSize={'50px'}
            borderRadius="full"
            backgroundColor={lightModeColors.neutral[50]}
          >
            <HiOutlineCheck
              color={lightModeColors.neutral[1000]}
              fontSize="40px"
            />
          </Center>
        )}
        <VStack spacing="0px">
          <H3
            color={lightModeColors.neutral[900]}
            fontSize="22px"
            fontWeight={500}
            fontFamily={fonts.livvic}
          >
            {t('Successful contribution to')}
          </H3>
          <H3
            color={lightModeColors.neutral[900]}
            fontSize="22px"
            fontWeight={700}
            fontFamily={fonts.livvic}
          >
            {project.title}
          </H3>
        </VStack>
      </VStack>

      <VStack
        padding={2}
        width={'full'}
        borderRadius="8px"
        backgroundColor={colors.primary[50]}
        spacing={0}
        justify={'flex-start'}
        alignItems="flex-start"
        mb={3}
      >
        <HStack>
          <Text
            fontSize={'16px'}
            fontWeight={'normal'}
            textColor={'neutral.900'}
          >
            {t('By')}
          </Text>
          <AvatarElement
            borderRadius="50%"
            user={user}
            noLink
            textProps={{ color: 'neutral.700' }}
          />
        </HStack>
        {comment && (
          <Body2 color={'neutral.700'} fontStyle="italic" mt={2}>
            {comment}
          </Body2>
        )}
      </VStack>
    </VStack>
  )
}
