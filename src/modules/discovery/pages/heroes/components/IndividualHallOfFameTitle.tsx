import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'

import { FlowingGifBackground } from './FlowingGifBackground'

type IndividualHallOfFameTitleProps = {
  title?: string
  description?: string
  background?: string
  children?: React.ReactNode
} & CardLayoutProps

export const IndividualHallOfFameTitle = ({
  title,
  description,
  background,
  children,
  ...rest
}: IndividualHallOfFameTitleProps) => {
  return (
    <CardLayout
      w="full"
      direction="row"
      spacing={{ base: 4, lg: 6 }}
      background={background || 'linear-gradient(81deg, #FFFBE7 -9.6%, #C4FFF4 109.2%)'}
      position="relative"
      backgroundColor="utils.pbg"
      alignItems={{ base: 'start', lg: 'center' }}
      {...rest}
    >
      <FlowingGifBackground />

      <VStack w="full" alignItems={'center'} spacing={{ base: 2, lg: 0 }} zIndex={1}>
        <H2 size="3xl" bold color={lightModeColors.utils.text}>
          {title || t('Projects Hall of Fame')}
        </H2>

        <Body size={{ base: 'lg', lg: 'xl' }} medium color={lightModeColors.neutral1[11]} textAlign={'center'}>
          {description || t('Discover the top projects making a significant impact on Bitcoin’s mass adoption')}
        </Body>
        {children}
      </VStack>
    </CardLayout>
  )
}
