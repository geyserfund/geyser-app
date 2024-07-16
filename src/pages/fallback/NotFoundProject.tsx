import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../components/typography'
import { Head } from '../../config'
import { NotFoundPageImageUrl } from '../../shared/constants/platform/url'

export const NotFoundProject = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title="Project Not Found" />
      <VStack
        width="100%"
        height="100%"
        padding="40px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing="20px"
      >
        <Image width={308} height={278} src={NotFoundPageImageUrl} />
        <Text variant={'h2'} color={'neutral.600'}>
          {t('This project does not exist')}
        </Text>
        <VStack
          width={{ base: '100%', lg: '600px' }}
          border="2px solid"
          borderColor="neutral.400"
          backgroundColor="neutral.50"
          borderRadius="8px"
          alignItems="flex-start"
          px={10}
          py={5}
          spacing="20px"
        >
          <Body1 fontWeight="bold" fontSize="16px">
            {t('What may have gone wrong:')}
          </Body1>
          <Box width="100%" display="flex" flexDirection="column" ml={5}>
            <ul>
              <li>
                <Body1>{t('You may have typed the wrong URL')}</Body1>
              </li>
              <li>
                <Body1>{t('The project may have been deleted')}</Body1>
              </li>
              <li>
                <Body1>{t('The creator may have changed the project URL')}</Body1>
              </li>
            </ul>
          </Box>
        </VStack>
      </VStack>
    </>
  )
}

export default NotFoundProject
