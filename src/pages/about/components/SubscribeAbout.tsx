import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H1, H3 } from '../../../components/typography'
import { TextInputBox } from '../../../components/ui'

export const SubscribeAbout = () => {
  const { t } = useTranslation()
  return (
    <VStack
      maxWidth={'764px'}
      width={'100%'}
      spacing={5}
      padding={3}
      alignItems={'center'}
    >
      <H1>{t('Subscribe to our newsletter')}</H1>
      <H3 color={'neutral.600'}>
        {t(
          'Receive updates about exciting new projects, product updates and Geyser news.',
        )}
      </H3>
      <TextInputBox
        wrapperProps={{ width: '350px' }}
        placeholder={'satoshi@gmx.com'}
      />
      <Button width={350} variant={'primaryGradient'}>
        {t('Subscribe')}
      </Button>
    </VStack>
  )
}
