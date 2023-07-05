import { Button, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { H1, H3 } from '../../../components/typography'
import { getPath, GeyserAboutProjectsBannerImage } from '../../../constants'

export const WhereGreatIdeas = () => {
  const { t } = useTranslation()
  return (
    <VStack w={'full'} maxWidth={'1068px'} spacing={50} padding={3}>
      <VStack>
        <H1>{t('Where great ideas find great communities')}</H1>
        <H3 color={'neutral.600'}>
          {t(
            'Some of the most successful projects and brands have launched on Geyser',
          )}
        </H3>
      </VStack>
      <Image
        src={GeyserAboutProjectsBannerImage}
        alt="great-ideas-geyser-image"
      />
      <Button
        as={Link}
        to={getPath('landingPage')}
        variant={'primaryGradient'}
        minWidth={300}
      >
        {t('View all projects')}
      </Button>
    </VStack>
  )
}
